import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../../components/Navbar';
import qrisGambarAsli from '../../assets/qris.png';
import logoTubrukTelu from '../../assets/logo.png';
import imgTehTubruk from '../../assets/teh_tubruk.png';
import imgKopi from '../../assets/kopi.png';
import imgCreamy from '../../assets/teh_creamy.png';
import imgPermenKaret from '../../assets/permen_karet.png';
import imgChocolate from '../../assets/chocolate.png';

const MENU_KATEGORI = [
  { kategori: 'TEH TUBRUK', gambar: imgTehTubruk, hasSize: true, items: [{ nama: 'Jasmine Tea', hargaR: 2500, hargaJ: 4000 }, { nama: 'Leechy Tea', hargaR: 5000, hargaJ: 8000 }, { nama: 'Mango Tea', hargaR: 4000, hargaJ: 7000 }, { nama: 'Blackcurrant Tea', hargaR: 4000, hargaJ: 7000 }, { nama: 'Apple Tea', hargaR: 4000, hargaJ: 7000 }, { nama: 'Lemon Tea (Powder)', hargaR: 4000, hargaJ: 7000 }] },
  { kategori: 'KOPI', gambar: imgKopi, hasSize: false, items: [{ nama: 'Kopi Turing Hitam (KTH)', hargaR: 5000 }, { nama: 'Kopi Turing Susu (KTS)', hargaR: 8000 }, { nama: 'Kopi Turing Coklat (KTC)', hargaR: 9000 }, { nama: 'Kopi Turing Klepon (KTK)', hargaR: 9000 }, { nama: 'Americano (No Sugar)', hargaR: 4000 }, { nama: 'Berrycano', hargaR: 5000 }, { nama: 'Cappuccino (Powder)', hargaR: 5000 }] },
  { kategori: 'TEH TUBRUK (CREAMY)', gambar: imgCreamy, hasSize: false, items: [{ nama: 'Teh Tarik', hargaR: 7000 }, { nama: 'Jasmine Milk Tea', hargaR: 7000 }, { nama: 'Green Tea', hargaR: 8000 }, { nama: 'Thai Tea', hargaR: 8000 }] },
  { kategori: 'PERMEN KARET 2320', gambar: imgPermenKaret, hasSize: false, items: [{ nama: 'Es Permen Karet Pink', hargaR: 5000 }, { nama: 'Es Permen Karet Biru', hargaR: 5000 }, { nama: 'Es Permen Karet Mix', hargaR: 5000 }] },
  { kategori: 'CHOCOLATE & SWEETS', gambar: imgChocolate, hasSize: false, items: [{ nama: 'Dark Chocolate', hargaR: 6000 }, { nama: 'Milo', hargaR: 6000 }, { nama: 'Chocomilo Dino', hargaR: 7000 }, { nama: 'Black Oreo', hargaR: 8000 }] }
];

const STATUS_FLOW = ['Menunggu Diproses', 'Diproses', 'Sedang Dibuat', 'Siap Diambil', 'Selesai'];

