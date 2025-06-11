import React, { useState, useEffect, useRef } from 'react';

const SpotifyPlayer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [pageTheme, setPageTheme] = useState('default');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const iframeRef = useRef(null);
  
  // Spotify playlist ID - SDU Bkft playlist
  const playlistId = '3YMuUrgjYJcpoirAkmYt9t';
  
  // Spotify embed URL - autoplay kaldırıldı
  const spotifyEmbedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;

  // Sayfa temasını algıla
  useEffect(() => {
    const detectPageTheme = () => {
      const body = document.body;
      const html = document.documentElement;
      
      // Sayfanın arka plan rengini kontrol et
      const computedStyle = window.getComputedStyle(body);
      const backgroundColor = computedStyle.backgroundColor;
      
      // Renk analizi
      if (backgroundColor.includes('rgb(17, 24, 39)') || backgroundColor.includes('#111827')) {
        setPageTheme('dark');
      } else if (backgroundColor.includes('rgb(55, 65, 81)') || backgroundColor.includes('#374151')) {
        setPageTheme('gray');
      } else if (backgroundColor.includes('rgb(79, 70, 229)') || backgroundColor.includes('#4f46e5')) {
        setPageTheme('indigo');
      } else if (backgroundColor.includes('rgb(139, 92, 246)') || backgroundColor.includes('#8b5cf6')) {
        setPageTheme('purple');
      } else if (backgroundColor.includes('rgb(59, 130, 246)') || backgroundColor.includes('#3b82f6')) {
        setPageTheme('blue');
      } else {
        setPageTheme('default');
      }
    };

    detectPageTheme();
    
    // Sayfa değişikliklerini dinle
    const observer = new MutationObserver(detectPageTheme);
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class', 'style'],
      subtree: true 
    });

    return () => observer.disconnect();
  }, []);

  // Play butonuna tıklandığında
  const handlePlayClick = () => {
    setShowPlayButton(false);
    setIsPlaying(true);
    
    // Iframe'e play komutu gönder
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.contentWindow.postMessage({
        command: 'play'
      }, 'https://open.spotify.com');
    }
  };

  // Iframe mesajlarını dinle
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin === 'https://open.spotify.com') {
        if (event.data.type === 'ready') {
          console.log('Spotify iframe hazır');
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Tema renklerini belirle
  const getThemeColors = () => {
    switch (pageTheme) {
      case 'dark':
        return {
          background: 'rgba(17, 24, 39, 0.9)',
          border: 'rgba(55, 65, 81, 0.5)',
          filter: 'brightness(0.8) contrast(1.2) saturate(0.8)'
        };
      case 'gray':
        return {
          background: 'rgba(55, 65, 81, 0.9)',
          border: 'rgba(75, 85, 99, 0.5)',
          filter: 'brightness(0.9) contrast(1.1) saturate(0.9)'
        };
      case 'indigo':
        return {
          background: 'rgba(79, 70, 229, 0.9)',
          border: 'rgba(99, 102, 241, 0.5)',
          filter: 'brightness(0.9) contrast(1.1) saturate(1.3) hue-rotate(0deg)'
        };
      case 'purple':
        return {
          background: 'rgba(139, 92, 246, 0.9)',
          border: 'rgba(168, 85, 247, 0.5)',
          filter: 'brightness(0.9) contrast(1.1) saturate(1.2) hue-rotate(0deg)'
        };
      case 'blue':
        return {
          background: 'rgba(59, 130, 246, 0.9)',
          border: 'rgba(96, 165, 250, 0.5)',
          filter: 'brightness(0.9) contrast(1.1) saturate(1.2) hue-rotate(0deg)'
        };
      default:
        return {
          background: 'rgba(0, 0, 0, 0.8)',
          border: 'rgba(255, 255, 255, 0.2)',
          filter: 'brightness(0.9) contrast(1.1) saturate(1.0)'
        };
    }
  };

  const themeColors = getThemeColors();

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: isHovered ? 1 : 0.3,
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <div 
        className="rounded-xl shadow-2xl border backdrop-blur-sm relative"
        style={{
          background: isHovered ? themeColors.background : 'rgba(0, 0, 0, 0.1)',
          borderColor: isHovered ? themeColors.border : 'rgba(255, 255, 255, 0.1)',
          borderWidth: '1px',
          padding: '8px',
        }}
      >
        {/* Play Button Overlay */}
        {showPlayButton && (
          <div 
            className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
            onClick={handlePlayClick}
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '8px',
            }}
          >
            <div className="text-center">
              <div 
                className="w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #1DB954, #1ed760)',
                  boxShadow: '0 4px 15px rgba(29, 185, 84, 0.4)',
                }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="white"
                  className="ml-1"
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-white text-sm font-medium">Müziği Başlat</p>
              <p className="text-gray-300 text-xs mt-1">SDU Bkft Playlist</p>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={spotifyEmbedUrl}
          width="400"
          height="100"
          frameBorder="0"
          allow="encrypted-media"
          className="rounded-lg"
          style={{
            backgroundColor: 'transparent',
            filter: isHovered ? themeColors.filter : 'brightness(0.7) contrast(1.0) saturate(0.8)',
            transition: 'filter 0.5s ease',
            opacity: showPlayButton ? 0.3 : 1,
          }}
        />
      </div>
    </div>
  );
};

export default SpotifyPlayer; 