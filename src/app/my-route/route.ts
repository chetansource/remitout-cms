import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })

  console.log(request.url) // using request
  console.log(payload.config) // using payload

  return Response.json({
    message: 'This is an example of a custom route.',
  })
}
