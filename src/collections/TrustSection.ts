// collections/studentTrustSection.ts
import { CollectionConfig } from "payload";

const StudentTrustSection: CollectionConfig = {
  slug: "studentTrustSection",
  access: { read: () => true },
  fields: [
    {
      name: "studentCount",
      type: "number",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "features",
      type: "array",
      required: true,
      fields: [
        {
          name: "text",
          type: "text",
        },
      ],
    },
    {
      name: "satisfactionPercent",
      type: "number",
      required: true,
    },
    {
      name: "advisorText",
      type: "text",
      required: true,
    },
    {
      name: "imageTopRight",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "imageBottomLeft",
      type: "upload",
      relationTo: "media",
    },
  ],
};

export default StudentTrustSection;
