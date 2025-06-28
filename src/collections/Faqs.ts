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
        { label: 'Pre-Departure Assistance', value: 'pre-departure' },
        { label: 'Visa Guidance', value: 'visa' },
        { label: 'Loan Assistance', value: 'loan' },
        { label: 'Career Counseling', value: 'career' },
      ],
    },
  ],
}
