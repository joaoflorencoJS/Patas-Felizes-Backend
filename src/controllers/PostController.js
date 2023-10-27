const Posts = require('../models/Posts');
const cloudinary = require('../config/cloudinaryConfig');
const User = require('../models/User');
const Ong = require('../models/Ong');

class PostController {
  async index(req, res) {
    try {
      res.json(await Posts.findAll({
        attributes: ['id', 'title', 'content', 'url', 'public_id', 'ong_id', 'user_id'],
        order: [['created_at', 'DESC']],
      }));
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ errors: error.errors.map((err) => err.message) });
      }

      return res.status(400).json(error);
    }
  }

  async store(req, res) {
    console.log(req.body);
    const { ong_id, user_id } = req.body;

    const { title, content, image } = req.body;

    if (title.length < 3 || title.length > 150) return res.status(400).json({ errors: 'O campo título deve conter entre 3 e 150 caracteres.' });

    if (content.length < 3 || content.length > 500) return res.status(400).json({ errors: 'O campo conteúdo deve conter entre 3 e 500 caracteres.' });

    try {
      if (image) {
        const cloudinaryPhoto = await cloudinary.uploader.upload(image, {
          folder: 'Patas_Felizes',
          transformation: [{
            width: 500,
            height: 500,
            crop: 'fill',
            gravity: 'auto',
            quality: 'auto',
            fetch_format: 'auto',
          }],
        });

        const post = await Posts.create({
          user_id,
          ong_id,
          title,
          content,
          url: cloudinaryPhoto.secure_url,
          public_id: cloudinaryPhoto.public_id,
        });
        return res.json(post);
      }

      const post = await Posts.create({
        user_id, ong_id, title, content,
      });

      return res.json(post);
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ errors: error.errors.map((e) => e.message) });
      }

      return res.status(400).json(error);
    }
  }

  async show(req, res) {
    try {
      const post = await Posts.findByPk(req.params.id, {
        include: [{
          model: User,
          attributes: ['id', 'name', 'email'],
          as: 'user',
        }, {
          model: Ong,
          attributes: ['id', 'name', 'cnpj'],
          as: 'ong',
        }],
      });

      if (!post) {
        return res.status(404).json({ error: 'A postagem requisitada não existe.' });
      }

      return res.json(post);
    } catch (error) {
      if (error.parent.code === '22P02') {
        return res.status(400).json({ error: 'O ID da postagem informado é inválido.' });
      }

      console.log(error);

      res.status(400).json(error);
    }
  }
}

module.exports = new PostController();
