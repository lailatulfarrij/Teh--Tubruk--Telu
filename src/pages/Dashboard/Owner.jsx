import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoTubrukTelu from '../../assets/logo.png';

// Mock Data Transaksi Lengkap
const INITIAL_TRANSACTIONS = [
  { id: 'TX-1001', tanggal: '2026-06-14', jam: '12:15', outlet: 'Outlet Pusat Pasuruan', kasir: 'Arul', total: 35000, itemQty: 8, detailMenu: '4x Jasmine Tea (J), 4x Apple Tea (R)' },
  { id: 'TX-1002', tanggal: '2026-06-14', jam: '15:30', outlet: 'Outlet Alun-Alun', kasir: 'Andi', total: 24000, itemQty: 5, detailMenu: '3x Kopi Turing Susu (KTS), 2x Milo' },
  { id: 'TX-1003', tanggal: '2026-06-14', jam: '19:45', outlet: 'Outlet Pusat Pasuruan', kasir: 'Arul', total: 75000, itemQty: 14, detailMenu: '5x Thai Tea, 5x Green Tea, 4x Berrycano' },
  { id: 'TX-1004', tanggal: '2026-06-14', jam: '19:50', outlet: 'Outlet Alun-Alun', kasir: 'Andi', total: 45000, itemQty: 9, detailMenu: '5x Kopi Turing Coklat (KTC), 4x Es Permen Karet Pink' },
  { id: 'TX-1005', tanggal: '2026-06-13', jam: '18:00', outlet: 'Outlet Pusat Pasuruan', kasir: 'Arul', total: 58000, itemQty: 11, detailMenu: '6x Jasmine Tea (J), 5x Thai Tea' },
  { id: 'TX-1006', tanggal: '2026-06-13', jam: '19:00', outlet: 'Outlet Alun-Alun', kasir: 'Andi', total: 12000, itemQty: 3, detailMenu: '2x Dark Chocolate, 1x Americano' },
  { id: 'TX-1007', tanggal: '2026-06-12', jam: '17:00', outlet: 'Outlet Pusat Pasuruan', kasir: 'Arul', total: 90000, itemQty: 18, detailMenu: '10x Es Permen Karet Mix, 8x Kopi Turing Hitam' },
  { id: 'TX-1008', tanggal: '2026-06-11', jam: '20:00', outlet: 'Outlet Alun-Alun', kasir: 'Andi', total: 30000, itemQty: 6, detailMenu: '3x Leechy Tea (J), 3x Kopi Turing Susu' },
  { id: 'TX-1009', tanggal: '2026-06-10', jam: '12:00', outlet: 'Outlet Pusat Pasuruan', kasir: 'Arul', total: 42000, itemQty: 8, detailMenu: '8x Jasmine Milk Tea' },
  { id: 'TX-1010', tanggal: '2026-06-09', jam: '14:00', outlet: 'Outlet Alun-Alun', kasir: 'Andi', total: 55000, itemQty: 10, detailMenu: '5x Chocomilo Dino, 5x Mango Tea (R)' },
  { id: 'TX-0901', tanggal: '2026-05-31', jam: '16:00', outlet: 'Outlet Pusat Pasuruan', kasir: 'Arul', total: 150000, itemQty: 25, detailMenu: '25x Jasmine Tea (J)' },
  { id: 'TX-0801', tanggal: '2025-12-31', jam: '20:30', outlet: 'Outlet Alun-Alun', kasir: 'Andi', total: 200000, itemQty: 20, detailMenu: '10x Thai Tea, 10x Chocomilo Dino' }
];

const MOCK_BEST_SELLERS = [
  { nama: 'Jasmine Tea (Jumbo)', kategori: 'Teh Tubruk', terjual: 145, omset: 580000 },
  { nama: 'Es Permen Karet Pink', kategori: 'Permen Karet', terjual: 98, omset: 490000 },
  { nama: 'Thai Tea', kategori: 'Teh Creamy', terjual: 86, omset: 688000 },
  { nama: 'Kopi Turing Susu (KTS)', kategori: 'Kopi', terjual: 72, omset: 576000 },
  { nama: 'Dark Chocolate', kategori: 'Chocolate', terjual: 54, omset: 324000 }
];

