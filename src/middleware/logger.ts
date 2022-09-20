import pino from "pino-http";
import { customAlphabet } from "nanoid";

import logger from "../utils/logging";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - pino-http doesn't have this property in its type definition
const httpLogger = pino({
	logger: logger,
	name: "HamBook",
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - pino-http doesn't have this property in its type definition
	genReqId: (req, res) => {
		const id = `HBRID-${customAlphabet("1234567890ABCDEFGHIKLMNOPQRSTVXYZ", 16)()}`;
		res.setHeader("X-Request-ID", id);
		return id;
	}
});

export default httpLogger;