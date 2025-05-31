// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { useTranslation } from "react-i18next";
// import { type Dress } from "@shared/schema";

// interface DressCardProps {
//   dress: Dress;
//   onViewDetails: (dress: Dress) => void;
// }

// export function DressCard({ dress, onViewDetails }: DressCardProps) {
//   const { t } = useTranslation();

//   return (
//     <Card className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
//       <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden rounded-t-lg">
//         <img
//           src={dress.imageUrl}
//           alt={dress.name}
//           className="dress-card-image w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//           onError={(e) => {
//             console.error('Image failed to load:', dress.imageUrl);
//             e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNHB4IiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KICA8L3N2Zz4=';
//           }}
//           loading="lazy"
//         />
//       </div>
//       <CardContent className="p-3">
//         <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{dress.name}</h3>
//         <p className="text-xs text-gray-600 mt-1 line-clamp-2">{dress.shortDescription}</p>
//         <div className="mt-2 flex items-center justify-between">
//           <span className="text-lg font-bold text-boutique-600">₹{dress.price}</span>
//           <span className="text-xs text-gray-500">{dress.sizes.join(", ")}</span>
//         </div>
//         <Button
//           onClick={() => onViewDetails(dress)}
//           className="mt-3 w-full bg-boutique-500 text-white hover:bg-boutique-600 transition-colors text-sm py-2"
//         >
//           {t("viewDetails")}
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }



import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { type Dress } from "@shared/schema";

interface DressCardProps {
  dress: Dress;
  onViewDetails: (dress: Dress) => void;
}

export function DressCard({ dress, onViewDetails }: DressCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden rounded-t-lg flex-shrink-0">
        <img
          src={dress.imageUrl}
          alt={dress.name}
          className="dress-card-image w-full h-48 sm:h-56 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            console.error('Image failed to load:', dress.imageUrl);
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNHB4IiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KICA8L3N2Zz4=';
          }}
          loading="lazy"
        />
      </div>
      <CardContent className="p-3 sm:p-4 flex-1 flex flex-col">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1 mb-2">{dress.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 flex-1">{dress.shortDescription}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base sm:text-lg font-bold text-boutique-600">₹{dress.price}</span>
          <span className="text-xs text-gray-500 line-clamp-1">{dress.sizes.join(", ")}</span>
        </div>
        <Button
          onClick={() => onViewDetails(dress)}
          className="mt-3 w-full bg-boutique-500 text-white hover:bg-boutique-600 transition-colors text-sm py-2 min-h-[44px]"
        >
          {t("viewDetails")}
        </Button>
      </CardContent>
    </Card>
  );
}