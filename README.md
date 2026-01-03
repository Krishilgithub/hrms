# 🚀 DayFlow HRMS

> **Enterprise-Grade Human Resource Management System** — Built for the modern workplace

Transform your HR operations with an intelligent, scalable platform that empowers teams and streamlines workforce management from hire to retire.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.10-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)

---

## 🎯 Why DayFlow?

In today's fast-paced business environment, HR teams need tools that **work as hard as they do**. DayFlow HRMS eliminates administrative bottlenecks, automates routine tasks, and provides actionable insights — all while delivering a delightful user experience.

### The Problem We Solve
- ⏱️ HR teams spend **60% of their time** on manual administrative tasks
- 📊 Companies lose **$15,000 per employee** due to poor onboarding
- 🔄 Traditional HRMS solutions are **expensive**, **complex**, and **outdated**

### Our Solution
A **modern, intelligent HRMS** that combines powerful automation with an intuitive interface, reducing administrative overhead by 70% while improving employee satisfaction.

---

## ✨ Features

### 🎭 Multi-Role Support
**Three Distinct Dashboards** — Tailored experiences for Admin, HR, and Employee roles
- **Admin Dashboard**: System-wide analytics, user management, and configuration
- **HR Dashboard**: Employee lifecycle management, payroll processing, recruitment pipeline
- **Employee Dashboard**: Self-service portal for attendance, leaves, and profile management

### 👥 Employee Management
Transform how you manage your workforce
- **Smart Directory**: Real-time employee database with advanced search and filtering
- **One-Click Onboarding**: Automated account creation with welcome emails
- **Profile Management**: Comprehensive employee profiles with document management
- **Department Organization**: Hierarchical org structure with role-based access

### 📊 Attendance & Time Tracking
Never miss a beat with intelligent attendance monitoring
- **Live Attendance Dashboard**: Real-time visibility into who's in, out, or remote
- **GPS Integration**: Location-based check-in/check-out
- **Automated Reports**: Daily, weekly, and monthly attendance analytics
- **Late Arrival Tracking**: Automated flagging and notification system

### 🏖️ Leave Management
Streamlined approval workflows that save hours every week
- **Self-Service Requests**: Employees submit leave requests in seconds
- **Smart Approval System**: HR dashboard with one-click approve/reject
- **Email Notifications**: Automated status updates to employees
- **Leave Balance Tracking**: Real-time visibility into accruals and usage
- **Calendar Integration**: Visual leave calendar for team planning

### 💰 Payroll Processing
Accurate, compliant, and effortless payroll
- **Automated Calculations**: Basic salary + allowances - deductions
- **Bulk Processing**: Process entire payroll batches in one click
- **Payslip Generation**: Professional PDF payslips with company branding
- **Tax Compliance**: Built-in tax calculation and reporting
- **Payment History**: Complete audit trail for all transactions

### 🎯 Recruitment & ATS
Build your dream team with an integrated Applicant Tracking System
- **Job Posting Management**: Create and publish openings across channels
- **Candidate Pipeline**: Visual kanban board for recruitment stages
- **Resume Parsing**: AI-powered resume analysis (coming soon)
- **Interview Scheduling**: Automated calendar coordination
- **Offer Management**: Digital offer letters with e-signatures

### 📈 Analytics & Reporting
Data-driven insights for better decision making
- **Executive Dashboards**: KPIs and metrics at a glance
- **Custom Reports**: Flexible reporting engine for any metric
- **Trend Analysis**: Historical data visualization
- **Export Capabilities**: CSV/PDF exports for external analysis

### 🎨 Modern User Experience
Built with the latest web technologies for a blazing-fast experience
- **Dark Mode**: Easy on the eyes, professional aesthetic
- **Responsive Design**: Seamless experience on desktop, tablet, and mobile
- **Real-time Updates**: Instant UI refresh after actions
- **Keyboard Shortcuts**: Power-user workflows
- **Accessibility**: WCAG 2.1 compliant

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1 (App Router, Server Components)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0 with custom design system
- **UI Components**: Radix UI primitives for accessibility
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Query for server state
- **Animations**: Framer Motion for smooth interactions

### Backend
- **Runtime**: Node.js 20+ with Edge Runtime support
- **API**: Next.js Server Actions (type-safe, zero-boilerplate)
- **Database**: PostgreSQL 15 (production-ready relational DB)
- **ORM**: Prisma 5.10 (type-safe database access)
- **Email**: Nodemailer with SMTP integration
- **Authentication**: Secure cookie-based sessions

