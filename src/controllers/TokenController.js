const { sign } = require('jsonwebtoken');
const User = require('../models/User');

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({ errors: ['Credenciais inválidas.'] });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ errors: ['Credenciais inválidas.'] });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(400).json({ errors: ['Credenciais inválidas.'] });
    }

    const { id } = user;

    const token = sign(
      { id, email },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );

    return res.json({ token });
  }
}

module.exports = new TokenController();
