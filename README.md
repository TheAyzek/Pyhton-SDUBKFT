# SDU BKFT - FRP Sistemleri Sitesi

Süleyman Demirel Üniversitesi Bilim Kurgu ve Fantazya Topluluğu için geliştirilmiş FRP sistemleri tanıtım ve başvuru sitesi.

## 🚀 Özellikler

- **FRP Sistemleri**: Deathwatch, Pathfinder, D&D 5e, Cyberpunk Red, Vampire V5
- **Dinamik Başvuru Formu**: Yönetim panelinden özelleştirilebilir
- **Admin Paneli**: Form yönetimi, başvuru görüntüleme
- **Spotify Player**: Özel tasarımlı müzik çaları
- **Çoklu Dil Desteği**: Türkçe ve İngilizce
- **Responsive Tasarım**: Mobil uyumlu

## 🛠️ Teknolojiler

### Frontend
- React.js
- Tailwind CSS
- React Router
- i18next (çoklu dil)
- Axios (API istekleri)
- Spotify Web Playback SDK

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (kimlik doğrulama)
- bcryptjs (şifre hashleme)
- Spotify Web API

## 📦 Kurulum

### Backend
```bash
cd backend
npm install
```

`.env` dosyası oluşturun:
```
MONGO_URI=mongodb://localhost:27017/frpdb
JWT_SECRET=supersecretjwtkey
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
```

İlk admin kullanıcılarını oluşturun:
```bash
node seed.js
```

Backend'i başlatın:
```bash
node index.js
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 🎵 Spotify Entegrasyonu

### Spotify Developer Hesabı Oluşturma
1. [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)'a gidin
2. Yeni uygulama oluşturun
3. Client ID ve Client Secret'ı alın
4. Redirect URI'yi `http://localhost:3000/callback` olarak ayarlayın

### Environment Variables
```
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
```

### Kullanım
1. Spotify hesabınızla giriş yapın
2. Player otomatik olarak yüklenecek
3. "Playlist Çal" butonuna tıklayın
4. Müzik kontrollerini kullanın

## 🔐 Admin Girişi

Varsayılan admin kullanıcıları:
- **TheAyzek** / hadono90kurohitsugi
- **CrabLord** / arkakapımgıcırdıyor

## 📡 API Endpoints

### Kimlik Doğrulama
- `POST /api/auth/login` - Admin girişi
- `POST /api/auth/register` - Admin kaydı (ilk kurulum için)

### Form Yönetimi
- `GET /api/form/fields` - Form sorularını getir
- `POST /api/form/fields` - Soru ekle (admin)
- `PUT /api/form/fields/:id` - Soru güncelle (admin)
- `DELETE /api/form/fields/:id` - Soru sil (admin)
- `POST /api/form/application` - Başvuru gönder
- `GET /api/form/applications` - Başvuruları getir (admin)

### Spotify API
- `GET /api/spotify/auth` - Authorization URL oluştur
- `GET /api/spotify/token` - Access token al
- `GET /api/spotify/playlist/:id` - Playlist bilgilerini getir
- `POST /api/spotify/play` - Playlist çal
- `GET /api/spotify/player` - Player durumunu getir
- `GET /api/spotify/devices` - Cihazları listele

## 🎮 Kullanım

1. **Yönetim Paneli** (`/admin`): Form soruları ekleyin, başvuruları görüntüleyin
2. **Başvuru Formu** (`/application-form`): Oyuncular başvuru yapabilir
3. **FRP Sistemleri**: Her sistem için detaylı bilgi ve kurallar
4. **Spotify Player**: Sayfanın altında müzik çaları

## 🔧 Geliştirme

### Yeni FRP Sistemi Ekleme
1. `frontend/src/components/systems/` altında yeni bileşen oluşturun
2. `App.js`'de route ekleyin
3. Çeviri dosyalarına (`locales/`) çevirileri ekleyin

### Form Sorusu Türleri
- `text`: Metin girişi
- `select`: Çoktan seçmeli (options dizisi gerekli)

### Spotify Player Özelleştirme
- `frontend/src/components/SpotifyPlayer.js` dosyasını düzenleyin
- Playlist ID'sini değiştirmek için `playlistId` state'ini güncelleyin
- Tasarımı Tailwind CSS ile özelleştirin

## 📝 Lisans

Bu proje SDU BKFT topluluğu için geliştirilmiştir.
