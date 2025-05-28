// import React, { useState } from "react";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Upload,
//   User,
//   Lock,
//   ChevronDown,
//   Plus,
//   Users,
//   Trash2,
//   Edit,
//   Eye,
// } from "lucide-react";
// import { apiRequest, queryClient } from "@/lib/queryClient";
// import { useToast } from "@/hooks/use-toast";
// import type { Dress, AdminUser } from "@shared/schema";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { PhoneIcon } from "@heroicons/react/24/outline";
// import { InstagramIcon } from "@heroicons/react/24/outline";

// const InstagramSVG = () => (
//   <svg
//     className="w-4 h-4 text-gray-700 inline-block mr-1"
//     fill="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.25a.75.75 0 110 1.5.75.75 0 010-1.5zM4.5 7.75a3.25 3.25 0 013.25-3.25h8.5a3.25 3.25 0 013.25 3.25v8.5a3.25 3.25 0 01-3.25 3.25h-8.5a3.25 3.25 0 01-3.25-3.25v-8.5z" />
//   </svg>
// );

// interface NewDress {
//   name: string;
//   price: string;
//   sizes: string;
//   description: string;
//   image: string;
// }

// interface LoginData {
//   email: string;
//   password: string;
// }

// interface NewAdmin {
//   email: string;
//   password: string;
// }

// const translations = {
//   en: {
//     appName: "Yakshu's Boutique",
//     ourCollection: "Our Collection",
//     adminLogin: "Admin Login",
//     uploadDress: "Upload Dress",
//     viewDresses: "View Dresses",
//     logout: "Logout",
//     dressName: "Dress Name",
//     price: "Price (₹)",
//     sizes: "Available Sizes",
//     sizesExample: "S, M, L, XL",
//     description: "Description",
//     dressImage: "Dress Image",
//     cancel: "Cancel",
//     upload: "Upload",
//     enterEmail: "Enter email",
//     enterPassword: "Enter password",
//     login: "Login",
//     allRightsReserved: "All rights reserved",
//     adminPanel: "Admin Panel",
//     addNewAdmin: "Add New Admin",
//     adminEmail: "Admin Email",
//     adminPassword: "Admin Password",
//     addAdmin: "Add Admin",
//     currentAdmins: "Current Admins",
//     remove: "Remove",
//     viewDetails: "View Details",
//     searchDresses: "Search dresses...",
//     filterByPrice: "Filter by Price",
//     allPrices: "All Prices",
//     under1000: "Under ₹1000",
//     under2000: "Under ₹2000",
//     above2000: "Above ₹2000",
//     availableSizes: "Available Sizes",
//     dressDetails: "Dress Details",
//     close: "Close",
//     contactToPurchase: "Contact to Purchase",
//     instagram: "Instagram",
//     mobile: "Mobile",
//     contactInfo: "Contact us to purchase this dress",
//   },
//   hi: {
//     appName: "यक्षु का बुटीक",
//     ourCollection: "हमारा संग्रह",
//     adminLogin: "एडमिन लॉगिन",
//     uploadDress: "ड्रेस अपलोड करें",
//     viewDresses: "ड्रेसेस देखें",
//     logout: "लॉगआउट",
//     dressName: "ड्रेस का नाम",
//     price: "कीमत (₹)",
//     sizes: "उपलब्ध आकार",
//     sizesExample: "S, M, L, XL",
//     description: "विवरण",
//     dressImage: "ड्रेस की छवि",
//     cancel: "रद्द करें",
//     upload: "अपलोड करें",
//     enterEmail: "ईमेल दर्ज करें",
//     enterPassword: "पासवर्ड दर्ज करें",
//     login: "लॉगिन",
//     allRightsReserved: "सर्वाधिकार सुरक्षित",
//     adminPanel: "एडमिन पैनल",
//     addNewAdmin: "नया एडमिन जोड़ें",
//     adminEmail: "एडमिन ईमेल",
//     adminPassword: "एडमिन पासवर्ड",
//     addAdmin: "एडमिन जोड़ें",
//     currentAdmins: "वर्तमान एडमिन",
//     remove: "हटाएं",
//     viewDetails: "विवरण देखें",
//     searchDresses: "ड्रेस खोजें...",
//     filterByPrice: "कीमत के अनुसार फ़िल्टर करें",
//     allPrices: "सभी कीमतें",
//     under1000: "₹1000 से कम",
//     under2000: "₹2000 से कम",
//     above2000: "₹2000 से अधिक",
//     availableSizes: "उपलब्ध आकार",
//     dressDetails: "ड्रेस विवरण",
//     close: "बंद करें",
//     contactToPurchase: "खरीदने के लिए संपर्क करें",
//     instagram: "इंस्टाग्राम",
//     mobile: "मोबाइल",
//     contactInfo: "इस ड्रेस को खरीदने के लिए हमसे संपर्क करें",
//   },
//   ml: {
//     appName: "യക്ഷുവിന്റെ ബൂട്ടിക്",
//     ourCollection: "ഞങ്ങളുടെ കളക്ഷൻ",
//     adminLogin: "അഡ്മിൻ ലോഗിൻ",
//     uploadDress: "ഡ്രസ് അപ്‌ലോഡ് ചെയ്യുക",
//     viewDresses: "ഡ്രസുകൾ കാണുക",
//     logout: "ലോഗൗട്ട്",
//     dressName: "ഡ്രസിന്റെ പേര്",
//     price: "വില (₹)",
//     sizes: "ലഭ്യമായ സൈസുകൾ",
//     sizesExample: "S, M, L, XL",
//     description: "വിവരണം",
//     dressImage: "ഡ്രസിന്റെ ചിത്രം",
//     cancel: "റദ്ദാക്കുക",
//     upload: "അപ്‌ലോഡ് ചെയ്യുക",
//     enterEmail: "ഇമെയിൽ നൽകുക",
//     enterPassword: "പാസ്‌വേഡ് നൽകുക",
//     login: "ലോഗിൻ",
//     allRightsReserved: "എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം",
//     adminPanel: "അഡ്മിൻ പാനൽ",
//     addNewAdmin: "പുതിയ അഡ്മിൻ ചേർക്കുക",
//     adminEmail: "അഡ്മിൻ ഇമെയിൽ",
//     adminPassword: "അഡ്മിൻ പാസ്‌വേഡ്",
//     addAdmin: "അഡ്മിൻ ചേർക്കുക",
//     currentAdmins: "നിലവിലെ അഡ്മിൻമാർ",
//     remove: "നീക്കം ചെയ്യുക",
//     viewDetails: "വിശദാംശങ്ങൾ കാണുക",
//     searchDresses: "ഡ്രസുകൾ തിരയുക...",
//     filterByPrice: "വിലയനുസരിച്ച് ഫിൽട്ടർ ചെയ്യുക",
//     allPrices: "എല്ലാ വിലകളും",
//     under1000: "₹1000 ൽ താഴെ",
//     under2000: "₹2000 ൽ താഴെ",
//     above2000: "₹2000 ൽ മുകളിൽ",
//     availableSizes: "ലഭ്യമായ സൈസുകൾ",
//     dressDetails: "ഡ്രസിന്റെ വിശദാംശങ്ങൾ",
//     close: "അടയ്ക്കുക",
//     contactToPurchase: "വാങ്ങാൻ ബന്ധപ്പെടുക",
//     instagram: "ഇൻസ്റ്റാഗ്രാം",
//     mobile: "മൊബൈൽ",
//     contactInfo: "ഈ ഡ്രസ് വാങ്ങാൻ ഞങ്ങളെ ബന്ധപ്പെടുക",
//   },
//   ta: {
//     appName: "யக்ஷுவின் பூட்டீக்",
//     ourCollection: "எங்கள் சேகரிப்பு",
//     adminLogin: "நிர்வாக உள்நுழைவு",
//     uploadDress: "ஆடை பதிவேற்றம்",
//     viewDresses: "ஆடைகளைப் பார்க்கவும்",
//     logout: "வெளியேறு",
//     dressName: "ஆடையின் பெயர்",
//     price: "விலை (₹)",
//     sizes: "கிடைக்கும் அளவுகள்",
//     sizesExample: "S, M, L, XL",
//     description: "விளக்கம்",
//     dressImage: "ஆடையின் படம்",
//     cancel: "ரத்து செய்",
//     upload: "பதிவேற்று",
//     enterEmail: "மின்னஞ்சலை உள்ளிடவும்",
//     enterPassword: "கடவுச்சொல்லை உள்ளிடவும்",
//     login: "உள்நுழை",
//     allRightsReserved: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டுள்ளன",
//     adminPanel: "நிர்வாக பாளம்",
//     addNewAdmin: "புதிய நிர்வாகியைச் சேர்க்கவும்",
//     adminEmail: "நிர்வாக மின்னஞ்சல்",
//     adminPassword: "நிர்வாக கடவுச்சொல்",
//     addAdmin: "நிர்வாகியைச் சேர்க்கவும்",
//     currentAdmins: "தற்போதைய நிர்வாகிகள்",
//     remove: "அகற்று",
//     viewDetails: "விவரங்களைப் பார்க்கவும்",
//     searchDresses: "ஆடைகளைத் தேடுங்கள்...",
//     filterByPrice: "விலையின் அடிப்படையில் வடிகட்டவும்",
//     allPrices: "அனைத்து விலைகளும்",
//     under1000: "₹1000க்குக் கீழ்",
//     under2000: "₹2000க்குக் கீழ்",
//     above2000: "₹2000க்கு மேல்",
//     availableSizes: "கிடைக்கும் அளவுகள்",
//     dressDetails: "ஆடையின் விவரங்கள்",
//     close: "மூடு",
//     contactToPurchase: "வாங்க தொடர்பு கொள்ளுங்கள்",
//     instagram: "இன்ஸ்டாகிராம்",
//     mobile: "மொபைல்",
//     contactInfo: "இந்த ஆடையை வாங்க எங்களை தொடர்பு கொள்ளுங்கள்",
//   },
// };

