import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

// API URL'ini environment'a göre ayarla
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? "http://localhost:8000"
  : "https://pyhton-sdubkft.onrender.com";

const defaultField = { label: "", type: "text", options: [], maxResponses: [] };
const defaultText = { title: "", content: "", order: 0 };

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminLoggedInUser");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

const AdminPanel = () => {
  const [fields, setFields] = useState([]);
  const [texts, setTexts] = useState([]);
  const [newField, setNewField] = useState(defaultField);
  const [newText, setNewText] = useState(defaultText);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fieldsLoading, setFieldsLoading] = useState(false);
  const [textsLoading, setTextsLoading] = useState(false);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  
  // Seed state'leri
  const [seedLoading, setSeedLoading] = useState(false);
  const [seedMessage, setSeedMessage] = useState("");

  // Debounce timers
  const [fieldUpdateTimer, setFieldUpdateTimer] = useState(null);
  const [textUpdateTimer, setTextUpdateTimer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setFieldsLoading(true);
      setTextsLoading(true);
      try {
        const [fieldsRes, textsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/form/fields/admin`),
          axios.get(`${API_BASE_URL}/api/form/texts`)
        ]);
        setFields(fieldsRes.data);
        setTexts(textsRes.data);
      } catch (err) {
        setFields([]);
        setTexts([]);
      } finally {
        setFieldsLoading(false);
        setTextsLoading(false);
      }
    };
    
    fetchData();
    
    // Cleanup function
    return () => {
      if (fieldUpdateTimer) clearTimeout(fieldUpdateTimer);
      if (textUpdateTimer) clearTimeout(textUpdateTimer);
    };
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      setApplicationsLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/api/form/applications`);
        setApplications(res.data);
      } catch (err) {
        setApplications([]);
      } finally {
        setApplicationsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleFieldChange = useCallback(async (idx, key, value) => {
    const updated = [...fields];
    updated[idx][key] = value;
    if (key === "type" && value === "select") {
      updated[idx].options = updated[idx].options || [""];
      updated[idx].maxResponses = updated[idx].maxResponses || [0];
    }
    setFields(updated);
    
    // Clear existing timer
    if (fieldUpdateTimer) {
      clearTimeout(fieldUpdateTimer);
    }
    
    // Set new timer for API call
    const timer = setTimeout(async () => {
      try {
        await axios.put(`${API_BASE_URL}/api/form/fields/${updated[idx]._id}`, updated[idx]);
      } catch (err) {
        console.error("Soru güncellenirken hata oluştu:", err);
      }
    }, 1000); // 1 second debounce
    
    setFieldUpdateTimer(timer);
  }, [fields, fieldUpdateTimer]);

  const handleTextChange = useCallback(async (idx, key, value) => {
    const updated = [...texts];
    updated[idx][key] = value;
    setTexts(updated);
    
    // Clear existing timer
    if (textUpdateTimer) {
      clearTimeout(textUpdateTimer);
    }
    
    // Set new timer for API call
    const timer = setTimeout(async () => {
      try {
        await axios.put(`${API_BASE_URL}/api/form/texts/${updated[idx]._id}`, updated[idx]);
      } catch (err) {
        console.error("Metin güncellenirken hata oluştu:", err);
      }
    }, 1000); // 1 second debounce
    
    setTextUpdateTimer(timer);
  }, [texts, textUpdateTimer]);

  const handleOptionChange = useCallback((fIdx, oIdx, value) => {
    const updated = [...fields];
    updated[fIdx].options[oIdx] = value;
    setFields(updated);
    
    // Clear existing timer
    if (fieldUpdateTimer) {
      clearTimeout(fieldUpdateTimer);
    }
    
    // Set new timer for API call
    const timer = setTimeout(async () => {
      try {
        await axios.put(`${API_BASE_URL}/api/form/fields/${updated[fIdx]._id}`, updated[fIdx]);
      } catch (err) {
        console.error("Seçenek güncellenirken hata oluştu:", err);
      }
    }, 1000);
    
    setFieldUpdateTimer(timer);
  }, [fields, fieldUpdateTimer]);

  const handleMaxResponseChange = useCallback((fIdx, oIdx, value) => {
    const updated = [...fields];
    if (!updated[fIdx].maxResponses) {
      updated[fIdx].maxResponses = [];
    }
    updated[fIdx].maxResponses[oIdx] = parseInt(value) || 0;
    setFields(updated);
    
    // Clear existing timer
    if (fieldUpdateTimer) {
      clearTimeout(fieldUpdateTimer);
    }
    
    // Set new timer for API call
    const timer = setTimeout(async () => {
      try {
        await axios.put(`${API_BASE_URL}/api/form/fields/${updated[fIdx]._id}`, updated[fIdx]);
      } catch (err) {
        console.error("Maksimum yanıt sayısı güncellenirken hata oluştu:", err);
      }
    }, 1000);
    
    setFieldUpdateTimer(timer);
  }, [fields, fieldUpdateTimer]);

  const addOption = useCallback((fIdx) => {
    const updated = [...fields];
    updated[fIdx].options.push("");
    if (!updated[fIdx].maxResponses) {
      updated[fIdx].maxResponses = [];
    }
    updated[fIdx].maxResponses.push(0);
    setFields(updated);
    
    // Clear existing timer
    if (fieldUpdateTimer) {
      clearTimeout(fieldUpdateTimer);
    }
    
    // Set new timer for API call
    const timer = setTimeout(async () => {
      try {
        await axios.put(`${API_BASE_URL}/api/form/fields/${updated[fIdx]._id}`, updated[fIdx]);
      } catch (err) {
        console.error("Seçenek eklenirken hata oluştu:", err);
      }
    }, 1000);
    
    setFieldUpdateTimer(timer);
  }, [fields, fieldUpdateTimer]);

  const removeOption = useCallback((fIdx, oIdx) => {
    const updated = [...fields];
    updated[fIdx].options.splice(oIdx, 1);
    if (updated[fIdx].maxResponses) {
      updated[fIdx].maxResponses.splice(oIdx, 1);
    }
    setFields(updated);
    
    // Clear existing timer
    if (fieldUpdateTimer) {
      clearTimeout(fieldUpdateTimer);
    }
    
    // Set new timer for API call
    const timer = setTimeout(async () => {
      try {
        await axios.put(`${API_BASE_URL}/api/form/fields/${updated[fIdx]._id}`, updated[fIdx]);
      } catch (err) {
        console.error("Seçenek silinirken hata oluştu:", err);
      }
    }, 1000);
    
    setFieldUpdateTimer(timer);
  }, [fields, fieldUpdateTimer]);

  const addField = async () => {
    if (!newField.label) return;
    try {
      const res = await axios.post(`${API_BASE_URL}/api/form/fields`, newField);
      setFields([...fields, res.data]);
      setNewField(defaultField);
    } catch (err) {
      alert("Soru eklenirken hata oluştu");
    }
  };

  const removeField = async (idx) => {
    const field = fields[idx];
    try {
      await axios.delete(`${API_BASE_URL}/api/form/fields/${field._id}`);
      const updated = [...fields];
      updated.splice(idx, 1);
      setFields(updated);
    } catch (err) {
      alert("Soru silinirken hata oluştu");
    }
  };

  const addText = async () => {
    if (!newText.title || !newText.content) return;
    try {
      const res = await axios.post(`${API_BASE_URL}/api/form/texts`, newText);
      setTexts([...texts, res.data]);
      setNewText(defaultText);
    } catch (err) {
      alert("Metin eklenirken hata oluştu");
    }
  };

  const removeText = async (idx) => {
    const text = texts[idx];
    try {
      await axios.delete(`${API_BASE_URL}/api/form/texts/${text._id}`);
      const updated = [...texts];
      updated.splice(idx, 1);
      setTexts(updated);
    } catch (err) {
      alert("Metin silinirken hata oluştu");
    }
  };

  const handleSeed = async () => {
    setSeedLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.post(`${API_BASE_URL}/admin/seed`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSeedMessage(res.data.message);
      setTimeout(() => setSeedMessage(""), 3000);
    } catch (err) {
      setSeedMessage("Hata: " + (err.response?.data?.message || err.message));
      setTimeout(() => setSeedMessage(""), 3000);
    } finally {
      setSeedLoading(false);
    }
  };

  // Başvuru silme fonksiyonu
  const deleteApplication = async (applicationId) => {
    if (!window.confirm('Bu başvuruyu silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_BASE_URL}/api/form/applications/${applicationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Başvurular listesini güncelle
      setApplications(applications.filter(app => app._id !== applicationId));
      alert('Başvuru başarıyla silindi!');
    } catch (err) {
      alert('Başvuru silinirken hata oluştu: ' + (err.response?.data?.message || err.message));
    }
  };

  // Tüm başvuruları silme fonksiyonu
  const clearAllApplications = async () => {
    if (!window.confirm('TÜM başvuruları silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_BASE_URL}/api/form/applications/clear`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setApplications([]);
      alert('Tüm başvurular başarıyla silindi!');
    } catch (err) {
      alert('Başvurular silinirken hata oluştu: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      <div className="container mx-auto max-w-6xl bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-bold text-blue-300 mb-6 text-center">Yönetim Paneli</h1>
        <div className="text-right text-blue-200 mb-2 text-sm">Giriş yapan: <b>{localStorage.getItem("adminLoggedInUser")}</b></div>
        <div className="flex justify-end mb-4 space-x-2">
          <button 
            onClick={handleSeed}
            className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition disabled:opacity-50"
            disabled={seedLoading}
          >
            {seedLoading ? "Test Hesabı Oluşturuluyor..." : "Test Hesabı Oluştur"}
          </button>
        </div>
        
        {/* Metinler Bölümü */}
        <h2 className="text-xl font-bold text-blue-200 mb-4">Metinler</h2>
        {textsLoading && <div className="text-center text-blue-300 mb-4">Yükleniyor...</div>}
        <div className="space-y-4 mb-8 p-4 bg-gray-900 rounded-lg border border-gray-700">
          {texts.map((text, idx) => (
            <div key={idx} className="p-4 bg-gray-800 rounded-lg border border-gray-600">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  className="mr-2 p-1 border-b border-gray-500 bg-gray-700 font-semibold text-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={text.title}
                  onChange={e => handleTextChange(idx, "title", e.target.value)}
                  placeholder="Metin başlığı"
                />
                <input
                  type="number"
                  className="ml-2 p-1 border-b border-gray-500 bg-gray-700 w-20 text-center text-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={text.order}
                  onChange={e => handleTextChange(idx, "order", parseInt(e.target.value) || 0)}
                  placeholder="Sıra"
                />
                <button onClick={() => removeText(idx)} className="ml-4 text-red-400 font-bold hover:text-red-300">Sil</button>
              </div>
              <textarea
                className="w-full p-2 border border-gray-600 rounded bg-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                value={text.content}
                onChange={e => handleTextChange(idx, "content", e.target.value)}
                placeholder="Metin içeriği..."
              />
            </div>
          ))}
        </div>
        
        {/* Yeni Metin Ekleme */}
        <div className="p-4 bg-gray-700 rounded-lg border border-gray-600 mb-8">
          <div className="flex items-center mb-2">
            <input
              type="text"
              className="mr-2 p-1 border-b border-gray-500 bg-gray-700 font-semibold flex-1 text-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={newText.title}
              onChange={e => setNewText({ ...newText, title: e.target.value })}
              placeholder="Yeni metin başlığı"
            />
            <input
              type="number"
              className="mr-2 p-1 border-b border-gray-500 bg-gray-700 w-20 text-center text-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={newText.order}
              onChange={e => setNewText({ ...newText, order: parseInt(e.target.value) || 0 })}
              placeholder="Sıra"
            />
            <button onClick={addText} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Ekle</button>
          </div>
          <textarea
            className="w-full p-2 border border-gray-600 rounded bg-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            value={newText.content}
            onChange={e => setNewText({ ...newText, content: e.target.value })}
            placeholder="Yeni metin içeriği..."
          />
        </div>
        
        {/* Form Soruları Bölümü */}
        <h2 className="text-xl font-bold text-blue-200 mb-4">Form Soruları</h2>
        {fieldsLoading && <div className="text-center text-blue-300 mb-4">Yükleniyor...</div>}
        <div className="space-y-4 mb-8 p-4 bg-gray-900 rounded-lg border border-gray-700">
          {fields.map((field, idx) => (
            <div key={idx} className="p-4 bg-gray-800 rounded-lg border border-gray-600 mb-2">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  className="mr-2 p-1 border-b border-gray-500 bg-gray-700 font-semibold text-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={field.label}
                  onChange={e => handleFieldChange(idx, "label", e.target.value)}
                  placeholder="Soru başlığı"
                />
                <select
                  className="ml-2 p-1 border-b border-gray-500 bg-gray-700 text-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                  value={field.type}
                  onChange={e => handleFieldChange(idx, "type", e.target.value)}
                >
                  <option value="text">Doldurmalı</option>
                  <option value="select">Çoktan Seçmeli</option>
                </select>
                <label className="ml-4 flex items-center text-blue-200 text-sm">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={field.required || false}
                    onChange={e => handleFieldChange(idx, "required", e.target.checked)}
                  />
                  Zorunlu
                </label>
                <button onClick={() => removeField(idx)} className="ml-4 text-red-400 font-bold hover:text-red-300">Sil</button>
              </div>
              {field.type === "select" && (
                <div className="ml-4 p-3 bg-gray-700 rounded-lg border border-gray-600">
                  <div className="mb-1 font-semibold text-blue-200">Seçenekler ve Maksimum Yanıt Sayıları:</div>
                  {field.options && field.options.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-center mb-2 space-x-2">
                      <input
                        type="text"
                        className="p-1 border-b border-gray-500 bg-gray-600 flex-1 text-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={opt}
                        onChange={e => handleOptionChange(idx, oIdx, e.target.value)}
                        placeholder={`Seçenek ${oIdx + 1}`}
                      />
                      <input
                        type="number"
                        className="p-1 border-b border-gray-500 bg-gray-600 w-20 text-center text-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={field.maxResponses?.[oIdx] || 0}
                        onChange={e => handleMaxResponseChange(idx, oIdx, e.target.value)}
                        placeholder="Max"
                        min="0"
                      />
                      <span className="text-blue-200 text-sm">kişi</span>
                      {field.responseCounts && field.responseCounts[oIdx] && (
                        <span className="text-green-400 text-sm">
                          ({field.responseCounts[oIdx].currentCount}/{field.responseCounts[oIdx].maxCount})
                        </span>
                      )}
                      <button onClick={() => removeOption(idx, oIdx)} className="ml-2 text-red-400 hover:text-red-300">Sil</button>
                    </div>
                  ))}
                  <button onClick={() => addOption(idx)} className="mt-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">+ Seçenek Ekle</button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Yeni Soru Ekleme */}
        <div className="p-4 bg-gray-700 rounded-lg border border-gray-600 mb-8">
          <div className="flex items-center mb-2">
            <input
              type="text"
              className="mr-2 p-1 border-b border-gray-500 bg-gray-700 font-semibold flex-1 text-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={newField.label}
              onChange={e => setNewField({ ...newField, label: e.target.value })}
              placeholder="Yeni soru başlığı"
            />
            <select
              className="ml-2 p-1 border-b border-gray-500 bg-gray-700 text-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
              value={newField.type}
              onChange={e => setNewField({ ...newField, type: e.target.value })}
            >
              <option value="text">Doldurmalı</option>
              <option value="select">Çoktan Seçmeli</option>
            </select>
            <button onClick={addField} className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Ekle</button>
          </div>
          {newField.type === "select" && (
            <div className="ml-4 mt-2 p-3 bg-gray-700 rounded-lg border border-gray-600">
              <div className="mb-1 font-semibold text-blue-200">Seçenekler ve Maksimum Yanıt Sayıları:</div>
              {newField.options && newField.options.map((opt, oIdx) => (
                <div key={oIdx} className="flex items-center mb-1 space-x-2">
                  <input
                    type="text"
                    className="p-1 border-b border-gray-500 bg-gray-600 flex-1 text-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={opt}
                    onChange={e => {
                      const opts = [...newField.options];
                      opts[oIdx] = e.target.value;
                      setNewField({ ...newField, options: opts });
                    }}
                    placeholder={`Seçenek ${oIdx + 1}`}
                  />
                  <input
                    type="number"
                    className="p-1 border-b border-gray-500 bg-gray-600 w-20 text-center text-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={newField.maxResponses?.[oIdx] || 0}
                    onChange={e => {
                      const maxResps = [...(newField.maxResponses || [])];
                      maxResps[oIdx] = parseInt(e.target.value) || 0;
                      setNewField({ ...newField, maxResponses: maxResps });
                    }}
                    placeholder="Max"
                    min="0"
                  />
                  <span className="text-blue-200 text-sm">kişi</span>
                  <button onClick={() => {
                    const opts = [...newField.options];
                    const maxResps = [...(newField.maxResponses || [])];
                    opts.splice(oIdx, 1);
                    maxResps.splice(oIdx, 1);
                    setNewField({ ...newField, options: opts, maxResponses: maxResps });
                  }} className="ml-2 text-red-400 hover:text-red-300">Sil</button>
                </div>
              ))}
              <button onClick={() => {
                const opts = [...(newField.options || []), ""];
                const maxResps = [...(newField.maxResponses || []), 0];
                setNewField({ ...newField, options: opts, maxResponses: maxResps });
              }} className="mt-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">+ Seçenek Ekle</button>
            </div>
          )}
        </div>
        
        {/* Başvurular Tablosu */}
        <h2 className="text-xl font-bold text-blue-200 mb-2 mt-8">Başvurular</h2>
        {applicationsLoading && <div className="text-center text-blue-300 mb-4">Başvurular yükleniyor...</div>}
        
        {/* Başvuru İşlemleri Butonları */}
        {applications.length > 0 && (
          <div className="mb-4 flex justify-between items-center">
            <div className="text-blue-200">
              Toplam {applications.length} başvuru
            </div>
            <button 
              onClick={clearAllApplications}
              className="px-4 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition-colors"
            >
              🗑️ Tüm Başvuruları Sil
            </button>
          </div>
        )}
        
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-gray-700 rounded-lg shadow">
            <thead>
              <tr>
                {applications[0]?.answers?.map((a, i) => (
                  <th key={i} className="px-4 py-2 border-b font-bold text-blue-200">{a.field?.label || 'Soru'}</th>
                ))}
                <th className="px-4 py-2 border-b font-bold text-blue-200">Tarih</th>
                <th className="px-4 py-2 border-b font-bold text-blue-200">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr key={app._id || idx} className="border-b hover:bg-gray-600 transition-colors">
                  {app.answers.map((a, i) => (
                    <td key={i} className="px-4 py-2">{a.value}</td>
                  ))}
                  <td className="px-4 py-2">{new Date(app.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <button 
                      onClick={() => deleteApplication(app._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                      title="Bu başvuruyu sil"
                    >
                      🗑️ Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {applications.length === 0 && <div className="text-center text-blue-200 mt-4">Henüz başvuru yok.</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 