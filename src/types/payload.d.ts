// src/types/payload.d.ts
import type { PayloadRequest as _PayloadRequest } from 'payload'

declare module 'payload/types' {
  interface PayloadRequest {
    user?: {
      id: string
      email: string
      role: 'admin' | 'user'
      collection: 'users'
      name?: string
    }
  }
}
