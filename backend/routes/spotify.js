const express = require('express');
const axios = require('axios');
const router = express.Router();
const logger = require('../middleware/logger');

// Spotify API credentials
const SPOTIFY_CLIENT_ID = 'a9aad20acb584525aa152c952eb2cb4a';
const SPOTIFY_CLIENT_SECRET = '6fcecea0c5804f5ba45586c8f8183ef7';
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:3000/callback';

// Token storage (production'da Redis kullanılmalı)
let accessToken = null;
let refreshToken = null;
let tokenExpiry = null;

// Spotify token alma
const getSpotifyToken = async () => {
  try {
    // Eğer token yoksa veya süresi dolmuşsa yeni token al
    if (!accessToken || (tokenExpiry && Date.now() >= tokenExpiry)) {
      if (refreshToken) {
        // Refresh token ile yeni access token al
        const response = await axios.post('https://accounts.spotify.com/api/token', 
          new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: SPOTIFY_CLIENT_ID,
            client_secret: SPOTIFY_CLIENT_SECRET
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });

        accessToken = response.data.access_token;
        if (response.data.refresh_token) {
          refreshToken = response.data.refresh_token;
        }
        tokenExpiry = Date.now() + (response.data.expires_in * 1000);
      } else {
        throw new Error('No refresh token available');
      }
    }

    return accessToken;
  } catch (error) {
    logger.logger.error('Spotify token alma hatası:', error);
    throw error;
  }
};

// Spotify authorization URL oluştur
router.get('/auth', (req, res) => {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'playlist-read-private',
    'playlist-read-collaborative'
  ];

  const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope: scopes.join(' '),
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state: 'some-random-state-string'
  })}`;

  res.json({ authUrl });
});

// Authorization callback
router.get('/callback', async (req, res) => {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code required' });
  }

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000);

    logger.logger.info('Spotify authorization successful');

    // Frontend'e yönlendir
    res.redirect('/?spotify=connected');
  } catch (error) {
    logger.logger.error('Spotify callback hatası:', error);
    res.redirect('/?spotify=error');
  }
});

// Access token endpoint
router.get('/token', async (req, res) => {
  try {
    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
      return res.status(500).json({ 
        error: 'Spotify credentials not configured',
        message: 'Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables'
      });
    }

    const token = await getSpotifyToken();
    res.json({ access_token: token });
  } catch (error) {
    logger.logger.error('Token endpoint hatası:', error);
    res.status(500).json({ 
      error: 'Failed to get Spotify token',
      message: 'Please authorize Spotify first'
    });
  }
});

// Playlist bilgilerini getir
router.get('/playlist/:id', async (req, res) => {
  try {
    const token = await getSpotifyToken();
    const playlistId = req.params.id;

    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.json(response.data);
  } catch (error) {
    logger.logger.error('Playlist getirme hatası:', error);
    res.status(500).json({ error: 'Failed to get playlist' });
  }
});

// Kullanıcı profili getir
router.get('/me', async (req, res) => {
  try {
    const token = await getSpotifyToken();

    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.json(response.data);
  } catch (error) {
    logger.logger.error('User profile getirme hatası:', error);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
});

// Kullanıcının cihazlarını getir
router.get('/devices', async (req, res) => {
  try {
    const token = await getSpotifyToken();

    const response = await axios.get('https://api.spotify.com/v1/me/player/devices', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.json(response.data);
  } catch (error) {
    logger.logger.error('Devices getirme hatası:', error);
    res.status(500).json({ error: 'Failed to get devices' });
  }
});

// Playlist çal
router.post('/play', async (req, res) => {
  try {
    const token = await getSpotifyToken();
    const { device_id, playlist_id } = req.body;

    const response = await axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
      context_uri: `spotify:playlist:${playlist_id}`
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ success: true });
  } catch (error) {
    logger.logger.error('Playlist çalma hatası:', error);
    res.status(500).json({ error: 'Failed to play playlist' });
  }
});

// Player durumunu getir
router.get('/player', async (req, res) => {
  try {
    const token = await getSpotifyToken();

    const response = await axios.get('https://api.spotify.com/v1/me/player', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.json(response.data);
  } catch (error) {
    logger.logger.error('Player state getirme hatası:', error);
    res.status(500).json({ error: 'Failed to get player state' });
  }
});

// Spotify bağlantı durumu
router.get('/status', (req, res) => {
  const isConnected = !!(accessToken && tokenExpiry && Date.now() < tokenExpiry);
  res.json({ 
    connected: isConnected,
    hasCredentials: !!(SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET)
  });
});

module.exports = router; 