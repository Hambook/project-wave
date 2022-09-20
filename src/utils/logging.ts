import pino from "pino";

import config from "./config";

const logger = pino({
	transport: {
		target: (config.localLogger) ? "pino-pretty" : "@autotelic/pino-seq-transport",
		options: {
			serverUrl: config.remoteLogger.url,
			apiKey: config.remoteLogger.key
		}
	},
	name: "HamBook"
});

if (config.localLogger) logger.warn("Local logger is enabled. It is not recommended to use it in production environment");

export default logger;