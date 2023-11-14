const Adopter = require('../models/Adopter');
const Posts = require('../models/Posts');

class AdopterController {
  async index(req, res) {
    try {
      const adopters = await Adopter.findAll({
        order: [['created_at', 'DESC'], ['post', 'created_at', 'DESC']],
        include: {
          model: Posts,
          attributes: ['id', 'title', 'content', 'url', 'public_id', 'ong_id', 'user_id'],
          as: 'post',
        },
      });

      return res.json(adopters);
    } catch (error) {
      console.log(error);
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
}

module.exports = new AdopterController();
