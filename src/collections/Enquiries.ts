import { CollectionConfig } from 'payload'

const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'fullName',
  },
  access: {
    create: () => true, // ✅ This allows public form submissions
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phoneCountryCode',
      type: 'text',
      label: 'Country Code',
      required: true,
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Phone Number',
      required: true,
    },
    {
      name: 'serviceInterestedIn',
      type: 'select',
      required: true,
      options: [
        { label: 'Consultation', value: 'consultation' },
        { label: 'Money Transfer', value: 'money-transfer' },
        { label: 'Business Services', value: 'business-services' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    // Note: We are NOT storing acceptedTerms
  ],
}

export default Enquiries
