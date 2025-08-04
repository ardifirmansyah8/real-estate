import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { Property } from "@/types/payload-types";

interface PropertyCardProps {
  property: Property;
  showStatus?: boolean;
}

export default function PropertyCard({
  property,
  showStatus = false,
}: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const imageUrl = property.image?.url;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative">
        <Link href={`/property/${property.id}`}>
          <div className="relative h-48 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`http://localhost:3000${imageUrl}`}
              alt={property.image?.alt || property.title}
              className="w-full h-full"
            />
          </div>
        </Link>

        {showStatus && !property.isPublished && (
          <div className="absolute top-3 left-3">
            <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
              Draft
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex space-x-2">
            <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
              <PencilIcon className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
              <TrashIcon className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Link href={`/property/${property.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
            {property.title}
          </h3>
        </Link>

        <div className="flex items-center text-gray-600 mb-3">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="text-2xl font-bold text-purple-600 mb-4">
          {formatPrice(property.price)}
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">
          {property.description?.length > 0
            ? property.description[0]?.children?.[0]?.text ||
              "No description available"
            : "No description available"}
        </p>

        {(property.bedrooms || property.bathrooms) && (
          <div className="flex items-center space-x-4 mt-4 text-sm text-gray-600">
            {property.bedrooms && (
              <span>
                {property.bedrooms} bed{property.bedrooms > 1 ? "s" : ""}
              </span>
            )}
            {property.bathrooms && (
              <span>
                {property.bathrooms} bath{property.bathrooms > 1 ? "s" : ""}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
