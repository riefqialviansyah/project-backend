"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SendMeMail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SendMeMail.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Email is required" },
          notNull: { msg: "Email is required" },
          isEmail: { msg: "Not valid email" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name is required" },
          notEmpty: { msg: "Name is required" },
        },
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Message is required" },
          notEmpty: { msg: "Message is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "SendMeMail",
    }
  );
  return SendMeMail;
};
