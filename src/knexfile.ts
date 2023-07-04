import config from "./config";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import path from "path"






export default {
	development: {
		client: config.db.client || 'mysql',
		connection: {
			host: config.db.host,
			user: config.db.user,
			password: config.db.password,
			database: config.db.database,
			typeCast: function (field: any, next: any) {
				if (field.type == "DATE") {
					try {
						return format(parseISO(field.string()), "yyyy.MM.dd");
					} catch (e) {
						return null;
					}
				}
				return next();
			},
		},
		migrations: {
			directory: path.resolve(__dirname, "./migrations"),
			extension: "ts",
		  },

	},
	
};
