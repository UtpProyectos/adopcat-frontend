export interface User {
  userId: string
  firstName: string
  lastName: string
  email: string
  role: string
  profilePhoto?: string
  verified: boolean
}

export interface UserProfile {
  firstName: string
  lastName: string
  dni: string
  phoneNumber: string
  address: string
  dniUrl: string
  emailVerified: boolean
  phoneVerified: boolean
  adminApproved: boolean
}
