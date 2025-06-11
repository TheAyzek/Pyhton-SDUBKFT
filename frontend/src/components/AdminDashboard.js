import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? "http://localhost:5000/api"
  : "https://sdu-bkft-backend.vercel.app/api";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applications, setApplications] = useState([]);
  const [fields, setFields] = useState([]);
  const [texts, setTexts] = useState([]);
  const [username, setUsername] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    fetchDashboardData();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const [applicationsRes, fieldsRes, textsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/form/applications`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_BASE_URL}/form/fields/admin`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_BASE_URL}/form/texts`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      setApplications(applicationsRes.data);
      setFields(fieldsRes.data);
      setTexts(textsRes.data);
      
      // Username'i token'dan çıkar
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      setUsername(tokenData.username || 'Admin');
    } catch (error) {
      console.error('Veri yükleme hatası:', error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_BASE_URL}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardData(response.data);
      setLoading(false);
    } catch (error) {
      setError('Dashboard verileri yüklenemedi');
      setLoading(false);
    }
  };

  const handleCacheClear = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`${API_BASE_URL}/admin/cache/clear`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Cache temizlendi!');
      fetchDashboardData();
    } catch (error) {
      alert('Cache temizleme hatası!');
    }
  };

  const handleMetricsReset = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`${API_BASE_URL}/admin/metrics/reset`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Metrikler sıfırlandı!');
      fetchDashboardData();
    } catch (error) {
      alert('Metrik sıfırlama hatası!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-8 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
            <p className="text-white mt-4">Dashboard yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-8 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-red-400">{error}</p>
            <button 
              onClick={fetchDashboardData}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-300 mb-4">Admin Dashboard</h1>
          <p className="text-gray-300">Hoş geldin, {username}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-blue-300 mb-2">Toplam Başvuru</h3>
            <p className="text-3xl font-bold text-white">{applications.length}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-green-300 mb-2">Form Alanları</h3>
            <p className="text-3xl font-bold text-white">{fields.length}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-purple-300 mb-2">Metin Alanları</h3>
            <p className="text-3xl font-bold text-white">{texts.length}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold text-blue-300 mb-4">Hızlı İşlemler</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/admin-panel/panel"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center"
            >
              Yönetim Paneli
            </Link>
            <Link
              to="/application-form"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center"
            >
              Başvuru Formu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 