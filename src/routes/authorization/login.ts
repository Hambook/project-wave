import { Router } from "express";
import bcrypt from "bcrypt";

import codes from "../../utils/httpRes";

const router = Router();

router.post("/", async (req, res) => {
	let email = "", password = "";

	try {

		email = req.body.email;
		password = req.body.password;

	} catch {

		codes.BadRequest(res);
	}

	if (!email || !password || typeof email !== "string" || typeof password !== "string") {
		codes.BadRequest(res, "Bad format of email or password");
	}
	
	// I dunno, I want to just commit this xd
	return res.send("WOLOLOLOLLOLO");

});

export default router;