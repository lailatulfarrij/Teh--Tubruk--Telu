const { Pool } = require("pg");

// 1. Konfigurasi Koneksi Database PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "teh-tubruk-telu",
  password: "12345",
  port: 5432,
});

// 2. Fungsi Inisialisasi dan Pembuatan Tabel Otomatis
const buatTabelOtomatis = async () => {
  try {
    await pool.query(`
            -- Membuat Tabel Menu
            CREATE TABLE IF NOT EXISTS menu (
                id SERIAL PRIMARY KEY,
                nama VARCHAR(100) NOT NULL,
                kategori VARCHAR(50),
                harga_r INT,
                harga_j INT,
                tersedia BOOLEAN DEFAULT true
            );

            -- Membuat Tabel Karyawan
            CREATE TABLE IF NOT EXISTS karyawan (
                id SERIAL PRIMARY KEY,
                nama VARCHAR(100) NOT NULL,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                no_hp VARCHAR(20),
                alamat TEXT,
                status VARCHAR(20) DEFAULT 'Aktif'
            );

            -- Membuat Tabel Transaksi/Antrean
            CREATE TABLE IF NOT EXISTS antrean (
                id VARCHAR(20) PRIMARY KEY,
                nama_pemesan VARCHAR(100),
                no_hp VARCHAR(20),
                waktu VARCHAR(50),
                outlet VARCHAR(100),
                kasir VARCHAR(50),
                detail_menu TEXT,
                total INT,
                metode VARCHAR(50),
                status VARCHAR(50) DEFAULT 'Menunggu Diproses'
            );
        `);
    console.log("[DATABASE] Sinkronisasi tabel berhasil dilakukan.");
  } catch (err) {
    console.error("[DATABASE ERROR] Gagal melakukan sinkronisasi tabel:", err.message);
  }
};

buatTabelOtomatis();

module.exports = pool;
