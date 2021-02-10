import { Sequelize } from "sequelize";

export let db;

if (process.env.NODE_ENV === "development") {
  db = new Sequelize("spectrm_api_development", "postgres", "", {
    host: "localhost",
    dialect: "postgres",
  });
}

if (process.env.NODE_ENV === "production") {
  db = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: true,
      rejectUnauthorized: false,
    },
  });
}
