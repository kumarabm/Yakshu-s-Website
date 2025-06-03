import { useTranslation } from "react-i18next";
import { Phone, Mail, Instagram, Facebook, MessageCircle } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Yakshu Boutique</h3>
            <p className="text-gray-300">{t("footer.description")}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.contactInfo")}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <Phone size={16} className="mr-2" />
                <a href="tel:+919080007550" className="hover:underline">
                  +91 90800 07550
                </a>
              </div>

              <div className="flex items-center text-gray-300">
                <Mail size={16} className="mr-2" />
                saransabjaf625@gmail.com
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.followUs")}
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/sara_nya1961"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://wa.me/919080007550"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <MessageCircle size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
