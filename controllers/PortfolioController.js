const sendMail = require("../helpers/nodemailer");
const { sequelize, SendMeMail } = require("../models");

class PortfolioController {
  static async sendMeMail(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { email, name, message } = req.body;
      const data = { email, name, message };

      await SendMeMail.create(data, { transaction: t });
      await sendMail(email, name, message);

      await t.commit();
      res.status(200).json({ message: "Success send email" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = PortfolioController;
