import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Header
      "home": "Home",
      "collections": "Collections",
      "about": "About",
      "contact": "Contact",
      "admin": "Admin",
      
      // Hero section
      "hero.title": "Elegant Dresses for Every Occasion",
      "hero.subtitle": "Discover our curated collection of premium women's dresses that blend timeless elegance with contemporary style.",
      "hero.shopNow": "Shop Now",
      
      // Collections
      "collections.title": "Our Latest Collection",
      "collections.subtitle": "Handpicked designs that celebrate femininity and sophistication",
      "viewDetails": "View Details",
      
      // Dress details modal
      "dressDetails": "Dress Details",
      "description": "Description",
      "contactInfo": "Contact Information",
      "availableSizes": "Available Sizes",
      "share": "Share",
      "whatsapp": "WhatsApp",
      
      // Admin
      "adminLogin": "Admin Login",
      "adminPanel": "Admin Panel",
      "email": "Email",
      "password": "Password",
      "login": "Login",
      "logout": "Logout",
      "cancel": "Cancel",
      
      // Admin panel
      "dressManagement": "Dress Management",
      "userManagement": "User Management",
      "addNewDress": "Add New Dress",
      "addNewAdmin": "Add New Admin User",
      "dressName": "Dress Name",
      "price": "Price",
      "sizes": "Available Sizes",
      "category": "Category",
      "shortDescription": "Short Description",
      "fullDescription": "Full Description",
      "dressImage": "Dress Image",
      "name": "Name",
      "role": "Role",
      "edit": "Edit",
      "delete": "Delete",
      "add": "Add",
      
      // Categories
      "eveningWear": "Evening Wear",
      "casual": "Casual",
      "formal": "Formal",
      "partyWear": "Party Wear",
      
      // Footer
      "footer.description": "Your destination for elegant and sophisticated women's dresses. We curate the finest collection for every occasion.",
      "footer.contactInfo": "Contact Info",
      "footer.followUs": "Follow Us",
      "footer.copyright": "© 2025 Yakshu Boutique. All rights reserved.",
      
      // Messages
      "invalidCredentials": "Invalid credentials. Please use admin@yakshu.com / admin123",
      "linkCopied": "Link copied to clipboard!",
      "confirmDelete": "Are you sure you want to delete this item?",
    }
  },
  ta: {
    translation: {
      // Header
      "home": "முகப்பு",
      "collections": "தொகுப்புகள்",
      "about": "எங்களைப் பற்றி",
      "contact": "தொடர்பு",
      "admin": "நிர்வாகி",
      
      // Hero section
      "hero.title": "ஒவ்வொரு சந்தர்ப்பத்திற்கும் நேர்த்தியான ஆடைகள்",
      "hero.subtitle": "காலமற்ற நேர்த்தியை சமகால பாணியுடன் இணைக்கும் பிரீமியம் பெண்கள் ஆடைகளின் எங்கள் தேர்ந்தெடுக்கப்பட்ட தொகுப்பைக் கண்டறியுங்கள்.",
      "hero.shopNow": "இப்போது வாங்குங்கள்",
      
      // Collections
      "collections.title": "எங்கள் சமீபத்திய தொகுப்பு",
      "collections.subtitle": "பெண்மையையும் நுட்பத்தையும் கொண்டாடும் கையால் தேர்ந்தெடுக்கப்பட்ட வடிவமைப்புகள்",
      "viewDetails": "விவரங்களைப் பார்க்கவும்",
      
      // Dress details modal
      "dressDetails": "ஆடை விவரங்கள்",
      "description": "விளக்கம்",
      "contactInfo": "தொடர்பு தகவல்",
      "availableSizes": "கிடைக்கும் அளவுகள்",
      "share": "பகிர்ந்து கொள்ளுங்கள்",
      "whatsapp": "வாட்ஸ்அப்",
      
      // Admin
      "adminLogin": "நிர்வாகி உள்நுழைவு",
      "adminPanel": "நிர்வாகி பேனல்",
      "email": "மின்னஞ்சல்",
      "password": "கடவுச்சொல்",
      "login": "உள்நுழைய",
      "logout": "வெளியேறு",
      "cancel": "ரத்து செய்",
      
      // Admin panel
      "dressManagement": "ஆடை மேலாண்மை",
      "userManagement": "பயனர் மேலாண்மை",
      "addNewDress": "புதிய ஆடை சேர்க்கவும்",
      "addNewAdmin": "புதிய நிர்வாகி பயனர் சேர்க்கவும்",
      "dressName": "ஆடை பெயர்",
      "price": "விலை",
      "sizes": "கிடைக்கும் அளவுகள்",
      "category": "வகை",
      "shortDescription": "சுருக்கமான விளக்கம்",
      "fullDescription": "முழு விளக்கம்",
      "dressImage": "ஆடை படம்",
      "name": "பெயர்",
      "role": "பதவி",
      "edit": "திருத்து",
      "delete": "நீக்கு",
      "add": "சேர்",
      
      // Categories
      "eveningWear": "மாலை உடை",
      "casual": "சாதாரண",
      "formal": "முறையான",
      "partyWear": "விருந்து உடை",
      
      // Footer
      "footer.description": "நேர்த்தியான மற்றும் நுட்பமான பெண்கள் ஆடைகளுக்கான உங்கள் இலக்கு. ஒவ்வொரு சந்தர்ப்பத்திற்கும் சிறந்த தொகுப்பை நாங்கள் தேர்ந்தெடுக்கிறோம்.",
      "footer.contactInfo": "தொடர்பு தகவல்",
      "footer.followUs": "எங்களைப் பின்தொடருங்கள்",
      "footer.copyright": "© 2025 யக்ஷு பூட்டிக். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      
      // Messages
      "invalidCredentials": "தவறான நற்சான்றிதழ்கள். தயவுசெய்து admin@yakshu.com / admin123 ஐப் பயன்படுத்துங்கள்",
      "linkCopied": "இணைப்பு கிளிப்போர்டுக்கு நகலெடுக்கப்பட்டது!",
      "confirmDelete": "இந்த உருப்படியை நீக்க வேண்டுமா?",
    }
  },
  hi: {
    translation: {
      // Header
      "home": "होम",
      "collections": "संग्रह",
      "about": "हमारे बारे में",
      "contact": "संपर्क",
      "admin": "एडमिन",
      
      // Hero section
      "hero.title": "हर अवसर के लिए शानदार ड्रेसेस",
      "hero.subtitle": "हमारे प्रीमियम महिलाओं के ड्रेसेस के चुने हुए संग्रह की खोज करें जो कालातीत लालित्य को समकालीन शैली के साथ मिलाते हैं।",
      "hero.shopNow": "अभी खरीदें",
      
      // Collections
      "collections.title": "हमारा नवीनतम संग्रह",
      "collections.subtitle": "हस्तचयनित डिज़ाइन जो स्त्रीत्व और परिष्कार का जश्न मनाते हैं",
      "viewDetails": "विवरण देखें",
      
      // Dress details modal
      "dressDetails": "ड्रेस विवरण",
      "description": "विवरण",
      "contactInfo": "संपर्क जानकारी",
      "availableSizes": "उपलब्ध आकार",
      "share": "साझा करें",
      "whatsapp": "व्हाट्सऐप",
      
      // Admin
      "adminLogin": "एडमिन लॉगिन",
      "adminPanel": "एडमिन पैनल",
      "email": "ईमेल",
      "password": "पासवर्ड",
      "login": "लॉगिन",
      "logout": "लॉगआउट",
      "cancel": "रद्द करें",
      
      // Admin panel
      "dressManagement": "ड्रेस प्रबंधन",
      "userManagement": "उपयोगकर्ता प्रबंधन",
      "addNewDress": "नई ड्रेस जोड़ें",
      "addNewAdmin": "नया एडमिन उपयोगकर्ता जोड़ें",
      "dressName": "ड्रेस का नाम",
      "price": "मूल्य",
      "sizes": "उपलब्ध आकार",
      "category": "श्रेणी",
      "shortDescription": "संक्षिप्त विवरण",
      "fullDescription": "पूरा विवरण",
      "dressImage": "ड्रेस की तस्वीर",
      "name": "नाम",
      "role": "भूमिका",
      "edit": "संपादित करें",
      "delete": "हटाएं",
      "add": "जोड़ें",
      
      // Categories
      "eveningWear": "शाम की पोशाक",
      "casual": "आकस्मिक",
      "formal": "औपचारिक",
      "partyWear": "पार्टी वियर",
      
      // Footer
      "footer.description": "सुरुचिपूर्ण और परिष्कृत महिलाओं के कपड़ों के लिए आपका गंतव्य। हम हर अवसर के लिए बेहतरीन संग्रह तैयार करते हैं।",
      "footer.contactInfo": "संपर्क जानकारी",
      "footer.followUs": "हमें फॉलो करें",
      "footer.copyright": "© 2025 यक्षु बुटीक। सभी अधिकार सुरक्षित।",
      
      // Messages
      "invalidCredentials": "अमान्य क्रेडेंशियल। कृपया admin@yakshu.com / admin123 का उपयोग करें",
      "linkCopied": "लिंक क्लिपबोर्ड पर कॉपी किया गया!",
      "confirmDelete": "क्या आप वाकई इस आइटम को हटाना चाहते हैं?",
    }
  },
  ml: {
    translation: {
      // Header
      "home": "ഹോം",
      "collections": "ശേഖരങ്ങൾ",
      "about": "ഞങ്ങളെ കുറിച്ച്",
      "contact": "ബന്ധപ്പെടുക",
      "admin": "അഡ്മിൻ",
      
      // Hero section
      "hero.title": "എല്ലാ അവസരങ്ങൾക്കും മനോഹരമായ വസ്ത്രങ്ങൾ",
      "hero.subtitle": "കാലാതീതമായ ഗാംഭീര്യം സമകാലിക ശൈലിയുമായി മിശ്രണം ചെയ്യുന്ന പ്രീമിയം സ്ത്രീകളുടെ വസ്ത്രങ്ങളുടെ ഞങ്ങളുടെ തിരഞ്ഞെടുത്ത ശേഖരം കണ്ടെത്തുക.",
      "hero.shopNow": "ഇപ്പോൾ വാങ്ങുക",
      
      // Collections
      "collections.title": "ഞങ്ങളുടെ ഏറ്റവും പുതിയ ശേഖരം",
      "collections.subtitle": "സ്ത്രീത്വവും പരിഷ്കാരവും ആഘോഷിക്കുന്ന കൈകൊണ്ട് തിരഞ്ഞെടുത്ത ഡിസൈനുകൾ",
      "viewDetails": "വിശദാംശങ്ങൾ കാണുക",
      
      // Dress details modal
      "dressDetails": "വസ്ത്ര വിശദാംശങ്ങൾ",
      "description": "വിവരണം",
      "contactInfo": "ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ",
      "availableSizes": "ലഭ്യമായ വലുപ്പങ്ങൾ",
      "share": "പങ്കിടുക",
      "whatsapp": "വാട്സാപ്പ്",
      
      // Admin
      "adminLogin": "അഡ്മിൻ ലോഗിൻ",
      "adminPanel": "അഡ്മിൻ പാനൽ",
      "email": "ഇമെയിൽ",
      "password": "പാസ്‌വേഡ്",
      "login": "ലോഗിൻ",
      "logout": "ലോഗ് ഔട്ട്",
      "cancel": "റദ്ദാക്കുക",
      
      // Admin panel
      "dressManagement": "വസ്ത്ര മാനേജ്മെന്റ്",
      "userManagement": "ഉപയോക്തൃ മാനേജ്മെന്റ്",
      "addNewDress": "പുതിയ വസ്ത്രം ചേർക്കുക",
      "addNewAdmin": "പുതിയ അഡ്മിൻ ഉപയോക്താവിനെ ചേർക്കുക",
      "dressName": "വസ്ത്രത്തിന്റെ പേര്",
      "price": "വില",
      "sizes": "ലഭ്യമായ വലുപ്പങ്ങൾ",
      "category": "വിഭാഗം",
      "shortDescription": "ഹ്രസ്വ വിവരണം",
      "fullDescription": "പൂർണ്ണ വിവരണം",
      "dressImage": "വസ്ത്ര ചിത്രം",
      "name": "പേര്",
      "role": "പങ്ക്",
      "edit": "എഡിറ്റ് ചെയ്യുക",
      "delete": "ഇല്ലാതാക്കുക",
      "add": "ചേർക്കുക",
      
      // Categories
      "eveningWear": "സായാഹ്ന വസ്ത്രം",
      "casual": "കാഷ്വൽ",
      "formal": "ഔപചാരികം",
      "partyWear": "പാർട്ടി വെയർ",
      
      // Footer
      "footer.description": "മനോഹരവും പരിഷ്കൃതവുമായ സ്ത്രീകളുടെ വസ്ത്രങ്ങൾക്കായുള്ള നിങ്ങളുടെ ലക്ష്യസ്ഥാനം. എല്ലാ അവസരങ്ങൾക്കും ഞങ്ങൾ മികച്ച ശേഖരം സംഘടിപ്പിക്കുന്നു.",
      "footer.contactInfo": "ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ",
      "footer.followUs": "ഞങ്ങളെ പിന്തുടരുക",
      "footer.copyright": "© 2025 യക്ഷു ബൂട്ടിക്ക്. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.",
      
      // Messages
      "invalidCredentials": "അസാധുവായ ക്രെഡൻഷ്യലുകൾ. ദയവായി admin@yakshu.com / admin123 ഉപയോഗിക്കുക",
      "linkCopied": "ലിങ്ക് ക്ലിപ്പ്ബോർഡിലേക്ക് പകർത്തി!",
      "confirmDelete": "നിങ്ങൾക്ക് ഈ ഇനം ഇല്ലാതാക്കണമെന്ന് ഉറപ്പാണോ?",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
