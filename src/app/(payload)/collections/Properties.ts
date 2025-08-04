import { CollectionConfig } from "payload";

const Properties: CollectionConfig = {
  slug: "properties",
  admin: {
    defaultColumns: ["title", "location", "price", "isPublished", "updatedAt"],
    useAsTitle: "title",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description: "Property title (e.g., Modern Downtown Loft)",
      },
    },
    {
      name: "location",
      type: "text",
      required: true,
      admin: {
        description: "Property location (e.g., Downtown, San Francisco)",
      },
    },
    {
      name: "price",
      type: "number",
      required: true,
      admin: {
        description: "Property price in USD",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Main property image",
      },
    },
    {
      name: "description",
      type: "richText",
      admin: {
        description: "Detailed property description",
      },
    },
    {
      name: "isPublished",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Publish this property on the website",
        position: "sidebar",
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate slug if not provided
        if (data.title && !data.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
        }
        return data;
      },
    ],
  },
};

export default Properties;
