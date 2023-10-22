const { sign } = require('jsonwebtoken');
const { default: isEmail } = require('validator/lib/isEmail');
const Ong = require('../models/Ong');
const User = require('../models/User');

class TokenController {
  constructor() {
    this.errors = [];
    this.cnpj = '';
    this.email = '';
    this.password = '';
  }

  store = async (req, res) => {
    const { cnpj = '', email = '', password = '' } = req.body;

    this.cnpj = String(cnpj);
    this.cnpj = this.cnpj.replace(/[^\d]+/g, '');
    this.email = email;
    this.password = password;

    this.#validate();

    if (this.errors.length > 0) {
      res.status(400).json({ errors: this.errors });
      this.errors = [];
      return;
    }

    if (this.cnpj) {
      await this.#takeTokenOng(res);
    } else {
      await this.#takeTokenUser(res);
    }
  };

  async #takeTokenOng(res) {
    const ong = await Ong.findOne({ where: { cnpj: this.cnpj } });

    if (!ong) {
      this.errors.push('Credenciais inválidas.');
      res.status(400).json({ errors: this.errors });
      this.errors = [];
      return;
    }

    if (!(await ong.passwordIsValid(this.password))) {
      this.errors.push('Credenciais inválidas.');
      res.status(400).json({ errors: this.errors });
      this.errors = [];
      return;
    }

    const { id } = ong;

    const token = sign(
      { id, cnpj: this.cnpj },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );

    return res.json({ token, ong: { id, name: ong.name, cnpj: this.cnpj } });
  }

  async #takeTokenUser(res) {
    const user = await User.findOne({ where: { email: this.email } });

    if (!user) {
      this.errors.push('Credenciais inválidas.');
      res.status(400).json({ errors: this.errors });
      this.errors = [];
      return;
    }

    if (!(await user.passwordIsValid(this.password))) {
      this.errors.push('Credenciais inválidas.');
      res.status(400).json({ errors: this.errors });
      this.errors = [];
      return;
    }

    const { id } = user;

    const token = sign(
      { id, email: this.email },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );

    return res.json({ token, user: { id, name: user.name, email: this.email } });
  }

  #validate() {
    if ((!this.cnpj && !this.email) || !this.password) this.errors.push('Insira uma forma de login para prosseguir.');

    if (this.cnpj && this.email) this.errors.push('Insira apenas uma forma de login.');

    if (this.cnpj && this.cnpj.length !== 14) this.errors.push('Insira um CNPJ válido.');

    if (this.email && !isEmail(this.email)) this.errors.push('Insira um e-mail válido.');
  }
}

module.exports = new TokenController();
