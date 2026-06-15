import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoTubrukTelu from '../../assets/logo.png'; 

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true); 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nama: '',
    no_hp: '',
    role: 'pelanggan', 
    shift: '1',
    outlet: '1'
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.role === 'admin') {
      alert("Berhasil Login sebagai ADMIN - " + (formData.nama || formData.username));
      navigate('/admin'); 
    } else if (formData.role === 'kasir') {
      alert("Berhasil Login sebagai KASIR - " + (formData.nama || formData.username));
      navigate('/kasir'); 
    } else if (formData.role === 'owner') {
      alert("Berhasil Login sebagai OWNER - " + (formData.nama || formData.username));
      navigate('/owner'); 
    } else {
      alert("Login berhasil sebagai Pelanggan! - " + (formData.nama || formData.username || 'Pelanggan'));
      navigate('/pelanggan'); 
    }
  };

  return (
    <div style={styles.container} className="login-container">
      <div style={styles.card} className="login-card">
        <div style={styles.header}>
          {/* Tambahan className="brand-logo" untuk dikontrol di HP */}
          <img src={logoTubrukTelu} alt="Teh Tubruk Telu" style={styles.brandLogo} className="brand-logo" />
          <p style={styles.subtitle}>
            {isLoginMode ? 'Silakan masuk ke akun Anda' : 'Registrasi Pelanggan Baru'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLoginMode && (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Nama Lengkap</label>
                <input type="text" name="nama" value={formData.nama} onChange={handleInputChange} placeholder="Masukkan nama lengkap" style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>No. Handphone</label>
                <input type="text" name="no_hp" value={formData.no_hp} onChange={handleInputChange} placeholder="Contoh: 081234xxxxxx" style={styles.input} />
              </div>
            </>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Masukkan username" style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••" style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Masuk Sebagai (Role)</label>
            <select name="role" value={formData.role} onChange={handleInputChange} style={styles.select}>
              <option value="pelanggan">Pelanggan</option>
              <option value="kasir">Staff Kasir</option>
              <option value="admin">Admin Sistem</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          {formData.role === 'kasir' && (
            <div style={styles.kasirSection}>
              <h4 style={styles.kasirTitle}>💼 Detail Penugasan Kerja Kasir</h4>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Pilih Shift Tugas</label>
                <select name="shift" value={formData.shift} onChange={handleInputChange} style={styles.select}>
                  <option value="1">Shift 1 (Pagi - 14:00)</option>
                  <option value="2">Shift 2 (Siang - 22:00)</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Pilih Outlet Tempat Tugas</label>
                <select name="outlet" value={formData.outlet} onChange={handleInputChange} style={styles.select}>
                  <option value="1">Outlet 1 (Pusat)</option>
                  <option value="2">Outlet 2 (Cabang)</option>
                </select>
              </div>
            </div>
          )}

          <button type="submit" style={styles.btnSubmit}>
            {isLoginMode ? 'Masuk ke Aplikasi' : 'Daftar Akun'}
          </button>

          <div style={styles.toggleMode}>
            <span onClick={() => setIsLoginMode(!isLoginMode)} style={styles.toggleLink}>
              {isLoginMode ? 'Belum punya akun? Daftar di sini' : 'Sudah punya akun? Login di sini'}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#EAD5B2',
    padding: '20px',
    fontFamily: 'sans-serif'
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(76, 50, 36, 0.1)',
    padding: '30px',
    boxSizing: 'border-box'
  },
  header: {
    textAlign: 'center',
    marginBottom: '25px'
  },
  brandLogo: {
    maxWidth: '100%',     
    height: 'auto',       
    maxHeight: '60px',    
    objectFit: 'contain',
    marginBottom: '15px'
  },
  subtitle: {
    margin: 0,
    color: '#4C3224',
    fontSize: '14px',
    fontWeight: '500'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#4C3224',
    textAlign: 'left'
  },
  input: {
    padding: '12px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #8A9A5B',
    color: '#1A1A1A',
    backgroundColor: '#FFFFFF',
    boxSizing: 'border-box',
    width: '100%'
  },
  select: {
    padding: '12px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #8A9A5B',
    color: '#1A1A1A',
    backgroundColor: '#FFFFFF',
    boxSizing: 'border-box',
    width: '100%',
    cursor: 'pointer'
  },
  kasirSection: {
    backgroundColor: '#FDFBF7',
    padding: '15px',
    borderRadius: '8px',
    border: '1px dashed #8A9A5B',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '5px'
  },
  kasirTitle: {
    margin: '0 0 5px 0',
    fontSize: '14px',
    color: '#3B5D14',
    fontWeight: 'bold',
    textAlign: 'left'
  },
  btnSubmit: {
    marginTop: '10px',
    padding: '14px',
    backgroundColor: '#3B5D14',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.2s'
  },
  toggleMode: {
    textAlign: 'center',
    marginTop: '10px'
  },
  toggleLink: {
    fontSize: '13px',
    color: '#3B5D14',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontWeight: 'bold'
  }
};

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    @media (max-width: 480px) {
      .login-card {
        padding: 20px !important;
      }
      .brand-logo {
        max-height: 45px !important; /* Mengecilkan logo sedikit di layar HP */
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Login;