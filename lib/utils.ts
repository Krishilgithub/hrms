import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a unique Login ID based on the format:
 * [CP (First two letters of company name)][JODO (First four letters of employee's first and last name)][2022 (Year of joining)][0001 (Serial number)]
 * Example: OIJODO20220001
 */
export function generateLoginId(
  companyName: string,
  employeeName: string,
  joiningYear: number,
  serialNumber: number
): string {
  // Get first two letters of company name (uppercase)
  const companyCode = companyName
    .replace(/[^a-zA-Z]/g, '') // Remove non-alphabetic characters
    .substring(0, 2)
    .toUpperCase()
    .padEnd(2, 'X') // Pad with X if less than 2 letters

  // Split name into parts and get first 2 letters of first and last name
  const nameParts = employeeName.trim().split(/\s+/)
  const firstName = nameParts[0] || ''
  const lastName = nameParts[nameParts.length - 1] || ''
  
  // Get first 2 letters from first name and first 2 from last name
  const firstPart = firstName.substring(0, 2).toUpperCase().padEnd(2, 'X')
  const lastPart = lastName.substring(0, 2).toUpperCase().padEnd(2, 'X')
  const nameCode = firstPart + lastPart

  // Format serial number to 4 digits
  const serialCode = serialNumber.toString().padStart(4, '0')

  return `${companyCode}${nameCode}${joiningYear}${serialCode}`
}

/**
 * Generates a random password for the user
 * Password contains uppercase, lowercase, numbers and special characters
 */
export function generatePassword(length: number = 12): string {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const numberChars = '0123456789'
  const specialChars = '!@#$%^&*'
  
  const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars
  
  let password = ''
  
  // Ensure at least one of each type
  password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]
  password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]
  password += numberChars[Math.floor(Math.random() * numberChars.length)]
  password += specialChars[Math.floor(Math.random() * specialChars.length)]
  
  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('')
}
