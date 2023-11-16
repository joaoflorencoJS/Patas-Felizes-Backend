const Adopter = require('../models/Adopter');
const Posts = require('../models/Posts');
const User = require('../models/User');
const Ong = require('../models/Ong');

class AdopterController {
  async index(req, res) {
    try {
      const { id } = req.params;
      const isUser = req.route.path.split('/')[1] === 'user';
      console.log(isUser);

      const userOrOngWithPostsAndAdopters = isUser ? await User.findByPk(id, {
        attributes: ['id', 'name', 'email'],
        order: [[Posts, 'created_at', 'DESC']],
        include: {
          model: Posts,
          include: {
            model: Adopter,
            as: 'adopter',
          },
        },
      }) : await Ong.findByPk(id, {
        attributes: ['id', 'name', 'cnpj'],
        order: [[Posts, 'created_at', 'DESC']],
        include: {
          model: Posts,
          include: {
            model: Adopter,
            as: 'adopter',
          },
        },
      });

      if (!userOrOngWithPostsAndAdopters) {
        return res.status(404).json({ error: 'O usuário ou ong inexistente.' });
      }

      return res.json(userOrOngWithPostsAndAdopters);
    } catch (error) {
      if (error.parent.code === '22P02') {
        return res.status(400).json({ error: 'O ID do usuário informado é inválido.' });
      }

      res.status(400).json(error);
    }
  }

  create = async (req, res) => {
    try {
      console.log(req.body);
      const adopterRequest = await Adopter.create(req.body);

      res.json(adopterRequest);
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ errors: error.errors.map((e) => e.message) });
      }

      return res.status(400).json(error);
    }
  };

  show = async (req, res) => {
    try {
      const { id } = req.params;

      const postWithAdopters = await Posts.findByPk(id, {
        include: {
          model: Adopter,
          as: 'adopter',
        },
      });

      if (!postWithAdopters) {
        return res.status(404).json({ error: 'A postagem requisitada não existe.' });
      }

      return res.json(postWithAdopters);
    } catch (error) {
      if (error.parent.code === '22P02') {
        return res.status(400).json({ error: 'O ID da postagem informado é inválido.' });
      }

      res.status(400).json(error);
    }
  };
}

module.exports = new AdopterController();
