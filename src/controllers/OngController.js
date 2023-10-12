const Ong = require('../models/Ong');

class OngController {
  index = async (req, res) => {
    try {
      const ongs = await Ong.findAll();

      res.json(ongs);
    } catch (error) {
      return res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  };

  create = async (req, res) => {
    try {
      console.log(req.body);
      const ong = await Ong.create(req.body);

      res.json(ong);
    } catch (error) {
      return res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  };
}

module.exports = new OngController();