// const YakshuBoutique: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showUploadForm, setShowUploadForm] = useState(false);
//   const [showAdminPanel, setShowAdminPanel] = useState(false);
//   const [currentLanguage, setCurrentLanguage] = useState<
//     "en" | "hi" | "ml" | "ta"
//   >("en");
//   const [selectedDress, setSelectedDress] = useState<Dress | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [priceFilter, setPriceFilter] = useState("all");
//   const [editingDress, setEditingDress] = useState<Dress | null>(null);
//   const [editDressData, setEditDressData] = useState<NewDress>({
//     name: "",
//     price: "",
//     sizes: "",
//     description: "",
//     image: "",
//   });
//   const [editPreviewImage, setEditPreviewImage] = useState<string | null>(null);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [loginError, setLoginError] = useState("");

//   const [newDress, setNewDress] = useState<NewDress>({
//     name: "",
//     price: "",
//     sizes: "",
//     description: "",
//     image: "",
//   });

//   const [loginData, setLoginData] = useState<LoginData>({
//     email: "",
//     password: "",
//   });

//   const [newAdmin, setNewAdmin] = useState<NewAdmin>({
//     email: "",
//     password: "",
//   });

//   const { toast } = useToast();

//   // Fetch dresses
//   const { data: dresses = [], isLoading: dressesLoading } = useQuery<Dress[]>({
//     queryKey: ["/api/dresses"],
//   });

//   // Filter dresses based on search and price
//   const filteredDresses = dresses.filter((dress) => {
//     const matchesSearch =
//       dress.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       dress.description.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesPrice =
//       priceFilter === "all" ||
//       (priceFilter === "under1000" && dress.price < 1000) ||
//       (priceFilter === "under2000" && dress.price < 2000) ||
//       (priceFilter === "above2000" && dress.price >= 2000);

//     return matchesSearch && matchesPrice;
//   });

//   // Fetch admin users
//   const { data: adminUsers = [], isLoading: adminsLoading } = useQuery<
//     AdminUser[]
//   >({
//     queryKey: ["/api/admin/users"],
//     enabled: isLoggedIn,
//   });

//   // Login mutation
//   const loginMutation = useMutation({
//     mutationFn: async (data: LoginData) => {
//       const response = await apiRequest("POST", "/api/admin/login", data);
//       return response.json();
//     },
//     onSuccess: () => {
//       setIsLoggedIn(true);
//       setShowUploadForm(false);
//       setShowAdminPanel(false);
//       setLoginError("");
//       setLoginData({ email: "", password: "" });
//       toast({
//         title: "Login successful",
//         description: "Welcome to Yakshu's Boutique admin panel",
//       });
//       queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
//     },
//     onError: (error: any) => {
//       console.error("Login error:", error);
//       setLoginError("Invalid email or password");
//       toast({
//         title: "Login Failed",
//         description: "Invalid email or password",
//         variant: "destructive",
//       });
//     },
//   });

//   // Add dress mutation
//   const addDressMutation = useMutation({
//     mutationFn: async (dressData: any) => {
//       const response = await apiRequest("POST", "/api/dresses", dressData);
//       return response.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["/api/dresses"] });
//       setNewDress({
//         name: "",
//         price: "",
//         sizes: "",
//         description: "",
//         image: "",
//       });
//       setPreviewImage(null);
//       setShowUploadForm(false);
//       toast({
//         title: "Dress uploaded successfully",
//         description: "The dress has been added to your collection",
//       });
//     },
//     onError: () => {
//       toast({
//         title: "Error",
//         description: "Failed to upload dress",
//         variant: "destructive",
//       });
//     },
//   });

