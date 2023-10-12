const User = require('../models/User');

class UserController {
  index = async (req, res) => {
    try {
      const users = await User.findAll();

      res.json(users);
    } catch (error) {
      return res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  };

  store = async (req, res) => {
    try {
      const user = await User.create(req.body);

      res.json(user);
    } catch (error) {
      return res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  };
}

module.exports = new UserController();
