import { Sequelize } from "sequelize";

export let db;

if (process.env.NODE_ENV === "development") {
  db = new Sequelize("spectrm_api_development", "postgres", "", {
    host: "localhost",
    dialect: "postgres",
  });
}

if (process.env.NODE_ENV === "production") {
  exports.db = db = new _sequelize.Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}
