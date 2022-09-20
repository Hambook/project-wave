const config = {
	httpPort: process.env.HTTP_PORT || 8080,

	database: {
		host: process.env.DB_HOST || "localhost",
		port: (process.env.DB_PORT) ? parseInt(process.env.DB_PORT) : 5432,
		user: process.env.DB_USER || "postgres",
		password: process.env.DB_PASSWORD || "postgres",
		database: process.env.DB_DATABASE || "postgres"
	},

	localLogger: (process.env.LOCAL_LOGGER === "true" || process.env.SEQ_URL === undefined) ? true : false,
	remoteLogger: {
		url: process.env.SEQ_URL || "http://localhost:5341",
		key: process.env.SEQ_KEY || "seq"
	}
};

export default config;