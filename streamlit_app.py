import streamlit as st
import requests
import json
import pandas as pd
from datetime import datetime

# Sayfa konfigürasyonu
st.set_page_config(
    page_title="SDU BKFT FRP Sistemleri",
    page_icon="🎲",
    layout="wide",
    initial_sidebar_state="expanded"
)

# API URL - Render deployment
API_URL = "https://pyhton-sdubkft.onrender.com"

# Session state başlatma
if 'admin_logged_in' not in st.session_state:
    st.session_state.admin_logged_in = False

def main():
    # Sidebar
    st.sidebar.title("🎲 SDU BKFT")
    st.sidebar.markdown("---")
    
    # Navigasyon
    page = st.sidebar.selectbox(
        "Sayfa Seçin:",
        ["🏠 Ana Sayfa", "📝 Başvuru Formu", "⚙️ Admin Paneli", "🎵 Spotify Player"]
    )
    
    # Ana sayfa
    if page == "🏠 Ana Sayfa":
        show_home_page()
    
    # Başvuru formu
    elif page == "📝 Başvuru Formu":
        show_application_form()
    
    # Admin paneli
    elif page == "⚙️ Admin Paneli":
        show_admin_panel()
    
    # Spotify player
    elif page == "🎵 Spotify Player":
        show_spotify_player()

def show_home_page():
    st.title("🎲 SDU BKFT FRP Sistemleri")
    st.markdown("---")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("🎮 FRP Sistemleri")
        st.markdown("""
        - **Deathwatch** - Warhammer 40K
        - **Pathfinder** - 1. Edition
        - **D&D 5e** - 5. Edition
        - **Cyberpunk Red** - Cyberpunk
        - **Vampire V5** - Vampire: The Masquerade
        """)
    
    with col2:
        st.subheader("📊 İstatistikler")
        try:
            # API'den veri çekme
            response = requests.get(f"{API_URL}/admins/", timeout=5)
            st.write(f"Admin API Response: {response.status_code}")
            if response.status_code == 200:
                admins = response.json()
                st.metric("Admin Sayısı", len(admins))
            else:
                st.error(f"Admin API Error: {response.status_code}")
            
            response = requests.get(f"{API_URL}/applications/", timeout=5)
            st.write(f"Application API Response: {response.status_code}")
            if response.status_code == 200:
                applications = response.json()
                st.metric("Başvuru Sayısı", len(applications))
            else:
                st.error(f"Application API Error: {response.status_code}")
        except requests.exceptions.ConnectionError:
            st.error("❌ Backend bağlantısı kurulamadı - Backend çalışıyor mu?")
        except requests.exceptions.Timeout:
            st.error("⏰ Backend yanıt vermiyor - Timeout")
        except Exception as e:
            st.error(f"❌ Hata: {str(e)}")
    
    st.markdown("---")
    st.subheader("🎯 Nasıl Başvuru Yaparım?")
    st.markdown("""
    1. Sol menüden **📝 Başvuru Formu**'nu seçin
    2. Formu doldurun
    3. Gönder butonuna tıklayın
    """)

def show_application_form():
    st.title("📝 Başvuru Formu")
    st.markdown("---")
    
    # Form alanlarını getir
    try:
        response = requests.get(f"{API_URL}/form_fields/")
        if response.status_code == 200:
            fields = response.json()
            
            if not fields:
                st.info("Henüz form alanı tanımlanmamış. Admin panelinden ekleyin.")
                return
            
            # Form oluştur
            with st.form("application_form"):
                answers = []
                
                for field in sorted(fields, key=lambda x: x['order']):
                    if field['type'] == 'text':
                        value = st.text_input(
                            field['label'],
                            required=field['required']
                        )
                        answers.append({
                            "field": field['id'],
                            "value": value,
                            "selectedOption": None
                        })
                    
                    elif field['type'] == 'select':
                        options = field.get('options', [])
                        if options:
                            selected = st.selectbox(
                                field['label'],
                                options=options,
                                required=field['required']
                            )
                            selected_index = options.index(selected) if selected else None
                            answers.append({
                                "field": field['id'],
                                "value": selected,
                                "selectedOption": selected_index
                            })
                
                submitted = st.form_submit_button("📤 Başvuruyu Gönder")
                
                if submitted:
                    # Başvuruyu gönder
                    try:
                        response = requests.post(
                            f"{API_URL}/applications/",
                            json={"answers": answers}
                        )
                        
                        if response.status_code == 200:
                            st.success("✅ Başvurunuz başarıyla gönderildi!")
                        else:
                            st.error("❌ Başvuru gönderilirken hata oluştu")
                    except:
                        st.error("❌ Backend bağlantısı kurulamadı")
        else:
            st.error("Form alanları yüklenemedi")
    except:
        st.error("Backend bağlantısı kurulamadı")

