// const multer = require('multer');
const multer = require('multer');
const Posts = require('../models/Posts');
const multerConfig = require('../config/multerConfig');
const cloudinary = require('../config/cloudinaryConfig');

const multerBufferUpload = multer(multerConfig).single('photo');

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
    return multerBufferUpload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: [err.code] });
      }

      const { title, content } = req.body;

      if (!title || !content) return res.status(400).json({ errors: 'O campo título e conteúdo da postagem são obrigatórios.' });

      try {
        if (req.file) {
          // console.log(req.body);
          const { mimetype, buffer } = req.file;
          const photoLink = `data:${mimetype};base64,${buffer.toString('base64')}`;

          const cloudinaryPhoto = await cloudinary.uploader.upload(photoLink, {
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
    });
  }
}

module.exports = new PostController();
