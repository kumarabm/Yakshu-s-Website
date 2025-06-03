// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Header } from "@/components/header";
// import { Footer } from "@/components/footer";
// import { DressCard } from "@/components/dress-card";
// import { DressDetailModal } from "@/components/dress-detail-modal";
// import { Button } from "@/components/ui/button";
// import { useTranslation } from "react-i18next";
// import { type Dress } from "@shared/schema";
// import { Skeleton } from "@/components/ui/skeleton";
// import instagramIcon from "../assets/icons/instagram.png";

// export default function Home() {
//   const { t } = useTranslation();
//   const [selectedDress, setSelectedDress] = useState<Dress | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { data: dresses, isLoading, error } = useQuery<Dress[]>({
//     queryKey: ["/api/dresses"],
//   });

//   // Initialize admin user on component mount
//   useEffect(() => {
//     fetch("/api/init", { method: "POST" });
//   }, []);

//   const handleViewDetails = (dress: Dress) => {
//     setSelectedDress(dress);
//     setIsModalOpen(true);
//   };

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
      
//       {/* Hero Section */}
//       <section id="home" className="hero-luxury text-white min-h-screen flex items-center">
//         <div 
//           style={{
//             backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundAttachment: "fixed"
//           }}
//           className="absolute inset-0"
//         />
        
//         <div className="hero-content-luxury max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 w-full">
//           <div className="text-center">
//             <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-8">
//               <span className="text-gold-400 text-sm font-medium tracking-wider uppercase">
//                 ✨ Premium Collection 2025
//               </span>
//             </div>
            
//             <h1 className="hero-title text-5xl font-bold tracking-tight sm:text-7xl mb-6 leading-tight">
//               {t("hero.title")}
//             </h1>
//             <p className="hero-subtitle text-xl leading-8 text-white/90 max-w-3xl mx-auto mb-12 font-light">
//               {t("hero.subtitle")}
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <button
//                 onClick={() => scrollToSection("collections")}
//                 className="button-luxury text-lg px-10 py-4"
//               >
//                 {t("hero.shopNow")} ✨
//               </button>
              
//               <button
//                 onClick={() => scrollToSection("about")}
//                 className="button-luxury-outline text-lg px-10 py-4"
//               >
//                 Learn More
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Collections Section */}
//       <section id="collections" className="py-20 section-luxury">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="section-title-luxury text-4xl sm:text-5xl mb-6">{t("collections.title")}</h2>
//             <p className="text-boutique-700 text-lg max-w-3xl mx-auto leading-relaxed">
//               {t("collections.subtitle")}
//             </p>
//           </div>

//           {/* Loading State */}
//           {isLoading && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//               {Array.from({ length: 8 }).map((_, index) => (
//                 <div key={`skeleton-${index}`} className="space-y-4">
//                   <Skeleton className="h-64 w-full rounded-lg" />
//                   <Skeleton className="h-4 w-3/4" />
//                   <Skeleton className="h-4 w-1/2" />
//                   <Skeleton className="h-10 w-full" />
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Error State */}
//           {error && (
//             <div className="text-center py-12">
//               <p className="text-gray-500">Failed to load dresses. Please try again later.</p>
//             </div>
//           )}

//           {/* Empty State */}
//           {!isLoading && !error && (!dresses || dresses.length === 0) && (
//             <div className="text-center py-12">
//               <p className="text-gray-500">No dresses available at the moment.</p>
//             </div>
//           )}

