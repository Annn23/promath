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

    // ---- Soal Data (20 Soal dari Galeri Batik) ----
    const soalData = [
        // === BATIK 1: Transformasi Geometri (batik-transformasi-analisis.png) ===
        { title: 'BATIK GEOMETRI', image: 'assets/images/batik-transformasi-analisis.png', nama: 'Soal 1 - Translasi',
          soal: 'Perhatikan highlight kuning dan biru muda pada gambar batik di atas. Motif utama dalam kotak digeser secara horisontal ke kanan. Jenis transformasi geometri apakah ini?',
          options: ['A. Refleksi', 'B. Rotasi', 'C. Translasi (Pergeseran)', 'D. Dilatasi'], correct: 2 },
        { title: 'BATIK GEOMETRI', image: 'assets/images/batik-transformasi-analisis.png', nama: 'Soal 2 - Refleksi',
          soal: 'Pada batik geometri, area berwarna merah marun bertekstur jaring dicerminkan terhadap garis diagonal menghasilkan bentuk simetris berlawanan. Transformasi ini disebut...',
          options: ['A. Translasi', 'B. Refleksi (Pencerminan)', 'C. Rotasi', 'D. Kesebangunan'], correct: 1 },

        // === BATIK 2: Mangga (batik-mangga-analisis.png) ===
        { title: 'BATIK MANGGA', image: 'assets/images/batik-mangga-analisis.png', nama: 'Soal 3 - Translasi Diagonal',
          soal: 'Rangkaian pasang buah mangga oranye berpindah secara sejajar menyusuri garis diagonal dari kiri atas ke kanan bawah. Konsep matematika apa yang diterapkan?',
          options: ['A. Rotasi 90°', 'B. Dilatasi', 'C. Translasi Diagonal', 'D. Refleksi Sumbu-Y'], correct: 2 },
        { title: 'BATIK MANGGA', image: 'assets/images/batik-mangga-analisis.png', nama: 'Soal 4 - Dilatasi',
          soal: 'Pada batik mangga, buah mangga berukuran besar dibandingkan butiran anggur merah dan bunga kuning yang jauh lebih kecil (k < 1). Konsep ini disebut...',
          options: ['A. Translasi', 'B. Refleksi', 'C. Rotasi', 'D. Dilatasi (Perubahan Skala)'], correct: 3 },

        // === BATIK 3: Bunga (batik-bunga-analisis.png) ===
        { title: 'BATIK BUNGA', image: 'assets/images/batik-bunga-analisis.png', nama: 'Soal 5 - Rotasi',
          soal: 'Kelopak bunga pada batik bunga tersusun melingkar. Satu kelopak diputar sebesar 90° mengelilingi titik pusat bunga untuk membentuk kelopak berikutnya. Ini adalah contoh...',
          options: ['A. Translasi', 'B. Refleksi', 'C. Rotasi (Perputaran)', 'D. Dilatasi'], correct: 2 },
        { title: 'BATIK BUNGA', image: 'assets/images/batik-bunga-analisis.png', nama: 'Soal 6 - Kekongruenan',
          soal: 'Ornamen ukiran lengkung di pojok kiri bawah dan kanan bawah batik bunga memiliki pola, panjang, dan bentuk yang persis identik. Konsep geometri ini disebut...',
          options: ['A. Kesebangunan', 'B. Kekongruenan', 'C. Translasi', 'D. Dilatasi'], correct: 1 },

        // === BATIK 4: Gurda (batik-gurda-analisis.png) ===
        { title: 'BATIK GURDA', image: 'assets/images/batik-gurda-analisis.png', nama: 'Soal 7 - Rotasi 180°',
          soal: 'Motif sayap gurda di kanan atas jika diputar 180° terhadap titik pusat bidang kain menghasilkan posisi motif sayap di kiri bawah. Rumus transformasinya adalah...',
          options: ['A. P(x,y) → P\'(x+a, y+b)', 'B. P(x,y) → P\'(-x, -y)', 'C. P(x,y) → P\'(kx, ky)', 'D. P(x,y) → P\'(-x, y)'], correct: 1 },
        { title: 'BATIK GURDA', image: 'assets/images/batik-gurda-analisis.png', nama: 'Soal 8 - Translasi Diagonal',
          soal: 'Pola daun-daun kecil dan sulur pada batik gurda berulang secara konsisten mengikuti pola garis lurus diagonal dengan translasi berulang T(a, b). Ini termasuk jenis transformasi...',
          options: ['A. Refleksi', 'B. Translasi', 'C. Rotasi', 'D. Kekongruenan'], correct: 1 },

        // === BATIK 5: Daun (batik-daun-analisis.png) ===
        { title: 'BATIK DAUN', image: 'assets/images/batik-daun-analisis.png', nama: 'Soal 9 - Refleksi',
          soal: 'Pada batik daun, susunan simetris daun/pucuk di kiri dan kanan dahan utama menyerupai bayangan cermin. Konsep geometri yang sesuai adalah...',
          options: ['A. Translasi', 'B. Dilatasi', 'C. Refleksi (Pencerminan)', 'D. Rotasi'], correct: 2 },
        { title: 'BATIK DAUN', image: 'assets/images/batik-daun-analisis.png', nama: 'Soal 10 - Kesebangunan',
          soal: 'Dua motif daun pada batik daun memiliki bentuk serupa namun proporsi ukurannya berbeda. Konsep ini disebut...',
          options: ['A. Kekongruenan', 'B. Translasi', 'C. Kesebangunan', 'D. Refleksi'], correct: 2 },

        // === BATIK 6: Teratai (batik-teratai-analisis.png) ===
        { title: 'BATIK TERATAI', image: 'assets/images/batik-teratai-analisis.png', nama: 'Soal 11 - Translasi',
          soal: 'Motif bunga pink pada batik teratai di kotak TRANSLASI (A) digeser ke posisi TRANSLASI (B) dengan bentuk dan arah sejajar. Rumus yang sesuai adalah...',
          options: ['A. P(x,y) → P\'(-x, y)', 'B. P(x,y) → P\'(x+a, y+b)', 'C. P(x,y) → P\'(-y, x)', 'D. P(x,y) → P\'(kx, ky)'], correct: 1 },
        { title: 'BATIK TERATAI', image: 'assets/images/batik-teratai-analisis.png', nama: 'Soal 12 - Dilatasi',
          soal: 'Pada batik teratai, pasangan motif buah kuning oval pada DILATASI (A) berukuran lebih besar dibanding DILATASI (B). Rumus dilatasi dengan faktor skala k adalah...',
          options: ['A. P(x,y) → P\'(x+a, y+b)', 'B. P(x,y) → P\'(-x, -y)', 'C. P(x,y) → P\'(kx, ky)', 'D. P(x,y) → P\'(x, -y)'], correct: 2 },

        // === BATIK 7: Anggur (batik-anggur-analisis.png) ===
        { title: 'BATIK ANGGUR', image: 'assets/images/batik-anggur-analisis.png', nama: 'Soal 13 - Translasi',
          soal: 'Rangkaian buah anggur merah beserta daunnya diulang dan digeser sejajar sepanjang sulur diagonal tanpa mengubah bentuk, ukuran, atau orientasi. Ini merupakan contoh...',
          options: ['A. Rotasi', 'B. Refleksi', 'C. Dilatasi', 'D. Translasi'], correct: 3 },
        { title: 'BATIK ANGGUR', image: 'assets/images/batik-anggur-analisis.png', nama: 'Soal 14 - Refleksi',
          soal: 'Pada batik anggur, pasangan daun dan kelompok buah mangga di bagian atas memiliki posisi saling berhadapan/mencermin. Sumbu pencerminan pada refleksi ini bersifat...',
          options: ['A. Imajiner (cermin imajiner)', 'B. Nyata terlihat pada kain', 'C. Berupa garis diagonal', 'D. Tidak ada sumbu'], correct: 0 },

        // === BATIK 8: Ayam (batik-ayam-analisis.png) ===
        { title: 'BATIK AYAM', image: 'assets/images/batik-ayam-analisis.png', nama: 'Soal 15 - Refleksi Cermin',
          soal: 'Motif Ayam Jantan pada batik ayam yang berhadapan (satu menghadap kanan, satu menghadap kiri) terpisah oleh garis cermin vertikal. Rumus pencerminan sumbu-Y adalah...',
          options: ['A. P(x,y) → P\'(x+a, y+b)', 'B. P(x,y) → P\'(-y, x)', 'C. P(x,y) → P\'(-x, y)', 'D. P(x,y) → P\'(kx, ky)'], correct: 2 },
        { title: 'BATIK AYAM', image: 'assets/images/batik-ayam-analisis.png', nama: 'Soal 16 - Kekongruenan',
          soal: 'Motif Belah Ketupat bertekstur serat kayu pada batik ayam diulang dengan ukuran dan bentuk seragam (Kongruen A & B). Syarat dua bangun dikatakan kongruen adalah...',
          options: ['A. Bentuk sama tapi ukuran berbeda', 'B. Bentuk dan ukuran persis sama', 'C. Sudut berbeda tapi sisi sama', 'D. Ukuran sama tapi bentuk berbeda'], correct: 1 },

        // === BATIK 9: Kupu-Kupu (batik-kupu-analisis.png) ===
        { title: 'BATIK KUPU-KUPU', image: 'assets/images/batik-kupu-analisis.png', nama: 'Soal 17 - Rotasi 180°',
          soal: 'Sulur daun hijau bergelombang pada batik kupu-kupu di pojok kanan atas diputar 180° menuju pojok kiri bawah. Rumus rotasi 180° adalah...',
          options: ['A. P(x,y) → P\'(x, -y)', 'B. P(x,y) → P\'(-x, y)', 'C. P(x,y) → P\'(-x, -y)', 'D. P(x,y) → P\'(y, x)'], correct: 2 },
        { title: 'BATIK KUPU-KUPU', image: 'assets/images/batik-kupu-analisis.png', nama: 'Soal 18 - Dilatasi',
          soal: 'Bunga krem kecil pada batik kupu-kupu diperbesar (skala k > 1) menjadi motif bunga krem besar. Jika koordinat asal P(2, 3) dan k = 2, maka P\' adalah...',
          options: ['A. P\'(4, 6)', 'B. P\'(4, 3)', 'C. P\'(2, 6)', 'D. P\'(1, 1.5)'], correct: 0 },

        // === BATIK 10: Ketupat (batik-ketupat-analisis.png) ===
        { title: 'BATIK KETUPAT', image: 'assets/images/batik-ketupat-analisis.png', nama: 'Soal 19 - Translasi & Kekongruenan',
          soal: 'Motif belah ketupat marun pada batik ketupat digeser berulang ke arah diagonal dan vertikal, dengan bentuk dan ukuran persis sama. Konsep geometri yang terlibat adalah...',
          options: ['A. Refleksi & Rotasi', 'B. Translasi & Kekongruenan', 'C. Dilatasi & Kesebangunan', 'D. Rotasi & Dilatasi'], correct: 1 },
        { title: 'BATIK KETUPAT', image: 'assets/images/batik-ketupat-analisis.png', nama: 'Soal 20 - Dilatasi & Kesebangunan',
          soal: 'Pengulangan bentuk bunga dari ukuran mekar (besar) hingga ukuran kuncup/kecil pada batik ketupat merupakan contoh perubahan skala. Dua bangun yang bentuknya sama dengan sisi proporsional disebut...',
          options: ['A. Kongruen', 'B. Identik', 'C. Sebangun', 'D. Simetris'], correct: 2 }
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

    // ==== GALERI ETNOMATEMATIKA ====
    // Galeri is now static Materi Awal content (Translasi, Refleksi, Rotasi, Dilatasi)
    // No dynamic loading needed

    // ==== STUDIO SIMULASI INTERAKTIF - DIGITAL CANVAS ====
    const studioTitle = document.getElementById('studio-title');
    function loadStudio(i) { studioTitle.textContent = materiData[i].title; }
    document.getElementById('btn-studio-prev').addEventListener('click', () => { studioIndex = (studioIndex - 1 + materiData.length) % materiData.length; loadStudio(studioIndex); });
    document.getElementById('btn-studio-next').addEventListener('click', () => { studioIndex = (studioIndex + 1) % materiData.length; loadStudio(studioIndex); });
    loadStudio(0);

    // ---- Canvas Setup ----
    const digitalCanvas = document.getElementById('digital-canvas');
    const canvasCtx = digitalCanvas ? digitalCanvas.getContext('2d') : null;
    const canvasWrap = document.getElementById('canvas-wrap');

    let currentTool = 'pen';
    let currentColor = '#2d2a3e';
    let currentStroke = 3;
    let isDrawing = false;
    let lastX = 0, lastY = 0;
    let startX = 0, startY = 0;

    // Undo/Redo stacks
    let undoStack = [];
    let redoStack = [];
    const MAX_HISTORY = 40;

    function resizeCanvas() {
        if (!digitalCanvas || !canvasWrap) return;
        const rect = canvasWrap.getBoundingClientRect();
        const w = Math.floor(rect.width);
        const h = Math.floor(rect.height);
        if (digitalCanvas.width === w && digitalCanvas.height === h) return;

        // Save current image
        let imgData = null;
        if (digitalCanvas.width > 0 && digitalCanvas.height > 0) {
            try { imgData = canvasCtx.getImageData(0, 0, digitalCanvas.width, digitalCanvas.height); } catch(e) {}
        }

        digitalCanvas.width = w;
        digitalCanvas.height = h;

        // Fill white background
        canvasCtx.fillStyle = '#ffffff';
        canvasCtx.fillRect(0, 0, w, h);

        // Restore image
        if (imgData) {
            canvasCtx.putImageData(imgData, 0, 0);
        }
    }

    function saveState() {
        if (!digitalCanvas) return;
        if (undoStack.length >= MAX_HISTORY) undoStack.shift();
        undoStack.push(digitalCanvas.toDataURL());
        redoStack = [];
    }

    function restoreState(dataUrl) {
        if (!canvasCtx || !digitalCanvas) return;
        const img = new Image();
        img.onload = () => {
            canvasCtx.clearRect(0, 0, digitalCanvas.width, digitalCanvas.height);
            canvasCtx.fillStyle = '#ffffff';
            canvasCtx.fillRect(0, 0, digitalCanvas.width, digitalCanvas.height);
            canvasCtx.drawImage(img, 0, 0);
        };
        img.src = dataUrl;
    }

    function getCanvasPos(e) {
        const rect = digitalCanvas.getBoundingClientRect();
        const touch = e.touches ? e.touches[0] : e;
        return {
            x: (touch.clientX - rect.left) * (digitalCanvas.width / rect.width),
            y: (touch.clientY - rect.top) * (digitalCanvas.height / rect.height)
        };
    }

    function startDraw(e) {
        if (!canvasCtx) return;
        e.preventDefault();
        isDrawing = true;
        const pos = getCanvasPos(e);
        lastX = pos.x;
        lastY = pos.y;
        startX = pos.x;
        startY = pos.y;

        // Save state before drawing begins
        saveState();

        if (currentTool === 'pen' || currentTool === 'eraser') {
            canvasCtx.beginPath();
            canvasCtx.moveTo(lastX, lastY);
            canvasCtx.lineCap = 'round';
            canvasCtx.lineJoin = 'round';
            canvasCtx.strokeStyle = currentTool === 'eraser' ? '#ffffff' : currentColor;
            canvasCtx.lineWidth = currentTool === 'eraser' ? currentStroke * 4 : currentStroke;
        }
    }

    // For shape preview – we need a snapshot of the canvas before drawing the shape
    let shapeSnapshot = null;

    function moveDraw(e) {
        if (!isDrawing || !canvasCtx) return;
        e.preventDefault();
        const pos = getCanvasPos(e);

        if (currentTool === 'pen' || currentTool === 'eraser') {
            canvasCtx.lineTo(pos.x, pos.y);
            canvasCtx.stroke();
            lastX = pos.x;
            lastY = pos.y;
        } else if (currentTool === 'line' || currentTool === 'rect' || currentTool === 'circle') {
            // Take snapshot on first move for shape preview
            if (!shapeSnapshot) {
                shapeSnapshot = canvasCtx.getImageData(0, 0, digitalCanvas.width, digitalCanvas.height);
            }
            // Restore snapshot to clear previous preview
            canvasCtx.putImageData(shapeSnapshot, 0, 0);

            canvasCtx.beginPath();
            canvasCtx.strokeStyle = currentColor;
            canvasCtx.lineWidth = currentStroke;
            canvasCtx.lineCap = 'round';
            canvasCtx.lineJoin = 'round';

            if (currentTool === 'line') {
                canvasCtx.moveTo(startX, startY);
                canvasCtx.lineTo(pos.x, pos.y);
                canvasCtx.stroke();
            } else if (currentTool === 'rect') {
                const w = pos.x - startX;
                const h = pos.y - startY;
                canvasCtx.strokeRect(startX, startY, w, h);
            } else if (currentTool === 'circle') {
                const rx = Math.abs(pos.x - startX);
                const ry = Math.abs(pos.y - startY);
                const cx = startX;
                const cy = startY;
                canvasCtx.beginPath();
                canvasCtx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
                canvasCtx.stroke();
            }
        }
    }

    function endDraw(e) {
        if (!isDrawing) return;
        isDrawing = false;
        shapeSnapshot = null;
        if (canvasCtx) canvasCtx.closePath();
    }

    if (digitalCanvas) {
        // Mouse events
        digitalCanvas.addEventListener('mousedown', startDraw);
        digitalCanvas.addEventListener('mousemove', moveDraw);
        digitalCanvas.addEventListener('mouseup', endDraw);
        digitalCanvas.addEventListener('mouseleave', endDraw);

        // Touch events
        digitalCanvas.addEventListener('touchstart', startDraw, { passive: false });
        digitalCanvas.addEventListener('touchmove', moveDraw, { passive: false });
        digitalCanvas.addEventListener('touchend', endDraw);
        digitalCanvas.addEventListener('touchcancel', endDraw);

        // Cursor style
        digitalCanvas.style.cursor = 'crosshair';
    }

    // ---- Tool Buttons ----
    const toolBtns = document.querySelectorAll('.tool-btn');
    toolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toolBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTool = btn.getAttribute('data-tool');

            if (digitalCanvas) {
                if (currentTool === 'eraser') {
                    digitalCanvas.style.cursor = 'cell';
                } else {
                    digitalCanvas.style.cursor = 'crosshair';
                }
            }
        });
    });

    // ---- Color Buttons ----
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentColor = btn.getAttribute('data-color');
        });
    });

    // ---- Stroke Slider ----
    const strokeRange = document.getElementById('stroke-range');
    const strokeVal = document.getElementById('stroke-val');
    if (strokeRange) {
        strokeRange.addEventListener('input', () => {
            currentStroke = parseInt(strokeRange.value);
            if (strokeVal) strokeVal.textContent = currentStroke;
        });
    }

    // ---- Undo ----
    const btnUndo = document.getElementById('btn-undo');
    if (btnUndo) {
        btnUndo.addEventListener('click', () => {
            if (undoStack.length === 0) return;
            // Save current state to redo
            redoStack.push(digitalCanvas.toDataURL());
            const prev = undoStack.pop();
            restoreState(prev);
            showToast('Undo ↩️');
        });
    }

    // ---- Redo ----
    const btnRedo = document.getElementById('btn-redo');
    if (btnRedo) {
        btnRedo.addEventListener('click', () => {
            if (redoStack.length === 0) return;
            undoStack.push(digitalCanvas.toDataURL());
            const next = redoStack.pop();
            restoreState(next);
            showToast('Redo ↪️');
        });
    }

    // ---- Clear ----
    const btnClear = document.getElementById('btn-clear');
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            if (!canvasCtx || !digitalCanvas) return;
            saveState();
            canvasCtx.fillStyle = '#ffffff';
            canvasCtx.fillRect(0, 0, digitalCanvas.width, digitalCanvas.height);
            showToast('Canvas dihapus 🗑️');
        });
    }

    // ---- Save ----
    const btnSave = document.getElementById('btn-save-canvas');
    if (btnSave) {
        btnSave.addEventListener('click', () => {
            if (!digitalCanvas) return;
            const link = document.createElement('a');
            link.download = 'promath-canvas.png';
            link.href = digitalCanvas.toDataURL('image/png');
            link.click();
            showToast('Gambar disimpan! 💾');
        });
    }

    // ---- Resize canvas on page show & window resize ----
    const resizeObserver = new ResizeObserver(() => {
        if (document.getElementById('page-materi-studio').classList.contains('active')) {
            resizeCanvas();
        }
    });
    if (canvasWrap) resizeObserver.observe(canvasWrap);

    // Also resize when studio page becomes visible
    const origShowPage = showPage;
    // We need to override showPage to trigger resize
    const _showPageOrig = showPage;

    // Patch showPage to handle canvas resize
    window.addEventListener('resize', () => {
        if (document.getElementById('page-materi-studio') &&
            document.getElementById('page-materi-studio').classList.contains('active')) {
            resizeCanvas();
        }
    });

    // Initial canvas resize when studio page is first shown - hooked into showPage
    const origPages = pages;
    const studioPage = document.getElementById('page-materi-studio');

    // MutationObserver to detect when studio page becomes active
    if (studioPage) {
        const studioObserver = new MutationObserver(() => {
            if (studioPage.classList.contains('active')) {
                setTimeout(resizeCanvas, 50);
            }
        });
        studioObserver.observe(studioPage, { attributes: true, attributeFilter: ['class'] });
    }

    // Keyboard shortcuts for canvas
    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('page-materi-studio') ||
            !document.getElementById('page-materi-studio').classList.contains('active')) return;

        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            if (btnUndo) btnUndo.click();
        } else if (e.ctrlKey && e.key === 'y') {
            e.preventDefault();
            if (btnRedo) btnRedo.click();
        }
    });

    // ==== ZONA TANTANGAN ====
    const zonaTitle = document.getElementById('zona-title');
    const soalImage = document.getElementById('soal-image');
    const soalText = document.getElementById('soal-text');
    const jawabanOptions = document.getElementById('jawaban-options');

    function loadZona(i) {
        const d = soalData[i];
        zonaTitle.textContent = d.title + ` (Soal ${i + 1}/${soalData.length})`; soalImage.src = d.image;
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
