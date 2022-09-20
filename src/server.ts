import express from "express";

import routes from "./routes/api";
import defaultMiddleware from "./middleware/default";
import loggerMiddleware from "./middleware/logger";

import logger from "./utils/logging";
import config from "./utils/config";

const app = express();

app.disable("x-powered-by");


app.use(
	express.json(),
	defaultMiddleware,
	loggerMiddleware
);

app.use("/api/v1", routes);

app.listen(config.httpPort, async () => {
	logger.info(`Server is listening on port ${config.httpPort}`);
});

app.use("*", (req, res) => {
	res.status(404).json({
		status: 404,
		message: "Not found"
	});
});