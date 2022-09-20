import { Router } from "express";
import bcrypt from "bcrypt";
import validator from "validator";

import db from "../../utils/db";
import codes from "../../utils/httpRes";
import uuidGen from "../../utils/uuidGen";

const router = Router();

router.post("/", async (req, res) => {
	let email = "", password = "", ipAddress = "";

	try {

		email = req.body.email;
		password = req.body.password;
		const ipHeaders = req.headers["CF-Connecting-IP"] || req.headers["X-Forwarded-For"] || req.headers["X-Real-IP"];
		ipAddress = ipHeaders ? ipHeaders[0] : req.ip;

	} catch {

		return codes.BadRequest(res);

	}

	if (!email || !password || typeof email !== "string" || typeof password !== "string") {
		return codes.BadRequest(res, "Input is not a string");
	}

	if (!validator.isEmail(email) || !validator.isStrongPassword(password)) {
		return codes.BadRequest(res, "Input invalid");
	}
	
	const hashedPassword = await bcrypt.hash(password, 15);
	const uuid = uuidGen();
	
	const connection = await db.connect();
	let query;

	try {
		query = await connection.query("INSERT INTO users (uuid, email, password, register_ip, login_ip, register_date, is_activated) VALUES ($1, $2, $3, $4, $4, $5, false) RETURNING *", [uuid, email, hashedPassword, ipAddress, new Date()]);
	} catch (err) {
		console.log(err);
		connection.release();
		return codes.BadRequest(res, "User already exists");
	}

	connection.release();

	return res.json({
		status: 200,
		message: "User created",
		data: {
			uid: query.rows[0].uid,
			uuid: query.rows[0].uuid,
			email: query.rows[0].email,
			register_ip: query.rows[0].register_ip,
		}
	});

});

export default router;