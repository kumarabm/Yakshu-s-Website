import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { AdminLoginModal } from "./admin-login-modal";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";

export function Header() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t("home"), href: "/", id: "home" },
    { name: t("collections"), href: "/#collections", id: "collections" },
    { name: t("about"), href: "/#about", id: "about" },
    { name: t("contact"), href: "/#contact", id: "contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold text-boutique-600 cursor-pointer">
                  Yakshu Boutique
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.href.includes("#")) {
                      scrollToSection(item.id);
                    }
                  }}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    location === item.href
                      ? "text-boutique-600"
                      : "text-gray-500 hover:text-boutique-600"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Language Switcher & Admin */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAdminModalOpen(true)}
                className="text-gray-500 hover:text-boutique-600"
              >
                <i className="fas fa-user-shield mr-1"></i>
                {t("admin")}
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (item.href.includes("#")) {
                        scrollToSection(item.id);
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className="mobile-menu-item text-left px-3 py-2 text-sm font-medium text-gray-500 hover:text-boutique-600"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      <AdminLoginModal 
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </>
  );
}
