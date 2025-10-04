import { GlobalConfig } from 'payload'

export const SEO: GlobalConfig = {
  slug: 'seo',
  label: 'SEO Settings',
  access: {
    read: () => true, // public
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
      required: true,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
      required: true,
    },
    {
      name: 'canonicalUrl',
      type: 'text',
      label: 'Canonical URL',
    },
    {
      name: 'ogTitle',
      type: 'text',
      label: 'Open Graph Title',
    },
    {
      name: 'ogDescription',
      type: 'textarea',
      label: 'Open Graph Description',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Open Graph Image (upload)',
    },
    {
      name: 'ogImageUrl',
      type: 'text',
      label: 'Open Graph Image (external URL)',
    },
    {
      name: 'ogUrl',
      type: 'text',
      label: 'Open Graph URL',
    },
    {
      name: 'twitterCard',
      type: 'text',
      label: 'Twitter Card Type',
    },
  ],
}
