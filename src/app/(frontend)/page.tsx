"use client";

import { useState, useEffect } from "react";

import Navigation from "@/components/Navigation";
import PropertyGrid from "@/components/PropertyGrid";
import { payloadAPI } from "@/lib/payload";
import { Property } from "@/types/payload-types";

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "published" | "draft">(
    "all"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        // For demo purposes, we'll fetch all properties
        // In a real app, you'd have different endpoints for draft vs published
        const data = await payloadAPI.getPublishedProperties();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  useEffect(() => {
    let filtered = properties;

    switch (activeTab) {
      case "published":
        filtered = properties.filter((p) => p.isPublished);
        break;
      case "draft":
        filtered = properties.filter((p) => !p.isPublished);
        break;
      default:
        filtered = properties;
    }

    setFilteredProperties(filtered);
  }, [activeTab, properties]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <PropertyGrid properties={filteredProperties} showStatus={true} />
    </div>
  );
}
