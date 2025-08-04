/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Property {
  id: string;
  title: string;
  slug: string;
  location: string;
  price: number;
  image: Media;
  description?: any;
  features?: { feature: string }[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  alt?: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  sizes?: {
    thumbnail?: MediaSize;
    card?: MediaSize;
    hero?: MediaSize;
  };
  url: string;
}

export interface MediaSize {
  width: number;
  height: number;
  filename: string;
  url: string;
}

export interface PaginatedProperties {
  docs: Property[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}
