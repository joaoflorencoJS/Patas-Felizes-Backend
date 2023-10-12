const User = require('../models/User');

class UserController {
  index = async (req, res) => {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });

      res.json(users);
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
}

module.exports = new UserController();
