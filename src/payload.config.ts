// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Enquiries from './collections/Enquiries'
import { Faqs } from './collections/Faqs'
import Services from './collections/Services'
import WhyRemitout from './collections/WhyRemitout'
import { GetInTouch } from './collections/GetInTouch'
import FooterContent from './collections/Footer'
import Newsletters from './collections/Newsletters'
import Testimonial from './collections/Testimonial'
import HomepageSections from './collections/Homepage'
import ContactDetails from './collections/ContactDetails'
import StudentTrustSection from './collections/TrustSection'
import dotenv from 'dotenv'
dotenv.config()


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Enquiries,
    Faqs,
    Services,
    WhyRemitout,
    GetInTouch,
    FooterContent,
    Newsletters,
    Testimonial,
    HomepageSections,
    ContactDetails,
    StudentTrustSection,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  cors: ['http://localhost:3000' ,'https://remitout-landing.vercel.app'],
})
