// payload.config.ts
import { CollectionConfig } from 'payload'
import sharp from 'sharp'

const WhyRemitout: CollectionConfig = {
  slug: 'why-remitout',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'iconType',
      type: 'select',
      options: ['Award', 'PersonStar'],
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Make sure 'media' collection is define
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if ((operation === 'create' || operation === 'update') && data.image) {
          const file = await req.payload.findByID({
            collection: 'media',
            id: data.image,
          })

          if (file?.url) {
            // If file.url is relative, prepend your server URL
            const baseUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://localhost:3000`
            const imageUrl = file.url.startsWith('http') ? file.url : `${baseUrl}${file.url}`

            const imageBuffer = await fetch(imageUrl).then((res) => res.arrayBuffer())
            const metadata = await sharp(Buffer.from(imageBuffer)).metadata()

            if (metadata.width !== 984 || metadata.height !== 1209) {
              throw new Error('Image must be exactly 984x1209 pixels.')
            }
          }
        }
      },
    ],
  },
}

export default WhyRemitout
