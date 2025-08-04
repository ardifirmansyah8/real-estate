"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeftIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { payloadAPI } from "@/lib/payload";
import { Property } from "@/types/payload-types";

export default function PropertyPage() {
  const params = useParams();
  console.log(params);

  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (params.slug) {
      payloadAPI
        .getPropertyBySlug(params.slug as string)
        .then((resp) => setProperty(resp));
    }
  }, [params]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const imageUrl =
    property?.image?.sizes?.hero?.url ||
    property?.image?.url ||
    "/placeholder.jpg";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeftIcon className="h-5 w-5 mr-1" />
        Back to Properties
      </Link>

      {/* Property Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {property?.title}
        </h1>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="h-5 w-5 mr-2" />
            <span className="text-lg">{property?.location}</span>
          </div>

          <div className="text-3xl font-bold text-purple-600">
            {formatPrice(property?.price || 0)}
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={property?.image?.alt || property?.title}
          className="w-full h-full"
        />
      </div>

      {/* property? Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Description
            </h2>
            <div className="prose prose-gray max-w-none">
              {property?.description?.root.children.length > 0 ? (
                property?.description?.root.children.map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (block: any, index: number) => (
                    <p
                      key={index}
                      className="text-gray-700 leading-relaxed mb-4"
                    >
                      {block.children
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ?.map((child: any) => child.text)
                        .join("") || ""}
                    </p>
                  )
                )
              ) : (
                <p className="text-gray-700">No description available.</p>
              )}
            </div>
          </div>

          {/* Features */}
          {property?.features && property?.features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Features
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {property?.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    {feature.feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Property Details
            </h3>

            <div className="space-y-4">
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-gray-600">Price</span>
                  <span className="font-bold text-purple-600">
                    {formatPrice(property?.price || 0)}
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors mt-6">
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
