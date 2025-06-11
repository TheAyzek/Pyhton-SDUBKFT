import streamlit as st

# Sayfa konfigürasyonu
st.set_page_config(
    page_title="SDU BKFT FRP Sistemleri",
    page_icon="🎲",
    layout="wide"
)

def main():
    st.title("🎲 SDU BKFT FRP Sistemleri")
    st.markdown("---")
    
    st.subheader("🎮 FRP Sistemleri")
    st.markdown("""
    - **Deathwatch** - Warhammer 40K
    - **Pathfinder** - 1. Edition
    - **D&D 5e** - 5. Edition
    - **Cyberpunk Red** - Cyberpunk
    - **Vampire V5** - Vampire: The Masquerade
    """)
    
    st.markdown("---")
    st.subheader("📊 İstatistikler")
    st.metric("Admin Sayısı", 1)
    st.metric("Başvuru Sayısı", 0)
    
    st.markdown("---")
    st.subheader("🎯 Nasıl Başvuru Yaparım?")
    st.markdown("""
    1. Sol menüden **📝 Başvuru Formu**'nu seçin
    2. Formu doldurun
    3. Gönder butonuna tıklayın
    """)
    
    # Basit form
    with st.form("test_form"):
        name = st.text_input("Ad Soyad")
        email = st.text_input("E-posta")
        submitted = st.form_submit_button("Gönder")
        
        if submitted:
            st.success("✅ Form başarıyla gönderildi!")

if __name__ == "__main__":
    main() 