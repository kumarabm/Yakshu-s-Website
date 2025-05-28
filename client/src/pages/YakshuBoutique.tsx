import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  User, 
  Lock, 
  ChevronDown, 
  Plus, 
  Users, 
  Trash2 
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Dress, AdminUser } from "@shared/schema";

interface NewDress {
  name: string;
  price: string;
  sizes: string;
  description: string;
  image: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface NewAdmin {
  email: string;
  password: string;
}

const translations = {
  en: {
    appName: "Yakshu's Boutique",
    ourCollection: "Our Collection",
    adminLogin: "Admin Login",
    uploadDress: "Upload Dress",
    viewDresses: "View Dresses",
    logout: "Logout",
    dressName: "Dress Name",
    price: "Price (₹)",
    sizes: "Available Sizes",
    sizesExample: "S, M, L, XL",
    description: "Description",
    dressImage: "Dress Image",
    cancel: "Cancel",
    upload: "Upload",
    enterEmail: "Enter email",
    enterPassword: "Enter password",
    login: "Login",
    allRightsReserved: "All rights reserved",
    adminPanel: "Admin Panel",
    addNewAdmin: "Add New Admin",
    adminEmail: "Admin Email",
    adminPassword: "Admin Password",
    addAdmin: "Add Admin",
    currentAdmins: "Current Admins",
    remove: "Remove",
    viewDetails: "View Details",
    searchDresses: "Search dresses...",
    filterByPrice: "Filter by Price",
    allPrices: "All Prices",
    under1000: "Under ₹1000",
    under2000: "Under ₹2000",
    above2000: "Above ₹2000",
    availableSizes: "Available Sizes",
    dressDetails: "Dress Details",
    close: "Close",
    contactToPurchase: "Contact to Purchase",
    instagram: "Instagram",
    mobile: "Mobile",
    contactInfo: "Contact us to purchase this dress"
  },
  hi: {
    appName: "यक्षु का बुटीक",
    ourCollection: "हमारा संग्रह",
    adminLogin: "एडमिन लॉगिन",
    uploadDress: "ड्रेस अपलोड करें",
    viewDresses: "ड्रेसेस देखें",
    logout: "लॉगआउट",
    dressName: "ड्रेस का नाम",
    price: "कीमत (₹)",
    sizes: "उपलब्ध आकार",
    sizesExample: "S, M, L, XL",
    description: "विवरण",
    dressImage: "ड्रेस की छवि",
    cancel: "रद्द करें",
    upload: "अपलोड करें",
    enterEmail: "ईमेल दर्ज करें",
    enterPassword: "पासवर्ड दर्ज करें",
    login: "लॉगिन",
    allRightsReserved: "सर्वाधिकार सुरक्षित",
    adminPanel: "एडमिन पैनल",
    addNewAdmin: "नया एडमिन जोड़ें",
    adminEmail: "एडमिन ईमेल",
    adminPassword: "एडमिन पासवर्ड",
    addAdmin: "एडमिन जोड़ें",
    currentAdmins: "वर्तमान एडमिन",
    remove: "हटाएं",
    viewDetails: "विवरण देखें",
    searchDresses: "ड्रेस खोजें...",
    filterByPrice: "कीमत के अनुसार फ़िल्टर करें",
    allPrices: "सभी कीमतें",
    under1000: "₹1000 से कम",
    under2000: "₹2000 से कम",
    above2000: "₹2000 से अधिक",
    availableSizes: "उपलब्ध आकार",
    dressDetails: "ड्रेस विवरण",
    close: "बंद करें",
    contactToPurchase: "खरीदने के लिए संपर्क करें",
    instagram: "इंस्टाग्राम",
    mobile: "मोबाइल",
    contactInfo: "इस ड्रेस को खरीदने के लिए हमसे संपर्क करें"
  },
  ml: {
    appName: "യക്ഷുവിന്റെ ബൂട്ടിക്",
    ourCollection: "ഞങ്ങളുടെ കളക്ഷൻ",
    adminLogin: "അഡ്മിൻ ലോഗിൻ",
    uploadDress: "ഡ്രസ് അപ്‌ലോഡ് ചെയ്യുക",
    viewDresses: "ഡ്രസുകൾ കാണുക",
    logout: "ലോഗൗട്ട്",
    dressName: "ഡ്രസിന്റെ പേര്",
    price: "വില (₹)",
    sizes: "ലഭ്യമായ സൈസുകൾ",
    sizesExample: "S, M, L, XL",
    description: "വിവരണം",
    dressImage: "ഡ്രസിന്റെ ചിത്രം",
    cancel: "റദ്ദാക്കുക",
    upload: "അപ്‌ലോഡ് ചെയ്യുക",
    enterEmail: "ഇമെയിൽ നൽകുക",
    enterPassword: "പാസ്‌വേഡ് നൽകുക",
    login: "ലോഗിൻ",
    allRightsReserved: "എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം",
    adminPanel: "അഡ്മിൻ പാനൽ",
    addNewAdmin: "പുതിയ അഡ്മിൻ ചേർക്കുക",
    adminEmail: "അഡ്മിൻ ഇമെയിൽ",
    adminPassword: "അഡ്മിൻ പാസ്‌വേഡ്",
    addAdmin: "അഡ്മിൻ ചേർക്കുക",
    currentAdmins: "നിലവിലെ അഡ്മിൻമാർ",
    remove: "നീക്കം ചെയ്യുക",
    viewDetails: "വിശദാംശങ്ങൾ കാണുക",
    searchDresses: "ഡ്രസുകൾ തിരയുക...",
    filterByPrice: "വിലയനുസരിച്ച് ഫിൽട്ടർ ചെയ്യുക",
    allPrices: "എല്ലാ വിലകളും",
    under1000: "₹1000 ൽ താഴെ",
    under2000: "₹2000 ൽ താഴെ",
    above2000: "₹2000 ൽ മുകളിൽ",
    availableSizes: "ലഭ്യമായ സൈസുകൾ",
    dressDetails: "ഡ്രസിന്റെ വിശദാംശങ്ങൾ",
    close: "അടയ്ക്കുക",
    contactToPurchase: "വാങ്ങാൻ ബന്ധപ്പെടുക",
    instagram: "ഇൻസ്റ്റാഗ്രാം",
    mobile: "മൊബൈൽ",
    contactInfo: "ഈ ഡ്രസ് വാങ്ങാൻ ഞങ്ങളെ ബന്ധപ്പെടുക"
  },
  ta: {
    appName: "யக்ஷுவின் பூட்டீக்",
    ourCollection: "எங்கள் சேகரிப்பு",
    adminLogin: "நிர்வாக உள்நுழைவு",
    uploadDress: "ஆடை பதிவேற்றம்",
    viewDresses: "ஆடைகளைப் பார்க்கவும்",
    logout: "வெளியேறு",
    dressName: "ஆடையின் பெயர்",
    price: "விலை (₹)",
    sizes: "கிடைக்கும் அளவுகள்",
    sizesExample: "S, M, L, XL",
    description: "விளக்கம்",
    dressImage: "ஆடையின் படம்",
    cancel: "ரத்து செய்",
    upload: "பதிவேற்று",
    enterEmail: "மின்னஞ்சலை உள்ளிடவும்",
    enterPassword: "கடவுச்சொல்லை உள்ளிடவும்",
    login: "உள்நுழை",
    allRightsReserved: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டுள்ளன",
    adminPanel: "நிர்வாக பாளம்",
    addNewAdmin: "புதிய நிர்வாகியைச் சேர்க்கவும்",
    adminEmail: "நிர்வாக மின்னஞ்சல்",
    adminPassword: "நிர்வாக கடவுச்சொல்",
    addAdmin: "நிர்வாகியைச் சேர்க்கவும்",
    currentAdmins: "தற்போதைய நிர்வாகிகள்",
    remove: "அகற்று",
    viewDetails: "விவரங்களைப் பார்க்கவும்",
    searchDresses: "ஆடைகளைத் தேடுங்கள்...",
    filterByPrice: "விலையின் அடிப்படையில் வடிகட்டவும்",
    allPrices: "அனைத்து விலைகளும்",
    under1000: "₹1000க்குக் கீழ்",
    under2000: "₹2000க்குக் கீழ்",
    above2000: "₹2000க்கு மேல்",
    availableSizes: "கிடைக்கும் அளவுகள்",
    dressDetails: "ஆடையின் விவரங்கள்",
    close: "மூடு",
    contactToPurchase: "வாங்க தொடர்பு கொள்ளுங்கள்",
    instagram: "இன்ஸ்டாகிராம்",
    mobile: "மொபைல்",
    contactInfo: "இந்த ஆடையை வாங்க எங்களை தொடர்பு கொள்ளுங்கள்"
  }
};

const YakshuBoutique: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'hi' | 'ml' | 'ta'>('en');
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loginError, setLoginError] = useState("");
  
  const [newDress, setNewDress] = useState<NewDress>({
    name: "",
    price: "",
    sizes: "",
    description: "",
    image: ""
  });
  
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: ""
  });
  
  const [newAdmin, setNewAdmin] = useState<NewAdmin>({
    email: "",
    password: ""
  });

  const { toast } = useToast();

  // Fetch dresses
  const { data: dresses = [], isLoading: dressesLoading } = useQuery<Dress[]>({
    queryKey: ['/api/dresses'],
  });

  // Filter dresses based on search and price
  const filteredDresses = dresses.filter((dress) => {
    const matchesSearch = dress.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dress.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = priceFilter === "all" ||
                        (priceFilter === "under1000" && dress.price < 1000) ||
                        (priceFilter === "under2000" && dress.price < 2000) ||
                        (priceFilter === "above2000" && dress.price >= 2000);
    
    return matchesSearch && matchesPrice;
  });

  // Fetch admin users
  const { data: adminUsers = [], isLoading: adminsLoading } = useQuery<AdminUser[]>({
    queryKey: ['/api/admin/users'],
    enabled: isLoggedIn,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await apiRequest('POST', '/api/admin/login', data);
      return response.json();
    },
    onSuccess: () => {
      setIsLoggedIn(true);
      setShowUploadForm(false);
      setShowAdminPanel(false);
      setLoginError("");
      setLoginData({ email: "", password: "" });
      toast({
        title: "Login successful",
        description: "Welcome to Yakshu's Boutique admin panel",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      setLoginError("Invalid email or password");
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  });

  // Add dress mutation
  const addDressMutation = useMutation({
    mutationFn: async (dressData: any) => {
      const response = await apiRequest('POST', '/api/dresses', dressData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/dresses'] });
      setNewDress({ name: "", price: "", sizes: "", description: "", image: "" });
      setPreviewImage(null);
      setShowUploadForm(false);
      toast({
        title: "Dress uploaded successfully",
        description: "The dress has been added to your collection",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upload dress",
        variant: "destructive",
      });
    }
  });

  // Add admin mutation
  const addAdminMutation = useMutation({
    mutationFn: async (adminData: NewAdmin) => {
      const response = await apiRequest('POST', '/api/admin/users', adminData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      setNewAdmin({ email: "", password: "" });
      toast({
        title: "Admin added successfully",
        description: "New administrator has been added",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add admin",
        variant: "destructive",
      });
    }
  });

  // Remove admin mutation
  const removeAdminMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest('DELETE', `/api/admin/users/${encodeURIComponent(email)}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({
        title: "Admin removed",
        description: "Administrator has been removed successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove admin",
        variant: "destructive",
      });
    }
  });

  const t = (key: keyof typeof translations.en): string => {
    return translations[currentLanguage]?.[key] || key;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.email || !newAdmin.password) return;
    addAdminMutation.mutate(newAdmin);
  };

  const handleRemoveAdmin = (email: string) => {
    if (adminUsers.length <= 1) {
      toast({
        title: "Error",
        description: "You cannot remove the last admin",
        variant: "destructive",
      });
      return;
    }
    removeAdminMutation.mutate(email);
  };

  const handleDressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dressData = {
      name: newDress.name,
      price: Number(newDress.price),
      sizes: newDress.sizes.split(',').map(s => s.trim()),
      image: previewImage || "https://via.placeholder.com/500",
      description: newDress.description
    };
    addDressMutation.mutate(dressData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDress({ ...newDress, [name]: value });
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleAdminInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink-500">{t('appName')}</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value as 'en' | 'hi' | 'ml' | 'ta')}
                className="appearance-none bg-white border rounded py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="ml">മലയാളം</option>
                <option value="ta">தமிழ்</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
            
            {isLoggedIn ? (
              <div className="flex space-x-2">
                <Button 
                  variant={showUploadForm ? "default" : "outline"} 
                  onClick={() => {
                    setShowUploadForm(!showUploadForm);
                    setShowAdminPanel(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {showUploadForm ? t('viewDresses') : t('uploadDress')}
                </Button>
                <Button 
                  variant={showAdminPanel ? "default" : "outline"} 
                  onClick={() => {
                    setShowAdminPanel(!showAdminPanel);
                    setShowUploadForm(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  {t('adminPanel')}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setIsLoggedIn(false);
                    setShowAdminPanel(false);
                    setShowUploadForm(false);
                    setLoginData({ email: "", password: "" });
                    setLoginError("");
                    // Force a small delay to ensure state is properly reset
                    setTimeout(() => {
                      setShowUploadForm(false);
                    }, 10);
                  }}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  {t('logout')}
                </Button>
              </div>
            ) : (
              <Button 
                variant={showUploadForm ? "default" : "outline"} 
                onClick={() => setShowUploadForm(!showUploadForm)}
                className="flex items-center gap-2"
              >
                <Lock className="h-4 w-4" />
                {t('adminLogin')}
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Login Form */}
        {!isLoggedIn && showUploadForm && (
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">{t('adminLogin')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail">{t('enterEmail')}</Label>
                    <Input
                      id="loginEmail"
                      name="email"
                      type="email"
                      value={loginData.email}
                      onChange={handleLoginInputChange}
                      placeholder="aaa@email.com"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginPassword">{t('enterPassword')}</Label>
                    <Input
                      id="loginPassword"
                      name="password"
                      type="password"
                      value={loginData.password}
                      onChange={handleLoginInputChange}
                      placeholder="••••••••"
                       autoComplete="new-password"
                      required
                    />
                  </div>
                  {loginError && (
                    <div className="text-red-500 text-sm">{loginError}</div>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Logging in..." : t('login')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Admin Panel */}
        {isLoggedIn && showAdminPanel && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t('adminPanel')}</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Add Admin Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    {t('addNewAdmin')}
                  </CardTitle>
                  <CardDescription>
                    Add new administrators to manage the boutique
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddAdmin} className="space-y-4" autoComplete="off">
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">{t('adminEmail')}</Label>
                      <Input
                        id="adminEmail"
                        name="email"
                        type="email"
                        value={newAdmin.email}
                        onChange={handleAdminInputChange}
                        placeholder="abc@email.com"
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminPassword">{t('adminPassword')}</Label>
                      <Input
                        id="adminPassword"
                        name="password"
                        type="password"
                        value={newAdmin.password}
                        onChange={handleAdminInputChange}
                        placeholder="••••••••"
                         autoComplete="new-password"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={addAdminMutation.isPending}
                    >
                      {addAdminMutation.isPending ? "Adding..." : t('addAdmin')}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Current Admins List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {t('currentAdmins')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {adminsLoading ? (
                    <div>Loading administrators...</div>
                  ) : (
                    <div className="space-y-3">
                      {adminUsers.map((admin) => (
                        <div key={admin.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <User className="h-4 w-4 text-gray-600" />
                            <span className="font-medium">{admin.email}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveAdmin(admin.email)}
                            disabled={adminUsers.length <= 1 || removeAdminMutation.isPending}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Upload Dress Form */}
        {isLoggedIn && showUploadForm && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>{t('uploadDress')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDressSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="dressName">{t('dressName')}</Label>
                        <Input
                          id="dressName"
                          name="name"
                          value={newDress.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dressPrice">{t('price')}</Label>
                        <Input
                          id="dressPrice"
                          name="price"
                          type="number"
                          value={newDress.price}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dressSizes">{t('sizes')}</Label>
                        <Input
                          id="dressSizes"
                          name="sizes"
                          value={newDress.sizes}
                          onChange={handleInputChange}
                          placeholder={t('sizesExample')}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dressDescription">{t('description')}</Label>
                        <Textarea
                          id="dressDescription"
                          name="description"
                          value={newDress.description}
                          onChange={handleInputChange}
                          rows={3}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="dressImage">{t('dressImage')}</Label>
                        <Input
                          id="dressImage"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          required
                        />
                      </div>
                      {previewImage && (
                        <div>
                          <img 
                            src={previewImage} 
                            alt="Preview" 
                            className="w-full h-48 object-cover rounded-lg border"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <Button 
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setShowUploadForm(false);
                        setNewDress({ name: "", price: "", sizes: "", description: "", image: "" });
                        setPreviewImage(null);
                      }}
                    >
                      {t('cancel')}
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1"
                      disabled={addDressMutation.isPending}
                    >
                      {addDressMutation.isPending ? "Uploading..." : t('upload')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Dress Collection */}
        {(!showUploadForm || !isLoggedIn) && !showAdminPanel && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">{t('ourCollection')}</h2>
            
            {/* Search and Filter Controls */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t('searchDresses')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
              <div className="relative">
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="appearance-none bg-white border rounded py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                >
                  <option value="all">{t('allPrices')}</option>
                  <option value="under1000">{t('under1000')}</option>
                  <option value="under2000">{t('under2000')}</option>
                  <option value="above2000">{t('above2000')}</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {dressesLoading ? (
              <div className="text-center">Loading collection...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDresses.map((dress) => (
                  <Card key={dress.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <img 
                        src={dress.image} 
                        alt={dress.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{dress.name}</h3>
                      <p className="text-gray-600 mb-2">{dress.description}</p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-2xl font-bold text-pink-500">
                          ₹{dress.price.toLocaleString()}
                        </span>
                        <div className="flex gap-1">
                          {dress.sizes.map((size) => (
                            <span 
                              key={size}
                              className="px-2 py-1 bg-gray-100 rounded text-sm"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button 
                        onClick={() => setSelectedDress(dress)}
                        className="w-full"
                        variant="outline"
                      >
                        {t('viewDetails')}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Dress Details Modal */}
      {selectedDress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">{t('dressDetails')}</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedDress(null)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={selectedDress.image} 
                    alt={selectedDress.name}
                    className="w-full h-64 md:h-80 object-cover rounded-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold">{selectedDress.name}</h4>
                  <p className="text-gray-600">{selectedDress.description}</p>
                  
                  <div>
                    <span className="text-3xl font-bold text-pink-500">
                      ₹{selectedDress.price.toLocaleString()}
                    </span>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold mb-2">{t('availableSizes')}:</h5>
                    <div className="flex gap-2 flex-wrap">
                      {selectedDress.sizes.map((size) => (
                        <span 
                          key={size}
                          className="px-3 py-2 bg-pink-100 text-pink-700 rounded-lg font-medium"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h5 className="font-semibold mb-3 text-lg">{t('contactToPurchase')}</h5>
                    <p className="text-gray-600 mb-3">{t('contactInfo')}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{t('instagram')}:</span>
                        <a 
                          href="https://instagram.com/sara_nya1961" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-pink-600 hover:text-pink-700 underline"
                        >
                          @sara_nya1961
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{t('mobile')}:</span>
                        <a 
                          href="tel:+919876543210" 
                          className="text-pink-600 hover:text-pink-700 underline"
                        >
                          +91 90800 07550
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => setSelectedDress(null)}
                  variant="outline"
                >
                  {t('close')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 Yakshu's Boutique. {t('allRightsReserved')}.</p>
        </div>
      </footer>
    </div>
  );
};

export default YakshuBoutique;
