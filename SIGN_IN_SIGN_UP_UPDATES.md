# HRMS - Sign In & Sign Up Updates

## 🎉 New Features Implemented

### 1. **Automatic Login ID Generation**
The system now automatically generates unique Login IDs for users based on the following format:

**Format:** `[CP][JODO][YEAR][SERIAL]`

- **CP** - First two letters of Company Name (e.g., "OI" for "Odoo India")
- **JODO** - First two letters of First Name + First two letters of Last Name (e.g., "JODO" for "John Doe")
- **YEAR** - Year of Joining (e.g., "2026")
- **SERIAL** - 4-digit serial number for that year (e.g., "0001")

**Example:** `OIJODO20260001`

### 2. **Auto-Generated Passwords**
- Passwords are automatically generated during registration
- Each password contains:
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Special characters
- Default length: 12 characters
- Users can change their password after first login

### 3. **Company Information**
- Company Name field added to registration
- Company Logo upload functionality
- Logo preview during registration

### 4. **Enhanced UI Design**

#### Sign In Page:
- Modern gradient logo placeholder
- Login ID/Email field (accepts both)
- Password field with show/hide toggle
- Gradient sign-in button (purple to pink)
- Clean, minimalist design

#### Sign Up Page:
- Modern gradient logo placeholder (orange to red)
- Company Name with logo upload button
- Full Name field
- Email field
- Phone field
- Password field with show/hide toggle
- Confirm Password field with show/hide toggle
- All fields properly labeled with ":-" suffix
- Gradient sign-up button

### 5. **Email Notifications**
New users receive an email containing:
- Welcome message
- Login ID
- Temporary password
- Link to login page

## 📋 Database Schema Updates

### User Model Changes:
```prisma
model User {
  loginId       String?   @unique  // Auto-generated login ID
  companyName   String?             // Company name
  companyLogo   String?             // Company logo (base64 or URL)
  phone         String?             // Phone number
}
```

## 🚀 Setup Instructions

### 1. Database Setup
First, ensure PostgreSQL is installed and running, then:

```bash
# Copy environment variables
cp .env.example .env

# Update .env with your database credentials
# DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Run migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Access the Application
- Open [http://localhost:3000](http://localhost:3000)
- Navigate to Sign Up page
- Register your company (first user becomes Admin)

## 🔐 Authentication Flow

### Registration:
1. User fills in company details and personal information
2. System generates unique Login ID
3. System generates secure password
4. User receives email with credentials
5. User is redirected to login page

### Login:
1. User can login with either:
   - Auto-generated Login ID, OR
   - Email address
2. Enter password (initially the auto-generated one)
3. System authenticates and redirects to appropriate dashboard based on role

## 📝 Important Notes

### Login ID Generation Logic:
- Located in: `lib/utils.ts`
- Function: `generateLoginId()`
- Automatically called during registration

### Password Generation Logic:
- Located in: `lib/utils.ts`
- Function: `generatePassword()`
- Creates secure 12-character passwords
- Users can change password using "Turbobooster" feature (to be implemented in profile settings)

### For Normal Users:
- Normal users (employees) cannot self-register
- HR officers or Admin must create employee accounts
- When creating employees, the same login ID format is used
- Each employee gets an auto-generated password sent via email

## 🎨 UI Components Used

- **Form Components:** React Hook Form + Zod validation
- **UI Library:** shadcn/ui components
- **Icons:** Lucide React (Eye, EyeOff, Upload, Loader2)
- **Styling:** Tailwind CSS with gradient backgrounds

## 📦 New Dependencies

All dependencies are already included in package.json:
- `react-hook-form` - Form management
- `zod` - Schema validation
- `lucide-react` - Icons
- `@hookform/resolvers` - Form validation integration

## 🔄 Migration Commands

```bash
# Create a new migration
npx prisma migrate dev --name your_migration_name

# Reset database (caution: deletes all data)
npx prisma migrate reset

# Generate Prisma Client after schema changes
npx prisma generate
```

## 🎯 Next Steps

1. **Database Setup**: Configure your PostgreSQL database and update `.env`
2. **Run Migrations**: Execute `npx prisma migrate dev`
3. **Test Registration**: Try creating a new company account
4. **Verify Email**: Check if email with credentials is sent (configure email settings)
5. **Test Login**: Login with generated Login ID and password

## 🐛 Troubleshooting

### Migration Errors:
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists

### Email Not Sending:
- Update email configuration in `.env`
- For Gmail, use App Password (not regular password)
- Enable "Less secure app access" if needed

### Login Issues:
- Ensure you're using the correct Login ID or Email
- Check that password matches the auto-generated one
- Verify user exists in database

## 📧 Support

For issues or questions about the implementation, please refer to:
- Prisma Documentation: https://www.prisma.io/docs
- Next.js Documentation: https://nextjs.org/docs
- shadcn/ui Documentation: https://ui.shadcn.com

---

**Last Updated:** January 3, 2026
