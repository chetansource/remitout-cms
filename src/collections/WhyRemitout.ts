// payload.config.ts
import { CollectionConfig } from 'payload'
import sharp from 'sharp'

const WhyRemitout: CollectionConfig = {
  slug: 'why-remitout',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'iconType',
      type: 'select',
      options: ['Award', 'PersonStar'],
      required: true,
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      hasMany: false,
    },
    {
      name: 'order',
      type: 'number',
      required: false,
      admin: {
        description: 'Controls the display order of items',
      },
    },
  ],
}

export default WhyRemitout
