import { Property } from "@/types/payload-types";
import PropertyCard from "./PropertyCard";

interface PropertyGridProps {
  properties: Property[];
  showStatus?: boolean;
}

export default function PropertyGrid({
  properties,
  showStatus = false,
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No properties found</div>
        <p className="text-gray-400 mt-2">Check back later for new listings.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          showStatus={showStatus}
        />
      ))}
    </div>
  );
}
