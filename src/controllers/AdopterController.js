const Adopter = require('../models/Adopter');

class AdopterController {
  index(req, res) {
    res.json('Index');
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