function Kasir() {
  const navigate = useNavigate(); 
  
  // State Navigasi
  const [activeTab, setActiveTab] = useState('KASIR');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk Burger Menu di Mobile

  // State Data
  const [antrean, setAntrean] = useState([]);
  const [cart, setCart] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cashAmount, setCashAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  // State Input Pelanggan
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); // Tutup sidebar otomatis di HP setelah memilih menu
  };

  const addToCart = (namaMenu, ukuran, harga) => {
    const cartItemId = `${namaMenu}-${ukuran}`;
    const existingItem = cart.find((item) => item.id === cartItemId);
    if (existingItem) {
      setCart(cart.map((item) => item.id === cartItemId ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { id: cartItemId, nama: `${namaMenu} (${ukuran})`, harga, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem.qty === 1) setCart(cart.filter((item) => item.id !== id));
    else setCart(cart.map((item) => item.id === id ? { ...item, qty: item.qty - 1 } : item));
  };

  const totalHarga = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);
  const kembalian = cashAmount ? Number(cashAmount) - totalHarga : 0;

  const resetTransaksi = () => { 
    setCart([]); 
    setShowPaymentModal(false); 
    setPaymentMethod(null); 
    setCashAmount(''); 
    setIsSuccess(false); 
    setCustomerName('');
    setCustomerPhone('');
  };

  const prosesSelesaiBayar = () => {
    if(!customerName) return alert("Mohon masukkan nama pemesan terlebih dahulu!");

    const orderId = `TTT-${Math.floor(1000 + Math.random() * 9000)}`;
    const pesananBaru = { 
      id: orderId, 
      namaPemesan: customerName,
      noHp: customerPhone,
      waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), 
      items: [...cart], 
      total: totalHarga, 
      metode: paymentMethod === 'qris' ? 'QRIS Digital' : 'Tunai', 
      status: 'Menunggu Diproses' 
    };
    
    setAntrean([...antrean, pesananBaru]);
    localStorage.setItem('onlineOrderSimulatedStatus', JSON.stringify(pesananBaru));

    alert(`Struk Penjualan Dicetak! Pesanan a.n ${customerName} masuk ke daftar Antrean.`);
    resetTransaksi();
  };

  const handleUpdateStatus = (id, currentStatus) => {
    const currentIndex = STATUS_FLOW.indexOf(currentStatus);
    if (currentIndex < STATUS_FLOW.length - 1) {
      const nextStatus = STATUS_FLOW[currentIndex + 1];
      
      const updatedAntrean = antrean.map(order => order.id === id ? { ...order, status: nextStatus } : order);
      setAntrean(updatedAntrean);

      const simulatedOrder = JSON.parse(localStorage.getItem('onlineOrderSimulatedStatus'));
      if(simulatedOrder && simulatedOrder.id === id) {
        simulatedOrder.status = nextStatus;
        localStorage.setItem('onlineOrderSimulatedStatus', JSON.stringify(simulatedOrder));
      }
    }
  };

  const getNextStatusText = (status) => {
    switch(status) { 
      case 'Menunggu Diproses': return 'Terima & Proses'; 
      case 'Diproses': return 'Mulai Dibuat'; 
      case 'Sedang Dibuat': return 'Tandai Siap'; 
      case 'Siap Diambil': return 'Selesaikan Transaksi'; 
      default: return ''; 
    }
  };

  const getStatusColor = (status) => {
    switch(status) { 
      case 'Menunggu Diproses': return '#e67e22'; 
      case 'Diproses': return '#3498db'; 
      case 'Sedang Dibuat': return '#9b59b6'; 
      case 'Siap Diambil': return '#2ecc71'; 
      case 'Selesai': return '#8A9A5B'; 
      default: return '#8A9A5B'; 
    }
  };

  const totalPendapatanShift = antrean.reduce((sum, order) => sum + order.total, 0);
  const pesananAktif = antrean.filter(o => o.status !== 'Selesai');

  return (
    <div style={styles.appContainer} className="kasir-container">
      <Navbar />

      {/* HEADER NAVIGASI (Dengan Tombol Burger untuk Mobile) */}
      <div style={styles.headerNavContainer} className="header-nav-container">
        <button 
          className="mobile-burger" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
        <div style={styles.tabContainer} className={`tab-container ${isSidebarOpen ? 'open' : ''}`}>
          <button onClick={() => handleTabChange('KASIR')} style={activeTab === 'KASIR' ? styles.tabBtnActive : styles.tabBtn}>Menu</button>
          <button onClick={() => handleTabChange('ANTREAN')} style={activeTab === 'ANTREAN' ? styles.tabBtnActive : styles.tabBtn}>Antrean Pesanan ({pesananAktif.length})</button>
          <button onClick={() => handleTabChange('REKAP')} style={activeTab === 'REKAP' ? styles.tabBtnActive : styles.tabBtn}>Rekap Pendapatan</button>
        </div>
      </div>

      {/* TAMPILAN 1: KASIR */}
      {activeTab === 'KASIR' && (
        <div style={styles.mainLayout} className="main-layout">
          <div style={styles.menuContainer} className="menu-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ ...styles.mainTitle, margin: 0 }}>Menu Tubruk Telu</h3>
              <button onClick={() => { if (window.confirm("Apakah Anda yakin ingin mengakhiri shift kerja kasir dan keluar?")) { navigate('/login'); } }} style={styles.btnLogout}>Keluar</button>
            </div>
            
            <div style={styles.categoryGrid} className="category-grid">
              {MENU_KATEGORI.map((kat, idx) => (
                <div key={idx} style={styles.categoryBlock}>
                  <div style={styles.categoryHeader}>{kat.kategori}</div>
                  <div style={styles.categoryBody} className="category-body">
                    <div style={styles.categoryImgWrapper} className="category-img-wrapper">
                      <img src={kat.gambar} alt={kat.kategori} style={styles.categoryImg} />
                    </div>
                    <div style={styles.itemList}>
                      {kat.items.map((item, itemIdx) => (
                        <div key={itemIdx} style={styles.itemRow} className="item-row">
                          <span style={styles.itemName}>{item.nama}</span>
                          <div style={styles.itemActionArea} className="item-action-area">
                            {kat.hasSize ? (
                              <>
                                <button onClick={() => addToCart(item.nama, 'R', item.hargaR)} style={styles.btnSize}>R ({item.hargaR / 1000}k)</button>
                                <button onClick={() => addToCart(item.nama, 'Jumbo', item.hargaJ)} style={styles.btnSizeJumbo}>J ({item.hargaJ / 1000}k)</button>
                              </>
                            ) : (
                              <button onClick={() => addToCart(item.nama, 'R', item.hargaR)} style={styles.btnSingleAdd}>+ Rp {item.hargaR.toLocaleString('id-ID')}</button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.cartSidebar} className="cart-sidebar">
            <h3 style={styles.sectionTitle}>🛒 Keranjang Pesanan</h3>
            <div style={styles.cartItemsList}>
              {cart.length === 0 ? ( <p style={styles.emptyCartText}>Belum ada menu dipilih.</p> ) : (
                cart.map((item) => (
                  <div key={item.id} style={styles.cartItem}>
                    <div>
                      <p style={styles.cartItemName}>{item.nama}</p>
                      <p style={styles.cartItemPrice}>Rp {item.harga.toLocaleString('id-ID')} x {item.qty}</p>
                    </div>
                    <div style={styles.cartActionBtns}>
                      <button onClick={() => removeFromCart(item.id)} style={styles.minusBtn}>-</button>
                      <span style={{ fontWeight: 'bold', color: '#1A1A1A' }}>{item.qty}</span>
                      <button onClick={() => addToCart(item.nama.split(' (')[0], item.nama.includes('(Jumbo)') ? 'Jumbo' : 'R', item.harga)} style={styles.plusBtn}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={styles.cartFooter}>
              <div style={styles.totalRow}>
                <span>Total Harga :</span>
                <span style={styles.totalPriceText}>Rp {totalHarga.toLocaleString('id-ID')}</span>
              </div>
              <button disabled={cart.length === 0} onClick={() => setShowPaymentModal(true)} style={{ ...styles.btnBayar, backgroundColor: cart.length === 0 ? '#EAD5B2' : '#3B5D14', color: cart.length === 0 ? '#8A9A5B' : '#FFFFFF' }}>🛒 BAYAR SEKARANG</button>
            </div>
          </div>
        </div>
      )}

      {/* TAMPILAN 2: ANTREAN */}
      {activeTab === 'ANTREAN' && (
        <div style={styles.featurePage} className="feature-page">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#3B5D14', display: 'inline-block', borderBottom: '2px solid #8A9A5B', paddingBottom: '10px' }}>Daftar Antrean Pesanan</h2>
          </div>
          {antrean.length === 0 ? ( <p style={{ textAlign: 'center', color: '#4C3224', marginTop: '40px', fontWeight: 'bold' }}>Belum ada antrean pesanan.</p> ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {antrean.map((order) => (
                <div key={order.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #8A9A5B', boxShadow: '0 4px 10px rgba(76,50,36,0.1)', display: 'flex', flexDirection: 'column' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #8A9A5B', paddingBottom: '10px', marginBottom: '15px' }}>
                    <div>
                      <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#4C3224', display: 'block' }}>{order.namaPemesan}</span>
                      <span style={{ fontSize: '11px', color: '#8A9A5B' }}>No. {order.id} {order.noHp ? ` | ${order.noHp}` : ''}</span>
                    </div>
                    <span style={{ color: '#8A9A5B', fontSize: '13px', fontWeight: 'bold' }}>{order.waktu}</span>
                  </div>

                  <ul style={{ paddingLeft: '20px', margin: '0 0 15px 0', fontSize: '14px', color: '#1A1A1A', flex: 1 }}>
                    {order.items.map((item, idx) => ( <li key={idx} style={{ marginBottom: '5px', fontWeight: 'bold' }}>{item.qty}x {item.nama}</li> ))}
                  </ul>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ fontSize: '11px', backgroundColor: '#EAD5B2', color: '#4C3224', padding: '4px 10px', borderRadius: '15px', fontWeight: 'bold' }}>{order.metode}</span>
                    <strong style={{ color: '#3B5D14', fontSize: '16px' }}>Rp {order.total.toLocaleString('id-ID')}</strong>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EAD5B2', paddingTop: '15px' }} className="antrean-actions">
                    <span style={{ fontSize: '11px', backgroundColor: getStatusColor(order.status), color: '#fff', padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold' }}>{order.status}</span>
                    {order.status !== 'Selesai' && ( <button onClick={() => handleUpdateStatus(order.id, order.status)} style={styles.btnActionProcess}>{getNextStatusText(order.status)} ⏭</button> )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAMPILAN 3: REKAP */}
      {activeTab === 'REKAP' && (
        <div style={styles.featurePage} className="feature-page">
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', border: '2px solid #8A9A5B', maxWidth: '500px', margin: '0 auto', boxShadow: '0 8px 25px rgba(76,50,36,0.1)' }}>
            <h2 style={{ color: '#3B5D14', textAlign: 'center', marginBottom: '30px' }}>Rekap Pendapatan (Shift)</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '16px', color: '#4C3224' }}>
              <span>Total Transaksi Berhasil:</span><strong>{antrean.length} Pesanan</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '18px', borderBottom: '2px dashed #8A9A5B', paddingBottom: '15px', color: '#4C3224', fontWeight: 'bold' }}>
              <span>Total Pendapatan Kotor:</span><strong style={{ color: '#3B5D14' }}>Rp {totalPendapatanShift.toLocaleString('id-ID')}</strong>
            </div>
            <button onClick={() => { alert(`Laporan Shift berhasil dicetak! Total Uang yang harus disetor: Rp ${totalPendapatanShift.toLocaleString('id-ID')}`); }} style={{ width: '100%', padding: '15px', backgroundColor: '#3B5D14', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>🖨️ Cetak Rekap Shift & Keluar</button>
          </div>
        </div>
      )}

      {/* MODAL PEMBAYARAN */}
      {showPaymentModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent} className="modal-content">
            <div style={styles.modalHeader}>
              <h3 style={{ margin: 0, color: '#3B5D14' }}>Proses Pembayaran</h3>
              <button onClick={() => setShowPaymentModal(false)} style={styles.closeModalBtn}>✕</button>
            </div>
            <p style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', color: '#4C3224' }}>Total Tagihan: <span style={{ color: '#3B5D14', fontSize: '20px' }}>Rp {totalHarga.toLocaleString('id-ID')}</span></p>
            
            <div style={{ marginBottom: '15px' }}>
               <input type="text" placeholder="Nama Pelanggan (Wajib)" value={customerName} onChange={(e) => setCustomerName(e.target.value)} style={styles.inputCash} />
               <input type="text" placeholder="No HP/WA (Opsional)" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} style={{...styles.inputCash, marginTop: '8px'}} />
            </div>

            {!paymentMethod && (
              <div style={styles.methodSelectionGrid}>
                <button onClick={() => setPaymentMethod('qris')} style={styles.methodCardBtn}>Bayar pakai QRIS Digital</button>
                <button onClick={() => setPaymentMethod('langsung')} style={styles.methodCardBtn}>Bayar Langsung (Tunai)</button>
              </div>
            )}

            {paymentMethod === 'qris' && (
              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <div style={styles.qrisBadge}>QRIS GPN</div>
                <img src={qrisGambarAsli} alt="QRIS Resmi" style={{ width: '220px', height: 'auto', margin: '10px auto', borderRadius: '4px' }} />
                <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#4C3224' }}>TEH TUBRUK TELU OUTLET</p>
                {!isSuccess ? ( <button onClick={() => setIsSuccess(true)} style={styles.btnSelesaiBayar}>✅ Konfirmasi Pembayaran Berhasil</button> ) : ( <button onClick={prosesSelesaiBayar} style={styles.btnCetakStruk}>🖨️ CETAK STRUK & PROSES PESANAN</button> )}
              </div>
            )}

            {paymentMethod === 'langsung' && (
              <div style={{ marginTop: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4C3224' }}>Uang Diterima (Rp):</label>
                <input type="number" placeholder="Contoh: 20000" value={cashAmount} onChange={(e) => setCashAmount(e.target.value)} style={styles.inputCash} />
                {cashAmount && (
                  <div style={styles.changeDisplayBox}>
                    <p style={{ margin: '0 0 5px 0', color: '#4C3224', fontWeight: 'bold' }}>Kembalian:</p>
                    <h3 style={{ margin: 0, color: kembalian < 0 ? '#e74c3c' : '#3B5D14' }}>{kembalian < 0 ? 'Uang Kurang!' : `Rp ${kembalian.toLocaleString('id-ID')}`}</h3>
                  </div>
                )}
                <button disabled={!cashAmount || kembalian < 0} onClick={prosesSelesaiBayar} style={{ ...styles.btnCetakStruk, backgroundColor: (!cashAmount || kembalian < 0) ? '#EAD5B2' : '#3B5D14', color: (!cashAmount || kembalian < 0) ? '#8A9A5B' : '#FFF' }}>🖨️ SELESAI & PROSES PESANAN</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// STYLING MANAGEMENT (Disusun Rapih ke Bawah)
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
  headerNavContainer: {
    display: 'flex',
    backgroundColor: '#fff',
    borderBottom: '2px solid #8A9A5B',
    padding: '0 20px',
    position: 'relative'
  },
  tabContainer: {
    display: 'flex',
    flex: 1
  },
  tabBtn: {
    padding: '15px 20px',
    border: 'none',
    background: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#4C3224',
    cursor: 'pointer',
    borderBottom: '3px solid transparent'
  },
  tabBtnActive: {
    padding: '15px 20px',
    border: 'none',
    background: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#3B5D14',
    cursor: 'pointer',
    borderBottom: '3px solid #3B5D14'
  },
  featurePage: {
    flex: 1,
    padding: '30px',
    overflowY: 'auto',
    backgroundColor: '#EAD5B2'
  },
  mainLayout: {
    display: 'flex',
    flex: 1,
    height: 'calc(100vh - 110px)',
    overflow: 'hidden'
  },
  menuContainer: {
    flex: 2.8,
    padding: '20px',
    overflowY: 'auto'
  },
  mainTitle: {
    fontSize: '20px',
    color: '#4C3224',
    fontWeight: 'bold'
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(430px, 1fr))',
    gap: '20px'
  },
  categoryBlock: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(76,50,36,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #8A9A5B'
  },
  categoryHeader: {
    backgroundColor: '#3B5D14',
    color: '#fff',
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
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
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
  methodSelectionGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px'
  },
  methodCardBtn: {
    padding: '12px',
    fontSize: '13px',
    fontWeight: 'bold',
    border: '1px solid #8A9A5B',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: '#FFFFFF',
    color: '#3B5D14'
  },
  qrisBadge: {
    display: 'inline-block',
    backgroundColor: '#3B5D14',
    color: '#fff',
    fontWeight: 'bold',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '12px'
  },
  btnSelesaiBayar: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3B5D14',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    marginTop: '15px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  btnCetakStruk: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3B5D14',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    marginTop: '15px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  inputCash: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #8A9A5B',
    boxSizing: 'border-box'
  },
  changeDisplayBox: {
    backgroundColor: '#EAD5B2',
    padding: '12px',
    borderRadius: '6px',
    marginTop: '12px',
    textAlign: 'center'
  },
  btnLogout: {
    backgroundColor: '#4C3224',
    color: '#FFFFFF',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '13px',
    transition: '0.2s'
  },
  btnActionProcess: {
    backgroundColor: '#3B5D14',
    color: '#FFFFFF',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '11px',
    transition: '0.2s'
  }
};

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    /* Global Styles */
    form input, form select { padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 14px; margin-bottom: 8px; }
    form label { font-size: 13px; font-weight: 600; color: #555; }
    table th, table td { padding: 12px; border-bottom: 1px solid #f1f3f4; font-size: 14px; }
    table th { color: #666; font-weight: 600; background-color: #f8f9fa; }

    /* Responsive Mobile UI */
    .mobile-burger { display: none; background: none; border: none; font-size: 24px; cursor: pointer; color: #4C3224; padding: 10px; }
    .tab-container { transition: 0.3s ease-in-out; }
    
    @media (max-width: 768px) {
      .header-nav-container { flex-direction: column; align-items: flex-start; padding: 0 !important; }
      .mobile-burger { display: block; width: 100%; text-align: left; background-color: #EAD5B2; }
      
      .tab-container { display: none !important; flex-direction: column; width: 100%; border-bottom: none !important; }
      .tab-container.open { display: flex !important; }
      
      .main-layout { flex-direction: column !important; height: auto !important; overflow: auto !important; }
      .menu-container { padding: 15px !important; }
      .category-grid { grid-template-columns: 1fr !important; }
      .category-body { flex-direction: column !important; }
      .category-img-wrapper { max-width: 100% !important; height: 150px; }
      .item-row { flex-direction: column !important; align-items: flex-start !important; gap: 8px; }
      .item-action-area { width: 100%; justify-content: flex-end; }
      
      .cart-sidebar { border-left: none !important; border-top: 2px solid #8A9A5B; }
      .modal-content { width: 90% !important; padding: 15px !important; }
      .feature-page { padding: 15px !important; }
      .antrean-actions { flex-direction: column; align-items: flex-start !important; gap: 10px; }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Kasir;