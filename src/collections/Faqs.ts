import type { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'ADMISSION SUPPORT', value: 'admission-support' },
        { label: 'LOAN ASSISTANCE', value: 'loan-assistance' },
        { label: 'VISA ASSISTANCE', value: 'visa-assistance' },
        { label: 'MONEY TRANSFER', value: 'money-transfer' },
      ],
    },
  ],
}