//   // Add admin mutation
//   const addAdminMutation = useMutation({
//     mutationFn: async (data: NewAdmin) => {
//       const response = await apiRequest("POST", "/api/admin/users", data);
//       return response.json();
//     },
//     onSuccess: () => {
//       setNewAdmin({ email: "", password: "" });
//       toast({
//         title: "Admin Added",
//         description: "New admin user has been added successfully",
//       });
//       queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
//     },
//     onError: (error: any) => {
//       console.error("Add admin error:", error);
//       toast({
//         title: "Failed to Add Admin",
//         description: "Unable to add new admin user",
//         variant: "destructive",
//       });
//     },
//   });

//   // Update dress mutation
//   const updateDressMutation = useMutation({
//     mutationFn: async ({ id, data }: { id: number; data: any }) => {
//       const response = await apiRequest("PUT", `/api/dresses/${id}`, data);
//       return response.json();
//     },
//     onSuccess: () => {
//       setEditingDress(null);
//       setEditDressData({
//         name: "",
//         price: "",
//         sizes: "",
//         description: "",
//         image: "",
//       });
//       setEditPreviewImage(null);
//       toast({
//         title: "Dress Updated",
//         description: "Dress has been updated successfully",
//       });
//       queryClient.invalidateQueries({ queryKey: ["/api/dresses"] });
//     },
//     onError: (error: any) => {
//       console.error("Update dress error:", error);
//       toast({
//         title: "Failed to Update Dress",
//         description: "Unable to update dress",
//         variant: "destructive",
//       });
//     },
//   });

//   // Delete dress mutation
//   const deleteDressMutation = useMutation({
//     mutationFn: async (id: number) => {
//       const response = await apiRequest("DELETE", `/api/dresses/${id}`);
//       return response.json();
//     },
//     onSuccess: () => {
//       toast({
//         title: "Dress Deleted",
//         description: "Dress has been deleted successfully",
//       });
//       queryClient.invalidateQueries({ queryKey: ["/api/dresses"] });
//     },
//     onError: (error: any) => {
//       console.error("Delete dress error:", error);
//       toast({
//         title: "Failed to Delete Dress",
//         description: "Unable to delete dress",
//         variant: "destructive",
//       });
//     },
//   });

//   // Remove admin mutation
//   const removeAdminMutation = useMutation({
//     mutationFn: async (email: string) => {
//       const response = await apiRequest(
//         "DELETE",
//         `/api/admin/users/${encodeURIComponent(email)}`
//       );
//       return response.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
//       toast({
//         title: "Admin removed",
//         description: "Administrator has been removed successfully",
//       });
//     },
//     onError: (error: any) => {
//       toast({
//         title: "Error",
//         description: error.message || "Failed to remove admin",
//         variant: "destructive",
//       });
//     },
//   });

//   const t = (key: keyof typeof translations.en): string => {
//     return translations[currentLanguage]?.[key] || key;
//   };

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     loginMutation.mutate(loginData);
//   };

//   const handleAddAdmin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newAdmin.email || !newAdmin.password) return;
//     addAdminMutation.mutate(newAdmin);
//   };

//   const handleRemoveAdmin = (email: string) => {
//     if (adminUsers.length <= 1) {
//       toast({
//         title: "Error",
//         description: "You cannot remove the last admin",
//         variant: "destructive",
//       });
//       return;
//     }
//     removeAdminMutation.mutate(email);
//   };

//   const handleDressSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const dressData = {
//       name: newDress.name,
//       price: Number(newDress.price),
//       sizes: newDress.sizes.split(",").map((s) => s.trim()),
//       image: previewImage || "https://via.placeholder.com/500",
//       description: newDress.description,
//     };
//     addDressMutation.mutate(dressData);
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setNewDress({ ...newDress, [name]: value });
//   };

//   const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setLoginData({ ...loginData, [name]: value });
//   };

//   const handleAdminInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewAdmin({ ...newAdmin, [name]: value });
//   };

//   const handleEditDress = (dress: Dress) => {
//     setEditingDress(dress);
//     setEditDressData({
//       name: dress.name,
//       price: dress.price.toString(),
//       sizes: dress.sizes.join(", "),
//       description: dress.description,
//       image: dress.image,
//     });
//     setEditPreviewImage(dress.image);
//   };

//   const handleEditSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingDress) return;

//     const dressData = {
//       name: editDressData.name,
//       price: parseInt(editDressData.price),
//       sizes: editDressData.sizes.split(",").map((s) => s.trim()),
//       image: editPreviewImage || editingDress.image,
//       description: editDressData.description,
//     };

//     updateDressMutation.mutate({ id: editingDress.id, data: dressData });
//   };

//   const handleEditInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setEditDressData({ ...editDressData, [name]: value });
//   };

//   const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setEditPreviewImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDeleteDress = (id: number) => {
//     if (window.confirm("Are you sure you want to delete this dress?")) {
//       deleteDressMutation.mutate(id);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
//       <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-10 border-b border-gray-200">
//         <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
//           <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent flex-shrink-0">
//             {t("appName")}
//           </h1>
//           <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
//             <div className="relative">
//               <select
//                 value={currentLanguage}
//                 onChange={(e) =>
//                   setCurrentLanguage(
//                     e.target.value as "en" | "hi" | "ml" | "ta"
//                   )
//                 }
//                 className="appearance-none bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg py-1 px-2 pr-6 sm:py-2 sm:px-3 sm:pr-8 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs sm:text-sm shadow-sm transition-all duration-200 hover:shadow-md"
//               >
//                 <option value="en">English</option>
//                 <option value="hi">हिंदी</option>
//                 <option value="ml">മലയാളം</option>
//                 <option value="ta">தமிழ்</option>
//               </select>
//               <ChevronDown className="absolute right-2 top-1.5 sm:right-3 sm:top-2.5 h-3 w-3 sm:h-4 sm:w-4 text-gray-500 pointer-events-none" />
//             </div>

