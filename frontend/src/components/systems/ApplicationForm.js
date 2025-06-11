import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? "http://localhost:5000/api"
  : "https://sdu-bkft-backend.vercel.app/api";

const ApplicationForm = () => {
  const [fields, setFields] = useState([]);
  const [texts, setTexts] = useState([]);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fieldsLoading, setFieldsLoading] = useState(false);
  const [textsLoading, setTextsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const pollingIntervalRef = useRef(null);
  const lastServerUpdateRef = useRef(null);

  const fetchData = async () => {
    try {
      // Önce son güncelleme zamanını kontrol et
      const updateRes = await axios.get(`${API_BASE_URL}/form/texts/last-update`);
      const serverLastUpdate = updateRes.data.lastUpdate;
      
      // Eğer sunucuda değişiklik yoksa, veri çekmeye gerek yok
      if (lastServerUpdateRef.current && serverLastUpdate <= lastServerUpdateRef.current) {
        return;
      }
      
      lastServerUpdateRef.current = serverLastUpdate;
      
      setFieldsLoading(true);
      setTextsLoading(true);
      
      const [fieldsRes, textsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/form/fields`),
        axios.get(`${API_BASE_URL}/form/texts`)
      ]);
      
      // Veri kontrolü ekle
      const fieldsData = Array.isArray(fieldsRes.data) ? fieldsRes.data : [];
      const textsData = Array.isArray(textsRes.data) ? textsRes.data : [];
      
      // Veriler değiştiyse güncelle
      const fieldsChanged = JSON.stringify(fieldsData) !== JSON.stringify(fields);
      const textsChanged = JSON.stringify(textsData) !== JSON.stringify(texts);
      
      if (fieldsChanged || textsChanged) {
        setFields(fieldsData);
        setTexts(textsData);
        setLastUpdate(new Date());
        
        // Form verilerini temizle (yeni sorular eklendiğinde)
        if (fieldsChanged) {
          const newFormData = {};
          fieldsData.forEach(field => {
            if (formData[field._id] !== undefined) {
              newFormData[field._id] = formData[field._id];
              if (formData[`${field._id}_selectedOption`] !== undefined) {
                newFormData[`${field._id}_selectedOption`] = formData[`${field._id}_selectedOption`];
              }
            }
          });
          setFormData(newFormData);
        }
      }
    } catch (err) {
      console.error("Form verileri güncellenirken hata:", err);
    } finally {
      setFieldsLoading(false);
      setTextsLoading(false);
    }
  };

  useEffect(() => {
    // İlk yükleme
    fetchData();
    
    // Polling başlat (her 5 saniyede bir)
    pollingIntervalRef.current = setInterval(fetchData, 5000);
    
    // Cleanup
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  // Form verileri değiştiğinde polling'i yeniden başlat
  useEffect(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }
    pollingIntervalRef.current = setInterval(fetchData, 5000);
    
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [fields, texts]);

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSelectChange = (e, field, optionIndex) => {
    setFormData({ 
      ...formData, 
      [field]: e.target.value,
      [`${field}_selectedOption`]: optionIndex // Seçilen seçeneğin index'ini sakla
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const answers = fields.map(f => {
        const answer = { field: f._id, value: formData[f._id] };
        
        // Çoktan seçmeli sorular için selectedOption bilgisini ekle
        if (f.type === 'select' && formData[`${f._id}_selectedOption`] !== undefined) {
          answer.selectedOption = formData[`${f._id}_selectedOption`];
        }
        
        return answer;
      });
      
      await axios.post(`${API_BASE_URL}/form/application`, { answers });
      setSubmitted(true);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Başvuru gönderilirken hata oluştu");
      }
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (submitted) return (
    <div className="min-h-screen pt-24 pb-8 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-green-400 mb-4">Başvurunuz Alındı!</h2>
        <p className="text-blue-200 text-lg">Başvurunuz başarıyla gönderildi. En kısa sürede size dönüş yapacağız.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      <div className="container mx-auto max-w-xl bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-bold text-blue-300 mb-6 text-center">Oyuncu Başvuru Formu</h1>
        
        {/* Güncelleme Bildirimi */}
        {lastUpdate && (
          <div className="mb-4 p-3 bg-blue-900/50 border border-blue-500 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-blue-200 text-sm">
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Form güncellendi
              </span>
              <span className="text-blue-300 text-xs">
                {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
          </div>
        )}
        
        {/* Form Metinleri */}
        {textsLoading && <div className="text-center text-blue-300 mb-4">Metinler yükleniyor...</div>}
        {Array.isArray(texts) && texts.map((text, idx) => (
          <div key={text._id || idx} className="mb-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-blue-200 mb-2">{text.title}</h3>
            <div className="text-gray-300 whitespace-pre-wrap">{text.content}</div>
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {fieldsLoading && <div className="text-center text-blue-300 mb-4">Form yükleniyor...</div>}
          {fields.length === 0 && !fieldsLoading && <div className="text-center text-gray-400">Henüz bir başvuru formu oluşturulmadı.</div>}
          {Array.isArray(fields) && fields.map((field, idx) => {
            const isRequired = field.required;
            return (
              <div key={field._id || field.label + idx} className="flex flex-col">
                <label className="mb-2 font-semibold text-blue-200">
                  {field.label}
                  {isRequired && <span className="text-red-400 ml-1">*</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    className="p-2 rounded border border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData[field._id] || ""}
                    onChange={(e) => {
                      const selectedIndex = field.options.findIndex(opt => opt === e.target.value);
                      handleSelectChange(e, field._id, selectedIndex);
                    }}
                    required={isRequired}
                  >
                    <option value="" disabled>Seçiniz</option>
                    {field.options && Array.isArray(field.options) && field.options.map((opt, i) => (
                      <option key={opt + i} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    className="p-2 rounded border border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData[field._id] || ""}
                    onChange={(e) => handleChange(e, field._id)}
                    required={isRequired}
                  />
                )}
              </div>
            );
          })}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={fields.length === 0 || loading || fields.some(f => f.required && (!formData[f._id] || formData[f._id].trim() === ""))}
          >
            {loading ? "Gönderiliyor..." : "Başvuruyu Gönder"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm; 