// src/collections/Newsletters.ts
import { CollectionConfig } from 'payload'

const Newsletters: CollectionConfig = {
  slug: 'newsletters',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true, // make it private
    create: () => true,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
  ],
}

export default Newsletters
