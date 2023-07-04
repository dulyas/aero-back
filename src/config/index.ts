import { config } from "dotenv";
config();



export default {
	port: process.env.PORT || 1414,
	app: process.env.APP || 'APP',
	env: process.env.NODE_ENV || 'prod',
	secret: process.env.APP_SECRET || '12323wrwer',
	hostname: process.env.HOSTNAME || '312313',

	client_url: process.env.CLIENTURL || 'http://localhost:5173',
	jwt: {
		access_secret: process.env.JWT_ACCESS_SECRET || 'tretreter',
		refresh_secret: process.env.JWT_REFRESH_SECRET || 'tretreter',
		access_expiration: process.env.ACCESS_TOKEN_EXPIRATION || 3600,
		refresh_expiration: process.env.ACCESS_TOKEN_EXPIRATION || 3600,
	},
	db: {
		client: process.env.DB_CLIENT,
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DATABASE || null,
	}

};