//           {/* Dress Grid */}
//           {dresses && dresses.length > 0 && (
//             <div className="dress-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//               {dresses.map((dress) => (
//                 <DressCard
//                   key={dress.id || dress._id}
//                   dress={dress}
//                   onViewDetails={handleViewDetails}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="section-title-luxury text-4xl sm:text-5xl mb-8">{t("about")}</h2>
//           <div className="max-w-4xl mx-auto">
//             <p className="text-boutique-700 text-xl leading-relaxed mb-8">
//               At Yakshu Boutique, we believe that every woman deserves to feel beautiful and confident. 
//               Our carefully curated collection features the finest fabrics and latest designs, ensuring 
//               you always look your best for any occasion.
//             </p>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
//               <div className="glass-effect p-8 rounded-2xl">
//                 <div className="w-16 h-16 bg-gradient-to-br from-boutique-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-white text-2xl">✨</span>
//                 </div>
//                 <h3 className="text-xl font-semibold text-boutique-800 mb-3">Premium Quality</h3>
//                 <p className="text-boutique-600">Finest fabrics and materials</p>
//               </div>
//               <div className="glass-effect p-8 rounded-2xl">
//                 <div className="w-16 h-16 bg-gradient-to-br from-boutique-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-white text-2xl">👗</span>
//                 </div>
//                 <h3 className="text-xl font-semibold text-boutique-800 mb-3">Latest Designs</h3>
//                 <p className="text-boutique-600">Trendy and elegant styles</p>
//               </div>
//               <div className="glass-effect p-8 rounded-2xl">
//                 <div className="w-16 h-16 bg-gradient-to-br from-boutique-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-white text-2xl">💫</span>
//                 </div>
//                 <h3 className="text-xl font-semibold text-boutique-800 mb-3">Perfect Fit</h3>
//                 <p className="text-boutique-600">Tailored for every occasion</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-20 section-luxury">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="section-title-luxury text-4xl sm:text-5xl mb-12">{t("contact")}</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
//             <div className="glass-effect p-8 rounded-2xl">
//               <div className="w-16 h-16 bg-gradient-to-br from-boutique-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <span className="text-white text-2xl">📞</span>
//               </div>
//               <h3 className="text-2xl font-semibold text-boutique-800 mb-4">Contact Number</h3>
//               <p className="text-boutique-600 text-xl font-medium">+91 90800 07550</p>
//             </div>
//             <div className="glass-effect p-8 rounded-2xl">
//               <div className="w-16 h-16 bg-gradient-to-br from-boutique-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <span className="text-white text-2xl"><img src={instagramIcon} alt="Instagram" className="w-6 h-6 inline-block" /></span>
//               </div>
//               <h3 className="text-2xl font-semibold text-boutique-800 mb-4">Instagram</h3>
//               <a 
//                 href="https://instagram.com/sara_nya1961" 
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-boutique-600 hover:text-boutique-800 text-xl font-medium transition-colors-smooth"
//               >
//                 @sara_nya1961
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />

//       <DressDetailModal
//         dress={selectedDress}
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </div>
//   );
// }


import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DressCard } from "@/components/dress-card";
import { DressDetailModal } from "@/components/dress-detail-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { type Dress } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Instagram, Search, Filter, X } from "lucide-react";

