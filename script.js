// Statik Haber Verileri 
const allNews = [
    {
        id: 1,
        kategori: "Teknoloji",
        baslik: "Yapay Zeka Mimariyi Değiştiriyor",
        ozet: "Yeni yazılımlar bina tasarımlarını saniyeler içinde hazırlıyor.",
        icerik: "Gelişen yapay zeka modelleri artık sadece metin değil, karmaşık mimari planlar da üretebiliyor. Uzmanlar, bu teknolojinin inşaat maliyetlerini %30 oranında düşürebileceğini öngörüyor.",
        resim: "https://yegitek.meb.gov.tr/meb_iys_dosyalar/2024_04/11172533_11114352_mnyt_yapay_zeka.jpg",
        sure: "3 dk"
    },
    {
        id: 2,
        kategori: "Spor",
        baslik: "Olimpiyat Hazırlıkları Sürüyor",
        ozet: "Milli sporcularımız antrenman dozunu artırdı.",
        icerik: "Gelecek yıl düzenlenecek olan oyunlar için hazırlık kampına giren milli takımımız, günde çift idmanla çalışmalarını sürdürüyor. Hedef: Rekor madalya sayısı.",
        resim: "https://www.bestepebloggers.com/wp-content/uploads/2025/05/spor-kulubu.jpg",
        sure: "5 dk"
    },
    {
        id: 3,
        kategori: "Magazin",
        baslik: "Dünya Turnesi Başlıyor",
        ozet: "Ünlü sanatçı 40 ülkede konser vereceğini açıkladı.",
        icerik: "Son albümüyle listeleri alt üst eden pop ikonu, kariyerinin en büyük turnesine çıkıyor. Biletlerin şimdiden tükendiği belirtiliyor.",
        resim: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQY3HneR73Mbfjl4Cwj6H0dw8hi0O3VStKfQ&s",
        sure: "2 dk"
    }
];

window.onload = () => {
    displayNews(allNews);
};

// Haberleri Listeleme 
function displayNews(newsList) {
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    newsList.forEach(news => {
        const card = `
            <div class="news-card" onclick="showDetail(${news.id})">
                <img src="${news.resim}" alt="${news.baslik}">
                <div class="news-card-body">
                    <div class="card-meta">
                        <span class="cat">${news.kategori}</span>
                        <span class="time"><i class="far fa-clock"></i> ${news.sure}</span>
                    </div>
                    <h3>${news.baslik}</h3>
                    <p>${news.ozet}</p>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Filtreleme 
function filterNews(category, btn) {
    document.querySelectorAll('#categories button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (category === 'Hepsi') {
        displayNews(allNews);
    } else {
        const filtered = allNews.filter(n => n.kategori === category);
        displayNews(filtered);
    }
}

// Detay Sayfası ve LocalStorage Favori Yönetimi 
function showDetail(id) {
    const news = allNews.find(n => n.id === id);
    const detailDiv = document.getElementById('news-detail');
    const contentDiv = document.getElementById('detail-content');
    const favBtn = document.getElementById('fav-btn');

    // Favori durumunu kontrol et
    let favs = JSON.parse(localStorage.getItem('news_favs')) || [];
    if(favs.includes(id)) favBtn.classList.add('active');
    else favBtn.classList.remove('active');

    favBtn.onclick = () => toggleFavorite(id);

    contentDiv.innerHTML = `
        <img src="${news.resim}">
        <small style="color:#e31e24; font-weight:bold;">${news.kategori} • ${news.sure} okuma</small>
        <h2 style="margin-top:10px;">${news.baslik}</h2>
        <p>${news.icerik}</p>
    `;
    detailDiv.classList.remove('hidden');
}

function closeDetail() {
    document.getElementById('news-detail').classList.add('hidden');
}

function toggleFavorite(id) {
    let favs = JSON.parse(localStorage.getItem('news_favs')) || [];
    const btn = document.getElementById('fav-btn');

    if(favs.includes(id)) {
        favs = favs.filter(f => f !== id);
        btn.classList.remove('active');
    } else {
        favs.push(id);
        btn.classList.add('active');
    }
    localStorage.setItem('news_favs', JSON.stringify(favs));
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
    const icon = document.querySelector('#dark-mode-btn i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
}