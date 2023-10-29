const { Router } = require('express');
const ongController = require('../controllers/OngController');
const { validaCNPJ } = require('../middlewares/ValidaCNPJ');

const router = Router();

router.get('/', ongController.index);
router.post('/', validaCNPJ, ongController.create);
router.get('/:id', ongController.show);

module.exports = router;
