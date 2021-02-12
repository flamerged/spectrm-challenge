"use strict";
const { Model } = require("sequelize");
const { v4: uuid } = require("uuid");
const sanitizeHtml = require("sanitize-html");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Message.init(
    {
      content: DataTypes.STRING(255),
      retrievedCounter: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );

  Message.addHook("beforeCreate", (message) => {
    message.id = uuid();
  });

  Message.addHook("beforeCreate", "beforeUpdate", (message) => {
    message.content = sanitizeHtml(message.content);
  });
  return Message;
};
