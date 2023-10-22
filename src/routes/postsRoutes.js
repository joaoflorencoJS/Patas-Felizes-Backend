const { Router } = require('express');
const postController = require('../controllers/PostController');
const { verifyLogin } = require('../middlewares/IsLoggedIn');

const router = new Router();

router.get('/', postController.index);
router.post('/', verifyLogin, postController.store);
router.get('/:id', postController.show);

module.exports = router;
