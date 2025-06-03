import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DressCard } from "@/components/dress-card";
import { DressDetailModal } from "@/components/dress-detail-modal";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { type Dress } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { t } = useTranslation();
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: dresses, isLoading, error } = useQuery<Dress[]>({
    queryKey: ["/api/dresses"],
  });

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

          {/* Dress Grid */}
          {dresses && dresses.length > 0 && (
            <div className="dress-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {dresses.map((dress) => (
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
                <span className="text-white text-2xl">📱</span>
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
