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
    <Card className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden rounded-t-lg">
        <img
          src={dress.imageUrl}
          alt={dress.name}
          className="dress-card-image w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-3">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{dress.name}</h3>
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{dress.shortDescription}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-boutique-600">₹{dress.price}</span>
          <span className="text-xs text-gray-500">{dress.sizes.slice(0, 2).join(", ")}{dress.sizes.length > 2 ? "..." : ""}</span>
        </div>
        <Button
          onClick={() => onViewDetails(dress)}
          className="mt-3 w-full bg-boutique-500 text-white hover:bg-boutique-600 transition-colors text-sm py-2"
        >
          {t("viewDetails")}
        </Button>
      </CardContent>
    </Card>
  );
}
