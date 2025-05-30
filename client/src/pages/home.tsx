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
      <section id="home" className="relative bg-gradient-to-r from-boutique-500 to-boutique-600 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          className="absolute inset-0"
        />
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="hero-title text-4xl font-bold tracking-tight sm:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="hero-subtitle mt-6 text-xl leading-8 text-gray-100 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10">
              <Button
                onClick={() => scrollToSection("collections")}
                className="bg-white text-boutique-600 px-8 py-3 hover:bg-gray-100 transition-colors"
              >
                {t("hero.shopNow")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("collections.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("collections.subtitle")}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-4">
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
            <div className="dress-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dresses.map((dress) => (
                <DressCard
                  key={dress.id}
                  dress={dress}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("about")}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At Yakshu Boutique, we believe that every woman deserves to feel beautiful and confident. 
            Our carefully curated collection features the finest fabrics and latest designs, ensuring 
            you always look your best for any occasion.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t("contact")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Instagram</h3>
              <a 
                href="https://instagram.com/yakshu_boutique" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-boutique-600 hover:text-boutique-700"
              >
                @yakshu_boutique
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
