const User = require('../models/User');
const Posts = require('../models/Posts');

class UserController {
  index = async (req, res) => {
    try {
      res.json(
        await User.findAll({
          attributes: ['id', 'name', 'email', 'user_info'],
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
      const user = await User.create(req.body);

      const { id, name, email } = user;

      res.json({ id, name, email });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ errors: error.errors.map((err) => err.message) });
      }
      return res.status(400).json(error);
    }
  };

  show = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'name', 'email', 'user_info'],
        order: [[Posts, 'created_at', 'DESC']],
        include: {
          model: Posts,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'O usuário requisitado não existe.' });
      }

      return res.json(user);
    } catch (error) {
      if (error.parent.code === '22P02') {
        return res.status(400).json({ error: 'O ID do usuário informado é inválido.' });
      }

      console.log(error);

      res.status(400).json(error);
    }
  };

  update = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'O usuário requisitado não existe.' });
      }

      if (req.body.user_id !== user.id) {
        return res.status(401).json({ error: 'Você não tem permissão para alterar esse usuário.' });
      }

      const userUpdated = await user.update(req.body);

      const {
        id, name, email, user_info,
      } = userUpdated;

      return res.json({
        id, name, email, user_info,
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

module.exports = new UserController();
