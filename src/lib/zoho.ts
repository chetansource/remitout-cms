import fetch from 'node-fetch'

interface EnquiryData {
  fullName?: string
  email?: string
  phoneCountryCode?: string
  phoneNumber?: string
  message?: string
}

export async function getZohoAccessToken() {
  const res = await fetch(`${process.env.ZOHO_AUTH_DOMAIN}/oauth/v2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      grant_type: 'refresh_token',
    }),
  })

 if (!res.ok) {
   const errorText = await res.text() // consume once
   throw new Error(`Failed to fetch Zoho token: ${errorText}`)
 }

 const data = (await res.json()) as {
   access_token: string
   refresh_token?: string
   expires_in: number
   api_domain: string
 }
  return data
}

export async function createZohoContact(accessToken: string, enquiry: EnquiryData) {
  const body = {
    data: [
      {
        Last_Name: enquiry.fullName || 'Unknown',
        Email: enquiry.email,
        Mobile: `${enquiry.phoneCountryCode}${enquiry.phoneNumber}`,
        Description: enquiry.message,
        Lead_Source: 'Website Contact',
      },
    ],
  }

  const res = await fetch(`${process.env.ZOHO_API_DOMAIN}/bigin/v2/Contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(`Zoho create contact error: ${JSON.stringify(data)}`)
  }

  return data
}