//             {isLoggedIn ? (
//               <div className="flex items-center space-x-1 sm:space-x-2">
//                 <Button
//                   variant={showUploadForm ? "default" : "outline"}
//                   onClick={() => {
//                     setShowUploadForm(!showUploadForm);
//                     setShowAdminPanel(false);
//                   }}
//                   className="flex items-center gap-1 text-xs px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 rounded-md"
//                   size="sm"
//                 >
//                   <Upload className="h-3 w-3" />
//                   <span className="hidden sm:inline text-xs">
//                     {showUploadForm ? t("viewDresses") : t("uploadDress")}
//                   </span>
//                 </Button>
//                 <Button
//                   variant={showAdminPanel ? "default" : "outline"}
//                   onClick={() => {
//                     setShowAdminPanel(!showAdminPanel);
//                     setShowUploadForm(false);
//                   }}
//                   className="flex items-center gap-1 text-xs px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 rounded-md"
//                   size="sm"
//                 >
//                   <Users className="h-3 w-3" />
//                   <span className="hidden sm:inline text-xs">
//                     {t("adminPanel")}
//                   </span>
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => {
//                     setIsLoggedIn(false);
//                     setShowAdminPanel(false);
//                     setShowUploadForm(false);
//                     setLoginData({ email: "", password: "" });
//                     setLoginError("");
//                     setTimeout(() => {
//                       setShowUploadForm(false);
//                     }, 10);
//                     toast({
//                       title: "Logged out successfully",
//                       description:
//                         "You have been logged out of the admin panel",
//                     });
//                   }}
//                   className="flex items-center gap-1 text-xs px-2 py-1 bg-red-50 hover:bg-red-100 border-red-200 text-red-700 hover:text-red-800 rounded-md"
//                   size="sm"
//                 >
//                   <User className="h-3 w-3" />
//                   <span className="text-xs">{t("logout")}</span>
//                 </Button>
//               </div>
//             ) : (
//               <Button
//                 variant={showUploadForm ? "default" : "outline"}
//                 onClick={() => setShowUploadForm(!showUploadForm)}
//                 className="flex items-center gap-1 text-xs px-2 py-1 hover:bg-gray-100 rounded-md"
//                 size="sm"
//               >
//                 <Lock className="h-3 w-3" />
//                 <span className="hidden sm:inline text-xs">
//                   {t("adminLogin")}
//                 </span>
//               </Button>
//             )}
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-2 sm:px-4 py-6 sm:py-12">
//         {/* Login Form */}
//         {!isLoggedIn && showUploadForm && (
//           <div className="max-w-md mx-auto">
//             <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
//               <CardHeader className="text-center pb-2">
//                 <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
//                   {t("adminLogin")}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <form
//                   onSubmit={handleLogin}
//                   className="space-y-4"
//                   autoComplete="off"
//                 >
//                   <div className="space-y-2">
//                     <Label htmlFor="loginEmail">{t("enterEmail")}</Label>
//                     <Input
//                       id="loginEmail"
//                       name="email"
//                       type="email"
//                       value={loginData.email}
//                       onChange={handleLoginInputChange}
//                       placeholder="aaa@email.com"
//                       autoComplete="off"
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="loginPassword">{t("enterPassword")}</Label>
//                     <Input
//                       id="loginPassword"
//                       name="password"
//                       type="password"
//                       value={loginData.password}
//                       onChange={handleLoginInputChange}
//                       placeholder="••••••••"
//                       autoComplete="new-password"
//                       required
//                     />
//                   </div>
//                   {loginError && (
//                     <div className="text-red-500 text-sm">{loginError}</div>
//                   )}
//                   <Button
//                     type="submit"
//                     className="w-full"
//                     disabled={loginMutation.isPending}
//                   >
//                     {loginMutation.isPending ? "Logging in..." : t("login")}
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         )}

//         {/* Admin Panel */}
//         {isLoggedIn && showAdminPanel && (
//           <div className="space-y-3 sm:space-y-6 px-2">
//             <h2 className="text-xl sm:text-2xl font-bold">{t("adminPanel")}</h2>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
//               {/* Add Admin Form */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Plus className="h-5 w-5" />
//                     {t("addNewAdmin")}
//                   </CardTitle>
//                   <CardDescription>
//                     Add new administrators to manage the boutique
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <form
//                     onSubmit={handleAddAdmin}
//                     className="space-y-4"
//                     autoComplete="off"
//                   >
//                     <div className="space-y-2">
//                       <Label htmlFor="adminEmail">{t("adminEmail")}</Label>
//                       <Input
//                         id="adminEmail"
//                         name="email"
//                         type="email"
//                         value={newAdmin.email}
//                         onChange={handleAdminInputChange}
//                         placeholder="abc@email.com"
//                         autoComplete="off"
//                         required
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="adminPassword">
//                         {t("adminPassword")}
//                       </Label>
//                       <Input
//                         id="adminPassword"
//                         name="password"
//                         type="password"
//                         value={newAdmin.password}
//                         onChange={handleAdminInputChange}
//                         placeholder="••••••••"
//                         autoComplete="new-password"
//                         required
//                       />
//                     </div>
//                     <Button
//                       type="submit"
//                       className="w-full"
//                       disabled={addAdminMutation.isPending}
//                     >
//                       {addAdminMutation.isPending ? "Adding..." : t("addAdmin")}
//                     </Button>
//                   </form>
//                 </CardContent>
//               </Card>

//               {/* Current Admins List */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Users className="h-5 w-5" />
//                     {t("currentAdmins")}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {adminsLoading ? (
//                     <div>Loading administrators...</div>
//                   ) : (
//                     <div className="space-y-3">
//                       {adminUsers.map((admin) => (
//                         <div
//                           key={admin.id}
//                           className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
//                         >
//                           <div className="flex items-center gap-3">
//                             <User className="h-4 w-4 text-gray-600" />
//                             <span className="font-medium">{admin.email}</span>
//                           </div>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleRemoveAdmin(admin.email)}
//                             disabled={
//                               adminUsers.length <= 1 ||
//                               removeAdminMutation.isPending
//                             }
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         )}

