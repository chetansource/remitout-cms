// payload.config.ts or services.ts inside collections
import { CollectionConfig } from "payload";

const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
        },
      ],
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      hasMany: false,
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'Contact to Know more',
    },
    {
      name: 'buttonLink', 
      type: 'text', 
      label: 'Button Link',
      defaultValue: '/contact-us', 
    },
  ],
}

export default Services;
