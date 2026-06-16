const pool = require("../config/db");

const karyawanController = {
  // Mengambil seluruh data karyawan
  getSemuaKaryawan: async (req, res) => {
    try {
      const hasil = await pool.query("SELECT * FROM karyawan ORDER BY id ASC");
      res.json({ sukses: true, pesan: "Berhasil mengambil semua karyawan", data: hasil.rows });
    } catch (error) {
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  },

  // Mengambil data spesifik karyawan berdasarkan ID
  getKaryawanById: async (req, res) => {
    try {
      const { id } = req.params;
      const hasil = await pool.query("SELECT * FROM karyawan WHERE id = $1", [id]);

      if (hasil.rows.length === 0) {
        return res.status(404).json({ sukses: false, pesan: "Karyawan tidak ditemukan" });
      }

      res.json({ sukses: true, pesan: "Berhasil mengambil detail karyawan", data: hasil.rows[0] });
    } catch (error) {
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  },

  // Mendaftarkan akun karyawan baru
  tambahKaryawan: async (req, res) => {
    try {
      const { nama, username, password, no_hp, alamat } = req.body;
      const hasil = await pool.query("INSERT INTO karyawan (nama, username, password, no_hp, alamat) VALUES ($1, $2, $3, $4, $5) RETURNING *", [nama, username, password, no_hp, alamat]);

      res.json({ sukses: true, pesan: "Karyawan baru berhasil ditambahkan", data: hasil.rows[0] });
    } catch (error) {
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  },

  // Memperbarui informasi profil karyawan
  updateKaryawan: async (req, res) => {
    try {
      const { id } = req.params;
      const { nama, username, no_hp, alamat, status } = req.body;
      const hasil = await pool.query("UPDATE karyawan SET nama = $1, username = $2, no_hp = $3, alamat = $4, status = $5 WHERE id = $6 RETURNING *", [nama, username, no_hp, alamat, status, id]);

      res.json({ sukses: true, pesan: "Data karyawan berhasil diperbarui", data: hasil.rows[0] });
    } catch (error) {
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  },

  // Menghapus akun karyawan dari sistem
  hapusKaryawan: async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM karyawan WHERE id = $1", [id]);
      res.json({ sukses: true, pesan: "Karyawan berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  },
};

module.exports = karyawanController;