//         {/* Upload Dress Form */}
//         {isLoggedIn && showUploadForm && (
//           <div className="max-w-2xl mx-auto px-2">
//             <Card>
//               <CardHeader className="pb-3 sm:pb-6">
//                 <CardTitle className="text-lg sm:text-xl">
//                   {t("uploadDress")}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-3 sm:p-6">
//                 <form onSubmit={handleDressSubmit}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="dressName">{t("dressName")}</Label>
//                         <Input
//                           id="dressName"
//                           name="name"
//                           value={newDress.name}
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="dressPrice">{t("price")}</Label>
//                         <Input
//                           id="dressPrice"
//                           name="price"
//                           type="number"
//                           value={newDress.price}
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="dressSizes">{t("sizes")}</Label>
//                         <Input
//                           id="dressSizes"
//                           name="sizes"
//                           value={newDress.sizes}
//                           onChange={handleInputChange}
//                           placeholder={t("sizesExample")}
//                           required
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="dressDescription">
//                           {t("description")}
//                         </Label>
//                         <Textarea
//                           id="dressDescription"
//                           name="description"
//                           value={newDress.description}
//                           onChange={handleInputChange}
//                           rows={3}
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="dressImage">{t("dressImage")}</Label>
//                         <Input
//                           id="dressImage"
//                           type="file"
//                           accept="image/*"
//                           onChange={handleImageUpload}
//                           required
//                         />
//                       </div>
//                       {previewImage && (
//                         <div>
//                           <img
//                             src={previewImage}
//                             alt="Preview"
//                             className="w-full h-48 object-cover rounded-lg border"
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex gap-4 mt-6">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       className="flex-1"
//                       onClick={() => {
//                         setShowUploadForm(false);
//                         setNewDress({
//                           name: "",
//                           price: "",
//                           sizes: "",
//                           description: "",
//                           image: "",
//                         });
//                         setPreviewImage(null);
//                       }}
//                     >
//                       {t("cancel")}
//                     </Button>
//                     <Button
//                       type="submit"
//                       className="flex-1"
//                       disabled={addDressMutation.isPending}
//                     >
//                       {addDressMutation.isPending
//                         ? "Uploading..."
//                         : t("upload")}
//                     </Button>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         )}

//         {/* Dress Collection */}
//         {(!showUploadForm || !isLoggedIn) && !showAdminPanel && (
//           <div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
//               {t("ourCollection")}
//             </h2>

//             {/* Search and Filter Controls */}
//             <div className="mb-6 sm:mb-12 flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center px-2">
//               <div className="relative w-full sm:w-auto">
//                 <Input
//                   type="text"
//                   placeholder={t("searchDresses")}
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full sm:w-80 text-sm bg-white/90 backdrop-blur-sm border-gray-300 rounded-xl shadow-md focus:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                 />
//               </div>
//               <div className="relative w-full sm:w-auto">
//                 <select
//                   value={priceFilter}
//                   onChange={(e) => setPriceFilter(e.target.value)}
//                   className="appearance-none bg-white/90 backdrop-blur-sm border border-gray-300 rounded-xl py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm w-full sm:w-auto shadow-md hover:shadow-lg transition-all duration-200"
//                 >
//                   <option value="all">{t("allPrices")}</option>
//                   <option value="under1000">{t("under1000")}</option>
//                   <option value="under2000">{t("under2000")}</option>
//                   <option value="above2000">{t("above2000")}</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             {dressesLoading ? (
//               <div className="text-center">Loading collection...</div>
//             ) : (
//               <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-2 lg:gap-3">
//                 {filteredDresses.map((dress) => (
//                   <Card
//                     key={dress.id}
//                     className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm group"
//                   >
//                     <div className="aspect-square relative overflow-hidden">
//                       <img
//                         src={dress.image}
//                         alt={dress.name}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                     </div>
//                     <CardContent className="p-1.5 sm:p-2">
//                       <h3 className="text-xs sm:text-sm font-bold mb-1 line-clamp-2 text-gray-800">
//                         {dress.name}
//                       </h3>
//                       <p className="text-gray-600 mb-1 text-[8px] sm:text-[10px] line-clamp-1 leading-relaxed">
//                         {dress.description}
//                       </p>
//                       <div className="flex flex-col gap-1 mb-2">
//                         <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
//                           ₹{dress.price.toLocaleString()}
//                         </span>
//                         <div className="flex gap-0.5 flex-wrap">
//                           {dress.sizes.slice(0, 3).map((size) => (
//                             <span
//                               key={size}
//                               className="px-1 py-0.5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-[8px] font-medium text-gray-700 shadow-sm"
//                             >
//                               {size}
//                             </span>
//                           ))}
//                           {dress.sizes.length > 3 && (
//                             <span className="px-1 py-0.5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-[8px] font-medium text-gray-700 shadow-sm">
//                               +{dress.sizes.length - 3}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                       <div className="space-y-0.5">
//                         <Button
//                           onClick={() => setSelectedDress(dress)}
//                           className="w-full text-[8px] sm:text-[10px] py-0.5 sm:py-1 bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 rounded-sm"
//                           size="sm"
//                         >
//                           <Eye className="h-2 w-2 sm:h-2.5 sm:w-2.5 mr-0.5" />
//                           {t("viewDetails")}
//                         </Button>
//                         {isLoggedIn && (
//                           <div className="flex gap-0.5">
//                             <Button
//                               onClick={() => handleEditDress(dress)}
//                               className="flex-1 text-[8px] py-0.5 min-h-[16px] bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200 rounded-sm"
//                               size="sm"
//                             >
//                               <Edit className="h-2 w-2" />
//                             </Button>
//                             <Button
//                               onClick={() => handleDeleteDress(dress.id)}
//                               className="flex-1 text-[8px] py-0.5 min-h-[16px] bg-red-500 hover:bg-red-600 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200 rounded-sm"
//                               size="sm"
//                             >
//                               <Trash2 className="h-2 w-2" />
//                             </Button>
//                           </div>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </main>

//       {/* Dress Details Modal */}
//       <Dialog
//         open={!!selectedDress}
//         onOpenChange={() => setSelectedDress(null)}
//       >
//         <DialogContent className="w-[85vw] max-w-[320px] mx-auto p-0 gap-0 rounded-lg overflow-hidden shadow-xl border-0 max-h-[80vh] overflow-y-auto">
//           {selectedDress && (
//             <div className="bg-white">
//               <DialogHeader className="p-1 pb-0.5 border-b bg-gray-50">
//                 <DialogTitle className="text-[10px] font-semibold text-center">
//                   {t("dressDetails")}
//                 </DialogTitle>
//               </DialogHeader>

//               <div className="p-1 space-y-1">
//                 {/* Dress Image */}
//                 <div className="w-full">
//                   <img
//                     src={selectedDress.image}
//                     alt={selectedDress.name}
//                     className="w-full h-auto aspect-square object-cover rounded-md shadow-sm"
//                   />
//                 </div>

//                 {/* Dress Name & Price */}
//                 <div className="text-center space-y-0.5">
//                   <h3 className="font-bold text-[10px] text-gray-800">
//                     {selectedDress.name}
//                   </h3>
//                   <p className="text-xs font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
//                     ₹{selectedDress.price.toLocaleString()}
//                   </p>
//                 </div>

//                 {/* Available Sizes */}
//                 <div>
//                   <h4 className="font-medium mb-0.5 text-[10px] text-gray-700">
//                     {t("availableSizes")}:
//                   </h4>
//                   <div className="flex gap-0.5 justify-center flex-wrap">
//                     {selectedDress.sizes.map((size, index) => (
//                       <span
//                         key={index}
//                         className="px-1 py-0.5 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200 rounded text-[10px] font-medium text-pink-700"
//                       >
//                         {size}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <h4 className="font-medium mb-0.5 text-[10px] text-gray-700">
//                     {t("description")}
//                   </h4>
//                   <p className="text-gray-600 text-[10px] leading-relaxed bg-gray-50 p-1 rounded">
//                     {selectedDress.description}
//                   </p>
//                 </div>

