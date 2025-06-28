import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: ({ req }) => {
      // Admin can see all, others only themselves
      if (req.user?.role === 'admin') return true
      return {
        id: { equals: req.user?.id },
      }
    },
    update: ({ req }) => {
      if (req.user?.role === 'admin') return true
      return {
        id: { equals: req.user?.id },
      }
    },
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      defaultValue: 'user',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
