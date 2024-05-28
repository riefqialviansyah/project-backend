const { Word, WordCreate, sequelize } = require("../models");

class WordBankController {
  static async addWordBank(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { asing, terjemah } = req.body;
      let today = (
        await WordCreate.findAll({
          order: [["day", "DESC"]],
          limit: 1,
        })
      )[0];

      const todayDate = new Date()
        .toLocaleString("id-ID", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })
        .split("/")
        .reverse()
        .join("-");

      if (today) {
        if (
          today.day
            .toLocaleString("id-ID", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })
            .split("/")
            .reverse()
            .join("-") != todayDate
        ) {
          today = await WordCreate.create(
            { day: todayDate },
            { transaction: t }
          );
        }
      } else {
        today = await WordCreate.create({ day: todayDate }, { transaction: t });
      }

      const wordData = {
        WordCreateId: today.id,
        asing,
        terjemah,
      };

      await Word.create(wordData, { transaction: t });

      await t.commit();
      res.status(201).json({ message: "Success add word" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async getAllWordBank(req, res, next) {
    try {
      const words = await WordCreate.findAll({
        attributes: ["day", "id"],
        include: {
          model: Word,
          attributes: ["id", "asing", "terjemah"],
        },
      });

      res.status(200).json({ data: words });
    } catch (error) {
      next(error);
    }
  }

  static async deleteWord(req, res, next) {
    try {
      const { id } = req.body;
      const word = await Word.findByPk(id);

      if (!word) {
        throw { name: "NotFound", message: "Word not found" };
      }

      await word.destroy();

      res.status(200).json({ message: "Success delete word" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WordBankController;
