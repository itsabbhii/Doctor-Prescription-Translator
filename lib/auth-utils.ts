// JWT and password utility functions
const SECRET_KEY = process.env.JWT_SECRET || "secret key for demo"

export function hashPassword(password: string): string {
  // Simple hash for demo - use bcrypt in production
  return Buffer.from(password).toString("base64")
}

export function verifyPassword(password: string, hash: string): boolean {
  return Buffer.from(password).toString("base64") === hash
}

export function generateJWT(patient_id: string): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const payload = btoa(
    JSON.stringify({
      patient_id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
    }),
  )
  const signature = btoa(SECRET_KEY) // Simplified - use HMAC in production
  return `${header}.${payload}.${signature}`
}

export function validateJWT(token: string): { patient_id: string } | null {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null

    const payload = JSON.parse(atob(parts[1]))
    if (payload.exp < Math.floor(Date.now() / 1000)) return null

    return { patient_id: payload.patient_id }
  } catch {
    return null
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters" }
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain lowercase letters" }
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain uppercase letters" }
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain numbers" }
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return { valid: false, message: "Password must contain special characters (!@#$%^&*)" }
  }
  return { valid: true }
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[\d\s\-+$$$$]{10,}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}
