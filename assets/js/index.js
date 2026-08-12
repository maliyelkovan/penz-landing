
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-F95LWD4E8N');
  


    const kpis = [
      { label: 'Net Kâr (Toplam)', value: '₺24.000', detail: 'Toplam satış ve maliyetler sonrası net sonuç', icon: '↗', color: '#087a52', soft: '#e9f8f1', path: 'M2,40 C30,8 53,52 79,27 S131,14 158,34 S210,47 237,18 S289,8 316,31 S366,48 418,18' },
      { label: 'Toplam Satış', value: '₺92.000', detail: 'Tüm iş ve satışlarının toplam değeri', icon: '▣', color: '#0c1730', soft: '#eef2ff', path: 'M2,31 C28,12 50,44 76,25 S125,15 151,31 S201,44 231,18 S285,27 313,16 S365,36 418,20' },
      { label: 'Toplam Tahsilat', value: '₺68.000', detail: 'Müşterilerinden bugüne kadar tahsil edilen', icon: '✓', color: '#0c9967', soft: '#e9f8f1', path: 'M2,42 C27,16 55,32 78,19 S126,39 154,26 S208,8 237,22 S286,46 316,27 S368,12 418,29' },
      { label: 'Bekleyen Alacak', value: '₺24.000', detail: 'Vadesi geçen: ₺8.500', icon: '◷', color: '#d86416', soft: '#fff1e9', path: 'M2,38 C30,17 55,42 82,26 S132,20 158,36 S210,39 236,18 S290,16 319,34 S367,45 418,23' },
      { label: 'Bekleyen Borç', value: '₺17.500', detail: 'Vadesi geçen: ₺6.000', icon: '!', color: '#d86416', soft: '#fff1e9', path: 'M2,25 C27,46 52,17 79,35 S130,39 156,21 S209,16 237,36 S287,42 317,23 S367,16 418,35' },
      { label: 'Bu Ayki Finansal Dağılım', value: '₺32.000', detail: 'Satış %74,4 · Satın Alma %18,6 · Gider %7', icon: '◔', color: '#0c1730', soft: '#f0f4f8', path: 'M2,47 C35,35 64,19 95,22 S150,48 183,31 S239,15 270,25 S324,44 353,27 S394,19 418,24' },
      { label: 'Vadesi Yaklaşan Alacaklar', value: '₺40.000', detail: 'Nova Mimarlık ₺25.000 · Pixel Ajans ₺15.000', icon: '◫', color: '#6f52ba', soft: '#f4efff', path: 'M2,43 C34,17 62,24 94,28 S148,47 180,22 S237,14 267,31 S318,43 350,20 S397,26 418,18' }
    ];

    let kpiIndex = 0;
    let kpiTimer;
    const card = document.getElementById('kpiCard');
    const label = document.getElementById('kpiLabel');
    const value = document.getElementById('kpiValue');
    const detail = document.getElementById('kpiDetail');
    const icon = document.getElementById('kpiIcon');
    const sparkPath = document.getElementById('sparkPath');
    const nav = document.getElementById('kpiNav');

    kpis.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'kpi-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', (i + 1) + '. KPI');
      dot.addEventListener('click', () => { showKpi(i); restartTimer(); });
      nav.appendChild(dot);
    });

    function renderKpi(i) {
      const k = kpis[i];
      label.textContent = k.label;
      value.textContent = k.value;
      detail.textContent = k.detail;
      icon.textContent = k.icon;
      sparkPath.setAttribute('d', k.path);
      card.style.setProperty('--kpi-color', k.color);
      card.style.setProperty('--kpi-soft', k.soft);
      [...nav.children].forEach((dot, idx) => dot.classList.toggle('active', idx === i));
    }

    function showKpi(i) {
      if (i === kpiIndex && card.classList.contains('enter')) return;
      card.classList.remove('enter');
      card.classList.add('leave');
      setTimeout(() => {
        kpiIndex = i;
        renderKpi(kpiIndex);
        card.classList.remove('leave');
        void card.offsetWidth;
        card.classList.add('enter');
      }, 300);
    }

    function nextKpi() { showKpi((kpiIndex + 1) % kpis.length); }
    function restartTimer() {
      clearInterval(kpiTimer);
      kpiTimer = setInterval(nextKpi, 3000);
    }
    restartTimer();

    document.querySelectorAll('.faq-btn').forEach(btn => {
      btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
    });

    const menuBtn = document.getElementById('menuBtn');
    const mainNav = document.getElementById('mainNav');
    menuBtn.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.textContent = open ? '×' : '☰';
    });
    document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = '☰';
    }));

    document.getElementById('year').textContent = new Date().getFullYear();
  