export default function Home() {
  const { t } = useTranslation();
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");

  const { data: dresses, isLoading, error } = useQuery<Dress[]>({
    queryKey: ["/api/dresses"],
  });

  // Filter and search logic
  const filteredDresses = useMemo(() => {
    if (!dresses) return [];
    
    return dresses.filter((dress) => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        dress.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dress.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dress.fullDescription.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === "all" || dress.category === selectedCategory;
      
      // Price range filter
      let matchesPrice = true;
      if (priceRange !== "all") {
        const price = dress.price;
        switch (priceRange) {
          case "under-1000":
            matchesPrice = price < 1000;
            break;
          case "1000-2000":
            matchesPrice = price >= 1000 && price <= 2000;
            break;
          case "2000-5000":
            matchesPrice = price >= 2000 && price <= 5000;
            break;
          case "over-5000":
            matchesPrice = price > 5000;
            break;
        }
      }
      
      // Size filter
      const matchesSize = selectedSize === "all" || dress.sizes.includes(selectedSize);
      
      return matchesSearch && matchesCategory && matchesPrice && matchesSize;
    });
  }, [dresses, searchQuery, selectedCategory, priceRange, selectedSize]);

  // Get unique categories and sizes for filter options
  const categories = useMemo(() => {
    if (!dresses) return [];
    const uniqueCategories = [...new Set(dresses.map(dress => dress.category))];
    return uniqueCategories.sort();
  }, [dresses]);

  const availableSizes = useMemo(() => {
    if (!dresses) return [];
    const allSizes = dresses.flatMap(dress => dress.sizes);
    const uniqueSizes = [...new Set(allSizes)];
    return uniqueSizes.sort();
  }, [dresses]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange("all");
    setSelectedSize("all");
  };

  // Initialize admin user on component mount
  useEffect(() => {
    fetch("/api/init", { method: "POST" });
  }, []);

  const handleViewDetails = (dress: Dress) => {
    setSelectedDress(dress);
    setIsModalOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="hero-luxury text-white min-h-screen flex items-center">
        <div 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
          className="absolute inset-0"
        />
        
        <div className="hero-content-luxury max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-8">
              <span className="text-gold-400 text-sm font-medium tracking-wider uppercase">
                ✨ Premium Collection 2024
              </span>
            </div>
            
            <h1 className="hero-title text-5xl font-bold tracking-tight sm:text-7xl mb-6 leading-tight">
              {t("hero.title")}
            </h1>
            <p className="hero-subtitle text-xl leading-8 text-white/90 max-w-3xl mx-auto mb-12 font-light">
              {t("hero.subtitle")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection("collections")}
                className="button-luxury text-lg px-10 py-4"
              >
                {t("hero.shopNow")} ✨
              </button>
              
              <button
                onClick={() => scrollToSection("about")}
                className="button-luxury-outline text-lg px-10 py-4"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="py-20 section-luxury">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title-luxury text-4xl sm:text-5xl mb-6">{t("collections.title")}</h2>
            <p className="text-boutique-700 text-lg max-w-3xl mx-auto leading-relaxed">
              {t("collections.subtitle")}
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-12">
            {/* Mobile-optimized Search and Filter */}
            <div className="md:hidden">
              <div className="search-filter-mobile">
                {/* Search Bar */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-boutique-400 h-5 w-5 z-10" />
                  <Input
                    type="text"
                    placeholder="Search dresses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input-mobile"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-boutique-400 hover:text-boutique-600 z-10"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {/* Filter Header */}
                <div className="flex items-center space-x-2 mb-3">
                  <Filter className="h-5 w-5 text-boutique-600" />
                  <span className="font-medium text-boutique-700">Filters</span>
                </div>

                {/* Filter Grid */}
                <div className="filter-grid-mobile">
                  {/* Category Filter */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="filter-select-mobile">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Price Range Filter */}
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="filter-select-mobile">
                      <SelectValue placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under-1000">Under ₹1K</SelectItem>
                      <SelectItem value="1000-2000">₹1K - ₹2K</SelectItem>
                      <SelectItem value="2000-5000">₹2K - ₹5K</SelectItem>
                      <SelectItem value="over-5000">Over ₹5K</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Size Filter */}
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="filter-select-mobile">
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sizes</SelectItem>
                      {availableSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Clear Filters Button */}
                  {(searchQuery || selectedCategory !== "all" || priceRange !== "all" || selectedSize !== "all") && (
                    <Button
                      onClick={clearFilters}
                      className="clear-filters-mobile"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </div>

              {/* Results Count for Mobile */}
              <div className="results-count-mobile">
                {filteredDresses.length} {filteredDresses.length === 1 ? "dress" : "dresses"} found
                {searchQuery && ` for "${searchQuery}"`}
              </div>
            </div>

            {/* Desktop Search and Filter (unchanged) */}
            <div className="hidden md:block space-y-6">
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-boutique-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search dresses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 text-lg border-boutique-200 focus:border-boutique-500 focus:ring-boutique-500 rounded-full"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-boutique-400 hover:text-boutique-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap justify-center gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-boutique-600" />
                  <span className="font-medium text-boutique-700">Filters:</span>
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40 border-boutique-200 focus:border-boutique-500">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Price Range Filter */}
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-40 border-boutique-200 focus:border-boutique-500">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under-1000">Under ₹1,000</SelectItem>
                    <SelectItem value="1000-2000">₹1,000 - ₹2,000</SelectItem>
                    <SelectItem value="2000-5000">₹2,000 - ₹5,000</SelectItem>
                    <SelectItem value="over-5000">Over ₹5,000</SelectItem>
                  </SelectContent>
                </Select>

                {/* Size Filter */}
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-32 border-boutique-200 focus:border-boutique-500">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sizes</SelectItem>
                    {availableSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Clear Filters Button */}
                {(searchQuery || selectedCategory !== "all" || priceRange !== "all" || selectedSize !== "all") && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="border-boutique-300 text-boutique-600 hover:bg-boutique-50"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Results Count */}
              <div className="text-center">
                <p className="text-boutique-600">
                  {filteredDresses.length} {filteredDresses.length === 1 ? "dress" : "dresses"} found
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={`skeleton-${index}`} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-gray-500">Failed to load dresses. Please try again later.</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && (!dresses || dresses.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500">No dresses available at the moment.</p>
            </div>
          )}

          {/* No Results State */}
          {!isLoading && !error && dresses && dresses.length > 0 && filteredDresses.length === 0 && (
            <div className="text-center py-12">
              <div className="glass-effect p-8 rounded-2xl max-w-md mx-auto">
                <Search className="h-16 w-16 text-boutique-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-boutique-700 mb-2">No dresses found</h3>
                <p className="text-boutique-600 mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button onClick={clearFilters} className="button-luxury">
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}

          {/* Dress Grid */}
          {filteredDresses.length > 0 && (
            <div className="dress-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredDresses.map((dress) => (
                <DressCard
                  key={dress.id || dress._id}
                  dress={dress}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title-luxury text-4xl sm:text-5xl mb-8">{t("about")}</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-boutique-700 text-xl leading-relaxed mb-8">
              At Yakshu Boutique, we believe that every woman deserves to feel beautiful and confident. 
              Our carefully curated collection features the finest fabrics and latest designs, ensuring 
              you always look your best for any occasion.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="glass-effect p-8 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-boutique-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-boutique-800 mb-3">Premium Quality</h3>
                <p className="text-boutique-600">Finest fabrics and materials</p>
              </div>
              <div className="glass-effect p-8 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-boutique-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">👗</span>
                </div>
                <h3 className="text-xl font-semibold text-boutique-800 mb-3">Latest Designs</h3>
                <p className="text-boutique-600">Trendy and elegant styles</p>
              </div>
              <div className="glass-effect p-8 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-boutique-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💫</span>
                </div>
                <h3 className="text-xl font-semibold text-boutique-800 mb-3">Perfect Fit</h3>
                <p className="text-boutique-600">Tailored for every occasion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 section-luxury">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title-luxury text-4xl sm:text-5xl mb-12">{t("contact")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="glass-effect p-8 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-boutique-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">📞</span>
              </div>
              <h3 className="text-2xl font-semibold text-boutique-800 mb-4">Contact Number</h3>
              <p className="text-boutique-600 text-xl font-medium">+91 90800 07550</p>
            </div>
            <div className="glass-effect p-8 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-boutique-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Instagram className="h-8 w-8 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold text-boutique-800 mb-4">Instagram</h3>
              <a 
                href="https://instagram.com/sara_nya1961" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-boutique-600 hover:text-boutique-800 text-xl font-medium transition-colors-smooth"
              >
                @sara_nya1961
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <DressDetailModal
        dress={selectedDress}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