const MOCK_OUTLET_PERFORMANCE = [ { nama: 'Outlet Pusat Pasuruan', transaksi: 178, omset: 1820000 }, { nama: 'Outlet Alun-Alun', transaksi: 132, omset: 1250000 } ];
const MOCK_KASIR_PERFORMANCE = [ { nama: 'Arul', transaksi: 165, omset: 1680000 }, { nama: 'Andi', transaksi: 145, omset: 1390000 } ];
const MOCK_HOURLY_TRAFFIC = [ { jam: '10:00', transaksi: 8 }, { jam: '12:00', transaksi: 25 }, { jam: '16:00', transaksi: 30 }, { jam: '19:00', transaksi: 55 } ];

const MOCK_YEARLY_REVENUE = [ 
  { id: '2026', label: 'Tahun 2026', omset: 22170000 }, 
  { id: '2025', label: 'Tahun 2025', omset: 48500000 }, 
  { id: '2024', label: 'Tahun 2024', omset: 32000000 } 
];

const MOCK_MONTHLY_REVENUE = [ 
  { id: '2026-06', yearId: '2026', label: 'Juni 2026', omset: 3070000 }, 
  { id: '2026-05', yearId: '2026', label: 'Mei 2026', omset: 4500000 }, 
  { id: '2026-04', yearId: '2026', label: 'April 2026', omset: 4200000 }, 
  { id: '2025-12', yearId: '2025', label: 'Desember 2025', omset: 5100000 } 
];

const MOCK_DAILY_REVENUE = [ 
  { date: '2026-06-14', monthId: '2026-06', label: '14 Juni (Hari Ini)', omset: 179000 }, 
  { date: '2026-06-13', monthId: '2026-06', label: '13 Juni', omset: 70000 },
  { date: '2026-06-12', monthId: '2026-06', label: '12 Juni', omset: 90000 },
  { date: '2026-06-11', monthId: '2026-06', label: '11 Juni', omset: 30000 },
  { date: '2026-06-10', monthId: '2026-06', label: '10 Juni', omset: 42000 },
  { date: '2026-06-09', monthId: '2026-06', label: '09 Juni', omset: 55000 },
  { date: '2026-05-31', monthId: '2026-05', label: '31 Mei', omset: 150000 },
  { date: '2025-12-31', monthId: '2025-12', label: '31 Desember', omset: 200000 }
];