def show_admin_panel():
    st.title("⚙️ Admin Paneli")
    st.markdown("---")
    
    # Admin girişi
    if not st.session_state.admin_logged_in:
        with st.form("admin_login"):
            st.subheader("🔐 Admin Girişi")
            username = st.text_input("Kullanıcı Adı")
            password = st.text_input("Şifre", type="password")
            
            if st.form_submit_button("Giriş Yap"):
                # Basit doğrulama (gerçek uygulamada JWT kullanılır)
                if username == "admin" and password == "admin":
                    st.session_state.admin_logged_in = True
                    st.success("Giriş başarılı!")
                    st.rerun()
                else:
                    st.error("Hatalı kullanıcı adı veya şifre")
        return
    
    # Admin menüsü
    st.success("✅ Admin olarak giriş yapıldı")
    
    admin_tab = st.tabs(["👥 Adminler", "📝 Form Alanları", "📋 Başvurular", "➕ Yeni Admin"])
    
    # Adminler tab
    with admin_tab[0]:
        st.subheader("👥 Admin Listesi")
        try:
            response = requests.get(f"{API_URL}/admins/")
            if response.status_code == 200:
                admins = response.json()
                if admins:
                    df = pd.DataFrame(admins)
                    st.dataframe(df, use_container_width=True)
                else:
                    st.info("Henüz admin yok")
        except:
            st.error("Admin listesi yüklenemedi")
    
    # Form alanları tab
    with admin_tab[1]:
        st.subheader("📝 Form Alanları")
        
        # Yeni form alanı ekleme
        with st.expander("➕ Yeni Form Alanı Ekle"):
            with st.form("add_field"):
                label = st.text_input("Alan Başlığı")
                field_type = st.selectbox("Alan Türü", ["text", "select"])
                required = st.checkbox("Zorunlu Alan")
                order = st.number_input("Sıra", min_value=0, value=0)
                
                options = []
                if field_type == "select":
                    options_text = st.text_area("Seçenekler (her satıra bir seçenek)")
                    options = [opt.strip() for opt in options_text.split('\n') if opt.strip()]
                
                if st.form_submit_button("Ekle"):
                    try:
                        field_data = {
                            "label": label,
                            "type": field_type,
                            "required": required,
                            "order": order,
                            "options": options if field_type == "select" else None
                        }
                        
                        response = requests.post(f"{API_URL}/form_fields/", json=field_data)
                        if response.status_code == 200:
                            st.success("Form alanı eklendi!")
                            st.rerun()
                        else:
                            st.error("Form alanı eklenemedi")
                    except:
                        st.error("Backend bağlantısı kurulamadı")
        
        # Mevcut form alanları
        try:
            response = requests.get(f"{API_URL}/form_fields/")
            if response.status_code == 200:
                fields = response.json()
                if fields:
                    df = pd.DataFrame(fields)
                    st.dataframe(df, use_container_width=True)
                else:
                    st.info("Henüz form alanı yok")
        except:
            st.error("Form alanları yüklenemedi")
    
    # Başvurular tab
    with admin_tab[2]:
        st.subheader("📋 Başvuru Listesi")
        try:
            response = requests.get(f"{API_URL}/applications/")
            if response.status_code == 200:
                applications = response.json()
                if applications:
                    for app in applications:
                        with st.expander(f"Başvuru #{app['id']} - {app['createdAt']}"):
                            st.json(app['answers'])
                else:
                    st.info("Henüz başvuru yok")
        except:
            st.error("Başvurular yüklenemedi")
    
    # Yeni admin tab
    with admin_tab[3]:
        st.subheader("➕ Yeni Admin Ekle")
        with st.form("add_admin"):
            username = st.text_input("Kullanıcı Adı")
            password = st.text_input("Şifre", type="password")
            no_password = st.checkbox("Şifresiz Giriş")
            
            if st.form_submit_button("Admin Ekle"):
                try:
                    admin_data = {
                        "username": username,
                        "password": password if not no_password else None,
                        "noPassword": no_password
                    }
                    
                    response = requests.post(f"{API_URL}/admins/", json=admin_data)
                    if response.status_code == 200:
                        st.success("Admin eklendi!")
                    else:
                        st.error("Admin eklenemedi")
                except:
                    st.error("Backend bağlantısı kurulamadı")
    
    # Çıkış
    if st.button("🚪 Çıkış Yap"):
        st.session_state.admin_logged_in = False
        st.rerun()

def show_spotify_player():
    st.title("🎵 Spotify Player")
    st.markdown("---")
    
    st.info("Spotify Player özelliği yakında eklenecek!")
    st.markdown("""
    Bu bölümde:
    - Spotify API entegrasyonu
    - Playlist çalma
    - Müzik kontrolleri
    - Özel tasarım
    """)

if __name__ == "__main__":
    main() 