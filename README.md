# SDU BKFT - FRP Sistemleri Sitesi (Python FastAPI + Streamlit)

Süleyman Demirel Üniversitesi Bilim Kurgu ve Fantazya Topluluğu için geliştirilmiş FRP sistemleri tanıtım ve başvuru sitesi.

## 🚀 Özellikler

- **FRP Sistemleri**: Deathwatch, Pathfinder, D&D 5e, Cyberpunk Red, Vampire V5
- **Dinamik Başvuru Formu**: Yönetim panelinden özelleştirilebilir
- **Admin Paneli**: Form yönetimi, başvuru görüntüleme
- **Spotify Player**: Özel tasarımlı müzik çaları (yakında)
- **Çoklu Dil Desteği**: Türkçe ve İngilizce
- **Responsive Tasarım**: Mobil uyumlu

## 🛠️ Teknolojiler

### Backend
- **FastAPI** - Modern, hızlı Python web framework
- **SQLAlchemy** - Python ORM
- **SQLite** - Hafif veritabanı (Vercel'de kullanılabilir)
- **Pydantic** - Veri doğrulama
- **Uvicorn** - ASGI server

### Frontend
- **Streamlit** - Python tabanlı web uygulaması
- **Pandas** - Veri işleme
- **Requests** - HTTP istekleri

## 📦 Kurulum

### Yerel Geliştirme

1. **Bağımlılıkları kur:**
```bash
pip install -r requirements.txt
```

2. **Backend'i başlat:**
```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

3. **Streamlit uygulamasını başlat:**
```bash
streamlit run streamlit_app.py
```

## 🌐 Vercel Deployment

### 1. Vercel CLI Kurulumu
```bash
npm i -g vercel
```

### 2. Projeyi Deploy Et
```bash
vercel
```

### 3. Environment Variables
Vercel dashboard'da şu environment variable'ları ekle:
- `DATABASE_URL`: `sqlite+aiosqlite:///./frpdb.db`

## 📡 API Endpoints

### Kimlik Doğrulama
- `GET /` - Ana sayfa
- `POST /admins/` - Admin ekle
- `GET /admins/` - Admin listesi

### Form Yönetimi
- `GET /form_fields/` - Form alanlarını getir
- `POST /form_fields/` - Form alanı ekle
- `POST /applications/` - Başvuru gönder
- `GET /applications/` - Başvuruları getir

## 🎮 Kullanım

1. **Ana Sayfa**: FRP sistemleri hakkında bilgi
2. **Başvuru Formu**: Oyuncular başvuru yapabilir
3. **Admin Paneli**: Form yönetimi ve başvuru görüntüleme
4. **Spotify Player**: Müzik çalar (yakında)

## 🔐 Admin Girişi

Varsayılan admin kullanıcısı:
- **Kullanıcı Adı**: admin
- **Şifre**: admin

## 📝 Lisans

Bu proje SDU BKFT topluluğu için geliştirilmiştir.

## 🚀 Vercel'de Canlı Demo

Proje Vercel'de deploy edildikten sonra:
- **API**: `https://your-app.vercel.app`
- **Streamlit**: `https://your-app.vercel.app/streamlit`

## 🔧 Geliştirme Notları

- SQLite veritabanı Vercel'de kullanılabilir
- Streamlit uygulaması ayrı bir servis olarak çalışır
- API ve frontend ayrı ayrı deploy edilebilir
