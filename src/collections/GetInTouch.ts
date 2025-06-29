// src/collections/GetInTouch.ts

import type { CollectionConfig } from 'payload'

export const GetInTouch: CollectionConfig = {
  slug: 'get-in-touch',
  labels: {
    singular: 'Get In Touch',
    plural: 'Get In Touch',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'acceptTerms',
      type: 'checkbox',
      required: true,
      label: 'Accepted Terms',
    },
  ],
}
