const express = require("express");
const router = express.Router();
const antreanController = require("../controllers/antreanController");

// Definisi Endpoint Manajemen Antrean
router.get("/", antreanController.getSemuaAntrean);
router.get("/:id", antreanController.getAntreanById);
router.post("/", antreanController.tambahAntrean);
router.put("/:id", antreanController.updateStatusAntrean);
router.delete("/:id", antreanController.hapusAntrean);

module.exports = router;
