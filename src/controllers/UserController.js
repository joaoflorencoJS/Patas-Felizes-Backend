const User = require('../models/User');

class UserController {
  index = async (req, res) => {
    try {
      const users = await User.findAll();

      res.json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  store = async (req, res) => {
    try {
      const user = await User.create(req.body);

      res.json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new UserController();
