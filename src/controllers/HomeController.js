class HomeController {
  index(req, res) {
    res.json('Index');
  }
}

module.exports = new HomeController();
