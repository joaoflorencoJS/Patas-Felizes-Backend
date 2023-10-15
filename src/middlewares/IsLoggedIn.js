const { verify } = require('jsonwebtoken');
const Ong = require('../models/Ong');
const User = require('../models/User');

class IsLoggedIn {
  #user = null;

  #ong = null;

  verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ errors: 'Login requerido.' });

    const [, token] = authorization.split(' ');

    try {
      const data = verify(token, process.env.TOKEN_SECRET);
      const { id, cnpj = '', email = '' } = data;

      if (cnpj) {
        this.#ong = await Ong.findOne({ where: { id, cnpj } });
      } else if (email) this.#user = await User.findOne({ where: { id, email } });

      if (!cnpj && !email) return res.status(401).json({ errors: 'Usuário inválido.' });

      if (this.#user) {
        req.body.user_id = id;
        req.body.user_email = email;
      }
      if (this.#ong) {
        req.body.ong_id = id;
        req.body.ong_cnpj = cnpj;
      }

      return next();
    } catch (error) {
      return res.status(401).json({ errors: 'Token inválido.' });
    }
  };
}

module.exports = new IsLoggedIn();
