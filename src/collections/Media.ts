import type { CollectionConfig } from 'payload'
import { getS3Url } from '../utils/s3Url'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      // ... other sizes
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'url', // store the full S3 URL
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
}
