// collections/homepageSections.ts
import { CollectionConfig } from "payload";

const HomepageSections: CollectionConfig = {
  slug: 'homepageSections',
  admin: {
    useAsTitle: 'title', // optional, for easier admin view
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
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'highlight',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'ctaText',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'testimonial',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'textarea',
            },
            {
              name: 'author',
              type: 'text',
            },
            {
              name: 'rating',
              type: 'number',
              min: 0,
              max: 5,
            },
            {
              name: 'avatar',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'iconType',
          type: 'select',
          options: [
            {
              label: 'Book',
              value: 'book',
            },
            {
              label: 'Flight',
              value: 'flight',
            },
            {
              label: 'Pig Money',
              value: 'pigMoney',
            },
            {
              label: 'Visa Assistance',
              value: 'visaAssistance', 
            },
          ],
        },
      ],
    },
  ],
}

export default HomepageSections;
