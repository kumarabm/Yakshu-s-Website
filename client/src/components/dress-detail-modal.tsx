import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { type Dress } from "@shared/schema";
import { Phone, Instagram, Share, MessageCircle } from "lucide-react";

interface DressDetailModalProps {
  dress: Dress | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DressDetailModal({ dress, isOpen, onClose }: DressDetailModalProps) {
  const { t } = useTranslation();

  if (!dress) return null;

  const handleShare = async () => {
    const shareData = {
      title: `${dress.name} - Yakshu Boutique`,
      text: `Check out this beautiful dress: ${dress.name} - ₹${dress.price}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert(t("linkCopied"));
    });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in ${dress.name} from Yakshu Boutique. Price: ₹${dress.price}`
    );
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="modal-content max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("dressDetails")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dress Image */}
          <div className="w-full">
            <img
              src={dress.imageUrl}
              alt={dress.name}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>

          {/* Dress Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-boutique-600">₹{dress.price}</span>
              <span className="text-lg text-gray-600">
                {t("availableSizes")}: {dress.sizes.join(", ")}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("description")}</h3>
              <p className="text-gray-700 leading-relaxed">{dress.fullDescription}</p>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t("contactInfo")}</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="text-boutique-600 mr-3" size={20} />
                  <span className="text-gray-700">+91 90800 07550</span>
                </div>
                <div className="flex items-center">
                  <Instagram className="text-boutique-600 mr-3" size={20} />
                  <a 
                    href="https://instagram.com/sara_nya1961" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-boutique-600 hover:text-boutique-700"
                  >
                    @sara_nya1961
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button
                onClick={handleShare}
                className="flex-1 bg-boutique-500 text-white hover:bg-boutique-600 transition-colors"
              >
                <Share className="mr-2" size={20} />
                {t("share")}
              </Button>
              <Button
                onClick={handleWhatsApp}
                className="flex-1 bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="mr-2" size={20} />
                {t("whatsapp")}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}