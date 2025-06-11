import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// API URL'ini environment'a göre ayarla
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? "http://localhost:5000/api"
  : "https://sdu-bkft-backend.vercel.app/api";

const AdminLogin = () => {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Üye olma state'leri
  const [showRegister, setShowRegister] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  
  // Popup state'leri
  const [showPendingPopup, setShowPendingPopup] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");
  
  // Seed state'leri
  const [seedLoading, setSeedLoading] = useState(false);
  const [seedMessage, setSeedMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("Login attempt:", { username: id, password: pass });
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, { username: id, password: pass });
      console.log("Login successful:", res.data);
      setError("");
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminLoggedInUser", res.data.username);
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin-panel");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      if (err.response?.data?.pending) {
        // Onaylanmamış kullanıcı
        setPendingMessage(err.response.data.message);
        setShowPendingPopup(true);
      } else {
        setError("ID veya şifre yanlış!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterMessage("");
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/register-request`, {
        name: registerName,
        username: registerUsername,
        password: registerPassword
      });
      setRegisterMessage("Başvuru alındı! Onay bekleniyor. Mail adresinizi kontrol edin.");
      setRegisterName("");
      setRegisterUsername("");
      setRegisterPassword("");
      setShowRegister(false);
    } catch (err) {
      setRegisterMessage(err.response?.data?.message || "Başvuru gönderilirken hata oluştu!");
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleSeed = async () => {
    setSeedLoading(true);
    setSeedMessage("");
    try {
      const res = await axios.post(`${API_BASE_URL}/seed`);
      setSeedMessage(res.data.message);
    } catch (err) {
      setSeedMessage(err.response?.data?.error || "Test hesabı oluşturulurken hata oluştu!");
    } finally {
      setSeedLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-sm w-full border border-gray-700">
        <h1 className="text-2xl font-bold text-blue-300 mb-6 text-center">Yönetim Girişi</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-blue-200">ID</label>
            <input type="text" className="p-2 rounded border border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" value={id} onChange={e => setId(e.target.value)} required />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-blue-200">Şifre</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="p-2 rounded border border-gray-600 bg-gray-700 text-gray-200 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                value={pass} 
                onChange={e => setPass(e.target.value)} 
                required 
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {error && <div className="text-red-400 text-center font-bold">{error}</div>}
          <button 
            type="submit" 
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
          
          {/* Seed Butonu - Vercel'de testadmin hesabı oluşturmak için */}
          <button 
            type="button"
            onClick={handleSeed}
            className="w-full py-2 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition disabled:opacity-50 mt-2"
            disabled={seedLoading}
          >
            {seedLoading ? "Test Hesabı Oluşturuluyor..." : "Test Hesabı Oluştur"}
          </button>
          
          {seedMessage && (
            <div className="text-center font-bold text-green-400 mt-2">
              {seedMessage}
            </div>
          )}
        </form>
        
        {/* Üye Ol Butonu */}
        <div className="mt-4 text-center">
          <button 
            onClick={() => setShowRegister(true)}
            className="text-blue-300 hover:text-blue-200 font-semibold underline"
          >
            Üye Ol
          </button>
        </div>
      </div>

      {/* Üye Ol Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-blue-300">Üye Ol</h2>
              <button 
                onClick={() => setShowRegister(false)}
                className="text-blue-400 hover:text-blue-300 text-xl font-bold"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-blue-200">Adı Soyadı</label>
                <input 
                  type="text" 
                  className="p-2 rounded border border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={registerName} 
                  onChange={e => setRegisterName(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-blue-200">Kullanıcı Adı</label>
                <input 
                  type="text" 
                  className="p-2 rounded border border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={registerUsername} 
                  onChange={e => setRegisterUsername(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-blue-200">Şifre</label>
                <div className="relative">
                  <input 
                    type={showRegisterPassword ? "text" : "password"} 
                    className="p-2 rounded border border-gray-600 bg-gray-700 text-gray-200 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    value={registerPassword} 
                    onChange={e => setRegisterPassword(e.target.value)} 
                    required 
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-colors"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  >
                    {showRegisterPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              
              {registerMessage && (
                <div className={`text-center font-bold ${registerMessage.includes('Başvuru alındı') ? 'text-green-400' : 'text-red-400'}`}>
                  {registerMessage}
                </div>
              )}
              
              <button 
                type="submit" 
                className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
                disabled={registerLoading}
              >
                {registerLoading ? "Başvuru gönderiliyor..." : "Başvuru Gönder"}
              </button>
            </form>
            
            <div className="mt-4 text-center text-sm text-blue-300">
              Başvurunuz onaylandıktan sonra giriş yapabilirsiniz.
            </div>
          </div>
        </div>
      )}

      {/* Onaylanmamış Kullanıcı Popup */}
      {showPendingPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-700">
            <div className="text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-blue-300 mb-4">Üyelik Onayı Bekleniyor</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {pendingMessage}
              </p>
              <div className="text-sm text-blue-300 mb-6">
                <p>• Mail adresinizi kontrol edin</p>
                <p>• Spam klasörünü kontrol edin</p>
                <p>• Onay mailindeki linke tıklayın</p>
              </div>
              <button 
                onClick={() => setShowPendingPopup(false)}
                className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition"
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin; 