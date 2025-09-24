import { CollectionConfig } from 'payload'
import {Resend} from 'resend'
import dotenv from 'dotenv'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

// -----------------------
// Helper utilities
// -----------------------

/**
 * Clean country code like "91" -> "+91" 
 */
const normalizeCountryCode = (code?: string): string => {
  if (!code) return ''
  const trimmed = code.trim()
  if (/^\+\d+$/.test(trimmed)) return trimmed
  if (/^\d+$/.test(trimmed)) return `+${trimmed}`
  // if user typed something weird, return as-is (validation will fail later)
  return trimmed
}

/**
 * Validate phone number using libphonenumber-js.
 * Expects countryCode like "+91" or "91" or empty (best-effort).
 */
const isValidPhone = (countryCode: string | undefined, numberRaw: string | undefined): boolean => {
  if (!numberRaw) return false
  const cc = normalizeCountryCode(countryCode)
  // strip non-digit except leading +
  const digits = numberRaw.replace(/[^\d]/g, '')
  const candidate = cc ? `${cc}${digits}` : `+${digits}`
  try {
    const parsed = parsePhoneNumberFromString(candidate)
    return !!(parsed && parsed.isValid())
  } catch (err) {
    return false
  }
}


/**
 * Normalize a Gmail address:
 * - lowercase domain
 * - for gmail/googlemail: remove dots in local part and strip +tag
 * returns { isGmail, normalized }
 */
const normalizeEmailForGmail = (email: string) => {
  const [localRaw = '', domainRaw = ''] = email.split('@')
  const domain = domainRaw.toLowerCase()
  if (domain !== 'gmail.com' && domain !== 'googlemail.com') {
    return { isGmail: false, normalized: email.toLowerCase() }
  }
  // Remove +tag and dots
  const plusIndex = localRaw.indexOf('+')
  const base = plusIndex >= 0 ? localRaw.slice(0, plusIndex) : localRaw
  const normalizedLocal = base.replace(/\./g, '').toLowerCase()
  return { isGmail: true, normalized: `${normalizedLocal}@gmail.com`, normalizedLocal }
}


/**
 * Generate all dot-variants for a Gmail local-part (no plus, no dots).
 * Example: for 'abc' -> ['abc','a.bc','ab.c','a.b.c']
 * Number of variants = 2^(n-1). We cap generation to avoid explosion.
 */
const generateDotVariants = (localPart: string, cap = 1024): string[] => {
  const n = localPart.length
  if (n <= 1) return [localPart]
  const total = 1 << (n - 1) // 2^(n-1)
  if (total > cap) {
    // too many to generate safely
    throw new Error(`too_many_variants:${total}`)
  }
  const out: string[] = []
  for (let mask = 0; mask < total; mask++) {
    let s = localPart[0]
    for (let i = 0; i < n - 1; i++) {
      // if bit i is 1 -> insert dot before char i+1
      if ((mask >> i) & 1) s += '.'
      s += localPart[i + 1]
    }
    out.push(s)
  }
  return out
}


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
      // extra validation for Gmail behaviour
      validate: (value: unknown) => {
        const email = String(value || '').trim()
        if (!email) return 'Email is required'
        // basic email type already ensures format in Payload, but add Gmail normalization check
        const { isGmail } = normalizeEmailForGmail(email)
        if (isGmail === true) {
          // OK — no error; we just normalize/handle in the hook below
          return true
        }
        return true
      },
    },
    {
      name: 'phoneCountryCode',
      type: 'text',
      label: 'Country Code',
      required: true,
      validate: (value: unknown) => {
        const cc = String(value || '').trim()
        if (!cc) return 'Country code is required (e.g. +91 or 91)'
        if (!/^\+?\d{1,4}$/.test(cc)) {
          return 'Country code must be 1–4 digits, optionally prefixed with + (e.g. +1 or 91)'
        }
        return true
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Phone Number',
      required: true,
      validate: (value: unknown, { siblingData }: any) => {
        const num = String(value || '').trim()
        const cc = siblingData?.phoneCountryCode
        if (!num) return 'Phone number is required'
        if (!/^[\d\s\-().]{4,20}$/.test(num)) {
          // loose pre-check: digits and common separators only
          return 'Phone number contains invalid characters'
        }
        if (!isValidPhone(cc, num)) {
          return 'Phone number is not valid for the provided country code'
        }
        return true
      },
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
        if (operation !== 'create') return

        // Safe extraction with fallbacks
        const fullName = doc.fullName || '—'
        const email = String(doc.email || '').trim()
        const phoneCountryCode = String(doc.phoneCountryCode || '')
        const phoneNumber = String(doc.phoneNumber || '')
        const service = doc.serviceInterestedIn || '—'
        const message = doc.message || '—'

        // Gmail normalization + variant generation (for reporting / dedupe insight)
        const gmailInfo = normalizeEmailForGmail(email)
        let gmailVariantsNote = ''
        if (gmailInfo.isGmail) {
          const baseLocal = gmailInfo.normalizedLocal || ''
          // total possibilities with dots = 2^(n-1)
          const totalVariants = baseLocal.length > 0 ? 1 << (baseLocal.length - 1) : 1
          const cap = 1024 // safe cap
          if (totalVariants > cap) {
            gmailVariantsNote = `<p><strong>Gmail canonical:</strong> ${gmailInfo.normalized} (there are ${totalVariants} dot-variants; suppressed listing because it's large)</p>`
          } else {
            // we can safely generate and show them (for small local-parts)
            try {
              const variants = generateDotVariants(baseLocal, cap).map((v) => `${v}@gmail.com`)
              gmailVariantsNote = `<p><strong>Gmail canonical:</strong> ${gmailInfo.normalized}</p>
                <p><strong>Total dot-variants:</strong> ${variants.length}</p>
                <p><strong>Variants (all):</strong><br/>${variants.join('<br/>')}</p>`
            } catch (err) {
              gmailVariantsNote = `<p><strong>Gmail canonical:</strong> ${gmailInfo.normalized} (variants generation skipped)</p>`
            }
          }
        }

        // Build HTML for manager email
        const html = `
          <h2>New Enquiry Received</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phoneCountryCode} ${phoneNumber}</p>
          <p><strong>Service Interested In:</strong> ${service}</p>
          <p><strong>Message:</strong> ${message}</p>
          ${gmailVariantsNote}
        `

        try {
          const response = await resend.emails.send({
            from: 'Support@remitout.com', // Use a verified domain in production
            to: process.env.MANAGER_EMAIL!,
            subject: `New enquiry from ${fullName}`,
            html,
          })

          console.log('📧 Resend email sent:', response)
        } catch (error) {
          console.error('❌ Error sending Resend email:', error)
        }
      },
    ],
  },
}

export default Enquiries
