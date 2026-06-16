const express = require("express");
const cors = require("cors");
const pool = require("./src/config/db");

const app = express();
const PORT = 5000;

// Konfigurasi Middleware
app.use(cors());
app.use(express.json());

// Registrasi Routes (15 Endpoints)
const menuRoutes = require("./src/routes/menuRoutes");
const karyawanRoutes = require("./src/routes/karyawanRoutes");
const antreanRoutes = require("./src/routes/antreanRoutes");

app.use("/api/menu", menuRoutes);
app.use("/api/karyawan", karyawanRoutes);
app.use("/api/antrean", antreanRoutes);

// Route Default untuk Pengecekan Status Server
app.get("/", (req, res) => {
  res.json({
    pesan: "Server API Teh Tubruk Telu berjalan dengan baik.",
    status: "OK",
  });
});

// Inisialisasi Server
app.listen(PORT, () => {
  console.log(`[SERVER] Berjalan dan mendengarkan pada port ${PORT}`);
});
