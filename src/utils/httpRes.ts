import { Response } from "express";

function BadRequest(res: Response, msg?: string) {
	const message = msg || "Bad Request";
	res.status(400).json({
		status: 400,
		message
	});
}

export default {
	BadRequest
};