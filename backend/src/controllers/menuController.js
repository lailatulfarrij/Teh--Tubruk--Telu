const pool = require("../config/db");

const menuController = {
  // Mengambil katalog seluruh menu
  getSemuaMenu: async (req, res) => {
    try {
      const hasil = await pool.query("SELECT * FROM menu ORDER BY id ASC");
      res.json({ sukses: true, pesan: "Berhasil mengambil semua menu", data: hasil.rows });
    } catch (error) {
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  },

  // Mengambil detail satu menu berdasarkan ID
  getMenuById: async (req, res) => {
    try {
      const { id } = req.params;
      const hasil = await pool.query("SELECT * FROM menu WHERE id = $1", [id]);

      if (hasil.rows.length === 0) {
        return res.status(404).json({ sukses: false, pesan: "Menu tidak ditemukan" });
      }

      res.json({ sukses: true, pesan: "Berhasil mengambil detail menu", data: hasil.rows[0] });
    } catch (error) {
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  },

  // Menambahkan varian menu baru ke katalog
  tambahMenu: async (req, res) => {
    try {
      const { nama, kategori, harga_r, harga_j } = req.body;
      const hasil = await pool.query("INSERT INTO menu (nama, kategori, harga_r, harga_j) VALUES ($1, $2, $3, $4) RETURNING *", [nama, kategori, harga_r, harga_j || null]);

      res.json({ sukses: true, pesan: "Menu baru berhasil ditambahkan", data: hasil.rows[0] });
    } catch (error) {
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  },

  // Memperbarui rincian data menu (nama, harga, ketersediaan)
  updateMenu: async (req, res) => {
    try {
      const { id } = req.params;
      const { nama, kategori, harga_r, harga_j, tersedia } = req.body;
      const hasil = await pool.query("UPDATE menu SET nama = $1, kategori = $2, harga_r = $3, harga_j = $4, tersedia = $5 WHERE id = $6 RETURNING *", [nama, kategori, harga_r, harga_j || null, tersedia, id]);

      res.json({ sukses: true, pesan: "Menu berhasil diperbarui", data: hasil.rows[0] });
    } catch (error) {
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  },

  // Menghapus data menu dari katalog
  hapusMenu: async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM menu WHERE id = $1", [id]);
      res.json({ sukses: true, pesan: "Menu berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  },
};

module.exports = menuController;
