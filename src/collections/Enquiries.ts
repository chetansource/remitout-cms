import { CollectionConfig } from 'payload'
import {Resend} from 'resend'
import dotenv from 'dotenv'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

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
  hooks: {
    afterChange: [
      async ({ operation, doc }) => {
        if (operation === 'create') {
          try {
            const response = await resend.emails.send({
              from: 'remitout@resend.dev', // Use a verified domain in production
              to: process.env.MANAGER_EMAIL!,
              subject: `New enquiry from ${doc.fullName}`,
              html: `
                <h2>New Enquiry Received</h2>
                <p><strong>Name:</strong> ${doc.fullName}</p>
                <p><strong>Email:</strong> ${doc.email}</p>
                <p><strong>Phone:</strong> ${doc.phoneCountryCode} ${doc.phoneNumber}</p>
                <p><strong>Service Interested In:</strong> ${doc.serviceInterestedIn}</p>
                <p><strong>Message:</strong> ${doc.message}</p>
              `,
            })

            console.log('📧 Resend email sent:', response)
          } catch (error) {
            console.error('❌ Error sending Resend email:', error)
          }
        }
      },
    ],
  },
}

export default Enquiries
