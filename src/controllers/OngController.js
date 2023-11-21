const Ong = require('../models/Ong');
const Posts = require('../models/Posts');

class OngController {
  index = async (req, res) => {
    try {
      res.json(
        await Ong.findAll({
          attributes: ['id', 'name', 'cnpj', 'ong_info'],
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

  show = async (req, res) => {
    try {
      const ong = await Ong.findByPk(req.params.id, {
        attributes: ['id', 'name', 'cnpj', 'ong_info'],
        order: [[Posts, 'created_at', 'DESC']],
        include: {
          model: Posts,
        },
      });

      if (!ong) {
        return res.status(404).json({ error: 'A Ong requisitada não existe.' });
      }

      return res.json(ong);
    } catch (error) {
      if (error.parent.code === '22P02') {
        return res.status(400).json({ error: 'O ID da Ong informado é inválido.' });
      }

      console.log(error);

      res.status(400).json(error);
    }
  };

  update = async (req, res) => {
    try {
      const ong = await Ong.findByPk(req.params.id);

      if (!ong) {
        return res.status(404).json({ error: 'A Ong requisitada não existe.' });
      }

      if (req.body.ong_id !== ong.id) {
        return res.status(401).json({ error: 'Você não tem permissão para alterar essa ong.' });
      }

      const ongUpdated = await ong.update(req.body);

      const {
        id, name, cnpj, ong_info,
      } = ongUpdated;

      return res.json({
        id, name, cnpj, ong_info,
      });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ errors: error.errors.map((err) => err.message) });
      }

      console.log(error);

      res.status(400).json(error);
    }
  };
}

module.exports = new OngController();
