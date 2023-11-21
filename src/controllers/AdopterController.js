const Adopter = require('../models/Adopter');
const Posts = require('../models/Posts');
const User = require('../models/User');
const Ong = require('../models/Ong');

class AdopterController {
  async index(req, res) {
    try {
      const { id } = req.params;
      const isUser = req.route.path.split('/')[1] === 'user';

      if ((req.body.user_id || req.body.ong_id) !== id) {
        return res.status(401).json({ error: 'Você não tem permissão para acessar esses dados.' });
      }

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

      userOrOngWithPostsAndAdopters
        .Posts = userOrOngWithPostsAndAdopters
          .Posts.map((post) => {
            post.dataValues.adopter = post.dataValues.adopter.length; return post;
          });

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
      const postWithAdopters = await Posts.findByPk(req.params.id, {
        include: [{
          model: Adopter,
          as: 'adopter',
        }, {
          model: User,
          attributes: ['id', 'name', 'email'],
          as: 'user',
        }, {
          model: Ong,
          attributes: ['id', 'name', 'cnpj'],
          as: 'ong',
        }],
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

  delete = async (req, res) => {
    try {
      const { id } = req.params;

      const adopter = await Adopter.findByPk(id);

      if (!adopter) {
        return res.status(404).json({ error: 'O adotante requisitado não existe.' });
      }

      if (req.body.user_id !== adopter.user_id) {
        return res.status(401).json({ error: 'Você não tem permissão para deletar esse adotante.' });
      }

      await adopter.destroy();

      return res.json({ message: 'Adotante excluído com sucesso.' });
    } catch (error) {
      if (error.parent.code === '22P02') {
        return res.status(400).json({ error: 'O ID do adotante informado é inválido.' });
      }

      res.status(400).json(error);
    }
  };
}

module.exports = new AdopterController();
