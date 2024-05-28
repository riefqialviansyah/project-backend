"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Word.belongsTo(models.WordCreate, { foreignKey: "WordCreateId" });
    }
  }
  Word.init(
    {
      WordCreateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "WordCreateId tidak boleh kosong" },
          notEmpty: { msg: "WordCreateId tidak boleh kosong" },
        },
      },
      asing: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Kata asing tidak boleh kosong" },
          notEmpty: { msg: "Kata asing tidak boleh kosong" },
        },
        unique: {
          msg: "Kata asing sudah ada",
        },
      },
      terjemah: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Terjemahan tidak boleh kosong" },
          notEmpty: { msg: "Terjemahan tidak boleh kosong" },
        },
      },
    },
    {
      sequelize,
      modelName: "Word",
    }
  );
  return Word;
};
