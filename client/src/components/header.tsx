
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { AdminLoginModal } from "./admin-login-modal";
import { useTranslation } from "react-i18next";
import { Menu, X, Crown, Sparkles } from "lucide-react";

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
      <header className="header-luxury sticky top-0 z-50 transition-all-smooth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Luxury Logo */}
            <div className="flex items-center space-x-3">
              <Link href="/">
                <div className="flex items-center space-x-2 cursor-pointer group">
                  <div className="p-2 bg-gradient-to-br from-boutique-500 to-gold-500 rounded-xl group-hover:scale-110 transition-transform-smooth">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="logo-luxury text-3xl font-bold tracking-tight">
                      Yakshu Boutique
                    </h1>
                    <p className="text-xs text-boutique-600 font-medium tracking-wider uppercase">
                      Luxury Fashion
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.href.includes("#")) {
                      scrollToSection(item.id);
                    }
                  }}
                  className={`header-nav-item ${
                    location === item.href ? "active" : ""
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Language Switcher & Admin */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block">
                <div className="glass-effect rounded-full p-1">
                  <LanguageSwitcher />
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAdminModalOpen(true)}
                className="hidden sm:flex items-center space-x-2 glass-effect hover:bg-boutique-100 text-boutique-700 hover:text-boutique-800 rounded-full px-4 py-2 transition-all-smooth"
              >
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">{t("admin")}</span>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-3 h-12 w-12 flex items-center justify-center glass-effect hover:bg-boutique-100 rounded-full transition-all-smooth"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X size={20} className="text-boutique-700" />
                ) : (
                  <Menu size={20} className="text-boutique-700" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-4 right-4 mobile-menu-luxury">
              <nav className="flex flex-col p-2">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (item.href.includes("#")) {
                        scrollToSection(item.id);
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className="mobile-menu-item-luxury text-left font-medium text-boutique-700 transition-all-smooth"
                  >
                    {item.name}
                  </button>
                ))}

                {/* Mobile Language Switcher */}
                <div className="mobile-menu-item-luxury">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-boutique-700">Language:</span>
                    <LanguageSwitcher />
                  </div>
                </div>

                {/* Mobile Admin Button */}
                <button
                  onClick={() => {
                    setIsAdminModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-menu-item-luxury text-left font-medium text-boutique-700 flex items-center space-x-2 transition-all-smooth"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{t("admin")}</span>
                </button>
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