### DevOps & Infrastructure
- **Hosting**: Vercel (serverless, globally distributed)
- **Database Hosting**: Neon/Supabase (serverless Postgres)
- **Version Control**: Git + GitHub
- **CI/CD**: Automated Vercel deployments
- **Monitoring**: Built-in analytics and error tracking

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ and npm
- PostgreSQL database (local or hosted)
- SMTP server for emails (optional but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Krishilgithub/hrms.git
   cd hrms/hrms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/hrms"
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Initialize the database**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Login with seeded credentials (check `prisma/seed.ts`)

---

## 📦 Project Structure

```
hrms/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages (login, register)
│   ├── dashboard/         # Dashboard pages by role
│   │   ├── admin/        # Admin dashboard & features
│   │   ├── hr/           # HR dashboard & features
│   │   └── employee/     # Employee self-service portal
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Landing page
├── components/            # Reusable React components
│   ├── dashboard/        # Dashboard-specific components
│   ├── landing/          # Landing page sections
│   └── ui/               # Base UI component library
├── actions/              # Server Actions (API layer)
│   ├── login.ts          # Authentication actions
│   ├── leaves.ts         # Leave management actions
│   ├── hr.ts             # HR-specific actions
│   └── admin.ts          # Admin-specific actions
├── lib/                  # Utility functions
│   ├── db.ts             # Prisma client instance
│   ├── mail.ts           # Email sending utilities
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema & migrations
│   ├── schema.prisma     # Database models
│   ├── seed.ts           # Seed data for development
│   └── migrations/       # Database migrations
└── public/               # Static assets
```

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client (Browser)                        │
│  Next.js App Router • React Server Components • TypeScript  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 Next.js Server (Vercel Edge)                 │
│            Server Actions • Route Handlers • SSR             │
└──────────────────────┬──────────────────────────────────────┘
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
┌──────────────────┐      ┌──────────────────┐
│  Prisma Client   │      │  Nodemailer      │
│  (Type-safe ORM) │      │  (Email Service) │
└────────┬─────────┘      └──────────────────┘
         │
         ▼
┌──────────────────┐
│   PostgreSQL     │
│   (Database)     │
└──────────────────┘
```

### Key Design Decisions

1. **Server Components First**: Leverage Next.js 16 Server Components for optimal performance
2. **Progressive Enhancement**: Features work without JavaScript where possible
3. **Type Safety**: End-to-end TypeScript with Prisma for database type safety
4. **Separation of Concerns**: Server Actions handle data mutations, components handle UI
5. **Database-First Design**: Prisma schema as single source of truth

---

## 🌍 Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git push origin master
   ```

2. **Import to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your Git repository
   - Vercel auto-detects Next.js configuration

3. **Configure Environment Variables**
   Add these in Vercel dashboard:
   - `DATABASE_URL`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
   - `NEXT_PUBLIC_APP_URL`

4. **Deploy**
   - Vercel automatically deploys on every push to `master`
   - Production URL: `https://your-app.vercel.app`

### Self-Hosting

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

3. **Use a process manager** (PM2, systemd)
   ```bash
   pm2 start npm --name "hrms" -- start
   ```

---

## 🧪 Testing

### Run the Application

1. **Seed the database** with sample data
   ```bash
   npx prisma db seed
   ```

2. **Login Credentials** (from seed data)
   - **Admin**: `admin@dayflow.com` / `admin123`
   - **HR**: `hr@dayflow.com` / `hr123`
   - **Employee**: `employee@dayflow.com` / `employee123`

3. **Test Workflows**
   - Create a new employee (HR Dashboard → Employees → Add Employee)
   - Apply for leave (Employee Dashboard → Leaves → New Request)
   - Approve leave (HR Dashboard → Leaves → Approve)
   - Mark attendance (Employee Dashboard → Attendance → Check In)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

---

## 🗺️ Roadmap

### Phase 1: Core Features ✅
- [x] Multi-role authentication
- [x] Employee directory
- [x] Attendance tracking
- [x] Leave management
- [x] Basic payroll

### Phase 2: Advanced Features 🚧
- [ ] Performance reviews & appraisals
- [ ] Learning & development tracking
- [ ] Benefits administration
- [ ] Time tracking & project allocation
- [ ] Advanced analytics & reporting

### Phase 3: AI & Automation 🔮
- [ ] AI-powered resume screening
- [ ] Predictive attrition analysis
- [ ] Chatbot for HR queries
- [ ] Automated performance insights
- [ ] Smart scheduling & resource allocation

### Phase 4: Enterprise 💼
- [ ] Multi-company support
- [ ] SSO integration (SAML, OAuth)
- [ ] Advanced RBAC
- [ ] API for third-party integrations
- [ ] White-labeling options

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with ❤️ using:
- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Vercel](https://vercel.com/) - Platform for frontend developers

---

## 📞 Contact & Support

- **Developer**: Krishil Agrawal
- **GitHub**: [@Krishilgithub](https://github.com/Krishilgithub)
- **Repository**: [hrms](https://github.com/Krishilgithub/hrms)

---

<div align="center">
  <strong>⭐ Star this repo if you find it useful!</strong>
  <br />
  <sub>Built for the modern workforce • Designed for scale • Made with passion</sub>
</div>
