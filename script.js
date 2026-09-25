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
        { title: 'SOAL 1 - Translasi', image: 'assets/images/soal-batik-1.png', nama: 'Soal 1 - Translasi',
          soal: 'Perhatikan pola bunga pada Batik tersebut. Misalkan satu motif bunga memiliki titik pusat di koordinat (2,3). Untuk membuat pola berikutnya, motif tersebut digeser 4 satuan ke kanan dan 2 satuan ke atas tanpa mengubah bentuk dan ukurannya. Koordinat titik pusat motif setelah digeser adalah…',
          options: ['A. (6, 1)', 'B. (6, 5)', 'C. (-2, 5)', 'D. (4, 6)'], correct: 1 },

        { title: 'SOAL 2 - Refleksi', image: 'assets/images/soal-batik-1.png', nama: 'Soal 2 - Refleksi Sumbu-Y',
          soal: 'Sebuah bagian motif memiliki titik A(4, 2), B(6, 2), dan C(5, 4). Motif tersebut dibuat menjadi bentuk yang berlawanan arah dengan cara dicerminkan terhadap sumbu-y. Koordinat titik A\', B\', dan C\' adalah ...',
          options: ['A. A\'(-4, 2), B\'(-6, 2), C\'(-5, 4)', 'B. A\'(4, -2), B\'(6, -2), C\'(5, -4)', 'C. A\'(-4, -2), B\'(-6, -2), C\'(-5, -4)', 'D. A\'(2, 4), B\'(2, 6), C\'(4, 5)'], correct: 0 },

        { title: 'SOAL 3 - Dekomposisi & Refleksi', image: 'assets/images/soal-batik-3.png', nama: 'Soal 3 - Dekomposisi & Refleksi',
          soal: 'Seorang siswa ingin membuat ulang pola Batik secara digital. Ia terlebih dahulu memisahkan pola menjadi beberapa bagian, yaitu motif buah, daun, dan garis penghubung. Setelah itu, ia membuat satu motif buah sebagai pola awal dan membuat bayangannya terhadap sebuah garis vertikal agar diperoleh motif di sisi lainnya. Langkah tersebut menunjukkan bahwa siswa menggunakan ....',
          options: ['A. Dekomposisi untuk memisahkan motif dan refleksi untuk membentuk bayangannya', 'B. Abstraksi untuk mengubah ukuran motif dan translasi untuk memindahkannya', 'C. Pengenalan pola untuk memperbesar motif dan rotasi untuk memutarnya', 'D. Algoritma untuk menghapus motif dan dilatasi untuk mengecilkannya'], correct: 0 },

        { title: 'SOAL 4 - Dilatasi', image: 'assets/images/soal-batik-4.png', nama: 'Soal 4 - Dilatasi',
          soal: 'Pada Batik tersebut terdapat beberapa motif yang bentuknya sama, tetapi ukurannya berbeda. Seorang siswa ingin membuat salah satu motif menjadi 2 kali lebih besar tanpa mengubah bentuk dasarnya. Transformasi yang harus digunakan adalah ....',
          options: ['A. Translasi, karena motif dipindahkan ke tempat lain', 'B. Refleksi, karena motif dibuat seperti bayangan', 'C. Rotasi, karena motif diputar pada suatu titik', 'D. Dilatasi, karena ukuran motif diperbesar dengan bentuk yang tetap sama'], correct: 3 },

        { title: 'SOAL 5 - Translasi & Algoritmik', image: 'assets/images/soal-batik-1.png', nama: 'Soal 5 - Translasi & Algoritmik',
          soal: 'Seorang siswa ingin membuat pola Batik menggunakan PROMATH-GUI. Ia menyusun langkah berikut: 1) Memilih satu motif bunga sebagai pola dasar. 2) Menentukan ukuran dan posisi awal motif. 3) Menggeser motif ke posisi berikutnya dengan jarak yang sama. 4) Mengulangi proses tersebut sampai seluruh bidang terisi. Jika langkah tersebut dilakukan secara berulang dengan aturan yang sama, konsep transformasi dan computational thinking yang paling sesuai adalah ....',
          options: ['A. Refleksi dan dekomposisi', 'B. Translasi dan berpikir algoritmik', 'C. Rotasi dan abstraksi', 'D. Dilatasi dan pengenalan pola'], correct: 1 },

        { title: 'SOAL 6 - Elips & Lingkaran', image: 'assets/images/soal-batik-3.png', nama: 'Soal 6 - Elips & Lingkaran',
          soal: 'Seorang siswa mengamati bahwa pada motif Batik Manggur, buah mangga digambar menggunakan bentuk elips (memanjang), sedangkan buah anggur digambar menggunakan bentuk lingkaran. Manakah alasan geometris yang paling tepat menjelaskan perbedaan pemilihan bentuk tersebut?',
          options: ['A. Elips dipilih karena lebih mudah digambar dengan tangan dibanding lingkaran', 'B. Buah mangga memiliki proporsi panjang dan lebar yang tidak sama (dua sumbu berbeda), sedangkan buah anggur relatif sama jaraknya ke segala arah dari pusat', 'C. Warna hijau pada mangga hanya dapat diterapkan pada bentuk elips', 'D. Bentuk lingkaran tidak dapat disusun berulang, sehingga hanya cocok untuk buah kecil seperti anggur'], correct: 1 },

        { title: 'SOAL 7 - Bentuk Geometri Anggur', image: 'assets/images/soal-batik-3.png', nama: 'Soal 7 - Bentuk Geometri Anggur',
          soal: 'Gugusan buah anggur pada motif Batik Manggur biasanya digambarkan sebagai kumpulan bentuk bulat kecil yang saling menempel membentuk klaster. Secara geometri, satu buah anggur paling mendekati bentuk...',
          options: ['A. Persegi', 'B. Lingkaran', 'C. Trapesium', 'D. Segitiga'], correct: 1 },

        { title: 'SOAL 8 - Bentuk Geometri Mangga', image: 'assets/images/soal-batik-3.png', nama: 'Soal 8 - Bentuk Geometri Mangga',
          soal: 'Buah mangga pada motif Batik Manggur (mis. mangga Arum Manis berwarna hijau) umumnya digambar dengan bentuk lonjong. Bentuk geometri bangun datar yang paling sesuai untuk merepresentasikan siluet buah mangga tersebut adalah...',
          options: ['A. Lingkaran', 'B. Elips (oval)', 'C. Belah ketupat', 'D. Jajar genjang'], correct: 1 },

        { title: 'SOAL 9 - Translasi Anggur', image: 'assets/images/soal-batik-3.png', nama: 'Soal 9 - Translasi Anggur',
          soal: 'Pembatik menggeser satu motif anggur pada bidang koordinat dengan translasi T(4, -3). Jika titik pusat motif semula berada di A(1, 5), koordinat bayangannya adalah...',
          options: ['A. (5, 2)', 'B. (−3, 8)', 'C. (5, 8)', 'D. (−3, 2)'], correct: 0 },

        { title: 'SOAL 10 - Translasi & Teselasi', image: 'assets/images/soal-batik-3.png', nama: 'Soal 10 - Translasi & Teselasi',
          soal: 'Pada kain Batik Manggur, satu unit motif (misalnya satu rangkaian mangga-anggur) diulang secara teratur ke segala arah untuk memenuhi seluruh permukaan kain tanpa celah maupun tumpang tindih. Konsep transformasi geometri yang mendasari pengulangan pola semacam ini disebut...',
          options: ['A. Translasi (pergeseran)', 'B. Dilatasi (perbesaran)', 'C. Refleksi (pencerminan) saja', 'D. Kontraksi'], correct: 0 },

        { title: 'SOAL 11 - Dekomposisi & Transformasi', image: 'assets/images/soal-batik-11.png', nama: 'Soal 11 - Dekomposisi & Transformasi',
          soal: 'Seorang desainer grafis ingin mereplikasi pola kain batik secara digital. Ia menggunakan teknik Dekomposisi dengan memecah susunan visual menjadi 3 elemen: Elemen A (Pola Jalur Miring): Motif mangga dan anggur di baris atas digeser ke arah kanan-bawah tanpa mengubah bentuk. Elemen B (Perbandingan Ukuran): Seluruh motif buah mangga identik, terdapat daun dalam dua ukuran berbeda. Elemen C (Variasi Posisi Daun): Daun diperbesar 2 kali lalu diputar 180°. Urutan konsep geometri yang paling tepat untuk Elemen A, B, dan C adalah...',
          options: ['A. Refleksi | Hanya Kesebangunan | Translasi dilanjutkan Dilatasi', 'B. Translasi | Kekongruenan dan Kesebangunan | Dilatasi dilanjutkan Rotasi', 'C. Rotasi | Hanya Kekongruenan | Refleksi dilanjutkan Translasi', 'D. Dilatasi | Tidak ada yang kongruen | Rotasi dilanjutkan Refleksi'], correct: 1 },

        { title: 'SOAL 12 - Abstraksi & Koordinat', image: 'assets/images/soal-batik-12.png', nama: 'Soal 12 - Abstraksi & Koordinat',
          soal: 'Seorang siswa kelas 9 SMP mengamati pola kain batik geometri berbentuk kisi-kisi. Pada setiap kotak, terdapat bentuk segitiga dengan bidang jaring-jaring (merah/biru) dan ornamen tanaman berupa sulur daun berwarna putih. Untuk mempermudah menghitung koordinat hasil Translasi dari salah satu segitiga pada bidang kartesius, siswa tersebut menggunakan prinsip Abstraksi dengan mengabaikan detail informasi yang tidak penting. Manakah informasi yang paling relevan (penting) untuk disimpan dan digunakan dalam perhitungan matematika tersebut?',
          options: ['A. Warna latar belakang kain dan jenis pewarna yang digunakan', 'B. Banyaknya jumlah daun pada ornamen sulur putih', 'C. Koordinat titik-titik sudut dari bangun segitiga', 'D. Ketebalan garis putih pada jaring-jaring kotak'], correct: 2 },

        { title: 'SOAL 13 - Algoritma Transformasi', image: 'assets/images/soal-batik-12.png', nama: 'Soal 13 - Algoritma Transformasi',
          soal: 'Seorang siswa ingin menggambar ulang ornamen motif batik segitiga pada sistem koordinat. Ia memiliki titik awal puncak segitiga A(2, 3) dan melakukan transformasi berurutan: Langkah 1: Cerminkan A(2,3) terhadap sumbu-Y (Refleksi). Langkah 2: Perbesar bayangan dengan pusat (0,0) dan faktor skala k=2 (Dilatasi). Langkah 3: Geser bayangan sejauh 3 satuan ke kanan dan 1 satuan ke bawah (Translasi oleh (3,-1)). Berapakah koordinat akhir dari titik puncak segitiga tersebut?',
          options: ['A. (-1, 5)', 'B. (1, 5)', 'C. (-4, 6)', 'D. (7, 5)'], correct: 0 },

        { title: 'SOAL 14 - Dilatasi & Pythagoras', image: 'assets/images/soal-batik-14.png', nama: 'Soal 14 - Dilatasi & Pythagoras',
          soal: 'Seorang siswa memecah proses pembuatan motif segitiga batik (Dekomposisi) menjadi dua bangun sederhana. Algoritmanya: Langkah 1: Buat segitiga siku-siku utama dengan alas 6 cm dan tinggi 8 cm. Langkah 2: Buat segitiga kedua di dalamnya yang sebangun dengan faktor skala ½ (Dilatasi). Langkah 3: Cerminkan segitiga kecil ke arah samping (Refleksi). Berapakah panjang sisi miring dari segitiga kecil yang terbentuk pada Langkah 2?',
          options: ['A. 4 cm', 'B. 5 cm', 'C. 8 cm', 'D. 10 cm'], correct: 1 },

        { title: 'SOAL 15 - Pengenalan Pola', image: 'assets/images/soal-batik-15.png', nama: 'Soal 15 - Pengenalan Pola',
          soal: 'Seorang siswa menganalisis keteraturan desain pada kain batik menggunakan prinsip Pengenalan Pola. Ia menemukan: Pola 1: Motif ayam jantan diulang ke arah kanan dan bawah, posisi dan arah hadap tetap sama. Pola 2: Ayam jantan pada setiap kisi identik bentuk, ukuran, dan sudutnya. Pola 3: Motif belah ketupat memiliki bentuk serupa tetapi sebagian diperkecil menjadi variasi isian. Pola 4: Pasangan bunga teratai menunjukkan posisi seperti cermin yang saling berhadapan. Manakah pasangan analisis transformasi yang paling tepat?',
          options: ['A. Pola 1: Rotasi, Pola 2: Kesebangunan, Pola 3: Kekongruenan, Pola 4: Dilatasi', 'B. Pola 1: Translasi, Pola 2: Kekongruenan, Pola 3: Dilatasi (Kesebangunan), Pola 4: Refleksi', 'C. Pola 1: Dilatasi, Pola 2: Refleksi, Pola 3: Rotasi, Pola 4: Kesebangunan', 'D. Pola 1: Refleksi, Pola 2: Dilatasi, Pola 3: Kekongruenan, Pola 4: Translasi'], correct: 1 },
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

    // ---- Tombol MULAI → Beranda ----
    const btnMulai = document.getElementById('btn-mulai');
    if (btnMulai) {
        btnMulai.addEventListener('click', () => {
            showPage('page-beranda');
            showToast('Selamat datang! 🎉');
        });
    }

    // ---- Enter pada input nama → Beranda ----
    if (namaInput) {
        namaInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                showPage('page-beranda');
                showToast('Selamat datang! 🎉');
            }
        });
    }

    // ==== GALERI ETNOMATEMATIKA - SLIDER ====
    const galeriSlides = document.querySelectorAll('.galeri-slide');
    const galeriDotsContainer = document.getElementById('galeri-dots');
    const galeriPrevBtn = document.getElementById('galeri-prev');
    const galeriNextBtn = document.getElementById('galeri-next');
    const galeriPrevBtnBottom = document.getElementById('galeri-prev-bottom');
    const galeriNextBtnBottom = document.getElementById('galeri-next-bottom');
    const galeriCurrentEl = document.getElementById('galeri-current');
    const galeriTotalEl = document.getElementById('galeri-total');
    const galeriCurrentBottomEl = document.getElementById('galeri-current-bottom');
    const galeriTotalBottomEl = document.getElementById('galeri-total-bottom');
    let galeriCurrentSlide = 0;

    const galeriSlideNames = [
        'Batik Probolinggo',
        'Batik Mangga',
        'Batik Bunga',
        'Batik Gurda',
        'Batik Daun',
        'Batik Teratai',
        'Batik Anggur',
        'Batik Ayam',
        'Batik Kupu-Kupu',
        'Batik Ketupat'
    ];

    // Generate dot indicators
    if (galeriDotsContainer && galeriSlides.length > 0) {
        galeriSlides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'galeri-dot' + (i === 0 ? ' galeri-dot-active' : '');
            dot.setAttribute('data-slide', i);
            dot.setAttribute('aria-label', `Slide ${i + 1}: ${galeriSlideNames[i] || ''}`);

            // Add tooltip label
            const label = document.createElement('span');
            label.className = 'galeri-dot-label';
            label.textContent = galeriSlideNames[i] || `Slide ${i + 1}`;
            dot.appendChild(label);

            dot.addEventListener('click', () => goToGaleriSlide(i));
            galeriDotsContainer.appendChild(dot);
        });
    }

    // Update total counts
    if (galeriTotalEl) galeriTotalEl.textContent = galeriSlides.length;
    if (galeriTotalBottomEl) galeriTotalBottomEl.textContent = galeriSlides.length;

    function goToGaleriSlide(index) {
        if (index < 0 || index >= galeriSlides.length || index === galeriCurrentSlide) return;

        // Hide current slide
        galeriSlides[galeriCurrentSlide].classList.remove('galeri-slide-active');

        // Show new slide
        galeriCurrentSlide = index;
        const newSlide = galeriSlides[galeriCurrentSlide];
        newSlide.classList.remove('galeri-slide-active');
        // Force reflow for animation restart
        void newSlide.offsetWidth;
        newSlide.classList.add('galeri-slide-active');

        updateGaleriControls();

        // Scroll the slider container into view smoothly
        const sliderContainer = document.getElementById('galeri-slider');
        if (sliderContainer) {
            sliderContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function updateGaleriControls() {
        const idx = galeriCurrentSlide;
        const total = galeriSlides.length;

        // Update counters
        if (galeriCurrentEl) galeriCurrentEl.textContent = idx + 1;
        if (galeriCurrentBottomEl) galeriCurrentBottomEl.textContent = idx + 1;

        // Update buttons
        if (galeriPrevBtn) galeriPrevBtn.disabled = idx === 0;
        if (galeriNextBtn) galeriNextBtn.disabled = idx === total - 1;
        if (galeriPrevBtnBottom) galeriPrevBtnBottom.disabled = idx === 0;
        if (galeriNextBtnBottom) galeriNextBtnBottom.disabled = idx === total - 1;

        // Update dots
        const dots = galeriDotsContainer ? galeriDotsContainer.querySelectorAll('.galeri-dot') : [];
        dots.forEach((dot, i) => {
            dot.classList.toggle('galeri-dot-active', i === idx);
        });
    }

    // Button event listeners
    if (galeriPrevBtn) galeriPrevBtn.addEventListener('click', () => goToGaleriSlide(galeriCurrentSlide - 1));
    if (galeriNextBtn) galeriNextBtn.addEventListener('click', () => goToGaleriSlide(galeriCurrentSlide + 1));
    if (galeriPrevBtnBottom) galeriPrevBtnBottom.addEventListener('click', () => goToGaleriSlide(galeriCurrentSlide - 1));
    if (galeriNextBtnBottom) galeriNextBtnBottom.addEventListener('click', () => goToGaleriSlide(galeriCurrentSlide + 1));

    // Keyboard navigation (only when galeri page is visible)
    document.addEventListener('keydown', (e) => {
        const galeriPage = document.getElementById('page-materi-galeri');
        if (!galeriPage || !galeriPage.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') goToGaleriSlide(galeriCurrentSlide - 1);
        if (e.key === 'ArrowRight') goToGaleriSlide(galeriCurrentSlide + 1);
    });

    // Touch/Swipe support for slides
    let galeriTouchStartX = 0;
    let galeriTouchEndX = 0;
    const galeriTrack = document.getElementById('galeri-track');
    if (galeriTrack) {
        galeriTrack.addEventListener('touchstart', (e) => {
            galeriTouchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        galeriTrack.addEventListener('touchend', (e) => {
            galeriTouchEndX = e.changedTouches[0].screenX;
            const diff = galeriTouchStartX - galeriTouchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) goToGaleriSlide(galeriCurrentSlide + 1); // swipe left → next
                else goToGaleriSlide(galeriCurrentSlide - 1); // swipe right → prev
            }
        }, { passive: true });
    }

    // Initialize controls state
    updateGaleriControls();

    // ==== STUDIO SIMULASI INTERAKTIF - TRANSFORMASI GEOMETRI ====

    // ---- Simulation State ----
    const simState = {
        motif: 'mangga',
        origX: 2, origY: 2,
        transA: 0, transB: 0,
        reflectX: false, reflectY: false
    };

    const digitalCanvas = document.getElementById('digital-canvas');
    const canvasCtx = digitalCanvas ? digitalCanvas.getContext('2d') : null;
    const canvasWrap = document.getElementById('canvas-wrap');
    let GRID_UNIT = 35;

    // ---- Canvas Resize ----
    function resizeSimCanvas() {
        if (!digitalCanvas || !canvasWrap) return;
        const rect = canvasWrap.getBoundingClientRect();
        const w = Math.floor(rect.width);
        const h = Math.floor(rect.height);
        if (w <= 0 || h <= 0) return;
        digitalCanvas.width = w;
        digitalCanvas.height = h;
        GRID_UNIT = Math.max(20, Math.min(40, Math.floor(Math.min(w, h) / 18)));
        renderSim();
    }

    // ---- Coordinate Conversions ----
    function toCanvasX(cx) { return digitalCanvas.width / 2 + cx * GRID_UNIT; }
    function toCanvasY(cy) { return digitalCanvas.height / 2 - cy * GRID_UNIT; }

    // ---- Get Transformed Position ----
    function getTransformed() {
        let x = simState.origX + simState.transA;
        let y = simState.origY + simState.transB;
        if (simState.reflectY) x = -x;
        if (simState.reflectX) y = -y;
        return { x, y };
    }

    // ---- Draw Cartesian Grid ----
    function drawGrid(ctx, w, h, gridUnit) {
        const gu = gridUnit || GRID_UNIT;
        const ox = w / 2, oy = h / 2;
        const maxX = Math.ceil(ox / gu);
        const maxY = Math.ceil(oy / gu);

        // Background
        ctx.fillStyle = '#fafbff';
        ctx.fillRect(0, 0, w, h);

        // Grid lines
        ctx.strokeStyle = '#e8e6f0';
        ctx.lineWidth = 0.5;
        for (let i = -maxX; i <= maxX; i++) {
            const x = ox + i * gu;
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let j = -maxY; j <= maxY; j++) {
            const y = oy + j * gu;
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // Axes
        ctx.strokeStyle = '#2d2a3e';
        ctx.lineWidth = 2;
        // X-axis
        ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.stroke();
        // Y-axis
        ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, h); ctx.stroke();

        // Axis arrows
        ctx.fillStyle = '#2d2a3e';
        // X arrow
        ctx.beginPath(); ctx.moveTo(w - 2, oy); ctx.lineTo(w - 12, oy - 5); ctx.lineTo(w - 12, oy + 5); ctx.fill();
        // Y arrow
        ctx.beginPath(); ctx.moveTo(ox, 2); ctx.lineTo(ox - 5, 12); ctx.lineTo(ox + 5, 12); ctx.fill();

        // Labels
        ctx.font = '600 11px Outfit, sans-serif';
        ctx.fillStyle = '#6b6880';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        for (let i = -maxX; i <= maxX; i++) {
            if (i === 0) continue;
            const x = ox + i * gu;
            if (x < 10 || x > w - 10) continue;
            ctx.fillText(i.toString(), x, oy + 6);
        }
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let j = -maxY; j <= maxY; j++) {
            if (j === 0) continue;
            const y = oy - j * gu;
            if (y < 10 || y > h - 10) continue;
            ctx.fillText(j.toString(), ox - 8, y);
        }
        // Origin
        ctx.textAlign = 'right'; ctx.textBaseline = 'top';
        ctx.fillText('O', ox - 6, oy + 4);
        // Axis labels
        ctx.font = '700 13px Outfit, sans-serif';
        ctx.fillStyle = '#2d2a3e';
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillText('x', w - 16, oy - 8);
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText('y', ox + 10, 14);
    }

    // ---- Draw Mangga Motif ----
    function drawMangga(ctx, cartX, cartY, alpha, label) {
        const cx = toCanvasX(cartX);
        const cy = toCanvasY(cartY);
        const s = GRID_UNIT * 0.7;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(cx, cy);

        // Mango body (teardrop)
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.65);
        ctx.bezierCurveTo(s * 0.55, -s * 0.65, s * 0.65, -s * 0.1, s * 0.5, s * 0.3);
        ctx.bezierCurveTo(s * 0.35, s * 0.6, s * 0.1, s * 0.7, 0, s * 0.7);
        ctx.bezierCurveTo(-s * 0.1, s * 0.7, -s * 0.35, s * 0.6, -s * 0.5, s * 0.3);
        ctx.bezierCurveTo(-s * 0.65, -s * 0.1, -s * 0.55, -s * 0.65, 0, -s * 0.65);
        ctx.closePath();

        const grad = ctx.createRadialGradient(s * 0.1, -s * 0.1, 0, 0, 0, s * 0.7);
        grad.addColorStop(0, '#FFD93D');
        grad.addColorStop(0.6, '#F68D1C');
        grad.addColorStop(1, '#d97a10');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = '#b86a0a';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Blush highlight
        ctx.beginPath();
        ctx.ellipse(s * 0.12, -s * 0.15, s * 0.2, s * 0.15, -0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.fill();

        // Stem
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.65);
        ctx.quadraticCurveTo(s * 0.05, -s * 0.82, s * 0.02, -s * 0.9);
        ctx.strokeStyle = '#5a8a1a';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Leaf
        ctx.beginPath();
        ctx.moveTo(s * 0.02, -s * 0.85);
        ctx.quadraticCurveTo(s * 0.35, -s * 1.05, s * 0.4, -s * 0.75);
        ctx.quadraticCurveTo(s * 0.25, -s * 0.8, s * 0.02, -s * 0.85);
        ctx.fillStyle = '#5eaa22';
        ctx.fill();
        ctx.strokeStyle = '#3d7a10';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.restore();

        // Label
        if (label) {
            ctx.save();
            ctx.font = '700 12px Outfit, sans-serif';
            ctx.fillStyle = alpha > 0.7 ? '#d97a10' : '#8077C1';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(label, cx, cy + s * 0.85);
            ctx.restore();
        }
    }

    // ---- Draw Anggur Motif ----
    function drawAnggur(ctx, cartX, cartY, alpha, label) {
        const cx = toCanvasX(cartX);
        const cy = toCanvasY(cartY);
        const s = GRID_UNIT * 0.14;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(cx, cy);

        // Grape cluster positions (inverted Y for canvas)
        const grapes = [
            [0, -2.2],
            [-1, -1], [1, -1],
            [-1.6, 0.4], [-0.5, 0.3], [0.5, 0.3], [1.6, 0.4],
            [-1.1, 1.5], [0, 1.4], [1.1, 1.5],
            [-0.5, 2.5], [0.5, 2.5]
        ];

        grapes.forEach(([gx, gy], i) => {
            const grad = ctx.createRadialGradient(gx * s - s * 0.2, gy * s - s * 0.2, 0, gx * s, gy * s, s * 0.85);
            grad.addColorStop(0, '#e86090');
            grad.addColorStop(0.5, '#c94070');
            grad.addColorStop(1, '#a02858');
            ctx.beginPath();
            ctx.arc(gx * s, gy * s, s * 0.82, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.strokeStyle = '#8a2048';
            ctx.lineWidth = 0.6;
            ctx.stroke();
            // Highlight
            ctx.beginPath();
            ctx.arc(gx * s - s * 0.15, gy * s - s * 0.2, s * 0.22, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.fill();
        });

        // Stem
        ctx.beginPath();
        ctx.moveTo(0, -s * 2.8);
        ctx.quadraticCurveTo(s * 0.2, -s * 3.5, s * 0.1, -s * 4);
        ctx.strokeStyle = '#5a8a1a';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Leaf
        ctx.beginPath();
        ctx.moveTo(s * 0.1, -s * 3.8);
        ctx.quadraticCurveTo(s * 2.5, -s * 4.8, s * 2.2, -s * 3);
        ctx.quadraticCurveTo(s * 1.5, -s * 3.2, s * 0.1, -s * 3.8);
        ctx.fillStyle = '#5eaa22';
        ctx.fill();
        ctx.strokeStyle = '#3d7a10';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Leaf vein
        ctx.beginPath();
        ctx.moveTo(s * 0.3, -s * 3.7);
        ctx.quadraticCurveTo(s * 1.5, -s * 4, s * 2, -s * 3.3);
        ctx.strokeStyle = '#3d7a10';
        ctx.lineWidth = 0.6;
        ctx.stroke();

        ctx.restore();

        // Label
        if (label) {
            ctx.save();
            ctx.font = '700 12px Outfit, sans-serif';
            ctx.fillStyle = alpha > 0.7 ? '#c94070' : '#8077C1';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(label, cx, cy + s * 3.5);
            ctx.restore();
        }
    }

    // ---- Draw Arrow (Translation vector) ----
    function drawArrow(ctx, x1, y1, x2, y2, color) {
        const cx1 = toCanvasX(x1), cy1 = toCanvasY(y1);
        const cx2 = toCanvasX(x2), cy2 = toCanvasY(y2);
        const dx = cx2 - cx1, dy = cy2 - cy1;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len < 3) return;

        const angle = Math.atan2(dy, dx);
        const headLen = 10;

        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);

        ctx.beginPath();
        ctx.moveTo(cx1, cy1);
        ctx.lineTo(cx2, cy2);
        ctx.stroke();

        // Arrowhead
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(cx2, cy2);
        ctx.lineTo(cx2 - headLen * Math.cos(angle - 0.4), cy2 - headLen * Math.sin(angle - 0.4));
        ctx.lineTo(cx2 - headLen * Math.cos(angle + 0.4), cy2 - headLen * Math.sin(angle + 0.4));
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    // ---- Draw Reflection Line ----
    function drawReflectLine(ctx, axis, w, h) {
        ctx.save();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([8, 6]);
        ctx.globalAlpha = 0.7;

        if (axis === 'y') {
            ctx.beginPath();
            ctx.moveTo(w / 2, 0);
            ctx.lineTo(w / 2, h);
            ctx.stroke();
            // Label
            ctx.setLineDash([]);
            ctx.globalAlpha = 1;
            ctx.font = '700 11px Outfit, sans-serif';
            ctx.fillStyle = '#ef4444';
            ctx.textAlign = 'left';
            ctx.fillText('Sumbu-Y (cermin)', w / 2 + 8, 28);
        } else {
            ctx.beginPath();
            ctx.moveTo(0, h / 2);
            ctx.lineTo(w, h / 2);
            ctx.stroke();
            // Label
            ctx.setLineDash([]);
            ctx.globalAlpha = 1;
            ctx.font = '700 11px Outfit, sans-serif';
            ctx.fillStyle = '#ef4444';
            ctx.textAlign = 'left';
            ctx.fillText('Sumbu-X (cermin)', 14, h / 2 - 10);
        }
        ctx.restore();
    }

    // ---- Draw Point Marker ----
    function drawPoint(ctx, cartX, cartY, color) {
        const cx = toCanvasX(cartX), cy = toCanvasY(cartY);
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
    }

    // ---- Main Render ----
    function renderSim() {
        if (!canvasCtx || !digitalCanvas) return;
        const w = digitalCanvas.width, h = digitalCanvas.height;
        if (w <= 0 || h <= 0) return;

        canvasCtx.clearRect(0, 0, w, h);
        drawGrid(canvasCtx, w, h);

        const t = getTransformed();
        const hasTranslation = simState.transA !== 0 || simState.transB !== 0;
        const hasReflection = simState.reflectX || simState.reflectY;
        const hasTransform = hasTranslation || hasReflection;

        // Draw reflection lines
        if (simState.reflectY) drawReflectLine(canvasCtx, 'y', w, h);
        if (simState.reflectX) drawReflectLine(canvasCtx, 'x', w, h);

        // Intermediate position (after translation, before reflection)
        const midX = simState.origX + simState.transA;
        const midY = simState.origY + simState.transB;

        // Draw translation arrow (original → translated)
        if (hasTranslation) {
            drawArrow(canvasCtx, simState.origX, simState.origY, midX, midY, '#F68D1C');
        }

        // Draw reflection arrow (translated → reflected) if both active
        if (hasTranslation && hasReflection && (t.x !== midX || t.y !== midY)) {
            drawArrow(canvasCtx, midX, midY, t.x, t.y, '#8077C1');
        } else if (!hasTranslation && hasReflection) {
            drawArrow(canvasCtx, simState.origX, simState.origY, t.x, t.y, '#8077C1');
        }

        // Draw motifs
        const drawMotif = simState.motif === 'mangga' ? drawMangga : drawAnggur;

        // Original motif (solid)
        drawMotif(canvasCtx, simState.origX, simState.origY, 1.0,
            `P(${simState.origX}, ${simState.origY})`);

        // Transformed motif (semi-transparent if different position)
        if (hasTransform) {
            drawMotif(canvasCtx, t.x, t.y, 0.6,
                `P'(${t.x}, ${t.y})`);
        }

        // Draw point markers
        drawPoint(canvasCtx, simState.origX, simState.origY, '#F68D1C');
        if (hasTransform) {
            drawPoint(canvasCtx, t.x, t.y, '#8077C1');
        }

        // Update Info Panel
        updateInfoPanel(t);
    }

    // ---- Update Info Panel ----
    function updateInfoPanel(t) {
        const coordOrig = document.getElementById('coord-original');
        const coordTrans = document.getElementById('coord-transformed');
        const formulaText = document.getElementById('formula-text');
        const displayA = document.getElementById('display-a');
        const displayB = document.getElementById('display-b');

        if (coordOrig) coordOrig.textContent = `P(${simState.origX}, ${simState.origY})`;
        if (coordTrans) coordTrans.textContent = `P'(${t.x}, ${t.y})`;
        if (displayA) displayA.textContent = simState.transA;
        if (displayB) displayB.textContent = simState.transB;

        // Build formula text
        let formulas = [];
        const hasTranslation = simState.transA !== 0 || simState.transB !== 0;

        if (hasTranslation) {
            formulas.push(`T(${simState.transA}, ${simState.transB}): (x, y) → (x${simState.transA >= 0 ? '+' : ''}${simState.transA}, y${simState.transB >= 0 ? '+' : ''}${simState.transB})`);
        }
        if (simState.reflectY) {
            formulas.push('Refleksi Sumbu-Y: (x, y) → (−x, y)');
        }
        if (simState.reflectX) {
            formulas.push('Refleksi Sumbu-X: (x, y) → (x, −y)');
        }

        if (formulas.length === 0) {
            if (formulaText) formulaText.textContent = 'Geser slider atau aktifkan refleksi untuk melihat transformasi';
        } else {
            if (formulaText) formulaText.textContent = formulas.join('  ⟹  ');
        }
    }

    // ---- Controls Binding ----

    // Motif buttons
    const btnMangga = document.getElementById('btn-motif-mangga');
    const btnAnggur = document.getElementById('btn-motif-anggur');
    if (btnMangga) btnMangga.addEventListener('click', () => {
        simState.motif = 'mangga';
        btnMangga.classList.add('active');
        if (btnAnggur) btnAnggur.classList.remove('active');
        renderSim();
    });
    if (btnAnggur) btnAnggur.addEventListener('click', () => {
        simState.motif = 'anggur';
        btnAnggur.classList.add('active');
        if (btnMangga) btnMangga.classList.remove('active');
        renderSim();
    });

    // Translation sliders
    const sliderA = document.getElementById('slider-a');
    const sliderB = document.getElementById('slider-b');
    const valA = document.getElementById('val-a');
    const valB = document.getElementById('val-b');

    if (sliderA) sliderA.addEventListener('input', () => {
        simState.transA = parseInt(sliderA.value);
        if (valA) valA.textContent = simState.transA;
        renderSim();
    });
    if (sliderB) sliderB.addEventListener('input', () => {
        simState.transB = parseInt(sliderB.value);
        if (valB) valB.textContent = simState.transB;
        renderSim();
    });

    // Reflection buttons (toggle)
    const btnReflectY = document.getElementById('btn-reflect-y');
    const btnReflectX = document.getElementById('btn-reflect-x');

    if (btnReflectY) btnReflectY.addEventListener('click', () => {
        simState.reflectY = !simState.reflectY;
        btnReflectY.classList.toggle('active', simState.reflectY);
        renderSim();
        showToast(simState.reflectY ? 'Refleksi Sumbu-Y aktif 🔄' : 'Refleksi Sumbu-Y nonaktif');
    });
    if (btnReflectX) btnReflectX.addEventListener('click', () => {
        simState.reflectX = !simState.reflectX;
        btnReflectX.classList.toggle('active', simState.reflectX);
        renderSim();
        showToast(simState.reflectX ? 'Refleksi Sumbu-X aktif 🔄' : 'Refleksi Sumbu-X nonaktif');
    });

    // Reset
    const btnReset = document.getElementById('btn-reset-transform');
    if (btnReset) btnReset.addEventListener('click', () => {
        simState.transA = 0; simState.transB = 0;
        simState.reflectX = false; simState.reflectY = false;
        if (sliderA) sliderA.value = 0;
        if (sliderB) sliderB.value = 0;
        if (valA) valA.textContent = '0';
        if (valB) valB.textContent = '0';
        if (btnReflectY) btnReflectY.classList.remove('active');
        if (btnReflectX) btnReflectX.classList.remove('active');
        renderSim();
        showToast('Reset berhasil ↩️');
    });

    // Prev/Next studio navigation
    document.getElementById('btn-studio-prev').addEventListener('click', () => { showPage('page-materi-galeri'); });
    document.getElementById('btn-studio-next').addEventListener('click', () => { showPage('page-zona-tantangan'); });

    // ---- Canvas Resize Observer ----
    if (canvasWrap) {
        const resizeObserver = new ResizeObserver(() => {
            const studioPage = document.getElementById('page-materi-studio');
            if (studioPage && studioPage.classList.contains('active')) {
                resizeSimCanvas();
            }
        });
        resizeObserver.observe(canvasWrap);
    }

    window.addEventListener('resize', () => {
        const studioPage = document.getElementById('page-materi-studio');
        if (studioPage && studioPage.classList.contains('active')) {
            resizeSimCanvas();
        }
    });

    // Detect when studio page becomes active
    const studioPage = document.getElementById('page-materi-studio');
    if (studioPage) {
        const studioObserver = new MutationObserver(() => {
            if (studioPage.classList.contains('active')) {
                setTimeout(() => {
                    resizeSimCanvas();
                    resizeRotCanvas();
                    resizeTeselCanvas();
                }, 60);
            }
        });
        studioObserver.observe(studioPage, { attributes: true, attributeFilter: ['class'] });
    }

    // ==== ACTIVITY TABS SWITCHING ====
    const aktTabs = document.querySelectorAll('.akt-tab');
    const aktContents = document.querySelectorAll('.aktivitas-content');
    let currentAkt = 1;

    aktTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const aktNum = parseInt(tab.getAttribute('data-akt'));
            if (aktNum === currentAkt) return;
            currentAkt = aktNum;

            aktTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            aktContents.forEach(c => { c.style.display = 'none'; });
            const target = document.getElementById('aktivitas-' + aktNum);
            if (target) target.style.display = 'block';

            // Resize the active canvas
            setTimeout(() => {
                if (aktNum === 1) resizeSimCanvas();
                else if (aktNum === 2) resizeRotCanvas();
                else if (aktNum === 3) resizeTeselCanvas();
            }, 60);
        });
    });

    // ==== AKTIVITAS 2: ROTASI & PATTERN REPEAT ====

    const rotState = {
        motif: 'bunga',
        origX: 3, origY: 2,
        centerX: 0, centerY: 0,
        angle: 90,
        steps: 0,       // how many rotations applied (0 = original only)
        maxSteps: 4,
        rotatedPositions: []  // stores {x, y, angle} for each step
    };

    const rotCanvas = document.getElementById('canvas-rotasi');
    const rotCtx = rotCanvas ? rotCanvas.getContext('2d') : null;
    const rotWrap = document.getElementById('canvas-wrap-2');
    let ROT_GRID = 35;

    function resizeRotCanvas() {
        if (!rotCanvas || !rotWrap) return;
        const rect = rotWrap.getBoundingClientRect();
        const w = Math.floor(rect.width);
        const h = Math.floor(rect.height);
        if (w <= 0 || h <= 0) return;
        rotCanvas.width = w;
        rotCanvas.height = h;
        ROT_GRID = Math.max(20, Math.min(40, Math.floor(Math.min(w, h) / 18)));
        renderRotation();
    }

    function rotToCanvasX(cx) { return rotCanvas.width / 2 + cx * ROT_GRID; }
    function rotToCanvasY(cy) { return rotCanvas.height / 2 - cy * ROT_GRID; }

    // Rotate point (px,py) around (cx,cy) by angleDeg degrees
    function rotatePoint(px, py, cx, cy, angleDeg) {
        const rad = angleDeg * Math.PI / 180;
        const dx = px - cx, dy = py - cy;
        return {
            x: cx + dx * Math.cos(rad) - dy * Math.sin(rad),
            y: cy + dx * Math.sin(rad) + dy * Math.cos(rad)
        };
    }

    // ---- Draw Bunga (Flower) Motif ----
    function drawBunga(ctx, cartX, cartY, rotAngle, alpha, gridUnit, toX, toY) {
        const cx = toX(cartX), cy = toY(cartY);
        const s = gridUnit * 0.6;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(cx, cy);
        ctx.rotate(-rotAngle * Math.PI / 180);

        // Petals
        const petalColors = ['#e86090', '#c94070', '#e86090', '#d85080', '#e86090', '#c94070'];
        for (let i = 0; i < 6; i++) {
            ctx.save();
            ctx.rotate((i * 60) * Math.PI / 180);
            ctx.beginPath();
            ctx.ellipse(0, -s * 0.45, s * 0.22, s * 0.4, 0, 0, Math.PI * 2);
            const pg = ctx.createRadialGradient(0, -s * 0.35, 0, 0, -s * 0.45, s * 0.35);
            pg.addColorStop(0, '#ff9fc0');
            pg.addColorStop(0.6, petalColors[i]);
            pg.addColorStop(1, '#a02858');
            ctx.fillStyle = pg;
            ctx.fill();
            ctx.strokeStyle = '#8a2048';
            ctx.lineWidth = 0.7;
            ctx.stroke();
            ctx.restore();
        }

        // Center circle
        const cg = ctx.createRadialGradient(-s * 0.03, -s * 0.03, 0, 0, 0, s * 0.18);
        cg.addColorStop(0, '#FFD93D');
        cg.addColorStop(1, '#F68D1C');
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = cg;
        ctx.fill();
        ctx.strokeStyle = '#d97a10';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Center dots
        for (let i = 0; i < 5; i++) {
            const a = (i * 72) * Math.PI / 180;
            ctx.beginPath();
            ctx.arc(Math.cos(a) * s * 0.08, Math.sin(a) * s * 0.08, s * 0.025, 0, Math.PI * 2);
            ctx.fillStyle = '#d97a10';
            ctx.fill();
        }

        ctx.restore();
    }

    // ---- Draw Geometris (Diamond) Motif ----
    function drawGeometris(ctx, cartX, cartY, rotAngle, alpha, gridUnit, toX, toY) {
        const cx = toX(cartX), cy = toY(cartY);
        const s = gridUnit * 0.5;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(cx, cy);
        ctx.rotate(-rotAngle * Math.PI / 180);

        // Outer diamond
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.7, 0);
        ctx.lineTo(0, s);
        ctx.lineTo(-s * 0.7, 0);
        ctx.closePath();
        const dg = ctx.createLinearGradient(0, -s, 0, s);
        dg.addColorStop(0, '#4a6fa5');
        dg.addColorStop(0.5, '#2d4a7a');
        dg.addColorStop(1, '#1a2744');
        ctx.fillStyle = dg;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner diamond
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.55);
        ctx.lineTo(s * 0.38, 0);
        ctx.lineTo(0, s * 0.55);
        ctx.lineTo(-s * 0.38, 0);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Cross lines
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.55);
        ctx.lineTo(0, s * 0.55);
        ctx.moveTo(-s * 0.38, 0);
        ctx.lineTo(s * 0.38, 0);
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Corner dots
        const corners = [[0, -s], [s * 0.7, 0], [0, s], [-s * 0.7, 0]];
        corners.forEach(([dx, dy]) => {
            ctx.beginPath();
            ctx.arc(dx, dy, s * 0.06, 0, Math.PI * 2);
            ctx.fillStyle = '#FFD93D';
            ctx.fill();
        });

        ctx.restore();
    }

    // ---- Draw Rotation Arc ----
    function drawRotArc(ctx, cx, cy, px, py, angleDeg, gridUnit, toX, toY) {
        const ccx = toX(cx), ccy = toY(cy);
        const cpx = toX(px), cpy = toY(py);
        const dx = cpx - ccx, dy = cpy - ccy;
        const radius = Math.sqrt(dx * dx + dy * dy);
        if (radius < 5) return;

        const startAngle = Math.atan2(dy, dx);
        const endAngle = startAngle - (angleDeg * Math.PI / 180);

        ctx.save();
        ctx.strokeStyle = 'rgba(128,119,193,0.5)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        if (angleDeg > 0) {
            ctx.arc(ccx, ccy, radius, startAngle, endAngle, true);
        } else {
            ctx.arc(ccx, ccy, radius, startAngle, endAngle, false);
        }
        ctx.stroke();

        // Arrow at end
        ctx.setLineDash([]);
        const arrowAngle = endAngle;
        const tangentAngle = arrowAngle + (angleDeg > 0 ? -Math.PI / 2 : Math.PI / 2);
        const ax = ccx + radius * Math.cos(arrowAngle);
        const ay = ccy + radius * Math.sin(arrowAngle);
        const hl = 8;
        ctx.fillStyle = '#8077C1';
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax - hl * Math.cos(tangentAngle - 0.4), ay - hl * Math.sin(tangentAngle - 0.4));
        ctx.lineTo(ax - hl * Math.cos(tangentAngle + 0.4), ay - hl * Math.sin(tangentAngle + 0.4));
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    // ---- Draw Rotation Center Marker ----
    function drawRotCenter(ctx, cx, cy, toX, toY) {
        const x = toX(cx), y = toY(cy);
        ctx.save();
        // Crosshair
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 2]);
        ctx.beginPath();
        ctx.moveTo(x - 10, y); ctx.lineTo(x + 10, y);
        ctx.moveTo(x, y - 10); ctx.lineTo(x, y + 10);
        ctx.stroke();
        // Center dot
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // Label
        ctx.font = '700 10px Outfit, sans-serif';
        ctx.fillStyle = '#ef4444';
        ctx.textAlign = 'left';
        ctx.fillText(`P(${cx}, ${cy})`, x + 10, y - 8);
        ctx.restore();
    }

    // ---- Main Rotation Render ----
    function renderRotation() {
        if (!rotCtx || !rotCanvas) return;
        const w = rotCanvas.width, h = rotCanvas.height;
        if (w <= 0 || h <= 0) return;

        rotCtx.clearRect(0, 0, w, h);
        drawGrid(rotCtx, w, h, ROT_GRID);

        // Override coordinate helpers for rotation canvas
        const toX = (cx) => w / 2 + cx * ROT_GRID;
        const toY = (cy) => h / 2 - cy * ROT_GRID;

        const drawMotif = rotState.motif === 'bunga' ? drawBunga : drawGeometris;

        // Draw rotation center marker
        drawRotCenter(rotCtx, rotState.centerX, rotState.centerY, toX, toY);

        // Draw original motif
        drawMotif(rotCtx, rotState.origX, rotState.origY, 0, 1.0, ROT_GRID, toX, toY);

        // Label for original
        rotCtx.save();
        rotCtx.font = '700 11px Outfit, sans-serif';
        rotCtx.fillStyle = '#F68D1C';
        rotCtx.textAlign = 'center';
        rotCtx.fillText(`P(${rotState.origX}, ${rotState.origY})`, toX(rotState.origX), toY(rotState.origY) + ROT_GRID * 0.8);
        rotCtx.restore();

        // Draw point marker for original
        rotCtx.save();
        rotCtx.fillStyle = '#F68D1C';
        rotCtx.beginPath();
        rotCtx.arc(toX(rotState.origX), toY(rotState.origY), 4, 0, Math.PI * 2);
        rotCtx.fill();
        rotCtx.strokeStyle = '#fff';
        rotCtx.lineWidth = 1.5;
        rotCtx.stroke();
        rotCtx.restore();

        // Draw each rotation step
        let prevX = rotState.origX, prevY = rotState.origY;
        const totalAngle = rotState.angle;
        const stepColors = ['#8077C1', '#6960a8', '#c94070', '#4a7c10'];

        for (let s = 0; s < rotState.steps; s++) {
            const cumulAngle = totalAngle * (s + 1);
            const rp = rotatePoint(rotState.origX, rotState.origY, rotState.centerX, rotState.centerY, cumulAngle);
            const rx = Math.round(rp.x * 100) / 100;
            const ry = Math.round(rp.y * 100) / 100;

            // Draw arc from prev to current
            drawRotArc(rotCtx, rotState.centerX, rotState.centerY, prevX, prevY, totalAngle, ROT_GRID, toX, toY);

            // Draw rotated motif
            const alpha = 0.4 + (s + 1) * 0.15;
            drawMotif(rotCtx, rx, ry, cumulAngle, Math.min(alpha, 0.85), ROT_GRID, toX, toY);

            // Label
            rotCtx.save();
            rotCtx.font = '700 10px Outfit, sans-serif';
            rotCtx.fillStyle = stepColors[s % stepColors.length];
            rotCtx.textAlign = 'center';
            const niceX = Number.isInteger(rx) ? rx : rx.toFixed(1);
            const niceY = Number.isInteger(ry) ? ry : ry.toFixed(1);
            rotCtx.fillText(`P${s + 1}'(${niceX}, ${niceY})`, toX(rx), toY(ry) + ROT_GRID * 0.8);
            rotCtx.restore();

            // Point marker
            rotCtx.save();
            rotCtx.fillStyle = stepColors[s % stepColors.length];
            rotCtx.beginPath();
            rotCtx.arc(toX(rx), toY(ry), 3.5, 0, Math.PI * 2);
            rotCtx.fill();
            rotCtx.strokeStyle = '#fff';
            rotCtx.lineWidth = 1;
            rotCtx.stroke();
            rotCtx.restore();

            prevX = rx; prevY = ry;
        }

        // Update info panel
        updateRotInfoPanel();
        updateStepDots();
    }

    function updateRotInfoPanel() {
        const coordOrig = document.getElementById('rot-coord-original');
        const coordTrans = document.getElementById('rot-coord-transformed');
        const formulaText = document.getElementById('rot-formula-text');

        if (coordOrig) coordOrig.textContent = `P(${rotState.origX}, ${rotState.origY})`;

        if (rotState.steps > 0) {
            const lastAngle = rotState.angle * rotState.steps;
            const rp = rotatePoint(rotState.origX, rotState.origY, rotState.centerX, rotState.centerY, lastAngle);
            const rx = Math.round(rp.x * 100) / 100;
            const ry = Math.round(rp.y * 100) / 100;
            const nX = Number.isInteger(rx) ? rx : rx.toFixed(1);
            const nY = Number.isInteger(ry) ? ry : ry.toFixed(1);
            if (coordTrans) coordTrans.textContent = `P'(${nX}, ${nY})`;

            let formula = `R(P(${rotState.centerX},${rotState.centerY}), ${lastAngle}°): `;
            if (lastAngle === 90) formula += '(x,y) → (−y, x)';
            else if (lastAngle === 180) formula += '(x,y) → (−x, −y)';
            else if (lastAngle === 270) formula += '(x,y) → (y, −x)';
            else if (lastAngle === 360) formula += '(x,y) → (x, y) — putaran penuh!';
            else formula += `θ = ${lastAngle}°`;
            if (formulaText) formulaText.textContent = formula;
        } else {
            if (coordTrans) coordTrans.textContent = `P'(${rotState.origX}, ${rotState.origY})`;
            if (formulaText) formulaText.textContent = 'Tekan "Simulasikan Rotasi" untuk memutar ornamen';
        }
    }

    function updateStepDots() {
        const dots = document.querySelectorAll('.rot-step-dot');
        dots.forEach(d => {
            const s = parseInt(d.getAttribute('data-step'));
            d.classList.remove('active', 'done');
            if (s < rotState.steps) d.classList.add('done');
            if (s === rotState.steps) d.classList.add('active');
        });
    }

    // ---- Aktivitas 2 Controls ----

    // Motif buttons
    const btnBunga = document.getElementById('btn-motif-bunga');
    const btnGeo = document.getElementById('btn-motif-geometris');
    if (btnBunga) btnBunga.addEventListener('click', () => {
        rotState.motif = 'bunga';
        btnBunga.classList.add('active');
        if (btnGeo) btnGeo.classList.remove('active');
        renderRotation();
    });
    if (btnGeo) btnGeo.addEventListener('click', () => {
        rotState.motif = 'geometris';
        btnGeo.classList.add('active');
        if (btnBunga) btnBunga.classList.remove('active');
        renderRotation();
    });

    // Rotation center inputs
    const rotCenterX = document.getElementById('rot-center-x');
    const rotCenterY = document.getElementById('rot-center-y');
    if (rotCenterX) rotCenterX.addEventListener('change', () => {
        rotState.centerX = parseInt(rotCenterX.value) || 0;
        rotState.steps = 0;
        renderRotation();
    });
    if (rotCenterY) rotCenterY.addEventListener('change', () => {
        rotState.centerY = parseInt(rotCenterY.value) || 0;
        rotState.steps = 0;
        renderRotation();
    });

    // Angle buttons
    const angleBtns = document.querySelectorAll('.angle-btn');
    angleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            angleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            rotState.angle = parseInt(btn.getAttribute('data-angle'));
            rotState.steps = 0;
            renderRotation();
        });
    });

    // Simulate button
    const btnSimulate = document.getElementById('btn-simulate-rotate');
    if (btnSimulate) btnSimulate.addEventListener('click', () => {
        if (rotState.steps >= rotState.maxSteps) {
            showToast('Sudah mencapai 4 langkah rotasi! Tekan Reset untuk mengulang.');
            return;
        }
        rotState.steps++;
        renderRotation();
        const totalAngle = rotState.angle * rotState.steps;
        showToast(`Rotasi ${totalAngle}° diterapkan! 🔄`);

        if (rotState.steps >= rotState.maxSteps) {
            showToast('Pola radial lengkap! ✨');
        }
    });

    // Reset rotation
    const btnResetRot = document.getElementById('btn-reset-rotate');
    if (btnResetRot) btnResetRot.addEventListener('click', () => {
        rotState.steps = 0;
        renderRotation();
        showToast('Reset berhasil ↩️');
    });

    // Resize observer for rotation canvas
    if (rotWrap) {
        const rotResizeObs = new ResizeObserver(() => {
            if (studioPage && studioPage.classList.contains('active') && currentAkt === 2) {
                resizeRotCanvas();
            }
        });
        rotResizeObs.observe(rotWrap);
    }

    window.addEventListener('resize', () => {
        if (studioPage && studioPage.classList.contains('active') && currentAkt === 2) {
            resizeRotCanvas();
        }
        if (studioPage && studioPage.classList.contains('active') && currentAkt === 3) {
            resizeTeselCanvas();
        }
    });

    // ==== AKTIVITAS 3: DILATASI & TESELASI ====

    const teselState = {
        motif: 'mangga',
        scaleFactor: 1.0,
        gridM: 3, gridN: 3,
        seqDilatasi: true,
        seqTranslasi: false,
        seqRefleksi: false,
        generated: false
    };

    const teselCanvas = document.getElementById('canvas-teselasi');
    const teselCtx = teselCanvas ? teselCanvas.getContext('2d') : null;
    const teselWrap = document.getElementById('canvas-wrap-3');
    let TESEL_UNIT = 35;

    function resizeTeselCanvas() {
        if (!teselCanvas || !teselWrap) return;
        const rect = teselWrap.getBoundingClientRect();
        const w = Math.floor(rect.width);
        const h = Math.floor(rect.height);
        if (w <= 0 || h <= 0) return;
        teselCanvas.width = w;
        teselCanvas.height = h;
        renderTeselasi();
    }

    // ---- Draw Mangga for Tessellation (simplified, self-contained) ----
    function drawTeselMangga(ctx, cx, cy, size) {
        ctx.save();
        ctx.translate(cx, cy);
        const s = size * 0.4;

        ctx.beginPath();
        ctx.moveTo(0, -s * 0.65);
        ctx.bezierCurveTo(s * 0.55, -s * 0.65, s * 0.65, -s * 0.1, s * 0.5, s * 0.3);
        ctx.bezierCurveTo(s * 0.35, s * 0.6, s * 0.1, s * 0.7, 0, s * 0.7);
        ctx.bezierCurveTo(-s * 0.1, s * 0.7, -s * 0.35, s * 0.6, -s * 0.5, s * 0.3);
        ctx.bezierCurveTo(-s * 0.65, -s * 0.1, -s * 0.55, -s * 0.65, 0, -s * 0.65);
        ctx.closePath();

        const grad = ctx.createRadialGradient(s * 0.1, -s * 0.1, 0, 0, 0, s * 0.7);
        grad.addColorStop(0, '#FFD93D');
        grad.addColorStop(0.6, '#F68D1C');
        grad.addColorStop(1, '#d97a10');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = '#b86a0a';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Leaf
        ctx.beginPath();
        ctx.moveTo(s * 0.02, -s * 0.65);
        ctx.quadraticCurveTo(s * 0.3, -s * 0.9, s * 0.35, -s * 0.6);
        ctx.quadraticCurveTo(s * 0.2, -s * 0.65, s * 0.02, -s * 0.65);
        ctx.fillStyle = '#5eaa22';
        ctx.fill();

        ctx.restore();
    }

    // ---- Draw Bunga for Tessellation ----
    function drawTeselBunga(ctx, cx, cy, size) {
        ctx.save();
        ctx.translate(cx, cy);
        const s = size * 0.35;

        for (let i = 0; i < 6; i++) {
            ctx.save();
            ctx.rotate((i * 60) * Math.PI / 180);
            ctx.beginPath();
            ctx.ellipse(0, -s * 0.4, s * 0.18, s * 0.35, 0, 0, Math.PI * 2);
            const pg = ctx.createRadialGradient(0, -s * 0.3, 0, 0, -s * 0.4, s * 0.3);
            pg.addColorStop(0, '#ff9fc0');
            pg.addColorStop(1, '#c94070');
            ctx.fillStyle = pg;
            ctx.fill();
            ctx.strokeStyle = '#8a2048';
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.restore();
        }

        // Center
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.14, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD93D';
        ctx.fill();
        ctx.strokeStyle = '#d97a10';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.restore();
    }

    // ---- Main Tessellation Render ----
    function renderTeselasi() {
        if (!teselCtx || !teselCanvas) return;
        const w = teselCanvas.width, h = teselCanvas.height;
        if (w <= 0 || h <= 0) return;

        teselCtx.clearRect(0, 0, w, h);

        // Fabric-like background
        const bgGrad = teselCtx.createLinearGradient(0, 0, w, h);
        bgGrad.addColorStop(0, '#f5f0e8');
        bgGrad.addColorStop(0.5, '#ede7da');
        bgGrad.addColorStop(1, '#f5f0e8');
        teselCtx.fillStyle = bgGrad;
        teselCtx.fillRect(0, 0, w, h);

        // Fabric texture (subtle diagonal lines)
        teselCtx.save();
        teselCtx.strokeStyle = 'rgba(180,170,150,0.15)';
        teselCtx.lineWidth = 0.5;
        for (let i = -h; i < w + h; i += 8) {
            teselCtx.beginPath();
            teselCtx.moveTo(i, 0);
            teselCtx.lineTo(i + h, h);
            teselCtx.stroke();
        }
        teselCtx.restore();

        if (!teselState.generated) {
            // Show single motif in center with scale preview
            const baseSize = Math.min(w, h) * 0.25;
            const scaledSize = baseSize * teselState.scaleFactor;

            // Ghost of original size
            teselCtx.save();
            teselCtx.globalAlpha = 0.2;
            const drawM = teselState.motif === 'mangga' ? drawTeselMangga : drawTeselBunga;
            drawM(teselCtx, w / 2, h / 2, baseSize);
            teselCtx.restore();

            // Scaled motif
            teselCtx.save();
            teselCtx.globalAlpha = 1.0;
            drawM(teselCtx, w / 2, h / 2, scaledSize);
            teselCtx.restore();

            // Scale indicator
            teselCtx.save();
            teselCtx.font = '700 13px Outfit, sans-serif';
            teselCtx.fillStyle = '#2d8a6e';
            teselCtx.textAlign = 'center';
            teselCtx.fillText(`k = ${teselState.scaleFactor.toFixed(1)}×`, w / 2, h / 2 + scaledSize * 0.5 + 20);
            teselCtx.restore();

            // Border hint
            teselCtx.save();
            teselCtx.strokeStyle = 'rgba(45,138,110,0.3)';
            teselCtx.lineWidth = 2;
            teselCtx.setLineDash([6, 4]);
            teselCtx.strokeRect(w / 2 - scaledSize * 0.5, h / 2 - scaledSize * 0.5, scaledSize, scaledSize);
            teselCtx.restore();
        } else {
            // Full tessellation
            const m = teselState.gridM;
            const n = teselState.gridN;
            const padding = 20;
            const cellW = (w - padding * 2) / m;
            const cellH = (h - padding * 2) / n;
            const cellSize = Math.min(cellW, cellH);
            const baseSize = cellSize * teselState.scaleFactor;
            const drawM = teselState.motif === 'mangga' ? drawTeselMangga : drawTeselBunga;

            // Center the grid
            const totalW = m * cellSize;
            const totalH = n * cellSize;
            const offsetX = (w - totalW) / 2;
            const offsetY = (h - totalH) / 2;

            // Draw grid lines
            teselCtx.save();
            teselCtx.strokeStyle = 'rgba(45,138,110,0.15)';
            teselCtx.lineWidth = 1;
            teselCtx.setLineDash([4, 3]);
            for (let i = 0; i <= m; i++) {
                teselCtx.beginPath();
                teselCtx.moveTo(offsetX + i * cellSize, offsetY);
                teselCtx.lineTo(offsetX + i * cellSize, offsetY + totalH);
                teselCtx.stroke();
            }
            for (let j = 0; j <= n; j++) {
                teselCtx.beginPath();
                teselCtx.moveTo(offsetX, offsetY + j * cellSize);
                teselCtx.lineTo(offsetX + totalW, offsetY + j * cellSize);
                teselCtx.stroke();
            }
            teselCtx.restore();

            // Draw motifs in grid
            for (let row = 0; row < n; row++) {
                for (let col = 0; col < m; col++) {
                    let cx = offsetX + col * cellSize + cellSize / 2;
                    let cy = offsetY + row * cellSize + cellSize / 2;

                    teselCtx.save();

                    // Apply refleksi for alternating columns/rows
                    if (teselState.seqRefleksi) {
                        if (col % 2 === 1) {
                            teselCtx.translate(cx, cy);
                            teselCtx.scale(-1, 1);
                            teselCtx.translate(-cx, -cy);
                        }
                        if (row % 2 === 1) {
                            teselCtx.translate(cx, cy);
                            teselCtx.scale(1, -1);
                            teselCtx.translate(-cx, -cy);
                        }
                    }

                    // Apply translasi offset for alternating rows
                    if (teselState.seqTranslasi && row % 2 === 1) {
                        cx += cellSize * 0.5;
                    }

                    drawM(teselCtx, cx, cy, baseSize * 0.85);
                    teselCtx.restore();
                }
            }

            // Grid label
            teselCtx.save();
            teselCtx.font = '600 11px Outfit, sans-serif';
            teselCtx.fillStyle = '#2d8a6e';
            teselCtx.textAlign = 'left';
            teselCtx.fillText(`${m}×${n} = ${m * n} unit | k=${teselState.scaleFactor.toFixed(1)}`, offsetX, offsetY - 6);
            teselCtx.restore();
        }

        updateTeselInfoPanel();
    }

    function updateTeselInfoPanel() {
        const origEl = document.getElementById('tesel-size-orig');
        const scaledEl = document.getElementById('tesel-size-scaled');
        const formulaEl = document.getElementById('tesel-formula-text');
        const displayK = document.getElementById('display-k');

        if (origEl) origEl.textContent = '1.0×';
        if (scaledEl) scaledEl.textContent = `${teselState.scaleFactor.toFixed(1)}×`;
        if (displayK) displayK.textContent = teselState.scaleFactor.toFixed(1);

        if (teselState.generated) {
            const m = teselState.gridM, n = teselState.gridN;
            const total = m * n;
            let seq = [];
            if (teselState.seqDilatasi) seq.push(`D(k=${teselState.scaleFactor.toFixed(1)})`);
            if (teselState.seqTranslasi) seq.push('T(offset)');
            if (teselState.seqRefleksi) seq.push('Refleksi');
            const seqStr = seq.join(' → ');
            const congruent = teselState.scaleFactor === 1.0 ? 'Kongruen ✓' : 'Sebangun (tidak kongruen)';
            if (formulaEl) formulaEl.textContent = `${seqStr} | Grid ${m}×${n} = ${total} unit | ${congruent}`;
        } else {
            if (formulaEl) formulaEl.textContent = `D[O, ${teselState.scaleFactor.toFixed(1)}]: (x,y) → (${teselState.scaleFactor.toFixed(1)}·x, ${teselState.scaleFactor.toFixed(1)}·y)`;
        }
    }

    // ---- Aktivitas 3 Controls ----

    // Motif buttons
    const btnIsianMangga = document.getElementById('btn-isian-mangga');
    const btnIsianBunga = document.getElementById('btn-isian-bunga');
    if (btnIsianMangga) btnIsianMangga.addEventListener('click', () => {
        teselState.motif = 'mangga';
        btnIsianMangga.classList.add('active');
        if (btnIsianBunga) btnIsianBunga.classList.remove('active');
        teselState.generated = false;
        renderTeselasi();
    });
    if (btnIsianBunga) btnIsianBunga.addEventListener('click', () => {
        teselState.motif = 'bunga';
        btnIsianBunga.classList.add('active');
        if (btnIsianMangga) btnIsianMangga.classList.remove('active');
        teselState.generated = false;
        renderTeselasi();
    });

    // Scale slider
    const sliderK = document.getElementById('slider-k');
    const valK = document.getElementById('val-k');
    if (sliderK) sliderK.addEventListener('input', () => {
        teselState.scaleFactor = parseFloat(sliderK.value);
        if (valK) valK.textContent = teselState.scaleFactor.toFixed(1);
        teselState.generated = false;
        renderTeselasi();
    });

    // Grid inputs
    const teselM = document.getElementById('tesel-m');
    const teselN = document.getElementById('tesel-n');
    if (teselM) teselM.addEventListener('change', () => {
        teselState.gridM = Math.max(1, Math.min(8, parseInt(teselM.value) || 3));
        teselM.value = teselState.gridM;
    });
    if (teselN) teselN.addEventListener('change', () => {
        teselState.gridN = Math.max(1, Math.min(6, parseInt(teselN.value) || 3));
        teselN.value = teselState.gridN;
    });

    // Sequence toggles
    const seqDil = document.getElementById('seq-dilatasi');
    const seqTrans = document.getElementById('seq-translasi');
    const seqRefl = document.getElementById('seq-refleksi');

    if (seqDil) seqDil.addEventListener('click', () => {
        teselState.seqDilatasi = !teselState.seqDilatasi;
        seqDil.classList.toggle('active', teselState.seqDilatasi);
    });
    if (seqTrans) seqTrans.addEventListener('click', () => {
        teselState.seqTranslasi = !teselState.seqTranslasi;
        seqTrans.classList.toggle('active', teselState.seqTranslasi);
    });
    if (seqRefl) seqRefl.addEventListener('click', () => {
        teselState.seqRefleksi = !teselState.seqRefleksi;
        seqRefl.classList.toggle('active', teselState.seqRefleksi);
    });

    // Generate button
    const btnGenerate = document.getElementById('btn-generate-pattern');
    if (btnGenerate) btnGenerate.addEventListener('click', () => {
        teselState.generated = true;
        renderTeselasi();
        showToast(`Pola ${teselState.gridM}×${teselState.gridN} berhasil di-generate! 🎨`);
    });

    // Reset
    const btnResetTesel = document.getElementById('btn-reset-tesel');
    if (btnResetTesel) btnResetTesel.addEventListener('click', () => {
        teselState.scaleFactor = 1.0;
        teselState.generated = false;
        teselState.seqDilatasi = true;
        teselState.seqTranslasi = false;
        teselState.seqRefleksi = false;
        if (sliderK) sliderK.value = 1.0;
        if (valK) valK.textContent = '1.0';
        if (seqDil) seqDil.classList.add('active');
        if (seqTrans) seqTrans.classList.remove('active');
        if (seqRefl) seqRefl.classList.remove('active');
        renderTeselasi();
        showToast('Reset berhasil ↩️');
    });

    // Resize observer for teselasi canvas
    if (teselWrap) {
        const teselResizeObs = new ResizeObserver(() => {
            if (studioPage && studioPage.classList.contains('active') && currentAkt === 3) {
                resizeTeselCanvas();
            }
        });
        teselResizeObs.observe(teselWrap);
    }

    // ==== ZONA TANTANGAN ====
    const zonaTitle = document.getElementById('zona-title');
    const soalImage = document.getElementById('soal-image');
    const soalText = document.getElementById('soal-text');
    const jawabanOptions = document.getElementById('jawaban-options');

    // Randomly select 10 from 15 questions
    const QUIZ_COUNT = 10;
    let activeQuiz = [];

    function shuffleAndPick() {
        const indices = soalData.map((_, i) => i);
        // Fisher-Yates shuffle
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        activeQuiz = indices.slice(0, Math.min(QUIZ_COUNT, soalData.length));
    }
    shuffleAndPick();

    // Track which quiz slots have been answered in the current session
    let answeredSlots = new Set();

    function loadZona(i) {
        const realIdx = activeQuiz[i];
        const d = soalData[realIdx];
        // No question number in title since questions are shuffled — just show topic + progress
        const answeredCount = answeredSlots.size;
        zonaTitle.textContent = `Zona Tantangan (${answeredCount}/${activeQuiz.length} dijawab)`;
        soalImage.src = d.image;
        soalText.innerHTML = `<p>${d.soal}</p>`;
        zonaStartTime = Date.now();
        jawabanOptions.innerHTML = '';
        d.options.forEach((opt, j) => {
            const btn = document.createElement('button');
            btn.className = 'jawaban-option'; btn.textContent = opt;
            // If already answered this slot, show the result
            if (answeredSlots.has(i)) {
                btn.style.pointerEvents = 'none';
                if (j === d.correct) btn.classList.add('correct');
            } else {
                btn.addEventListener('click', () => handleAnswer(btn, j, d.correct, realIdx, i));
            }
            jawabanOptions.appendChild(btn);
        });
    }

    function handleAnswer(btn, sel, cor, soalIdx, slotIdx) {
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

        // Mark this slot as answered
        answeredSlots.add(slotIdx);

        // Update title with new progress
        zonaTitle.textContent = `Zona Tantangan (${answeredSlots.size}/${activeQuiz.length} dijawab)`;

        // Check if all questions are answered → navigate to Dashboard
        if (answeredSlots.size >= activeQuiz.length) {
            setTimeout(() => {
                showToast('Semua soal selesai! Lihat hasil di Dashboard 🎉');
                setTimeout(() => {
                    showPage('page-dashboard');
                }, 1200);
            }, 1000);
        } else {
            // Auto-advance to next unanswered question after delay
            setTimeout(() => {
                let nextSlot = (slotIdx + 1) % activeQuiz.length;
                // Find the next unanswered slot
                let tried = 0;
                while (answeredSlots.has(nextSlot) && tried < activeQuiz.length) {
                    nextSlot = (nextSlot + 1) % activeQuiz.length;
                    tried++;
                }
                zonaIndex = nextSlot;
                loadZona(zonaIndex);
            }, 1500);
        }
    }

    document.getElementById('btn-zona-prev').addEventListener('click', () => { zonaIndex = (zonaIndex - 1 + activeQuiz.length) % activeQuiz.length; loadZona(zonaIndex); });
    document.getElementById('btn-zona-next').addEventListener('click', () => { zonaIndex = (zonaIndex + 1) % activeQuiz.length; loadZona(zonaIndex); });
    loadZona(0);

    // ==== DASHBOARD ====
    const tableBody = document.getElementById('table-body');
    const progresBar = document.getElementById('progres-bar');
    const progresPersen = document.getElementById('progres-persen');

    function updateDashboard() {
        // Table — only show active quiz questions
        tableBody.innerHTML = '';
        activeQuiz.forEach(idx => {
            const sd = scoreData[idx];
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${sd.nama}</td><td>${sd.percobaan}</td><td>${sd.skorTerakhir === '-' ? '-' : sd.skorTerakhir + '%'}</td><td>${sd.waktuTerakhir}</td>`;
            tableBody.appendChild(tr);
        });

        // Progress — berdasarkan 10 soal aktif
        const totalSoal = activeQuiz.length;
        const answered = activeQuiz.filter(idx => scoreData[idx].percobaan > 0).length;
        const correct = activeQuiz.filter(idx => scoreData[idx].skorTerakhir === 100).length;
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
