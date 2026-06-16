const express = require('express');
const router = express.Router();
const karyawanController = require('../controllers/karyawanController');

// Definisi Endpoint Manajemen Karyawan
router.get('/', karyawanController.getSemuaKaryawan);
router.get('/:id', karyawanController.getKaryawanById);
router.post('/', karyawanController.tambahKaryawan);
router.put('/:id', karyawanController.updateKaryawan);
router.delete('/:id', karyawanController.hapusKaryawan);

module.exports = router;