//                 {/* Contact Section */}
//                 <div className="border-t pt-1">
//                   <h4 className="font-medium mb-0.5 text-[10px] text-gray-700 text-center">
//                     {t("contactToPurchase")}
//                   </h4>
//                   <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-1 rounded border border-pink-100">
//                     <p className="text-[10px] text-gray-600 mb-0.5 text-center">
//                       {t("contactInfo")}
//                     </p>

//                     <div className="space-y-0.5">
//                       <div className="flex items-center justify-center gap-1 text-[10px]">
//                         <span className="font-medium text-gray-700 flex items-center justify-center gap-1">
//                           <InstagramSVG />
//                           {t("instagram")}:
//                         </span>
//                         <a
//                           href="https://instagram.com/sara_nya1961"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-pink-600 hover:text-pink-700 font-semibold hover:underline"
//                         >
//                           @sara_nya1961
//                         </a>
//                       </div>

//                       <div className="flex items-center justify-center gap-1 text-[10px]">
//                         <p className="text-[10px] text-gray-600 mb-0.5 text-center flex items-center justify-center gap-1">
//                           <PhoneIcon className="w-3 h-3 text-gray-600" />
//                           {t("contactInfo")}
//                         </p>
//                         <a
//                           href="tel:+919876543210"
//                           className="text-pink-600 hover:text-pink-700 font-semibold hover:underline"
//                         >
//                           +91 90800 07550
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-1 bg-gray-50 border-t">
//                 <Button
//                   variant="outline"
//                   onClick={() => setSelectedDress(null)}
//                   className="w-full text-[10px] py-1 bg-white hover:bg-gray-100 border-gray-300"
//                   size="sm"
//                 >
//                   {t("close")}
//                 </Button>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Edit Dress Dialog */}
//       <Dialog open={!!editingDress} onOpenChange={() => setEditingDress(null)}>
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           {editingDress && (
//             <>
//               <DialogHeader>
//                 <DialogTitle>Edit Dress</DialogTitle>
//               </DialogHeader>
//               <form onSubmit={handleEditSubmit} className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="editName">{t("dressName")}</Label>
//                       <Input
//                         id="editName"
//                         name="name"
//                         value={editDressData.name}
//                         onChange={handleEditInputChange}
//                         placeholder="Enter dress name"
//                         required
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="editPrice">{t("price")}</Label>
//                       <Input
//                         id="editPrice"
//                         name="price"
//                         type="number"
//                         value={editDressData.price}
//                         onChange={handleEditInputChange}
//                         placeholder="Price in rupees"
//                         required
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="editSizes">{t("sizes")}</Label>
//                       <Input
//                         id="editSizes"
//                         name="sizes"
//                         value={editDressData.sizes}
//                         onChange={handleEditInputChange}
//                         placeholder={t("sizesExample")}
//                         required
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="editDescription">
//                         {t("description")}
//                       </Label>
//                       <textarea
//                         id="editDescription"
//                         name="description"
//                         value={editDressData.description}
//                         onChange={handleEditInputChange}
//                         className="w-full p-2 border rounded-md min-h-[100px] resize-vertical"
//                         placeholder="Describe the dress..."
//                         required
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="editImage">{t("dressImage")}</Label>
//                       <Input
//                         id="editImage"
//                         type="file"
//                         accept="image/*"
//                         onChange={handleEditImageUpload}
//                         className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="space-y-2">
//                       <Label>Image Preview</Label>
//                       <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
//                         {editPreviewImage ? (
//                           <img
//                             src={editPreviewImage}
//                             alt="Preview"
//                             className="w-full h-64 object-cover rounded-lg"
//                           />
//                         ) : (
//                           <div className="text-gray-500">
//                             <Upload className="mx-auto h-12 w-12 mb-2" />
//                             <p>No image selected</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <DialogFooter>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => setEditingDress(null)}
//                   >
//                     {t("cancel")}
//                   </Button>
//                   <Button
//                     type="submit"
//                     disabled={updateDressMutation.isPending}
//                   >
//                     {updateDressMutation.isPending
//                       ? "Updating..."
//                       : "Update Dress"}
//                   </Button>
//                 </DialogFooter>
//               </form>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Footer */}
//       <footer className="bg-gradient-to-r from-gray-800 to-gray-900 border-t mt-16 py-12">
//         <div className="container mx-auto px-4 text-center">
//           <div className="mb-4">
//             <h3 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-2">
//               {t("appName")}
//             </h3>
//             <p className="text-gray-300 text-sm">Premium Fashion Collection</p>
//           </div>
//           <p className="text-gray-400 text-sm">
//             &copy; 2025 Yakshu's Boutique. {t("allRightsReserved")}.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default YakshuBoutique;





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
  Trash2,
  Edit,
  Eye
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Dress, AdminUser } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
const PhoneSVG = () => (
  <svg
    className="w-3 h-3 text-gray-600 inline-block mr-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const InstagramSVG = () => (
  <svg
    className="w-4 h-4 text-gray-700 inline-block mr-1"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.25a.75.75 0 110 1.5.75.75 0 010-1.5zM4.5 7.75a3.25 3.25 0 013.25-3.25h8.5a3.25 3.25 0 013.25 3.25v8.5a3.25 3.25 0 01-3.25 3.25h-8.5a3.25 3.25 0 01-3.25-3.25v-8.5z" />
  </svg>
);

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
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [editingDress, setEditingDress] = useState<Dress | null>(null);
  const [editDressData, setEditDressData] = useState<NewDress>({
    name: "",
    price: "",
    sizes: "",
    description: "",
    image: ""
  });
  const [editPreviewImage, setEditPreviewImage] = useState<string | null>(null);
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
    mutationFn: async (data: NewAdmin) => {
      const response = await apiRequest('POST', '/api/admin/users', data);
      return response.json();
    },
    onSuccess: () => {
      setNewAdmin({ email: "", password: "" });
      toast({
        title: "Admin Added",
        description: "New admin user has been added successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
    },
    onError: (error: any) => {
      console.error("Add admin error:", error);
      toast({
        title: "Failed to Add Admin",
        description: "Unable to add new admin user",
        variant: "destructive",
      });
    }
  });

  // Update dress mutation
  const updateDressMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiRequest('PUT', `/api/dresses/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      setEditingDress(null);
      setEditDressData({ name: "", price: "", sizes: "", description: "", image: "" });
      setEditPreviewImage(null);
      toast({
        title: "Dress Updated",
        description: "Dress has been updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/dresses'] });
    },
    onError: (error: any) => {
      console.error("Update dress error:", error);
      toast({
        title: "Failed to Update Dress",
        description: "Unable to update dress",
        variant: "destructive",
      });
    }
  });

  // Delete dress mutation
  const deleteDressMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('DELETE', `/api/dresses/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Dress Deleted",
        description: "Dress has been deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/dresses'] });
    },
    onError: (error: any) => {
      console.error("Delete dress error:", error);
      toast({
        title: "Failed to Delete Dress",
        description: "Unable to delete dress",
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
      image: newDress.image || "/images/placeholder.jpg",
      description: newDress.description
    };
    addDressMutation.mutate(dressData);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);

      // Upload file to server
      try {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          const { imageUrl } = await response.json();
          setNewDress(prev => ({ ...prev, image: imageUrl }));
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: "Upload Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
      }
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

  const handleEditDress = (dress: Dress) => {
    setEditingDress(dress);
    setEditDressData({
      name: dress.name,
      price: dress.price.toString(),
      sizes: dress.sizes.join(", "),
      description: dress.description,
      image: dress.image
    });
    setEditPreviewImage(dress.image);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDress) return;

    const dressData = {
      name: editDressData.name,
      price: parseInt(editDressData.price),
      sizes: editDressData.sizes.split(",").map(s => s.trim()),
      image: editDressData.image || editingDress.image,
      description: editDressData.description
    };

    updateDressMutation.mutate({ id: editingDress.id, data: dressData });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditDressData({ ...editDressData, [name]: value });
  };

  const handleEditImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setEditPreviewImage(result);
      };
      reader.readAsDataURL(file);

      // Upload file to server
      try {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          const { imageUrl } = await response.json();
          setEditDressData(prev => ({ ...prev, image: imageUrl }));
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: "Upload Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteDress = (id: number) => {
    if (window.confirm("Are you sure you want to delete this dress?")) {
      deleteDressMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-10 border-b border-gray-200">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent flex-shrink-0">{t('appName')}</h1>
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value as 'en' | 'hi' | 'ml' | 'ta')}
                className="appearance-none bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg py-1 px-2 pr-6 sm:py-2 sm:px-3 sm:pr-8 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs sm:text-sm shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="ml">മലയാളം</option>
                <option value="ta">தமிழ்</option>
              </select>
              <ChevronDown className="absolute right-2 top-1.5 sm:right-3 sm:top-2.5 h-3 w-3 sm:h-4 sm:w-4 text-gray-500 pointer-events-none" />
            </div>

            {isLoggedIn ? (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Button 
                  variant={showUploadForm ? "default" : "outline"} 
                  onClick={() => {
                    setShowUploadForm(!showUploadForm);
                    setShowAdminPanel(false);
                  }}
                  className="flex items-center gap-1 text-xs px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 rounded-md"
                  size="sm"
                >
                  <Upload className="h-3 w-3" />
                  <span className="hidden sm:inline text-xs">{showUploadForm ? t('viewDresses') : t('uploadDress')}</span>
                </Button>
                <Button 
                  variant={showAdminPanel ? "default" : "outline"} 
                  onClick={() => {
                    setShowAdminPanel(!showAdminPanel);
                    setShowUploadForm(false);
                  }}
                  className="flex items-center gap-1 text-xs px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 rounded-md"
                  size="sm"
                >
                  <Users className="h-3 w-3" />
                  <span className="hidden sm:inline text-xs">{t('adminPanel')}</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsLoggedIn(false);
                    setShowAdminPanel(false);
                    setShowUploadForm(false);
                    setLoginData({ email: "", password: "" });
                    setLoginError("");
                    setTimeout(() => {
                      setShowUploadForm(false);
                    }, 10);
                    toast({
                      title: "Logged out successfully",
                      description: "You have been logged out of the admin panel",
                    });
                  }}
                  className="flex items-center gap-1 text-xs px-2 py-1 bg-red-50 hover:bg-red-100 border-red-200 text-red-700 hover:text-red-800 rounded-md"
                  size="sm"
                >
                  <User className="h-3 w-3" />
                  <span className="text-xs">{t('logout')}</span>
                </Button>
              </div>
            ) : (
              <Button 
                variant={showUploadForm ? "default" : "outline"} 
                onClick={() => setShowUploadForm(!showUploadForm)}
                className="flex items-center gap-1 text-xs px-2 py-1 hover:bg-gray-100 rounded-md"
                size="sm"
              >
                <Lock className="h-3 w-3" />
                <span className="hidden sm:inline text-xs">{t('adminLogin')}</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-2 sm:px-4 py-6 sm:py-12">
        {/* Login Form */}
        {!isLoggedIn && showUploadForm && (
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">{t('adminLogin')}</CardTitle>
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
          <div className="space-y-3 sm:space-y-6 px-2">
            <h2 className="text-xl sm:text-2xl font-bold">{t('adminPanel')}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
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
          <div className="max-w-2xl mx-auto px-2">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">{t('uploadDress')}</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <form onSubmit={handleDressSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
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
                    </div></div>

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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">{t('ourCollection')}</h2>

            {/* Search and Filter Controls */}
            <div className="mb-6 sm:mb-12 flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center px-2">
              <div className="relative w-full sm:w-auto">
                <Input
                  type="text"
                  placeholder={t('searchDresses')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-80 text-sm bg-white/90 backdrop-blur-sm border-gray-300 rounded-xl shadow-md focus:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div className="relative w-full sm:w-auto">
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="appearance-none bg-white/90 backdrop-blur-sm border border-gray-300 rounded-xl py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm w-full sm:w-auto shadow-md hover:shadow-lg transition-all duration-200"
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
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-2 lg:gap-3">
                {filteredDresses.map((dress) => (
                  <Card key={dress.id} className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm group">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={dress.image} 
                        alt={dress.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-1.5 sm:p-2">
                      <h3 className="text-xs sm:text-sm font-bold mb-1 line-clamp-2 text-gray-800">{dress.name}</h3>
                      <p className="text-gray-600 mb-1 text-[8px] sm:text-[10px] line-clamp-1 leading-relaxed">{dress.description}</p>
                      <div className="flex flex-col gap-1 mb-2">
                        <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                          ₹{dress.price.toLocaleString()}
                        </span>
                        <div className="flex gap-0.5 flex-wrap">
                          {dress.sizes.slice(0, 3).map((size) => (
                            <span 
                              key={size}
                              className="px-1 py-0.5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-[8px] font-medium text-gray-700 shadow-sm"
                            >
                              {size}
                            </span>
                          ))}
                          {dress.sizes.length > 3 && (
                            <span className="px-1 py-0.5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-[8px] font-medium text-gray-700 shadow-sm">
                              +{dress.sizes.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-0.5">
                      <Button 
                        onClick={() => setSelectedDress(dress)}
                        className="w-full text-[8px] sm:text-[10px] py-0.5 sm:py-1 bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 rounded-sm"
                          size="sm"
                        >
                         <Eye className="h-2 w-2 sm:h-2.5 sm:w-2.5 mr-0.5" />
                        {t('viewDetails')}
                      </Button>
                      {isLoggedIn && (
                        <div className="flex gap-0.5">
                          <Button 
                            onClick={() => handleEditDress(dress)}
                            className="flex-1 text-[8px] py-0.5 min-h-[16px] bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200 rounded-sm"
                            size="sm"
                          >
                            <Edit className="h-2 w-2" />
                          </Button>
                          <Button 
                            onClick={() => handleDeleteDress(dress.id)}
                            className="flex-1 text-[8px] py-0.5 min-h-[16px] bg-red-500 hover:bg-red-600 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200 rounded-sm"
                            size="sm"
                          >
                            <Trash2 className="h-2 w-2" />
                          </Button>
                        </div>
                      )}
                    </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Dress Details Modal */}
        <Dialog open={!!selectedDress} onOpenChange={() => setSelectedDress(null)}>
          <DialogContent className="w-[85vw] max-w-[320px] mx-auto p-0 gap-0 rounded-lg overflow-hidden shadow-xl border-0 max-h-[80vh] overflow-y-auto">
            {selectedDress && (
              <div className="bg-white">
                <DialogHeader className="p-1 pb-0.5 border-b bg-gray-50">
                  <DialogTitle className="text-[10px] font-semibold text-center">{t('dressDetails')}</DialogTitle>
                </DialogHeader>

                <div className="p-1 space-y-1">
                  {/* Dress Image */}
                  <div className="w-full">
                    <img 
                      src={selectedDress.image} 
                      alt={selectedDress.name}
                      className="w-full h-auto aspect-square object-cover rounded-md shadow-sm"
                    />
                  </div>

                  {/* Dress Name & Price */}
                  <div className="text-center space-y-0.5">
                    <h3 className="font-bold text-[10px] text-gray-800">{selectedDress.name}</h3>
                    <p className="text-xs font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                      ₹{selectedDress.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Available Sizes */}
                  <div>
                    <h4 className="font-medium mb-0.5 text-[10px] text-gray-700">{t('availableSizes')}:</h4>
                    <div className="flex gap-0.5 justify-center flex-wrap">
                      {selectedDress.sizes.map((size, index) => (
                        <span 
                          key={index} 
                          className="px-1 py-0.5 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200 rounded text-[10px] font-medium text-pink-700"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-medium mb-0.5 text-[10px] text-gray-700">{t('description')}</h4>
                    <p className="text-gray-600 text-[10px] leading-relaxed bg-gray-50 p-1 rounded">
                      {selectedDress.description}
                    </p>
                  </div>

                  {/* Contact Section */}
                  <div className="border-t pt-1">
                    <h4 className="font-medium mb-0.5 text-[10px] text-gray-700 text-center">{t('contactToPurchase')}</h4>
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-1 rounded border border-pink-100">
                      <p className="text-[10px] text-gray-600 mb-0.5 text-center">{t('contactInfo')}</p>

                      <div className="space-y-0.5">
                        <div className="flex items-center justify-center gap-1 text-[10px]">
                        <span className="font-medium text-gray-700 flex items-center justify-center gap-1">
  <InstagramSVG />
  {t('instagram')}:
</span>
                          <a 
                            href="https://instagram.com/sara_nya1961"
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-pink-600 hover:text-pink-700 font-semibold hover:underline"
                          >
                            @sara_nya1961
                          </a>
                        </div>

                        <div className="flex items-center justify-center gap-1 text-[10px]">
                          <span className="font-medium text-gray-700 flex items-center justify-center gap-1">
                            <PhoneSVG />
                            {t('mobile')}:
                          </span>
                          <a 
                            href="tel:+919876543210" 
                            className="text-pink-600 hover:text-pink-700 font-semibold hover:underline"
                          >
                            +91 90800 07550
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-1 bg-gray-50 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedDress(null)} 
                    className="w-full text-[10px] py-1 bg-white hover:bg-gray-100 border-gray-300"
                    size="sm"
                  >
                    {t('close')}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Dress Dialog */}
        <Dialog open={!!editingDress} onOpenChange={() => setEditingDress(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {editingDress && (
              <>
                <DialogHeader>
                  <DialogTitle>Edit Dress</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="editName">{t('dressName')}</Label>
                        <Input
                          id="editName"
                          name="name"
                          value={editDressData.name}
                          onChange={handleEditInputChange}
                          placeholder="Enter dress name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editPrice">{t('price')}</Label>
                        <Input
                          id="editPrice"
                          name="price"
                          type="number"
                          value={editDressData.price}
                          onChange={handleEditInputChange}
                          placeholder="Price in rupees"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editSizes">{t('sizes')}</Label>
                        <Input
                          id="editSizes"
                          name="sizes"
                          value={editDressData.sizes}
                          onChange={handleEditInputChange}
                          placeholder={t('sizesExample')}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editDescription">{t('description')}</Label>
                        <textarea
                          id="editDescription"
                          name="description"
                          value={editDressData.description}
                          onChange={handleEditInputChange}
                          className="w-full p-2 border rounded-md min-h-[100px] resize-vertical"
                          placeholder="Describe the dress..."
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editImage">{t('dressImage')}</Label>
                        <Input
                          id="editImage"
                          type="file"
                          accept="image/*"
                          onChange={handleEditImageUpload}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Image Preview</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          {editPreviewImage ? (
                            <img
                              src={editPreviewImage}
                              alt="Preview"
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="text-gray-500">
                              <Upload className="mx-auto h-12 w-12 mb-2" />
                              <p>No image selected</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setEditingDress(null)}
                    >
                      {t('cancel')}
                    </Button>
                    <Button 
                      type="submit"
                      disabled={updateDressMutation.isPending}
                    >
                      {updateDressMutation.isPending ? "Updating..." : "Update Dress"}
                    </Button>
                  </DialogFooter>
                </form>
              </>
            )}
          </DialogContent>
        </Dialog>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 border-t mt-16 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-2">{t('appName')}</h3>
            <p className="text-gray-300 text-sm">Premium Fashion Collection</p>
          </div>
          <p className="text-gray-400 text-sm">&copy; 2025 Yakshu's Boutique. {t('allRightsReserved')}.</p>
        </div>
      </footer>
    </div>
  );
};

export default YakshuBoutique;