function Owner() {
  const navigate = useNavigate();

  // STATE BARU: Kontrol Burger Menu (Sidebar) di HP
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [activeTab, setActiveTab] = useState('summary'); 
  const [filterDate, setFilterDate] = useState('');
  const [filterOutlet, setFilterOutlet] = useState('Semua');
  const [filterKasir, setFilterKasir] = useState('Semua');

  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('2026-06');
  const [selectedDetailDate, setSelectedDetailDate] = useState('2026-06-14');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); // Tutup sidebar otomatis saat menu dipilih (khusus di HP)
  };

  const handleYearClick = (yearId) => {
    setSelectedYear(yearId);
    const firstMonth = MOCK_MONTHLY_REVENUE.find(m => m.yearId === yearId);
    if (firstMonth) {
      setSelectedMonth(firstMonth.id);
      const firstDay = MOCK_DAILY_REVENUE.find(d => d.monthId === firstMonth.id);
      setSelectedDetailDate(firstDay ? firstDay.date : '');
    } else {
      setSelectedMonth('');
      setSelectedDetailDate('');
    }
  };

  const handleMonthClick = (monthId) => {
    setSelectedMonth(monthId);
    const firstDay = MOCK_DAILY_REVENUE.find(d => d.monthId === monthId);
    setSelectedDetailDate(firstDay ? firstDay.date : '');
  };

  const filteredTransactions = INITIAL_TRANSACTIONS.filter(tx => {
    const matchDate = filterDate ? tx.tanggal === filterDate : true;
    const matchOutlet = filterOutlet === 'Semua' ? true : tx.outlet === filterOutlet;
    const matchKasir = filterKasir === 'Semua' ? true : tx.kasir === filterKasir;
    return matchDate && matchOutlet && matchKasir;
  });

  const filteredOmset = filteredTransactions.reduce((sum, tx) => sum + tx.total, 0);
  const filteredTotalTX = filteredTransactions.length;

  const totalOmsetToday = INITIAL_TRANSACTIONS.filter(tx => tx.tanggal === '2026-06-14').reduce((sum, tx) => sum + tx.total, 0);
  const totalTxToday = INITIAL_TRANSACTIONS.filter(tx => tx.tanggal === '2026-06-14').length;
  const totalProductsSoldToday = INITIAL_TRANSACTIONS.filter(tx => tx.tanggal === '2026-06-14').reduce((sum, tx) => sum + tx.itemQty, 0);

  const filteredMonths = MOCK_MONTHLY_REVENUE.filter(m => m.yearId === selectedYear);
  const filteredDays = MOCK_DAILY_REVENUE.filter(d => d.monthId === selectedMonth);
  const detailTransactionsList = INITIAL_TRANSACTIONS.filter(tx => tx.tanggal === selectedDetailDate);
  const selectedDateLabel = MOCK_DAILY_REVENUE.find(d => d.date === selectedDetailDate)?.label || selectedDetailDate;

  return (
    <div style={styles.container}>
      {/* HEADER BAR */}
      <header style={styles.header}>
        <div style={styles.logoArea}>
          {/* Tombol Burger (Tampil Hanya di HP) */}
          <button 
            className="mobile-burger" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <img src={logoTubrukTelu} alt="Logo" style={styles.brandLogo} className="brand-logo" />
          <span style={styles.badgeOwner} className="hide-on-mobile">Panel Owner</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }} className="header-right">
          <div style={styles.userInfo}>Selamat Datang, Owner</div>
          <button onClick={() => { if (window.confirm("Keluar dari dashboard Owner?")) navigate('/login'); }} style={styles.btnLogout}>Keluar</button>
        </div>
      </header>

      {/* DASHBOARD WORKSPACE */}
      <div style={styles.workspace}>
        {/* SIDEBAR */}
        <aside style={styles.sidebar} className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
          <p style={styles.sidebarTitle}>MENU UTAMA OWNER</p>
          <button onClick={() => handleTabChange('summary')} style={{...styles.sideBtn, ...(activeTab === 'summary' ? styles.sideBtnActive : {})}}>Dashboard Ringkasan</button>
          <button onClick={() => handleTabChange('transactions')} style={{...styles.sideBtn, ...(activeTab === 'transactions' ? styles.sideBtnActive : {})}}>Laporan Penjualan</button>
          <button onClick={() => handleTabChange('analysis')} style={{...styles.sideBtn, ...(activeTab === 'analysis' ? styles.sideBtnActive : {})}}>Analisis Performa</button>
          <button onClick={() => handleTabChange('financials')} style={{...styles.sideBtn, ...(activeTab === 'financials' ? styles.sideBtnActive : {})}}>Laporan Keuangan</button>
        </aside>

        {/* CONTENT AREA */}
        <main style={styles.content}>
          {activeTab === 'summary' && (
            <div style={styles.tabContent}>
              <h2 style={styles.pageTitle}>Dashboard Ringkasan Bisnis (Hari Ini)</h2>
              <div style={styles.kpiGrid} className="kpiGrid">
                <div style={styles.kpiCard}><div style={styles.kpiIconBox}>💰</div><div><p style={styles.kpiLabel}>Omset Hari Ini</p><h3 style={styles.kpiValue}>Rp {totalOmsetToday.toLocaleString('id-ID')}</h3></div></div>
                <div style={styles.kpiCard}><div style={styles.kpiIconBox}>🛒</div><div><p style={styles.kpiLabel}>Total Transaksi</p><h3 style={styles.kpiValue}>{totalTxToday} Transaksi</h3></div></div>
                <div style={styles.kpiCard}><div style={styles.kpiIconBox}>🍹</div><div><p style={styles.kpiLabel}>Total Produk Terjual</p><h3 style={styles.kpiValue}>{totalProductsSoldToday} Cup</h3></div></div>
                <div style={styles.kpiCard}><div style={styles.kpiIconBox}>🏢</div><div><p style={styles.kpiLabel}>Outlet Aktif</p><h3 style={styles.kpiValue}>2 Cabang</h3></div></div>
              </div>
              <div style={styles.sectionCard}>
                <h3 style={styles.cardTitle}>Analisis Jam Ramai (Beban Transaksi Harian)</h3>
                <p style={{ fontSize: '12px', color: '#8A9A5B', margin: '-10px 0 20px 0', fontWeight: 'bold' }}>Menunjukkan sebaran frekuensi transaksi per jam operasional.</p>
                <div style={styles.chartWrapper} className="chartWrapper">
                  {MOCK_HOURLY_TRAFFIC.map(item => {
                    const barHeight = (item.transaksi / 55) * 150;
                    return (
                      <div key={item.jam} style={styles.chartCol}>
                        <div style={styles.chartValueLabel}>{item.transaksi}</div>
                        <div style={{ ...styles.chartBar, height: `${barHeight}px`, backgroundColor: item.transaksi > 30 ? '#3B5D14' : '#8A9A5B' }}></div>
                        <div style={styles.chartAxisLabel}>{item.jam}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
             <div style={styles.tabContent}>
               <h2 style={styles.pageTitle}>Laporan Riwayat & Filter Penjualan</h2>
               <div style={styles.filterCard}>
                 <h4 style={{ margin: '0 0 15px 0', color: '#3B5D14' }}>Filter Pencarian Laporan</h4>
                 <div style={styles.filterGrid} className="filterGrid">
                   <div style={styles.filterGroup}>
                     <label style={styles.filterLabel}>Pilih Tanggal</label>
                     <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} style={styles.filterInput} />
                   </div>
                   <div style={styles.filterGroup}>
                     <label style={styles.filterLabel}>Pilih Outlet Cabang</label>
                     <select value={filterOutlet} onChange={e => setFilterOutlet(e.target.value)} style={styles.filterSelect}>
                       <option value="Semua">Semua Outlet</option>
                       <option value="Outlet Pusat Pasuruan">Outlet Pusat Pasuruan</option>
                       <option value="Outlet Alun-Alun">Outlet Alun-Alun</option>
                     </select>
                   </div>
                   <div style={styles.filterGroup}>
                     <label style={styles.filterLabel}>Pilih Kasir Tugas</label>
                     <select value={filterKasir} onChange={e => setFilterKasir(e.target.value)} style={styles.filterSelect}>
                       <option value="Semua">Semua Kasir</option>
                       <option value="Arul">Arul</option>
                       <option value="Andi">Andi</option>
                     </select>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                     <button onClick={() => { setFilterDate(''); setFilterOutlet('Semua'); setFilterKasir('Semua'); }} style={styles.btnResetFilter}>Reset Filter</button>
                   </div>
                 </div>
               </div>

               <div style={styles.filteredSummaryRow}>
                 <div style={styles.filteredSummaryCard}>
                   <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#4C3224', fontWeight: 'bold' }}>Total Omset Terfilter</p>
                   <h3 style={{ margin: 0, color: '#3B5D14' }}>Rp {filteredOmset.toLocaleString('id-ID')}</h3>
                 </div>
                 <div style={styles.filteredSummaryCard}>
                   <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#4C3224', fontWeight: 'bold' }}>Frekuensi Transaksi</p>
                   <h3 style={{ margin: 0, color: '#1A1A1A' }}>{filteredTotalTX} Transaksi</h3>
                 </div>
               </div>

               <div style={styles.sectionCard}>
                 <h3 style={styles.cardTitle}>Tabel Penjualan Produk</h3>
                 <div className="table-responsive">
                   <table style={styles.table}>
                     <thead>
                       <tr>
                         <th style={styles.th}>ID Transaksi</th>
                         <th style={styles.th}>Tanggal</th>
                         <th style={styles.th}>Waktu</th>
                         <th style={styles.th}>Outlet</th>
                         <th style={styles.th}>Kasir</th>
                         <th style={styles.th}>Produk Terjual (Qty)</th>
                         <th style={styles.th}>Total Omset</th>
                       </tr>
                     </thead>
                     <tbody>
                       {filteredTransactions.length === 0 ? (
                         <tr><td colSpan="7" style={{ textAlign: 'center', color: '#8A9A5B', padding: '30px', fontWeight: 'bold' }}>Tidak ada transaksi yang cocok dengan filter.</td></tr>
                       ) : (
                         filteredTransactions.map(tx => (
                           <tr key={tx.id}>
                             <td style={styles.td}><code>{tx.id}</code></td>
                             <td style={styles.td}>{tx.tanggal}</td>
                             <td style={styles.td}>{tx.jam} WIB</td>
                             <td style={styles.td}><strong>{tx.outlet}</strong></td>
                             <td style={styles.td}>{tx.kasir}</td>
                             <td style={styles.td}>{tx.itemQty} cup</td>
                             <td style={{ ...styles.td, fontWeight: 'bold', color: '#3B5D14' }}>Rp {tx.total.toLocaleString('id-ID')}</td>
                           </tr>
                         ))
                       )}
                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
          )}

          {activeTab === 'analysis' && (
             <div style={styles.tabContent}>
               <h2 style={styles.pageTitle}>Analisis Kinerja Produk, Outlet, & Kasir</h2>

               <div style={styles.twoColumnGrid} className="twoColumnGrid">
                 <div style={styles.sectionCard}>
                   <h3 style={styles.cardTitle}>Peringkat Menu Terlaris</h3>
                   <div className="table-responsive">
                     <table style={styles.table}>
                       <thead>
                         <tr>
                           <th style={styles.th}>Peringkat</th>
                           <th style={styles.th}>Nama Menu</th>
                           <th style={styles.th}>Kategori</th>
                           <th style={styles.th}>Cup Terjual</th>
                           <th style={styles.th}>Pendapatan</th>
                         </tr>
                       </thead>
                       <tbody>
                         {MOCK_BEST_SELLERS.map((prod, index) => (
                           <tr key={index}>
                             <td style={{ ...styles.td, fontWeight: 'bold', textAlign: 'center', color: '#3B5D14' }}>#{index + 1}</td>
                             <td style={styles.td}><strong>{prod.nama}</strong></td>
                             <td style={styles.td}><span style={styles.badgeCategory}>{prod.kategori}</span></td>
                             <td style={styles.td}>{prod.terjual} Cup</td>
                             <td style={{ ...styles.td, fontWeight: 'bold', color: '#3B5D14' }}>Rp {prod.omset.toLocaleString('id-ID')}</td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                 </div>

                 <div style={styles.sectionCard}>
                   <h3 style={styles.cardTitle}>Kinerja Penjualan Outlet</h3>
                   <div className="table-responsive">
                     <table style={styles.table}>
                       <thead>
                         <tr>
                           <th style={styles.th}>Cabang Outlet</th>
                           <th style={styles.th}>Total Transaksi</th>
                           <th style={styles.th}>Total Omset</th>
                         </tr>
                       </thead>
                       <tbody>
                         {MOCK_OUTLET_PERFORMANCE.map((outlet, index) => (
                           <tr key={index}>
                             <td style={styles.td}><strong>{outlet.nama}</strong></td>
                             <td style={styles.td}>{outlet.transaksi} transaksi</td>
                             <td style={{ ...styles.td, fontWeight: 'bold', color: '#3B5D14' }}>Rp {outlet.omset.toLocaleString('id-ID')}</td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                 </div>
               </div>

               <div style={{ ...styles.sectionCard, marginTop: '20px' }}>
                 <h3 style={styles.cardTitle}>Kinerja Kasir (Proses Shift)</h3>
                 <div className="table-responsive">
                   <table style={styles.table}>
                     <thead>
                       <tr>
                         <th style={styles.th}>Nama Staff Kasir</th>
                         <th style={styles.th}>Jumlah Transaksi Dilayani</th>
                         <th style={styles.th}>Total Omset Terproses</th>
                       </tr>
                     </thead>
                     <tbody>
                       {MOCK_KASIR_PERFORMANCE.map((kasir, index) => (
                         <tr key={index}>
                           <td style={styles.td}><strong>{kasir.nama}</strong></td>
                           <td style={styles.td}>{kasir.transaksi} kali</td>
                           <td style={{ ...styles.td, fontWeight: 'bold', color: '#3B5D14' }}>Rp {kasir.omset.toLocaleString('id-ID')}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
          )}

          {activeTab === 'financials' && (
             <div style={styles.tabContent}>
               <h2 style={styles.pageTitle}>Laporan Akumulasi Omset Keuangan</h2>
               
               <div style={styles.threeColumnGrid} className="threeColumnGrid">
                 <div style={styles.sectionCard}>
                   <h3 style={styles.cardTitle}>Omset Tahunan</h3>
                   <div className="table-responsive">
                     <table style={styles.table}>
                       <thead><tr><th style={styles.th}>Tahun</th><th style={styles.th}>Omset</th></tr></thead>
                       <tbody>
                         {MOCK_YEARLY_REVENUE.map((item, idx) => (
                           <tr 
                             key={idx} 
                             onClick={() => handleYearClick(item.id)}
                             style={{ cursor: 'pointer', backgroundColor: selectedYear === item.id ? '#EAD5B2' : 'transparent', transition: '0.2s' }}
                           >
                             <td style={styles.td}><strong>{item.label}</strong></td>
                             <td style={{ ...styles.td, fontWeight: 'bold', color: '#3B5D14', fontSize: '15px' }}>Rp {item.omset.toLocaleString('id-ID')}</td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                 </div>

                 <div style={styles.sectionCard}>
                   <h3 style={styles.cardTitle}>Omset Bulanan ({selectedYear})</h3>
                   <div className="table-responsive">
                     <table style={styles.table}>
                       <thead><tr><th style={styles.th}>Bulan</th><th style={styles.th}>Omset</th></tr></thead>
                       <tbody>
                         {filteredMonths.length === 0 ? (
                           <tr><td colSpan="2" style={{ textAlign:'center', color:'#8A9A5B', padding:'10px' }}>Tidak ada data</td></tr>
                         ) : (
                           filteredMonths.map((item, idx) => (
                             <tr 
                               key={idx}
                               onClick={() => handleMonthClick(item.id)}
                               style={{ cursor: 'pointer', backgroundColor: selectedMonth === item.id ? '#EAD5B2' : 'transparent', transition: '0.2s' }}
                             >
                               <td style={styles.td}><strong>{item.label}</strong></td>
                               <td style={{ ...styles.td, fontWeight: 'bold', color: '#3B5D14' }}>Rp {item.omset.toLocaleString('id-ID')}</td>
                             </tr>
                           ))
                         )}
                       </tbody>
                     </table>
                   </div>
                 </div>

                 <div style={styles.sectionCard}>
                   <h3 style={styles.cardTitle}>Omset Harian (Bulan {selectedMonth.slice(-2)})</h3>
                   <div className="table-responsive">
                     <table style={styles.table}>
                       <thead><tr><th style={styles.th}>Hari / Tanggal</th><th style={styles.th}>Omset</th></tr></thead>
                       <tbody>
                         {filteredDays.length === 0 ? (
                           <tr><td colSpan="2" style={{ textAlign:'center', color:'#8A9A5B', padding:'10px' }}>Tidak ada data</td></tr>
                         ) : (
                           filteredDays.map((item, idx) => (
                             <tr 
                               key={idx} 
                               onClick={() => setSelectedDetailDate(item.date)}
                               style={{ cursor: 'pointer', backgroundColor: selectedDetailDate === item.date ? '#EAD5B2' : 'transparent', transition: '0.2s' }}
                             >
                               <td style={styles.td}>{item.label}</td>
                               <td style={{ ...styles.td, fontWeight: 'bold', color: '#3B5D14' }}>Rp {item.omset.toLocaleString('id-ID')}</td>
                             </tr>
                           ))
                         )}
                       </tbody>
                     </table>
                   </div>
                 </div>
               </div>

               <div style={{ ...styles.sectionCard, marginTop: '10px' }}>
                  <h3 style={styles.cardTitle}>
                    🧾 Detail Uang Masuk {selectedDateLabel.includes('Hari Ini') ? '(14 Juni)' : `(${selectedDateLabel})`}
                  </h3>
                  <div className="table-responsive">
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th style={styles.th}>Waktu</th>
                          <th style={styles.th}>Outlet</th>
                          <th style={styles.th}>Staf Kasir</th>
                          <th style={styles.th}>Menu Terjual</th>
                          <th style={styles.th}>Nominal Masuk</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailTransactionsList.length === 0 ? (
                          <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#8A9A5B' }}>Belum ada data transaksi untuk tanggal ini.</td></tr>
                        ) : (
                          detailTransactionsList.map((tx, idx) => (
                            <tr key={idx}>
                              <td style={{...styles.td, fontWeight: 'bold', color: '#4C3224'}}>{tx.jam} WIB</td>
                              <td style={styles.td}><strong>{tx.outlet}</strong></td>
                              <td style={styles.td}>{tx.kasir}</td>
                              <td style={{...styles.td, fontSize: '13px'}}>{tx.detailMenu}</td>
                              <td style={{ ...styles.td, fontWeight: 'bold', color: '#3B5D14', fontSize: '15px' }}>+ Rp {tx.total.toLocaleString('id-ID')}</td>
                            </tr>
                          ))
                        )}
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
    padding: '15px 30px',
    backgroundColor: '#FFFFFF',
    borderBottom: '2px solid #8A9A5B',
    boxShadow: '0 2px 4px rgba(76,50,36,0.05)'
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  brandLogo: {
    width: '150px',
    height: '40px',
    objectFit: 'contain'
  },
  badgeOwner: {
    backgroundColor: '#8A9A5B',
    color: '#FFFFFF',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 'bold'
  },
  userInfo: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#4C3224'
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
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  pageTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#4C3224'
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px'
  },
  kpiCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(76,50,36,0.1)',
    border: '1px solid #8A9A5B',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  kpiIconBox: {
    fontSize: '24px',
    width: '45px',
    height: '45px',
    borderRadius: '8px',
    backgroundColor: '#EAD5B2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  kpiLabel: {
    margin: '0 0 4px 0',
    fontSize: '12px',
    color: '#4C3224',
    fontWeight: 'bold'
  },
  kpiValue: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#3B5D14'
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #8A9A5B'
  },
  cardTitle: {
    margin: '0 0 15px 0',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#4C3224',
    borderBottom: '2px solid #EAD5B2',
    paddingBottom: '8px'
  },
  chartWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '210px',
    padding: '20px 10px 10px 10px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px'
  },
  chartCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    minWidth: '40px'
  },
  chartValueLabel: {
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#4C3224',
    marginBottom: '4px'
  },
  chartBar: {
    width: '18px',
    borderRadius: '4px 4px 0 0',
    transition: 'height 0.5s ease'
  },
  chartAxisLabel: {
    fontSize: '9px',
    color: '#4C3224',
    marginTop: '6px',
    fontWeight: 'bold'
  },
  filterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #8A9A5B'
  },
  filterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  filterLabel: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#4C3224'
  },
  filterInput: {
    padding: '10px',
    fontSize: '13px',
    borderRadius: '6px',
    border: '1px solid #8A9A5B',
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A'
  },
  filterSelect: {
    padding: '10px',
    fontSize: '13px',
    borderRadius: '6px',
    border: '1px solid #8A9A5B',
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
    cursor: 'pointer'
  },
  btnResetFilter: {
    padding: '10px 15px',
    backgroundColor: '#8A9A5B',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%'
  },
  filteredSummaryRow: {
    display: 'flex',
    gap: '20px'
  },
  filteredSummaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    padding: '15px',
    border: '1px solid #8A9A5B'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  th: {
    padding: '12px',
    borderBottom: '1px solid #EAD5B2',
    fontSize: '14px',
    color: '#4C3224',
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #EAD5B2',
    fontSize: '14px',
    color: '#1A1A1A'
  },
  badgeCategory: {
    backgroundColor: '#8A9A5B',
    color: '#FFFFFF',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold'
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '20px'
  },
  threeColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '20px'
  }
};

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    table th, table td { padding: 12px; border-bottom: 1px solid #EAD5B2; font-size: 14px; } 
    table th { color: #4C3224; font-weight: bold; background-color: #FFFFFF; }
    
    /* Responsive Mobile UI */
    .mobile-burger { display: none; background: none; border: none; font-size: 24px; cursor: pointer; color: #4C3224; margin-right: 10px; }
    .sidebar-container { transition: 0.3s ease-in-out; }
    .table-responsive { overflow-x: auto; }
    
    @media (max-width: 768px) {
      .mobile-burger { display: block; }
      .sidebar-container { position: absolute; left: -100%; top: 70px; bottom: 0; z-index: 50; box-shadow: 2px 0 10px rgba(0,0,0,0.1); width: 250px; }
      .sidebar-container.open { left: 0; }
      .hide-on-mobile { display: none !important; }
      .brand-logo { height: 30px !important; }
      .header-right { flex-direction: column; align-items: flex-end; gap: 5px; }
      .kpiGrid { grid-template-columns: 1fr !important; }
      .twoColumnGrid { grid-template-columns: 1fr !important; }
      .threeColumnGrid { grid-template-columns: 1fr !important; }
      .chartWrapper { overflow-x: auto; }
      .filterGrid { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(styleSheet);
}
export default Owner;