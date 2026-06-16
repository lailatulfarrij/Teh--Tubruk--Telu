const pool = require("../config/db");

const antreanController = {
  // Mengambil seluruh data antrean dari database
  getSemuaAntrean: async (req, res) => {
    try {
      const hasil = await pool.query("SELECT * FROM antrean");
      res.json({ sukses: true, pesan: "Berhasil mengambil semua antrean", data: hasil.rows });
    } catch (error) {
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  },

  // Mengambil detail spesifik antrean berdasarkan ID
  getAntreanById: async (req, res) => {
    try {
      const { id } = req.params;
      const hasil = await pool.query("SELECT * FROM antrean WHERE id = $1", [id]);

      if (hasil.rows.length === 0) {
        return res.status(404).json({ sukses: false, pesan: "Antrean tidak ditemukan" });
      }

      res.json({ sukses: true, pesan: "Berhasil mengambil detail antrean", data: hasil.rows[0] });
    } catch (error) {
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  },

  // Menambahkan data antrean pesanan baru
  tambahAntrean: async (req, res) => {
    try {
      const { id, nama_pemesan, no_hp, waktu, outlet, kasir, detail_menu, total, metode } = req.body;
      const hasil = await pool.query("INSERT INTO antrean (id, nama_pemesan, no_hp, waktu, outlet, kasir, detail_menu, total, metode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [
        id,
        nama_pemesan,
        no_hp,
        waktu,
        outlet,
        kasir,
        detail_menu,
        total,
        metode,
      ]);

      res.json({ sukses: true, pesan: "Pesanan baru berhasil masuk antrean", data: hasil.rows[0] });
    } catch (error) {
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  },

  // Memperbarui status antrean (misalnya: Menunggu -> Selesai)
  updateStatusAntrean: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const hasil = await pool.query("UPDATE antrean SET status = $1 WHERE id = $2 RETURNING *", [status, id]);

      res.json({ sukses: true, pesan: "Status antrean berhasil diperbarui", data: hasil.rows[0] });
    } catch (error) {
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  },

  // Menghapus data antrean dari sistem
  hapusAntrean: async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM antrean WHERE id = $1", [id]);
      res.json({ sukses: true, pesan: "Antrean berhasil dibatalkan/dihapus" });
    } catch (error) {
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  },
};

module.exports = antreanController;
