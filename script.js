/**
 * PROMATH GUI - Script
 * Flow: Welcome → Beranda → Galeri / Studio / Zona Tantangan / Dashboard
 * Skor dari Zona Tantangan tersimpan dan tampil di Dashboard
 */

document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    const namaInput = document.getElementById('nama-input');
    const greetingText = document.getElementById('greeting-text');
    const navLeftWelcome = document.getElementById('nav-left-welcome');
    const navLeftApp = document.getElementById('nav-left-app');
    const btnPanduan = document.getElementById('btn-panduan');
    const panduanModal = document.getElementById('panduan-modal');
    const modalClose = document.getElementById('modal-close');
    const welcomeToast = document.getElementById('welcome-toast');
    const toastMessage = document.getElementById('toast-message');

    let isInApp = false;

    // ---- Materi Data ----
    const materiData = [
        { title: 'BATIK PROBOLINGGO', image: 'assets/images/batik-geometri-1.jpg',
          batik: 'Batik Probolinggo memiliki motif khas yang terinspirasi dari keindahan alam dan budaya lokal. Setiap motif memiliki makna filosofis yang mendalam.',
          matematika: 'Motif batik ini menunjukkan konsep transformasi geometri berupa refleksi (pencerminan) dan simetri rotasi.' },
        { title: 'BATIK KANGKUNG', image: 'assets/images/batik-geometri-2.jpg',
          batik: 'Batik Kangkung merupakan motif khas Probolinggo yang menggambarkan tanaman kangkung sebagai simbol kesuburan.',
          matematika: 'Pola Batik Kangkung menunjukkan simetri rotasi C2 dan pola translasi (p1).' },
        { title: 'BATIK SINGO BARONG', image: 'assets/images/batik-geometri-3.jpg',
          batik: 'Batik Singo Barong menampilkan motif singa sebagai simbol kekuatan dan keberanian dalam budaya Probolinggo.',
          matematika: 'Motif Singo Barong menunjukkan sifat fraktal dan teselasi.' }
    ];

    // ---- Soal Data ----
    const soalData = [
        { title: 'BATIK PROBOLINGGO', image: 'assets/images/batik-geometri-1.jpg', nama: 'Pengenalan Pola',
          soal: 'Perhatikan gambar motif batik di atas. Jenis transformasi geometri apa yang ditunjukkan oleh garis merah putus-putus?',
          options: ['A. Translasi', 'B. Refleksi (Pencerminan)', 'C. Dilatasi', 'D. Komposisi Transformasi'], correct: 1 },
        { title: 'BATIK KANGKUNG', image: 'assets/images/batik-geometri-2.jpg', nama: 'Simetri Rotasi',
          soal: 'Motif Batik Kangkung memiliki simetri rotasi. Berapa derajat sudut rotasi minimum agar motif terlihat sama?',
          options: ['A. 90°', 'B. 120°', 'C. 180°', 'D. 360°'], correct: 2 },
        { title: 'BATIK SINGO BARONG', image: 'assets/images/batik-geometri-3.jpg', nama: 'Fraktal Batik',
          soal: 'Manakah yang merupakan ciri fraktal pada motif Batik Singo Barong?',
          options: ['A. Pola berulang pada skala berbeda', 'B. Garis lurus simetris', 'C. Warna gradasi', 'D. Bentuk lingkaran konsentris'], correct: 0 }
    ];

    // ---- Score Tracking ----
    let scoreData = soalData.map(s => ({
        nama: s.nama,
        percobaan: 0,
        skorTerakhir: '-',
        waktuTerakhir: '-',
        history: []
    }));

    let galeriIndex = 0, studioIndex = 0, zonaIndex = 0;
    let zonaStartTime = null;

    // ---- Show a page by ID ----
    function showPage(pageId) {
        if (!isInApp) {
            isInApp = true;
            navLeftWelcome.classList.add('hidden');
            navLeftApp.classList.remove('hidden');
            const name = namaInput.value.trim();
            greetingText.textContent = name ? `Hai, ${name}` : 'Hai, ....';
        }
        navBtns.forEach(b => b.classList.remove('active'));
        if (pageId === 'page-beranda') document.getElementById('nav-beranda').classList.add('active');
        else if (pageId.startsWith('page-materi') || pageId === 'page-dashboard') document.getElementById('nav-materi').classList.add('active');
        else if (pageId === 'page-zona-tantangan') document.getElementById('nav-latihan').classList.add('active');

        pages.forEach(p => p.classList.remove('active'));
        const target = document.getElementById(pageId);
        if (target) target.classList.add('active');

        if (pageId === 'page-dashboard') updateDashboard();
        if (pageId === 'page-zona-tantangan') zonaStartTime = Date.now();
    }

    // ---- Nav clicks ----
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const page = btn.getAttribute('data-page');
            if (page === 'beranda') showPage('page-beranda');
            else if (page === 'materi') showPage('page-materi-galeri');
            else if (page === 'latihan') showPage('page-zona-tantangan');
        });
    });

    // ---- Menu items on Beranda ----
    bindMenu('menu-galeri', 'page-materi-galeri');
    bindMenu('menu-studio', 'page-materi-studio');
    bindMenu('menu-zona', 'page-zona-tantangan');
    bindMenu('menu-dashboard', 'page-dashboard');

    function bindMenu(menuId, pageId) {
        const el = document.getElementById(menuId);
        if (el) el.addEventListener('click', (e) => { e.preventDefault(); showPage(pageId); });
    }

    // ---- Hero banner ----
    const heroBanner = document.getElementById('hero-banner');
    if (heroBanner) heroBanner.addEventListener('click', () => { showPage('page-materi-galeri'); showToast('Ayo mulai belajar! 📚'); });

    // ---- Dashboard cards link to pages ----
    const dashGaleri = document.getElementById('dash-galeri');
    const dashStudio = document.getElementById('dash-studio');
    const dashZona = document.getElementById('dash-zona');
    if (dashGaleri) dashGaleri.addEventListener('click', () => showPage('page-materi-galeri'));
    if (dashStudio) dashStudio.addEventListener('click', () => showPage('page-materi-studio'));
    if (dashZona) dashZona.addEventListener('click', () => showPage('page-zona-tantangan'));

    // ---- Panduan Modal ----
    btnPanduan.addEventListener('click', () => panduanModal.classList.add('active'));
    modalClose.addEventListener('click', closeModal);
    panduanModal.addEventListener('click', (e) => { if (e.target === panduanModal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panduanModal.classList.contains('active')) closeModal(); });
    function closeModal() { panduanModal.classList.remove('active'); }

    // ==== GALERI ====
    const galeriTitle = document.getElementById('galeri-title');
    const galeriImage = document.getElementById('galeri-image');
    const btnPBatik = document.getElementById('btn-penjelasan-batik');
    const btnPMat = document.getElementById('btn-penjelasan-matematika');
    const panelBatik = document.getElementById('panel-batik');
    const panelMat = document.getElementById('panel-matematika');
    const txtBatik = document.getElementById('penjelasan-batik-text');
    const txtMat = document.getElementById('penjelasan-matematika-text');

    function loadGaleri(i) {
        const d = materiData[i];
        galeriTitle.textContent = d.title; galeriImage.src = d.image;
        txtBatik.textContent = d.batik; txtMat.textContent = d.matematika;
        panelBatik.classList.add('hidden'); panelBatik.classList.remove('visible');
        panelMat.classList.add('hidden'); panelMat.classList.remove('visible');
        btnPBatik.classList.remove('active'); btnPMat.classList.remove('active');
    }
    btnPBatik.addEventListener('click', () => togglePanel(panelBatik, btnPBatik, panelMat, btnPMat));
    btnPMat.addEventListener('click', () => togglePanel(panelMat, btnPMat, panelBatik, btnPBatik));
    function togglePanel(p, b, op, ob) {
        const open = p.classList.contains('visible');
        op.classList.add('hidden'); op.classList.remove('visible'); ob.classList.remove('active');
        if (open) { p.classList.add('hidden'); p.classList.remove('visible'); b.classList.remove('active'); }
        else { p.classList.remove('hidden'); p.classList.add('visible'); b.classList.add('active'); }
    }
    document.getElementById('btn-galeri-prev').addEventListener('click', () => { galeriIndex = (galeriIndex - 1 + materiData.length) % materiData.length; loadGaleri(galeriIndex); });
    document.getElementById('btn-galeri-next').addEventListener('click', () => { galeriIndex = (galeriIndex + 1) % materiData.length; loadGaleri(galeriIndex); });
    loadGaleri(0);

    // ==== STUDIO ====
    const studioTitle = document.getElementById('studio-title');
    function loadStudio(i) { studioTitle.textContent = materiData[i].title; }
    document.getElementById('btn-studio-prev').addEventListener('click', () => { studioIndex = (studioIndex - 1 + materiData.length) % materiData.length; loadStudio(studioIndex); });
    document.getElementById('btn-studio-next').addEventListener('click', () => { studioIndex = (studioIndex + 1) % materiData.length; loadStudio(studioIndex); });
    loadStudio(0);

    // ==== ZONA TANTANGAN ====
    const zonaTitle = document.getElementById('zona-title');
    const soalImage = document.getElementById('soal-image');
    const soalText = document.getElementById('soal-text');
    const jawabanOptions = document.getElementById('jawaban-options');

    function loadZona(i) {
        const d = soalData[i];
        zonaTitle.textContent = d.title; soalImage.src = d.image;
        soalText.innerHTML = `<p>${d.soal}</p>`;
        zonaStartTime = Date.now();
        jawabanOptions.innerHTML = '';
        d.options.forEach((opt, j) => {
            const btn = document.createElement('button');
            btn.className = 'jawaban-option'; btn.textContent = opt;
            btn.addEventListener('click', () => handleAnswer(btn, j, d.correct, i));
            jawabanOptions.appendChild(btn);
        });
    }

    function handleAnswer(btn, sel, cor, soalIdx) {
        const elapsed = zonaStartTime ? Math.round((Date.now() - zonaStartTime) / 1000) : 0;
        const allBtns = jawabanOptions.querySelectorAll('.jawaban-option');
        allBtns.forEach(b => { b.style.pointerEvents = 'none'; b.classList.remove('selected'); });

        const isCorrect = sel === cor;
        if (isCorrect) { btn.classList.add('correct'); showToast('Jawaban Benar! ✅'); }
        else { btn.classList.add('wrong'); allBtns[cor].classList.add('correct'); showToast('Jawaban Salah ❌'); }

        // Save score — selalu update ke jawaban terakhir
        const sd = scoreData[soalIdx];
        sd.percobaan++;
        const skor = isCorrect ? 100 : 0;
        sd.history.push(skor);
        sd.skorTerakhir = skor;
        sd.waktuTerakhir = elapsed + 's';
    }

    document.getElementById('btn-zona-prev').addEventListener('click', () => { zonaIndex = (zonaIndex - 1 + soalData.length) % soalData.length; loadZona(zonaIndex); });
    document.getElementById('btn-zona-next').addEventListener('click', () => { zonaIndex = (zonaIndex + 1) % soalData.length; loadZona(zonaIndex); });
    loadZona(0);

    // ==== DASHBOARD ====
    const tableBody = document.getElementById('table-body');
    const progresBar = document.getElementById('progres-bar');
    const progresPersen = document.getElementById('progres-persen');

    function updateDashboard() {
        // Table
        tableBody.innerHTML = '';
        scoreData.forEach(sd => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${sd.nama}</td><td>${sd.percobaan}</td><td>${sd.skorTerakhir === '-' ? '-' : sd.skorTerakhir + '%'}</td><td>${sd.waktuTerakhir}</td>`;
            tableBody.appendChild(tr);
        });

        // Progress — berdasarkan skor terakhir
        const totalSoal = soalData.length;
        const answered = scoreData.filter(s => s.percobaan > 0).length;
        const correct = scoreData.filter(s => s.skorTerakhir === 100).length;
        const persen = answered > 0 ? Math.round((correct / totalSoal) * 100) : 0;
        progresBar.style.width = persen + '%';
        progresPersen.textContent = persen + '%';

        // Chart
        drawChart();
    }

    function drawChart() {
        const canvas = document.getElementById('grafik-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        // Collect all attempts across all soal
        let allScores = [];
        scoreData.forEach(sd => { allScores = allScores.concat(sd.history); });

        if (allScores.length === 0) {
            ctx.fillStyle = '#9895a8';
            ctx.font = '13px Outfit, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Belum ada data percobaan', w / 2, h / 2);
            return;
        }

        // Draw grid
        ctx.strokeStyle = '#e0dee8'; ctx.lineWidth = 0.5;
        for (let i = 0; i <= 4; i++) {
            const y = 10 + (i / 4) * (h - 30);
            ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(w - 10, y); ctx.stroke();
        }

        // Y-axis labels
        ctx.fillStyle = '#9895a8'; ctx.font = '9px Outfit'; ctx.textAlign = 'right';
        ['100', '75', '50', '25', '0'].forEach((l, i) => {
            ctx.fillText(l, 35, 14 + (i / 4) * (h - 30));
        });

        // Draw bars
        const barW = Math.min(30, (w - 60) / allScores.length - 4);
        const startX = 45;
        allScores.forEach((score, i) => {
            const x = startX + i * (barW + 4);
            const barH = (score / 100) * (h - 30);
            const y = h - 20 - barH;

            const grad = ctx.createLinearGradient(x, y, x, h - 20);
            grad.addColorStop(0, score > 0 ? '#8077C1' : '#ef4444');
            grad.addColorStop(1, score > 0 ? '#F68D1C' : '#fca5a5');
            ctx.fillStyle = grad;

            // Rounded top
            const r = Math.min(4, barW / 2);
            ctx.beginPath();
            ctx.moveTo(x, h - 20);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.lineTo(x + barW - r, y);
            ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
            ctx.lineTo(x + barW, h - 20);
            ctx.closePath();
            ctx.fill();

            // Label
            ctx.fillStyle = '#6b6880'; ctx.font = '8px Outfit'; ctx.textAlign = 'center';
            ctx.fillText(`${i + 1}`, x + barW / 2, h - 8);
        });
    }

    // Dashboard nav (prev/next not really needed but wire it)
    document.getElementById('btn-dash-prev').addEventListener('click', () => showPage('page-zona-tantangan'));
    document.getElementById('btn-dash-next').addEventListener('click', () => showPage('page-beranda'));

    updateDashboard();

    // ---- Toast ----
    let toastTimeout;
    function showToast(msg) {
        toastMessage.textContent = msg;
        welcomeToast.classList.add('active');
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => { welcomeToast.classList.remove('active'); }, 2500);
    }
});
