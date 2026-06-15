import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import logoTubrukTelu from '../../assets/logo.png';

const INITIAL_MENU = [
  { id: 1, nama: 'Jasmine Tea', kategori: 'TEH TUBRUK', hargaR: 2500, hargaJ: 4000, tersedia: true },
  { id: 2, nama: 'Leechy Tea', kategori: 'TEH TUBRUK', hargaR: 5000, hargaJ: 8000, tersedia: true },
  { id: 3, nama: 'Kopi Tubruk Hitam', kategori: 'KOPI', hargaR: 5000, hargaJ: null, tersedia: true },
];

const INITIAL_OUTLET = [
  { id: 1, nama: 'Outlet Pusat Pasuruan', lokasi: 'Jl. Raya Grati No. 12' },
  { id: 2, nama: 'Outlet Alun-Alun', lokasi: 'Stand Kuliner Blok C3' },
];

const INITIAL_KARYAWAN = [
  { id: 1, nama: 'Arul', username: 'arull123', noHp: '08123456789', alamat: 'Pasuruan', status: 'Aktif' },
  { id: 2, nama: 'Andi', username: 'andi123', noHp: '08571122334', alamat: 'Grati', status: 'Aktif' },
];

function Admin() {
  const navigate = useNavigate(); 
  
  // State Navigasi
  const [activeTab, setActiveTab] = useState('menu'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State Burger Menu

  // State Data
  const [daftarMenu, setDaftarMenu] = useState(INITIAL_MENU);
  const [daftarOutlet, setDaftarOutlet] = useState(INITIAL_OUTLET);
  const [daftarKaryawan, setDaftarKaryawan] = useState(INITIAL_KARYAWAN);
  const [formMenu, setFormMenu] = useState({ nama: '', kategori: 'TEH TUBRUK', hargaR: '', hargaJ: '' });
  const [formOutlet, setFormOutlet] = useState({ nama: '', lokasi: '' });
  const [formKaryawan, setFormKaryawan] = useState({ nama: '', username: '', password: '', noHp: '', alamat: '' });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); // Tutup sidebar setelah menu dipilih di HP
  };

  const handleAddMenu = (e) => { 
    e.preventDefault(); 
    if (!formMenu.nama || !formMenu.hargaR) return alert('Nama dan Harga Regular wajib diisi!'); 
    setDaftarMenu([...daftarMenu, { id: Date.now(), ...formMenu, tersedia: true }]); 
    setFormMenu({ nama: '', kategori: 'TEH TUBRUK', hargaR: '', hargaJ: '' }); 
  };
  
  const handleAddOutlet = (e) => { 
    e.preventDefault(); 
    if (!formOutlet.nama) return alert('Nama outlet wajib diisi!'); 
    setDaftarOutlet([...daftarOutlet, { id: Date.now(), ...formOutlet }]); 
    setFormOutlet({ nama: '', lokasi: '' }); 
  };
  
  const handleAddKaryawan = (e) => { 
    e.preventDefault(); 
    if (!formKaryawan.nama || !formKaryawan.username || !formKaryawan.password) return alert('Nama, Username, dan Password wajib diisi!'); 
    setDaftarKaryawan([...daftarKaryawan, { id: Date.now(), ...formKaryawan, status: 'Aktif' }]); 
    setFormKaryawan({ nama: '', username: '', password: '', noHp: '', alamat: '' }); 
  };
  
  const toggleStatusKaryawan = (id) => { 
    setDaftarKaryawan(daftarKaryawan.map(k => k.id === id ? { ...k, status: k.status === 'Aktif' ? 'Resign / Nonaktif' : 'Aktif' } : k )); 
  };

  return (
    <div style={styles.container}>
      <header style={styles.header} className="header-container">
        <div style={styles.logoArea}>
          <button 
            className="mobile-burger" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <img src={logoTubrukTelu} alt="Logo" style={styles.brandLogo} className="brand-logo" />
          <span style={styles.badgeAdmin} className="hide-on-mobile">Mode Admin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }} className="header-right">
          <div style={styles.userInfo}>Halo, Super Admin 👋</div>
          <button onClick={() => { if (window.confirm("Keluar dari dashboard Admin?")) navigate('/login'); }} style={styles.btnLogout}>Keluar</button>
        </div>
      </header>

      <div style={styles.workspace}>
        <aside style={styles.sidebar} className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
          <p style={styles.sidebarTitle}>MENU UTAMA</p>
          <button onClick={() => handleTabChange('menu')} style={{...styles.sideBtn, ...(activeTab === 'menu' ? styles.sideBtnActive : {})}}>Manajemen Menu & Harga</button>
          <button onClick={() => handleTabChange('outlet')} style={{...styles.sideBtn, ...(activeTab === 'outlet' ? styles.sideBtnActive : {})}}>Manajemen Outlet</button>
          <button onClick={() => handleTabChange('karyawan')} style={{...styles.sideBtn, ...(activeTab === 'karyawan' ? styles.sideBtnActive : {})}}>Manajemen Karyawan</button>
        </aside>

        <main style={styles.content}>
          {activeTab === 'menu' && (
            <div style={styles.rowGrid} className="rowGrid">
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>➕ Tambah Produk Baru</h3>
                <form onSubmit={handleAddMenu} style={styles.form}>
                  <label style={styles.inputLabel}>Nama Varian Minuman/Makanan</label>
                  <input type="text" placeholder="Contoh: Jasmine Milk Tea" value={formMenu.nama} onChange={e => setFormMenu({...formMenu, nama: e.target.value})} style={styles.inputBox} />
                  <label style={styles.inputLabel}>Kategori Menu</label>
                  <select value={formMenu.kategori} onChange={e => setFormMenu({...formMenu, kategori: e.target.value})} style={styles.inputBox}>
                    <option value="TEH TUBRUK">TEH TUBRUK</option>
                    <option value="TEH TUBRUK (CREAMY)">TEH TUBRUK (CREAMY)</option>
                    <option value="KOPI">KOPI</option>
                    <option value="CHOCOLATE & SWEETS">CHOCOLATE & SWEETS</option>
                  </select>
                  <label style={styles.inputLabel}>Harga Regular (Rp)</label>
                  <input type="number" placeholder="5000" value={formMenu.hargaR} onChange={e => setFormMenu({...formMenu, hargaR: e.target.value})} style={styles.inputBox} />
                  <label style={styles.inputLabel}>Harga Jumbo (Rp) <span style={{fontSize:'11px', color:'#777'}}>(Opsional)</span></label>
                  <input type="number" placeholder="8000" value={formMenu.hargaJ} onChange={e => setFormMenu({...formMenu, hargaJ: e.target.value})} style={styles.inputBox} />
                  <button type="submit" style={styles.btnSave}>Tambahkan ke Menu</button>
                </form>
              </div>

              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Daftar Menu Aktif di Outlet</h3>
                <div className="table-responsive">
                  <table style={styles.table}>
                    <thead><tr><th>Nama Produk</th><th>Kategori</th><th>Regular</th><th>Jumbo</th></tr></thead>
                    <tbody>
                      {daftarMenu.map(menu => (
                        <tr key={menu.id}>
                          <td style={{ color: '#4C3224' }}><strong>{menu.nama}</strong></td>
                          <td><span style={styles.badgeCategory}>{menu.kategori}</span></td>
                          <td style={{ fontWeight: 'bold' }}>Rp {menu.hargaR}</td>
                          <td style={{ fontWeight: 'bold' }}>{menu.hargaJ ? `Rp ${menu.hargaJ}` : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'outlet' && (
            <div style={styles.rowGrid} className="rowGrid">
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>➕ Tambah Outlet Baru</h3>
                <form onSubmit={handleAddOutlet} style={styles.form}>
                  <label style={styles.inputLabel}>Nama Cabang Outlet</label>
                  <input type="text" placeholder="Contoh: Outlet Bangil" value={formOutlet.nama} onChange={e => setFormOutlet({...formOutlet, nama: e.target.value})} style={styles.inputBox} />
                  <label style={styles.inputLabel}>Alamat / Lokasi Detail</label>
                  <textarea placeholder="Jl. Diponegoro No. 45, Samping Alfamart" value={formOutlet.lokasi} onChange={e => setFormOutlet({...formOutlet, lokasi: e.target.value})} style={{...styles.textarea, ...styles.inputBox}}></textarea>
                  <button type="submit" style={styles.btnSave}>Daftarkan Cabang</button>
                </form>
              </div>

              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Daftar Jaringan Jualan Outlet</h3>
                <div className="table-responsive">
                  <table style={styles.table}>
                    <thead><tr><th>ID</th><th>Nama Outlet</th><th>Alamat Lokasi</th><th>Aksi</th></tr></thead>
                    <tbody>
                      {daftarOutlet.map(out => (
                        <tr key={out.id}>
                          <td>#{out.id.toString().slice(-3)}</td>
                          <td style={{ color: '#4C3224' }}><strong>{out.nama}</strong></td>
                          <td>{out.lokasi || '-'}</td>
                          <td><button onClick={() => setDaftarOutlet(daftarOutlet.filter(o => o.id !== out.id))} style={styles.btnDelete}>Hapus</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'karyawan' && (
            <div style={styles.rowGrid} className="rowGrid">
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>➕ Pembuatan Akun Staff Karyawan Baru</h3>
                <form onSubmit={handleAddKaryawan} style={styles.form}>
                  <label style={styles.inputLabel}>Nama Lengkap</label>
                  <input type="text" placeholder="Masukkan nama asli" value={formKaryawan.nama} onChange={e => setFormKaryawan({...formKaryawan, nama: e.target.value})} style={styles.inputBox} />
                  <label style={styles.inputLabel}>Nomor HP / WhatsApp</label>
                  <input type="text" placeholder="0812xxxx" value={formKaryawan.noHp} onChange={e => setFormKaryawan({...formKaryawan, noHp: e.target.value})} style={styles.inputBox} />
                  <label style={styles.inputLabel}>Alamat Rumah Karyawan</label>
                  <input type="text" placeholder="Kec. Grati, Pasuruan" value={formKaryawan.alamat} onChange={e => setFormKaryawan({...formKaryawan, alamat: e.target.value})} style={styles.inputBox} />
                  <hr style={{margin: '15px 0', border: '0.5px dashed #8A9A5B'}} />
                  <label style={styles.inputLabel}>Username <span style={{color:'#e74c3c'}}>* Untuk Login</span></label>
                  <input type="text" placeholder="buat_username_unik" value={formKaryawan.username} onChange={e => setFormKaryawan({...formKaryawan, username: e.target.value})} style={styles.inputBox} />
                  <label style={styles.inputLabel}>Password <span style={{color:'#e74c3c'}}>* Untuk Login</span></label>
                  <input type="password" placeholder="••••••••" value={formKaryawan.password} onChange={e => setFormKaryawan({...formKaryawan, password: e.target.value})} style={styles.inputBox} />
                  <button type="submit" style={styles.btnSave}>Daftarkan Karyawan Baru</button>
                </form>
              </div>

              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Manajemen Status Akun Karyawan</h3>
                <div className="table-responsive">
                  <table style={styles.table}>
                    <thead><tr><th>Nama / Kontak</th><th>Username</th><th>Alamat</th><th>Status Kerja</th><th>Kontrol Akses</th></tr></thead>
                    <tbody>
                      {daftarKaryawan.map(kar => (
                        <tr key={kar.id}>
                          <td><strong style={{ color: '#4C3224' }}>{kar.nama}</strong><br /><span style={{fontSize: '12px', color: '#8A9A5B'}}>{kar.noHp || '-'}</span></td>
                          <td><code>{kar.username}</code></td>
                          <td>{kar.alamat || '-'}</td>
                          <td><span style={{ ...styles.badgeStatus, backgroundColor: kar.status === 'Aktif' ? '#8A9A5B' : '#4C3224', color: '#FFFFFF' }}>{kar.status}</span></td>
                          <td><button onClick={() => toggleStatusKaryawan(kar.id)} style={{ ...styles.btnToggle, backgroundColor: kar.status === 'Aktif' ? '#e74c3c' : '#3B5D14' }}>{kar.status === 'Aktif' ? 'Nonaktifkan (Resign)' : 'Aktifkan Kembali'}</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// STYLING MANAGEMENT
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    fontFamily: 'sans-serif',
    backgroundColor: '#EAD5B2',
    color: '#1A1A1A'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 30px',
    backgroundColor: '#FFFFFF',
    borderBottom: '2px solid #8A9A5B',
    boxShadow: '0 2px 4px rgba(76,50,36,0.05)',
    position: 'relative'
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  brandLogo: {
    height: '40px',
    width: 'auto',
    objectFit: 'contain'
  }, 
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#3B5D14',
    margin: 0
  },
  badgeAdmin: {
    backgroundColor: '#8A9A5B',
    color: '#FFFFFF',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 'bold'
  },
  userInfo: {
    fontWeight: 'bold',
    color: '#4C3224'
  },
  workspace: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#FFFFFF',
    borderRight: '2px solid #8A9A5B',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  sidebarTitle: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#8A9A5B',
    letterSpacing: '1px',
    marginBottom: '10px',
    paddingLeft: '10px'
  },
  sideBtn: {
    border: 'none',
    backgroundColor: 'transparent',
    textAlign: 'left',
    padding: '12px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#4C3224',
    fontSize: '13px',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  sideBtnActive: {
    backgroundColor: '#8A9A5B',
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    padding: '25px',
    overflowY: 'auto'
  },
  rowGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: '25px',
    alignItems: 'start'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(76,50,36,0.05)',
    border: '1px solid #8A9A5B'
  },
  cardTitle: {
    margin: '0 0 20px 0',
    fontSize: '16px',
    color: '#4C3224',
    borderBottom: '2px solid #EAD5B2',
    paddingBottom: '10px',
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  inputLabel: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#4C3224'
  },
  inputBox: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #8A9A5B',
    fontSize: '14px',
    marginBottom: '8px',
    outline: 'none'
  },
  textarea: {
    fontFamily: 'sans-serif',
    resize: 'none',
    height: '60px'
  },
  btnSave: {
    backgroundColor: '#3B5D14',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  badgeCategory: {
    backgroundColor: '#8A9A5B',
    color: '#FFFFFF',
    padding: '3px 6px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold'
  },
  badgeStatus: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 'bold'
  },
  btnDelete: {
    backgroundColor: '#4C3224',
    color: '#FFFFFF',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  btnToggle: {
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  btnLogout: {
    backgroundColor: '#4C3224',
    color: '#FFFFFF',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '13px',
    transition: '0.2s'
  }
};

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    form input, form select { padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 14px; margin-bottom: 8px; }
    form label { font-size: 13px; font-weight: 600; color: #555; }
    table th, table td { padding: 12px; border-bottom: 1px solid #EAD5B2; font-size: 14px; }
    table th { color: #4C3224; font-weight: bold; background-color: #FFFFFF; }
    
    /* Responsive Mobile UI */
    .mobile-burger { display: none; background: none; border: none; font-size: 24px; cursor: pointer; color: #4C3224; padding: 5px; }
    .sidebar-container { transition: 0.3s ease-in-out; }
    .table-responsive { overflow-x: auto; width: 100%; }

    @media (max-width: 768px) {
      .header-container { padding: 15px !important; flex-wrap: wrap; }
      .mobile-burger { display: block; }
      .sidebar-container { position: absolute; left: -100%; top: 70px; bottom: 0; z-index: 50; box-shadow: 2px 0 10px rgba(0,0,0,0.1); width: 250px; }
      .sidebar-container.open { left: 0; }
      .hide-on-mobile { display: none !important; }
      .brand-logo { height: 30px !important; }
      .header-right { flex-direction: column; align-items: flex-end; gap: 5px; }
      .rowGrid { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Admin;