import { CollectionConfig } from 'payload'

const WhyRemitoutCTA: CollectionConfig = {
  slug: 'why-remitout-cta', // sub-collection for WhyRemitout
  admin: {
    useAsTitle: 'title',
    description: 'CTA for Why Remitout section',
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
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
    },
    {
      name: 'buttonLink',
      type: 'text', // URL for CTA button
      required: false,
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: false,
    },
  ],
}

export default WhyRemitoutCTA
