import React from 'react';
import logoTubrukTelu from '../assets/logo.png'; 

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navLeft}>
        <img 
          src={logoTubrukTelu} 
          alt="Logo Teh Tubruk Telu" 
          style={styles.brandLogo} 
        />
        <span style={styles.badgeKasir}>Mode Kasir</span>
      </div>

      <div style={styles.navRight}>
        <span style={styles.operatorText}>Halo, Operator 👏</span>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
    backgroundColor: '#FFFFFF', // Putih murni
    padding: '0 20px',
    borderBottom: '2px solid #8A9A5B', // Aksen Matcha Terang
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  brandLogo: {
    height: '35px',       
    width: 'auto',       
    objectFit: 'contain',
  },
  badgeKasir: {
    backgroundColor: '#8A9A5B', // Matcha Terang
    color: '#FFFFFF',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
  },
  operatorText: {
    color: '#4C3224', // Cokelat Tua
    fontSize: '14px',
    fontWeight: 'bold',
  },
};

export default Navbar;