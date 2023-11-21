const { Router } = require('express');
const ongController = require('../controllers/OngController');
const { validaCNPJ } = require('../middlewares/ValidaCNPJ');
const { verifyLogin } = require('../middlewares/IsLoggedIn');

const router = Router();

router.get('/', ongController.index);
router.post('/', validaCNPJ, ongController.create);
router.get('/:id', verifyLogin, ongController.show);
router.put('/:id', verifyLogin, ongController.update);

module.exports = router;
