const { Router } = require('express');
const postController = require('../controllers/PostController');
const { verifyLogin } = require('../middlewares/IsLoggedIn');

const router = new Router();

router.get('/', verifyLogin, postController.index);
router.post('/', verifyLogin, postController.store);
router.get('/:id', verifyLogin, postController.show);
router.delete('/:id', verifyLogin, postController.delete);

module.exports = router;
