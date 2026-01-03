# Quick Start Guide - New Sign In & Sign Up System

## 🎉 What's New?

Your HRMS now has a completely redesigned authentication system with:
- **Auto-generated Login IDs** (format: OIJODO20260001)
- **Auto-generated secure passwords**
- **Company branding** (logo upload)
- **Modern UI** with gradient designs
- **Password visibility toggles**
- **Email notifications** with credentials

## ⚡ Quick Setup (3 Steps)

### Step 1: Configure Database
Edit `.env` file with your PostgreSQL credentials:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/hrms_db?schema=public"
```

### Step 2: Run Migration
```bash
npx prisma migrate dev
```

### Step 3: Start Development Server
```bash
npm run dev
```

## 🚀 Usage

### For Company Registration (First Time):
1. Go to `http://localhost:3000/register`
2. Fill in:
   - Company Name
   - Your Full Name
   - Email
   - Phone
   - Password
   - Confirm Password
3. Optionally upload company logo
4. Click "Sign Up"
5. Check your email for Login ID and password
6. Go to login page

### For Login:
1. Go to `http://localhost:3000/login`
2. Enter your **Login ID** (e.g., OIJODO20260001) or **Email**
3. Enter your password
4. Click "SIGN IN"

## 📋 Example Credentials After Registration

After registering, you'll receive:

**Email Subject:** Welcome to HRMS - Your Account Details

**Email Content:**
```
Hi John Doe,

Welcome to HRMS! Your account has been successfully created.

Your Login Credentials:
Login ID: OIJODO20260001
Temporary Password: aB3$xYz9Qw2@

Note: Please save these credentials securely.

[Login Now]
```

## 🔐 Login ID Format Explained

**Example:** `OIJODO20260001`

| Part | Meaning | Example |
|------|---------|---------|
| OI | First 2 letters of Company Name | **O**doo **I**ndia |
| JO | First 2 letters of First Name | **JO**hn |
| DO | First 2 letters of Last Name | **DO**e |
| 2026 | Year of Joining | 2026 |
| 0001 | Serial Number | 1st employee that year |

## 🎨 UI Preview

### Sign In Page
- Purple/Pink gradient theme
- Clean input fields
- Password visibility toggle
- "Don't have an Account? Sign Up" link

### Sign Up Page
- Orange/Red gradient theme
- Company logo upload
- All personal details
- Password confirmation
- "Already have an account? Sign In" link

## 📧 Email Configuration (Optional)

To enable email notifications, update `.env`:

```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="HRMS System <noreply@hrms.com>"
```

**For Gmail:**
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use App Password in `.env`

## 🔧 Troubleshooting

### Database Connection Error
```
Error: Authentication failed against database server
```
**Solution:** Check `DATABASE_URL` in `.env` and ensure PostgreSQL is running

### Migration Error
```
Error: Environment variable not found: DATABASE_URL
```
**Solution:** Create `.env` file with `DATABASE_URL` (copy from `.env.example`)

### Email Not Sending
```
No emails received after registration
```
**Solution:** Configure email settings in `.env` or check spam folder

### Login Not Working
```
Invalid credentials error
```
**Solution:** 
- Use the exact Login ID from email
- Or use your email address
- Verify password is correct

## 📚 Documentation

For detailed information, see:
- `IMPLEMENTATION_SUMMARY.md` - Complete implementation details
- `SIGN_IN_SIGN_UP_UPDATES.md` - Feature documentation

## 🎯 Next Steps

After successful setup:

1. ✅ Test registration with company details
2. ✅ Check email for Login ID
3. ✅ Test login with Login ID
4. ✅ Test login with Email
5. ✅ Create employee accounts (HR/Admin dashboard)
6. ✅ Implement "Turbobooster" password change feature

## 💡 Tips

- **For Testing:** Use a local email testing tool like Mailhog
- **For Production:** Use a professional email service (SendGrid, AWS SES)
- **Logo Upload:** Supports all common image formats (PNG, JPG, SVG)
- **Password Change:** Coming soon in profile settings

## 🆘 Need Help?

Common commands:
```bash
# Reset database (deletes all data)
npx prisma migrate reset

# View database in browser
npx prisma studio

# Generate Prisma Client
npx prisma generate

# Check for errors
npm run build
```

---

**Ready to go!** 🚀 Start by running `npm run dev` and navigate to `/register`
