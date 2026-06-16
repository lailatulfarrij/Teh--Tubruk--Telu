const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Definisi Endpoint Manajemen Menu
router.get('/', menuController.getSemuaMenu);
router.get('/:id', menuController.getMenuById);
router.post('/', menuController.tambahMenu);
router.put('/:id', menuController.updateMenu);
router.delete('/:id', menuController.hapusMenu);

module.exports = router;