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
      name: 'videoImage',
      label: 'Video Thumbnail',
      type: 'upload',
      relationTo: 'media', // You must enable a media collection
    },
    {
      name: 'videoLink',
      label: 'Video URL',
      type: 'text',
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
          name: 'customIcon',
          type: 'text', // for now use URL; can later support custom icon logic
        },
      ],
    },
  ],
}

export default FooterContent
