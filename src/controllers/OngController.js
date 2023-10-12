const Ong = require('../models/Ong');

class OngController {
  index = async (req, res) => {
    try {
      const ongs = await Ong.findAll({ attributes: ['id', 'name', 'cnpj'] });

      res.json(ongs);
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ errors: error.errors.map((err) => err.message) });
      }
      return res.status(400).json(error);
    }
  };

  create = async (req, res) => {
    try {
      console.log(req.body);
      const ong = (await Ong.create(req.body));

      const { id, name, cnpj } = ong;

      res.json({ id, name, cnpj });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ errors: error.errors.map((err) => err.message) });
      }
      return res.status(400).json(error);
    }
  };
}

module.exports = new OngController();
