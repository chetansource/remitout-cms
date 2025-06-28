// payload.config.ts or services.ts inside collections
import { CollectionConfig } from "payload";

const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
    },
    {
      name: "description",
      type: "array",
      fields: [
        {
          name: "text",
          type: "text",
        },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media", // Make sure you have a media collection
      required: true,
    },
    {
      name: "buttonText",
      type: "text",
      defaultValue: "Contact to Know more",
    },
  ],
};

export default Services;
