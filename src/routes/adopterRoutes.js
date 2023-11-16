const { Router } = require('express');
const adopterController = require('../controllers/AdopterController');
const { verifyLogin } = require('../middlewares/IsLoggedIn');

const router = new Router();

router.get('/user/:id', adopterController.index);
router.get('/ong/:id', adopterController.index);
router.post('/', verifyLogin, adopterController.create);
router.get('/:id', adopterController.show);

module.exports = router;
