const { sortByLastAdd, sortByASCChar } = require("../helpers/sortWord");
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
      const { sort } = req.query;

      let words = await WordCreate.findAll({
        attributes: ["day", "id"],
        order: [["day", "DESC"]],
        include: {
          model: Word,
          attributes: ["id", "asing", "terjemah", "createdAt"],
        },
      });

      words = words.map((el) => {
        if (sort == "lastAdd") {
          el.Words = sortByLastAdd(el);
        } else {
          el.Words = sortByASCChar(el);
        }
        return el;
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

  static async dayPractice(req, res, next) {
    try {
      let result = [];
      let otherOption = [];

      const words = await WordCreate.findAll({
        attributes: ["day", "id"],
        include: {
          model: Word,
          attributes: ["id", "asing", "terjemah"],
        },
      });
      words.forEach((element) => {
        element.Words.map((word) => {
          let tmp = {
            question: word.asing,
            answer: word.terjemah,
            options: [word.terjemah],
          };
          otherOption.push(word.terjemah);
          result.push(tmp);
        });
      });

      if (otherOption.length < 4) {
        throw {
          name: "ErrorGeneratePractice",
          message: "Word must be more than 3",
        };
      }

      result = result.map((el) => {
        while (el.options.length < 4) {
          let randomIndex = Math.floor(Math.random() * otherOption.length);
          if (!el.options.includes(otherOption[randomIndex])) {
            el.options.push(otherOption[randomIndex]);
          }
        }

        el.options = el.options.sort(() => Math.random() - 0.5);

        return el;
      });

      result = result.sort(() => Math.random() - 0.5);

      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WordBankController;
