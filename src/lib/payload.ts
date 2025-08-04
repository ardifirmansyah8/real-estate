import axios from "axios";
import { Property, PaginatedProperties } from "@/types/payload-types";

const API_BASE = "http://localhost:3000";

const api = axios.create({
  baseURL: `${API_BASE}/api`,
});

export const payloadAPI = {
  // Get all published properties
  getPublishedProperties: async (): Promise<Property[]> => {
    try {
      const response = await api.get<PaginatedProperties>("/properties");
      return response.data.docs;
    } catch (error) {
      console.error("Error fetching properties:", error);
      return [];
    }
  },

  // Get property by slug
  getPropertyBySlug: async (id: string): Promise<Property | null> => {
    try {
      const response = await api.get<PaginatedProperties>("/properties", {
        params: {
          where: {
            id: {
              equals: id,
            },
          },
          limit: 1,
        },
      });
      return response.data.docs[0] || null;
    } catch (error) {
      console.error("Error fetching property:", error);
      return null;
    }
  },
};
