const { Router } = require('express');
const adopterController = require('../controllers/AdopterController');
const { verifyLogin } = require('../middlewares/IsLoggedIn');

const router = new Router();

router.get('/', adopterController.index);
router.post('/', verifyLogin, adopterController.create);

module.exports = router;