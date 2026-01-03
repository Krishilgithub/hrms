
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // 1. Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@dayflow.com' },
    update: {},
    create: {
      email: 'admin@dayflow.com',
      name: 'System Admin',
      password: 'admin', // In production, hash this!
      role: 'ADMIN',
    },
  })
  console.log({ admin })

  // 2. Create HR
  const hr = await prisma.user.upsert({
    where: { email: 'hr@dayflow.com' },
    update: {},
    create: {
      email: 'hr@dayflow.com',
      name: 'Sarah HR',
      password: 'hr',
      role: 'HR',
      employeeProfile: {
        create: {
            employeeId: 'HR-001',
            department: 'Human Resources',
            position: 'HR Manager',
            joiningDate: new Date(),
        }
      }
    },
  })
  console.log({ hr })

  // 3. Create Employee
  const employee = await prisma.user.upsert({
    where: { email: 'employee@dayflow.com' },
    update: {},
    create: {
      email: 'employee@dayflow.com',
      name: 'John Doe',
      password: 'employee',
      role: 'EMPLOYEE',
      employeeProfile: {
          create: {
              employeeId: 'EMP-001',
              department: 'Engineering',
              position: 'Software Engineer',
              joiningDate: new Date(),
          }
      }
    },
  })
   console.log({ employee })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
