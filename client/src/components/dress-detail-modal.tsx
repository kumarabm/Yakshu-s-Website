// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { useTranslation } from "react-i18next";
// import { type Dress } from "@shared/schema";
// import { Phone, Instagram, Share, MessageCircle } from "lucide-react";

// interface DressDetailModalProps {
//   dress: Dress | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function DressDetailModal({ dress, isOpen, onClose }: DressDetailModalProps) {
//   const { t } = useTranslation();

//   if (!dress) return null;

//   const handleShare = async () => {
//     const shareData = {
//       title: `${dress.name} - Yakshu Boutique`,
//       text: `Check out this beautiful dress: ${dress.name} - ₹${dress.price}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (error) {
//         console.log('Error sharing:', error);
//         copyToClipboard();
//       }
//     } else {
//       copyToClipboard();
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(window.location.href).then(() => {
//       alert(t("linkCopied"));
//     });
//   };

//   const handleWhatsApp = () => {
//     const message = encodeURIComponent(
//       `Hi! I'm interested in ${dress.name} from Yakshu Boutique. Price: ₹${dress.price}`
//     );
//     window.open(`https://wa.me/919080007550?text=${message}`, '_blank');
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="modal-content max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw] mx-auto">
//         <DialogHeader>
//           <DialogTitle>{t("dressDetails")}</DialogTitle>
//             <DialogDescription>{t("description.ofDress")}</DialogDescription> {/* Add this line */}
//         </DialogHeader>

//         <div className="space-y-6">
//           {/* Dress Image */}
//           <div className="w-full">
//             <img
//               src={dress.imageUrl}
//               alt={dress.name}
//               className="w-full h-80 object-cover rounded-lg"
//               onError={(e) => {
//                 console.error('Image failed to load:', dress.imageUrl);
//                 e.currentTarget.style.display = 'none';
//               }}
//               loading="lazy"
//             />
//           </div>

//           {/* Dress Information */}
//           <div className="space-y-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//               <span className="text-2xl sm:text-3xl font-bold text-boutique-600">₹{dress.price}</span>
//               <span className="text-sm sm:text-lg text-gray-600">
//                 {t("availableSizes")}: {dress.sizes.join(", ")}
//               </span>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("description")}</h3>
//               <p className="text-gray-700 leading-relaxed">{dress.fullDescription}</p>
//             </div>

//             {/* Contact Information */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">{t("contactInfo")}</h3>
//               <div className="space-y-2">
//                 <div className="flex items-center">
//                   <Phone className="text-boutique-600 mr-3" size={20} />
//                   <span className="text-gray-700">+91 90800 07550</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Instagram className="text-boutique-600 mr-3" size={20} />
//                   <a
//                     href="https://instagram.com/sara_nya1961"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-boutique-600 hover:text-boutique-700"
//                   >
//                     @sara_nya1961
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
//               <Button
//                 onClick={handleShare}
//                 className="flex-1 bg-boutique-500 text-white hover:bg-boutique-600 transition-colors h-12"
//               >
//                 <Share className="mr-2" size={20} />
//                 {t("share")}
//               </Button>
//               <Button
//                 onClick={handleWhatsApp}
//                 className="flex-1 bg-green-500 text-white hover:bg-green-600 transition-colors h-12"
//               >
//                 <MessageCircle className="mr-2" size={20} />
//                 {t("whatsapp")}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { type Dress } from "@shared/schema";
import { Phone, Instagram, Share, MessageCircle } from "lucide-react";

interface DressDetailModalProps {
  dress: Dress | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DressDetailModal({
  dress,
  isOpen,
  onClose,
}: DressDetailModalProps) {
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
        console.log("Error sharing:", error);
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
    window.open(`https://wa.me/919080007550?text=${message}`, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="modal-content max-w-2xl max-h-[90vh] overflow-y-auto w-[98vw] sm:w-[90vw] mx-auto p-3 sm:p-6 m-2 flex flex-col">
        <DialogHeader className="space-y-1 sm:space-y-2 pb-2">
          <DialogTitle className="text-base sm:text-lg md:text-xl font-semibold">
            {t("dressDetails")}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-gray-600">
            {t("description.ofDress")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 md:space-y-6 overflow-y-auto flex-1 min-h-0">
          {/* Dress Image */}
          <div className="w-full">
            <img
              src={dress.imageUrl}
              alt={dress.name}
              className="w-full h-40 sm:h-48 md:h-64 lg:h-80 object-cover rounded-lg"
              onError={(e) => {
                console.error("Image failed to load:", dress.imageUrl);
                e.currentTarget.style.display = "none";
              }}
              loading="lazy"
            />
          </div>

          {/* Dress Information */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <div className="flex flex-col gap-1 sm:gap-2">
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-boutique-600">
                ₹{dress.price}
              </span>
              <span className="text-xs sm:text-sm md:text-base text-gray-600">
                {t("availableSizes")}: {dress.sizes.join(", ")}
              </span>
            </div>

            <div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                {t("description")}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                {dress.fullDescription}
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 md:mb-3">
                {t("contactInfo")}
              </h3>
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center">
                  <Phone
                    className="text-boutique-600 mr-2 sm:mr-3 flex-shrink-0"
                    size={16}
                  />
                  <a
                    href="tel:+919080007550"
                    className="text-xs sm:text-sm md:text-base text-gray-700 hover:underline"
                  >
                    +91 90800 07550
                  </a>
                </div>

                <div className="flex items-center">
                  <Instagram
                    className="text-boutique-600 mr-2 sm:mr-3 flex-shrink-0"
                    size={16}
                  />
                  <a
                    href="https://instagram.com/sara_nya1961"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm md:text-base text-boutique-600 hover:text-boutique-700 break-all"
                  >
                    @sara_nya1961
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 sm:gap-3 pt-2 sm:pt-3 md:pt-4 pb-2 sticky bottom-0 bg-white">
              <Button
                onClick={handleShare}
                className="w-full bg-boutique-500 text-white hover:bg-boutique-600 transition-colors h-10 sm:h-11 md:h-12 text-xs sm:text-sm md:text-base flex items-center justify-center"
              >
                <Share className="mr-1 sm:mr-2" size={16} />
                {t("share")}
              </Button>
              <Button
                onClick={handleWhatsApp}
                className="w-full text-white hover:bg-green-600 transition-colors h-10 sm:h-11 md:h-12 text-xs sm:text-sm md:text-base flex items-center justify-center"
                style={{ backgroundColor: "#25D366" }}
              >
                <MessageCircle className="mr-1 sm:mr-2" size={16} />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
