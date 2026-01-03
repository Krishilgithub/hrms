import { db } from "@/lib/db"

/**
 * Generate Employee ID in format: {CompanyInitials}{NameInitials}{Year}{Serial}
 * Example: OI2D20230001
 * - OI = Company initials (Odoo India)
 * - 2D = First 2 letters of first name + first letter of last name
 * - 2023 = Year of joining
 * - 0001 = Serial number
 */
export async function generateEmployeeId(
  companyName: string,
  employeeName: string,
  year?: number
): Promise<string> {
  // Get company initials (first letter of each word, max 2)
  const companyWords = companyName.trim().split(' ').filter(w => w.length > 0)
  const companyInitials = companyWords
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join('')
  
  // Get name initials (first 2 letters of first name + first letter of last name)
  const nameWords = employeeName.trim().split(' ').filter(w => w.length > 0)
  const firstName = nameWords[0] || ''
  const lastName = nameWords[nameWords.length - 1] || ''
  
  const firstNamePart = firstName.substring(0, 2).toUpperCase()
  const lastNamePart = lastName.substring(0, 1).toUpperCase()
  const nameInitials = firstNamePart + lastNamePart
  
  // Get year
  const joiningYear = year || new Date().getFullYear()
  
  // Get serial number (count existing employees for this year)
  const prefix = `${companyInitials}${nameInitials}${joiningYear}`
  
  const existingEmployees = await db.employeeProfile.count({
    where: {
      employeeId: {
        startsWith: prefix
      }
    }
  })
  
  const serialNumber = String(existingEmployees + 1).padStart(4, '0')
  
  return `${prefix}${serialNumber}`
}

/**
 * Generate a random secure password
 * Format: 8-12 characters with uppercase, lowercase, numbers, and special chars
 */
export function generatePassword(length: number = 10): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const special = '@#$%&*'
  
  const allChars = uppercase + lowercase + numbers + special
  
  let password = ''
  
  // Ensure at least one of each type
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += special[Math.floor(Math.random() * special.length)]
  
  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('')
}
