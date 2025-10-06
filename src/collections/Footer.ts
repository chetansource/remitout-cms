// src/collections/FooterContent.ts
import { CollectionConfig } from 'payload'

const FooterContent: CollectionConfig = {
  slug: 'footer-content',
  admin: {
    useAsTitle: 'officeAddress',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'officeAddress',
      label: 'Office Address',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
      required: true,
    },
    {
      name: 'image', // changed from videoImage
      label: 'Thumbnail Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          required: true,
        },
        {
          name: 'instagram',
          type: 'text',
          required: true,
        },
        {
          name: 'additionalLinks',
          label: 'Additional Social Links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: { description: 'Name of the social media, e.g., LinkedIn' },
            },
            {
              name: 'icon',
              label: 'Icon',
              type: 'relationship',
              relationTo: 'media',
              required: true,
              hasMany: false,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
              admin: { description: 'Link to your social profile' },
            },
          ],
        },
      ],
    },
  ],
}

export default FooterContent
