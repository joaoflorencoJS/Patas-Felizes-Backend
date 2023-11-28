const { Router } = require('express');
const adopterController = require('../controllers/AdopterController');
const { verifyLogin } = require('../middlewares/IsLoggedIn');

const router = new Router();

router.get('/user/:id', verifyLogin, adopterController.index);
router.get('/ong/:id', verifyLogin, adopterController.index);
router.post('/', verifyLogin, adopterController.create);
router.get('/:id', verifyLogin, adopterController.show);
router.delete('/:id', verifyLogin, adopterController.delete);

module.exports = router;
