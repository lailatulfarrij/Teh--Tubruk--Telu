import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logoTubrukTelu from '../../assets/logo.png';
import qrisGambarAsli from '../../assets/qris.png';
import imgTehTubruk from '../../assets/teh_tubruk.png';
import imgKopi from '../../assets/kopi.png';
import imgCreamy from '../../assets/teh_creamy.png';
import imgPermenKaret from '../../assets/permen_karet.png';
import imgChocolate from '../../assets/chocolate.png';

const ACTIVE_OUTLETS = [
  { id: 1, nama: 'Outlet Pusat Pasuruan', lokasi: 'Jl. Raya Grati No. 12, Pasuruan', jamBuka: '09:00 - 22:00', status: 'Buka' },
  { id: 2, nama: 'Outlet Alun-Alun', lokasi: 'Stand Kuliner Blok C3, Pasuruan', jamBuka: '10:00 - 23:00', status: 'Buka' }
];

const MASTER_MENU = [
  { id: 1, nama: 'Jasmine Tea', kategori: 'Teh Tubruk', gambar: imgTehTubruk, hasSize: true, hargaR: 2500, hargaJ: 4000 },
  { id: 2, nama: 'Leechy Tea', kategori: 'Teh Tubruk', gambar: imgTehTubruk, hasSize: true, hargaR: 5000, hargaJ: 8000 },
  { id: 3, nama: 'Mango Tea', kategori: 'Teh Tubruk', gambar: imgTehTubruk, hasSize: true, hargaR: 4000, hargaJ: 7000 },
  { id: 4, nama: 'Blackcurrant Tea', kategori: 'Teh Tubruk', gambar: imgTehTubruk, hasSize: true, hargaR: 4000, hargaJ: 7000 },
  { id: 5, nama: 'Apple Tea', kategori: 'Teh Tubruk', gambar: imgTehTubruk, hasSize: true, hargaR: 4000, hargaJ: 7000 },
  { id: 6, nama: 'Lemon Tea (Powder)', kategori: 'Teh Tubruk', gambar: imgTehTubruk, hasSize: true, hargaR: 4000, hargaJ: 7000 },
  { id: 7, nama: 'Kopi Turing Hitam (KTH)', kategori: 'Kopi', gambar: imgKopi, hasSize: false, hargaR: 5000 },
  { id: 8, nama: 'Kopi Turing Susu (KTS)', kategori: 'Kopi', gambar: imgKopi, hasSize: false, hargaR: 8000 },
  { id: 9, nama: 'Kopi Turing Coklat (KTC)', kategori: 'Kopi', gambar: imgKopi, hasSize: false, hargaR: 9000 },
  { id: 10, nama: 'Kopi Turing Klepon (KTK)', kategori: 'Kopi', gambar: imgKopi, hasSize: false, hargaR: 9000 },
  { id: 11, nama: 'Americano (No Sugar)', kategori: 'Kopi', gambar: imgKopi, hasSize: false, hargaR: 4000 },
  { id: 12, nama: 'Berrycano', kategori: 'Kopi', gambar: imgKopi, hasSize: false, hargaR: 5000 },
  { id: 13, nama: 'Cappuccino (Powder)', kategori: 'Kopi', gambar: imgKopi, hasSize: false, hargaR: 5000 },
  { id: 14, nama: 'Teh Tarik', kategori: 'Teh Creamy', gambar: imgCreamy, hasSize: false, hargaR: 7000 },
  { id: 15, nama: 'Jasmine Milk Tea', kategori: 'Teh Creamy', gambar: imgCreamy, hasSize: false, hargaR: 7000 },
  { id: 16, nama: 'Green Tea', kategori: 'Teh Creamy', gambar: imgCreamy, hasSize: false, hargaR: 8000 },
  { id: 17, nama: 'Thai Tea', kategori: 'Teh Creamy', gambar: imgCreamy, hasSize: false, hargaR: 8000 },
  { id: 18, nama: 'Es Permen Karet Pink', kategori: 'Permen Karet', gambar: imgPermenKaret, hasSize: false, hargaR: 5000 },
  { id: 19, nama: 'Es Permen Karet Biru', kategori: 'Permen Karet', gambar: imgPermenKaret, hasSize: false, hargaR: 5000 },
  { id: 20, nama: 'Es Permen Karet Mix', kategori: 'Permen Karet', gambar: imgPermenKaret, hasSize: false, hargaR: 5000 },
  { id: 21, nama: 'Dark Chocolate', kategori: 'Chocolate & Sweets', gambar: imgChocolate, hasSize: false, hargaR: 6000 },
  { id: 22, nama: 'Milo', kategori: 'Chocolate & Sweets', gambar: imgChocolate, hasSize: false, hargaR: 6000 },
  { id: 23, nama: 'Chocomilo Dino', kategori: 'Chocolate & Sweets', gambar: imgChocolate, hasSize: false, hargaR: 7000 },
  { id: 24, nama: 'Black Oreo', kategori: 'Chocolate & Sweets', gambar: imgChocolate, hasSize: false, hargaR: 8000 }
];

