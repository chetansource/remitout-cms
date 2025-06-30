// collections/contactDetails.ts
import { CollectionConfig } from "payload";

const ContactDetails: CollectionConfig = {
  slug: "contactDetails",
  admin: { useAsTitle: "phone" },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "text",
      required: true,
    },
  ],
};

export default ContactDetails;
