"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var _sequelize2 = require("sequelize");

var db;
exports.db = db;

if (process.env.NODE_ENV === "development") {
  exports.db = db = new _sequelize2.Sequelize("spectrm_api_development", "postgres", "", {
    host: "localhost",
    dialect: "postgres"
  });
}

if (process.env.NODE_ENV === "production") {
  exports.db = exports.db = db = new _sequelize.Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
}
//# sourceMappingURL=db.js.map