const TRACKING_STEPS = [
  'Menunggu Diproses', 'Diproses', 'Sedang Dibuat', 'Siap Diambil', 'Selesai'
];

function Pelanggan() {
  const navigate = useNavigate();

  const [showWelcomePopup, setShowWelcomePopup] = useState(true);

  const [selectedOutlet, setSelectedOutlet] = useState(ACTIVE_OUTLETS[0]);
  const [cart, setCart] = useState([]);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null); 
  
  const [userData] = useState({
    nama: 'Pelanggan Online',
    noHp: '0812xxxxxx'
  });

  useEffect(() => {
    let interval;
    if (currentOrder && currentOrder.status !== 'Selesai') {
      interval = setInterval(() => {
        const simulatedOrder = JSON.parse(localStorage.getItem('onlineOrderSimulatedStatus'));
        if (simulatedOrder && simulatedOrder.id === currentOrder.orderId && simulatedOrder.status !== currentOrder.status) {
           setCurrentOrder(prev => ({ ...prev, status: simulatedOrder.status }));
        }
      }, 2000); 
    }
    return () => clearInterval(interval);
  }, [currentOrder]);

  const categoriesToRender = [...new Set(MASTER_MENU.map(item => item.kategori))];

  const addToCart = (product, size, harga) => {
    let displayName = product.hasSize ? `${product.nama} (${size === 'Jumbo' ? 'Jumbo' : 'R'})` : product.nama;
    const cartItemId = `${product.nama}-${size}`;
    const existing = cart.find(item => item.id === cartItemId);

    if (existing) {
      setCart(cart.map(item => item.id === cartItemId ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { id: cartItemId, nama: displayName, baseName: product.nama, size, harga, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem.qty === 1) setCart(cart.filter((item) => item.id !== id));
    else setCart(cart.map((item) => item.id === id ? { ...item, qty: item.qty - 1 } : item));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);

  const handleConfirmPayment = () => {
    const orderId = `TTT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = { 
      orderId, 
      date: new Date().toLocaleString('id-ID'), 
      outlet: selectedOutlet.nama, 
      items: [...cart], 
      total: cartTotal,
      namaPemesan: userData.nama,
      noHp: userData.noHp,
      status: 'Menunggu Diproses' 
    };
    
    localStorage.setItem('onlineOrderSimulatedStatus', JSON.stringify({
       id: orderId, namaPemesan: userData.nama, noHp: userData.noHp, items: [...cart], total: cartTotal, status: 'Menunggu Diproses', waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), metode: 'QRIS Digital'
    }));

    setCurrentOrder(newOrder);
    setCheckoutModal(false);
    setCart([]);
  };

  const handleResetOrder = () => {
    setCurrentOrder(null);
    localStorage.removeItem('onlineOrderSimulatedStatus');
  };

  const currentStatusIndex = currentOrder ? TRACKING_STEPS.indexOf(currentOrder.status) : 0;

  return (
    <div style={styles.appContainer} className="pelanggan-container">
      {showWelcomePopup && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalContent, textAlign: 'center' }} className="modal-content">
            <h2 style={{ color: '#3B5D14', marginTop: 0 }}>Selamat Datang! 👋</h2>
            <p style={{ color: '#4C3224', fontSize: '14px', lineHeight: '1.6' }}>
              Pilih menu pesananmu, selesaikan <i>checkout</i>, dan ambil pesananmu ke outlet yang dipilih.
              Nantinya, cukup <b>tunjukkan struk pembelian</b> pada layar HP saat mengambil pesanan di kasir.
            </p>
            <div style={{ backgroundColor: '#EAD5B2', padding: '12px', borderRadius: '6px', margin: '15px 0' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#4C3224', fontWeight: 'bold' }}>
                ⚠️ Mohon maaf, pesanan tidak dapat diantar (Hanya Ambil Sendiri). 
                Web ini dikhususkan agar kamu bisa pesan dari jarak jauh dan tidak perlu menunggu antre panjang!
              </p>
            </div>
            <button 
              onClick={() => setShowWelcomePopup(false)} 
              style={styles.btnSelesaiBayar}
            >
               Mengerti!
            </button>
          </div>
        </div>
      )}

      <nav style={styles.navbar} className="navbar">
        <div style={styles.navLeft}>
          <img src={logoTubrukTelu} alt="Logo" style={styles.brandLogo} className="brand-logo" />
          <span style={styles.badgeRole}>Pemesanan Mandiri</span>
        </div>
        <div style={styles.navRight}>
          <button onClick={() => { if (window.confirm("Keluar dari halaman pemesanan?")) navigate('/login'); }} style={styles.btnLogout}>
            Keluar
          </button>
        </div>
      </nav>

      {currentOrder ? (
        <div style={styles.receiptContainer}>
          <div style={styles.receiptCard} className="receipt-card">
            <h2 style={{ color: '#3B5D14', textAlign: 'center', margin: '0 0 10px 0' }}>Pesanan Berhasil! 🎉</h2>
            <p style={{ textAlign: 'center', color: '#4C3224', marginBottom: '20px' }}>
               ID Pesanan: <strong>{currentOrder.orderId}</strong><br/>
               Atas Nama: <strong>{currentOrder.namaPemesan}</strong> ({currentOrder.noHp})
            </p>
            
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #8A9A5B', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 15px 0', color: '#4C3224', textAlign: 'center' }}>Status Pesanan Anda Secara Real-Time:</h4>
              {TRACKING_STEPS.map((stepLabel, idx) => (
                <div key={idx} style={styles.trackingStep}>
                  <div style={{ ...styles.trackingDot, backgroundColor: idx <= currentStatusIndex ? '#8A9A5B' : '#EAD5B2' }} />
                  <div>
                    <h4 style={{ margin: 0, color: idx <= currentStatusIndex ? '#3B5D14' : '#4C3224', opacity: idx <= currentStatusIndex ? 1 : 0.5 }}>{stepLabel}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px dashed #4C3224', paddingTop: '15px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#4C3224' }}>Ringkasan Menu:</h4>
              {currentOrder.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '5px', color: '#1A1A1A' }}>
                  <span>{item.qty}x {item.nama}</span>
                  <span>Rp {(item.harga * item.qty).toLocaleString('id-ID')}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', marginTop: '10px', paddingTop: '10px', borderTop: '2px solid #8A9A5B', color: '#3B5D14' }}>
                <span>Total Lunas:</span>
                <span>Rp {currentOrder.total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#EAD5B2', padding: '10px', borderRadius: '6px', marginTop: '20px', textAlign: 'center' }}>
               <p style={{ margin: 0, fontSize: '12px', color: '#4C3224', fontWeight: 'bold' }}>⚠️ Harap Tangkap Layar (Screenshot) halaman ini untuk ditunjukkan ke Kasir saat pengambilan!</p>
            </div>

            {currentOrder.status === 'Selesai' && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button onClick={handleResetOrder} style={styles.btnReset}>Pesan Baru Lagi</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={styles.mainLayout} className="main-layout">
          <div style={styles.menuContainer} className="menu-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="lokasi-ambil">
                <span style={{ fontWeight: 'bold', color: '#4C3224' }}>📍 Lokasi Ambil:</span>
                <select 
                  value={selectedOutlet.id} 
                  onChange={(e) => setSelectedOutlet(ACTIVE_OUTLETS.find(o => o.id === parseInt(e.target.value)))}
                  style={{ padding: '8px', borderRadius: '6px', border: '1px solid #8A9A5B', backgroundColor: '#FFF', color: '#1A1A1A', fontWeight: 'bold' }}
                >
                  {ACTIVE_OUTLETS.map(outlet => (
                    <option key={outlet.id} value={outlet.id}>{outlet.nama}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div style={styles.categoryGrid} className="category-grid">
              {categoriesToRender.map((cat, idx) => {
                const catItems = MASTER_MENU.filter(m => m.kategori === cat);
                if (catItems.length === 0) return null;
                const firstImg = catItems[0].gambar;

                return (
                  <div key={idx} style={styles.categoryBlock}>
                    <div style={styles.categoryHeader}>{cat}</div>
                    <div style={styles.categoryBody} className="category-body">
                      <div style={styles.categoryImgWrapper} className="category-img-wrapper">
                        <img src={firstImg} alt={cat} style={styles.categoryImg} />
                      </div>
                      <div style={styles.itemList}>
                        {catItems.map((item, itemIdx) => (
                          <div key={itemIdx} style={styles.itemRow} className="item-row">
                            <span style={styles.itemName}>{item.nama}</span>
                            <div style={styles.itemActionArea} className="item-action-area">
                              {item.hasSize ? (
                                <>
                                  <button onClick={() => addToCart(item, 'R', item.hargaR)} style={styles.btnSize}>R ({item.hargaR / 1000}k)</button>
                                  <button onClick={() => addToCart(item, 'Jumbo', item.hargaJ)} style={styles.btnSizeJumbo}>J ({item.hargaJ / 1000}k)</button>
                                </>
                              ) : (
                                <button onClick={() => addToCart(item, 'R', item.hargaR)} style={styles.btnSingleAdd}>+ Rp {item.hargaR.toLocaleString('id-ID')}</button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div style={styles.cartSidebar} className="cart-sidebar">
            <h3 style={styles.sectionTitle}>🛒 Keranjang Pesanan</h3>
            <div style={styles.cartItemsList}>
              {cart.length === 0 ? (
                <p style={styles.emptyCartText}>Keranjang kamu masih kosong.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} style={styles.cartItem}>
                    <div>
                      <p style={styles.cartItemName}>{item.nama}</p>
                      <p style={styles.cartItemPrice}>Rp {item.harga.toLocaleString('id-ID')} x {item.qty}</p>
                    </div>
                    <div style={styles.cartActionBtns}>
                      <button onClick={() => removeFromCart(item.id)} style={styles.minusBtn}>-</button>
                      <span style={{ fontWeight: 'bold', color: '#1A1A1A' }}>{item.qty}</span>
                      <button onClick={() => addToCart({nama: item.baseName, hasSize: item.size === 'Jumbo'}, item.size, item.harga)} style={styles.plusBtn}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={styles.cartFooter}>
              <div style={styles.totalRow}>
                <span>Total Bayar :</span>
                <span style={styles.totalPriceText}>Rp {cartTotal.toLocaleString('id-ID')}</span>
              </div>
              <button 
                disabled={cart.length === 0}
                onClick={() => setCheckoutModal(true)}
                style={{ ...styles.btnBayar, backgroundColor: cart.length === 0 ? '#EAD5B2' : '#3B5D14', color: cart.length === 0 ? '#8A9A5B' : '#FFFFFF' }}
              >
                🛒 CHECKOUT SEKARANG
              </button>
            </div>
          </div>
        </div>
      )}

      {checkoutModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent} className="modal-content">
            <div style={styles.modalHeader}>
              <h3 style={{ color: '#3B5D14', margin: 0 }}>Selesaikan Pembayaran</h3>
              <button onClick={() => setCheckoutModal(false)} style={styles.closeModalBtn}>✕</button>
            </div>
            <p style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', color: '#4C3224' }}>
              Total Tagihan: <span style={{ color: '#3B5D14', fontSize: '20px' }}>Rp {cartTotal.toLocaleString('id-ID')}</span>
            </p>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <div style={styles.qrisBadge}>Scan QRIS Disini</div>
              <img src={qrisGambarAsli} alt="QRIS" style={{ width: '220px', height: 'auto', margin: '10px auto', borderRadius: '4px' }} />
              <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#4C3224' }}>TEH TUBRUK TELU OUTLET</p>
              <button onClick={handleConfirmPayment} style={styles.btnSelesaiBayar}>✅ SAYA SUDAH BAYAR</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#EAD5B2',
    overflow: 'hidden',
    fontFamily: 'sans-serif'
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: '8px 20px',
    borderBottom: '2px solid #8A9A5B'
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  brandLogo: {
    width: 'auto',
    height: '35px',
    objectFit: 'contain'
  },
  badgeRole: {
    backgroundColor: '#8A9A5B',
    color: '#FFFFFF',
    fontSize: '11px',
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: 'bold'
  },
  navRight: {
    display: 'flex',
    alignItems: 'center'
  },
  btnLogout: {
    backgroundColor: '#4C3224',
    color: '#FFFFFF',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '13px'
  },
  mainLayout: {
    display: 'flex',
    flex: 1,
    height: 'calc(100vh - 70px)',
    overflow: 'hidden'
  },
  menuContainer: {
    flex: 2.8,
    padding: '20px',
    overflowY: 'auto'
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(430px, 1fr))',
    gap: '20px'
  },
  categoryBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(76,50,36,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #8A9A5B'
  },
  categoryHeader: {
    backgroundColor: '#3B5D14',
    color: '#FFFFFF',
    padding: '10px 15px',
    fontWeight: 'bold',
    fontSize: '14px',
    letterSpacing: '0.5px'
  },
  categoryBody: {
    display: 'flex',
    padding: '15px',
    gap: '15px',
    flex: 1
  },
  categoryImgWrapper: {
    flex: 1,
    maxWidth: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAD5B2',
    borderRadius: '6px'
  },
  categoryImg: {
    width: '100%',
    height: '120px',
    objectFit: 'contain'
  },
  itemList: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    justifyContent: 'center'
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '8px',
    borderBottom: '1px dashed #8A9A5B'
  },
  itemName: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#4C3224',
    textTransform: 'capitalize'
  },
  itemActionArea: {
    display: 'flex',
    gap: '5px'
  },
  btnSize: {
    padding: '5px 8px',
    fontSize: '11px',
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
    color: '#3B5D14',
    border: '1px solid #8A9A5B',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  btnSizeJumbo: {
    padding: '5px 8px',
    fontSize: '11px',
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
    color: '#4C3224',
    border: '1px solid #4C3224',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  btnSingleAdd: {
    padding: '5px 10px',
    fontSize: '11px',
    fontWeight: 'bold',
    backgroundColor: '#8A9A5B',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  cartSidebar: {
    flex: 1.1,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    borderLeft: '2px solid #8A9A5B'
  },
  sectionTitle: {
    margin: '0 0 15px 0',
    fontSize: '16px',
    color: '#4C3224',
    borderBottom: '2px solid #EAD5B2',
    paddingBottom: '10px',
    fontWeight: 'bold'
  },
  cartItemsList: {
    flex: 1,
    overflowY: 'auto'
  },
  emptyCartText: {
    color: '#8A9A5B',
    textAlign: 'center',
    marginTop: '40px',
    fontSize: '13px',
    fontWeight: 'bold'
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #EAD5B2'
  },
  cartItemName: {
    margin: '0 0 3px 0',
    fontWeight: 'bold',
    fontSize: '13px',
    color: '#4C3224'
  },
  cartItemPrice: {
    margin: 0,
    fontSize: '11px',
    color: '#8A9A5B',
    fontWeight: 'bold'
  },
  cartActionBtns: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  minusBtn: {
    width: '22px',
    height: '22px',
    backgroundColor: '#4C3224',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  plusBtn: {
    width: '22px',
    height: '22px',
    backgroundColor: '#8A9A5B',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  cartFooter: {
    borderTop: '2px solid #8A9A5B',
    paddingTop: '15px'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: '15px',
    color: '#4C3224'
  },
  totalPriceText: {
    color: '#3B5D14',
    fontSize: '16px'
  },
  btnBayar: {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(76,50,36,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: '25px',
    borderRadius: '10px',
    width: '380px',
    border: '2px solid #8A9A5B'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #EAD5B2',
    paddingBottom: '10px',
    marginBottom: '20px'
  },
  closeModalBtn: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    color: '#4C3224',
    fontWeight: 'bold'
  },
  qrisBadge: {
    display: 'inline-block',
    backgroundColor: '#3B5D14',
    color: '#FFFFFF',
    fontWeight: 'bold',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '12px'
  },
  btnSelesaiBayar: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3B5D14',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    marginTop: '15px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  receiptContainer: {
    flex: 1,
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto'
  },
  receiptCard: {
    backgroundColor: '#FFFFFF',
    padding: '30px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 8px 25px rgba(76,50,36,0.15)',
    border: '2px solid #8A9A5B'
  },
  trackingStep: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px'
  },
  trackingDot: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    marginRight: '15px',
    transition: 'all 0.3s'
  },
  btnReset: {
    padding: '12px 24px',
    backgroundColor: '#4C3224',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    /* Global Styles */
    form input, form select { padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 14px; margin-bottom: 8px; }
    form label { font-size: 13px; font-weight: 600; color: #555; }
    
    /* Responsive Media Queries (Mobile & Tablet) */
    @media (max-width: 768px) {
      .navbar {
        flex-direction: column;
        height: auto !important;
        padding: 15px !important;
        gap: 15px;
      }
      .brand-logo {
        height: 30px !important;
      }
      .main-layout {
        flex-direction: column !important;
        height: auto !important;
        overflow: auto !important;
      }
      .menu-container {
        padding: 15px !important;
      }
      .category-grid {
        grid-template-columns: 1fr !important;
      }
      .category-body {
        flex-direction: column !important;
      }
      .category-img-wrapper {
        max-width: 100% !important;
        height: 150px;
      }
      .item-row {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 8px;
      }
      .item-action-area {
        width: 100%;
        justify-content: flex-end;
      }
      .cart-sidebar {
        border-left: none !important;
        border-top: 2px solid #8A9A5B;
      }
      .modal-content {
        width: 90% !important;
        padding: 15px !important;
      }
      .receipt-card {
        padding: 15px !important;
      }
      .lokasi-ambil {
        flex-direction: column;
        align-items: flex-start !important;
        width: 100%;
      }
      .lokasi-ambil select {
        width: 100%;
        margin-top: 5px;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Pelanggan;