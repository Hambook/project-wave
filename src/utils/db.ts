import pg from "pg";

import logger from "./logging";
import config from "./config";

const pool = new pg.Pool({
	host: config.database.host,
	port: config.database.port,
	user: config.database.user,
	password: config.database.password,
	database: config.database.database,
	keepAlive: true,
	max: 25
});

pool.on("error", (err, client) => {
	logger.child({ client, err }).error("PSQL_ERROR");
	process.exit(-1);
});

export default pool;