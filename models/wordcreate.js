"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WordCreate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WordCreate.hasMany(models.Word, { foreignKey: "WordCreateId" });
    }
  }
  WordCreate.init(
    {
      day: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "WordCreate",
    }
  );
  return WordCreate;
};
