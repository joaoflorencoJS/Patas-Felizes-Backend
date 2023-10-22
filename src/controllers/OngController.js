const Ong = require('../models/Ong');
const Posts = require('../models/Posts');

class OngController {
  index = async (req, res) => {
    try {
      res.json(
        await Ong.findAll({
          attributes: ['id', 'name', 'cnpj'],
          order: [['created_at', 'DESC'], [Posts, 'created_at', 'DESC']],
          include: {
            model: Posts,
            attributes: ['id', 'title', 'content', 'url', 'public_id', 'ong_id', 'user_id'],
          },
        }),
      );
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
