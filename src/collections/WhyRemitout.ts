// payload.config.ts
import { CollectionConfig } from 'payload'

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
      type: 'upload',
      relationTo: 'media', // Make sure 'media' collection is define
    },
  ],
}

export default WhyRemitout
