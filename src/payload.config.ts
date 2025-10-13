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
// import { GetInTouch } from './collections/GetInTouch'
import FooterContent from './collections/Footer'
// import Newsletters from './collections/Newsletters'
import Testimonial from './collections/Testimonial'
import HomepageSections from './collections/Homepage'
import ContactDetails from './collections/ContactDetails'
import StudentTrustSection from './collections/TrustSection'
import WhyRemitoutCTA from './collections/WhyRemitoutCTA' 
import dotenv from 'dotenv'
import { s3Storage } from '@payloadcms/storage-s3'
import { SEO } from './collections/Seo'


dotenv.config()


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

console.log('🧩 AWS S3 ENV CHECK')
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID)
console.log(
  'AWS_SECRET_ACCESS_KEY:',
  process.env.AWS_SECRET_ACCESS_KEY ? '✅ Loaded' : '❌ Missing',
)
console.log('AWS_REGION:', process.env.AWS_REGION)
console.log('S3_BUCKET_NAME:', process.env.AWS_S3_BUCKET)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    {
      ...HomepageSections,
      admin: {
        group: 'Home',
      },
    },
    {
      ...WhyRemitout,
      admin: {
        group: 'Home',
      },
    },
    {
      ...WhyRemitoutCTA, // <-- add your new CTA collection here
      admin: {
        group: 'Home',
      },
    },
    {
      ...StudentTrustSection,
      admin: {
        group: 'Home',
      },
    },
    {
      ...Services,
      admin: {
        group: 'Home',
      },
    },
    {
      ...Testimonial,
      admin: {
        group: 'Home',
      },
    },
    {
      ...Faqs,
      admin: {
        group: 'Home',
      },
    },

    // --- other groups ---
    {
      ...FooterContent,
      admin: {
        group: 'Site Settings',
      },
    },
    {
      ...ContactDetails,
      admin: {
        group: 'Site Settings',
      },
    },
    {
      ...Users,
      admin: {
        group: 'Authentication',
      },
    },
    {
      ...Enquiries,
      admin: {
        group: 'Leads & Contacts',
      },
    },
    {
      ...Media,
      admin: {
        group: 'Assets',
      },
    },
    // {
    //   ...GetInTouch,
    //   admin: {
    //     group: 'Leads & Contacts',
    //   },
    // },
    // {
    //   ...Newsletters,
    //   admin: {
    //     group: 'Marketing',
    //   },
    // },
  ],
  globals: [
    SEO, // <-- added SEO global
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
    s3Storage({
      collections: {
        media: true, // Enable S3 storage for the 'media' collection
      },
      bucket: process.env.AWS_S3_BUCKET!, // Your S3 bucket name
      config: {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
        region: process.env.AWS_REGION,
      },
    }),
  ],
  cors: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5000',
    'http://66.116.196.83:3000',
    'http://loan.remitout.com',
    'https://remitout-landing.vercel.app',
    'https://totheweb.com',
  ],
})
