# MS Solutions - Healthcare Technology Solutions

A modern web application for a healthcare technology solutions provider, built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL.

![MS Solutions](public/images/hero.png)

## 🚀 Overview

MS Solutions is a comprehensive platform offering innovative healthcare technology solutions designed to improve patient care, streamline clinical workflows, and optimize medical practice operations. The application showcases the company's services, portfolio, and provides a blog platform and contact system.

## ✨ Features

- **Modern UI/UX**: Built with Next.js 15 and Tailwind CSS for a responsive, beautiful interface

  - Responsive design with mobile-first approach
  - Dark/light mode support with next-themes
  - Smooth animations with Framer Motion
  - Accessible components with Radix UI

- **Authentication**: Secure user authentication system for admin access

  - Role-based access control
  - JWT authentication with refresh tokens
  - Secure password hashing
  - Protected routes with middleware

- **Blog Platform**: Content management system for healthcare-related articles

  - Rich text editor with TipTap
  - Image uploads and management
  - Categories and tags for organization
  - SEO optimization for blog posts

- **Contact Form**: Interactive form for potential clients to reach out

  - Form validation with React Hook Form and Zod
  - Email notifications
  - CAPTCHA protection
  - Success/error handling

- **Admin Dashboard**: Secure admin area for content management

  - Blog post management (create, edit, delete)
  - User management
  - Analytics dashboard
  - Media library

- **Database Integration**: PostgreSQL with Drizzle ORM for data management

  - Type-safe database queries
  - Migration system
  - Relational data modeling
  - Connection pooling

- **Responsive Design**: Optimized for all device sizes
  - Mobile, tablet, and desktop layouts
  - Adaptive components
  - Performance optimized for all devices

## 🛠️ Technology Stack

- **Frontend**:

  - Next.js 15 (React 19)
  - TypeScript
  - Tailwind CSS
  - Radix UI Components
  - Framer Motion for animations
  - React Hook Form for form handling

- **Backend**:

  - Next.js API Routes
  - PostgreSQL Database
  - Drizzle ORM
  - Authentication with Better Auth

- **Development Tools**:
  - ESLint
  - Prettier
  - TypeScript
  - Drizzle Kit for database migrations

## 🔧 Services Offered

- **Electronic Health Records (EHR)**: Comprehensive system for clinical workflows and patient data management

  - Patient demographics and medical history
  - Clinical documentation
  - E-prescribing
  - Lab and diagnostic test ordering and results

- **Telehealth Solutions**: Secure video consultations and remote patient monitoring

  - HIPAA-compliant video conferencing
  - Virtual waiting rooms
  - Screen sharing for reviewing test results
  - Integration with EHR systems

- **Medical Practice Management**: Administrative tools integrated with clinical workflows

  - Appointment scheduling
  - Insurance verification
  - Billing and claims management
  - Revenue cycle optimization

- **Healthcare Analytics**: Data-driven insights for improved patient care and business performance

  - Clinical outcomes tracking
  - Population health management
  - Financial performance metrics
  - Operational efficiency analysis

- **Patient Engagement**: Tools to enhance patient communication and satisfaction
  - Patient portals
  - Appointment reminders
  - Secure messaging
  - Educational resources

## 💻 Code Examples

### Next.js Page Component

```tsx
// src/app/(root)/page.tsx
export default function Home() {
  return (
    <main className="snap-start scroll-smooth">
      <section id="landing" className="relative min-h-screen">
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-20 md:flex-row">
          <div className="mb-10 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Healthcare Technology Solutions for Modern Practices
            </h1>
            <p className="mb-8 text-base leading-relaxed md:text-lg">
              Innovative solutions designed to improve patient care, streamline
              clinical workflows, and optimize medical practice operations.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" asChild>
                <Link href={ROUTES.CONTACT}>Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={ROUTES.SERVICES}>Our Services</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full md:w-1/2 lg:max-w-2xl">
            <Image
              src={Hero}
              alt="Healthcare Technology"
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>
      {/* Additional sections... */}
    </main>
  );
}
```

### Database Schema with Drizzle ORM

```typescript
// src/lib/db/schema/blog.ts
import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./auth";

export const postStatusEnum = pgEnum("post_status", [
  "draft",
  "published",
  "archived",
]);

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featuredImage: text("featured_image"),
  status: postStatusEnum("status").default("draft").notNull(),
  authorId: text("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
});

export const blogCategories = pgTable("blog_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
});

export const blogPostsToCategories = pgTable("blog_posts_to_categories", {
  postId: serial("post_id")
    .references(() => blogPosts.id)
    .notNull(),
  categoryId: serial("category_id")
    .references(() => blogCategories.id)
    .notNull(),
});

export const blogPostRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
  categories: many(blogPostsToCategories),
}));
```

### API Route Handler

```typescript
// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate form data
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.format() },
        { status: 400 },
      );
    }

    const { name, email, phone, message } = result.data;

    // Send email notification
    await sendEmail({
      to: "info@example.com",
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        
        Message:
        ${message}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 },
    );
  }
}
```

### React Component with Hooks

```tsx
// src/components/ContactForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      toast.success("Message sent successfully! We'll be in touch soon.");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          {...register("name")}
          placeholder="Your Name"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register("email")}
          placeholder="Email Address"
          type="email"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register("phone")}
          placeholder="Phone Number (Optional)"
          type="tel"
        />
      </div>

      <div>
        <Textarea
          {...register("message")}
          placeholder="Your Message"
          rows={5}
          className={errors.message ? "border-red-500" : ""}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
```

## 📋 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PNPM package manager
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ms-solutions.git
   cd ms-solutions
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```env
   NEXT_PUBLIC_BETTER_AUTH_URL=
   BETTER_AUTH_URL=
   BETTER_AUTH_SECRET=
   NODE_ENV=

   # Database Configuration
   DATABASE_HOST=
   DATABASE_PORT=
   DATABASE_USER=
   DATABASE_PASSWORD=
   DATABASE_NAME=
   ```

4. Set up the database:

   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

5. Run the development server:

   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🗄️ Database Schema

The application uses PostgreSQL with Drizzle ORM. The main schemas include:

- **Auth**: User authentication and permissions

  - Users table with role-based access control
  - Sessions for authentication state management
  - Password reset tokens

- **Blog**: Blog posts, categories, and related content
  - Posts with rich content and metadata
  - Categories for organization
  - Author relationships

## 📱 Application Structure

- **Public Routes**:

  - Home (`/`): Landing page with service overview
  - Services (`/services`): Detailed service descriptions
  - About (`/about`): Company information and team
  - Contact (`/contact`): Contact form and information
  - Blogs (`/blogs`): Blog listing and individual posts
  - Portfolio (`/portfolio`): Showcase of past projects
  - Mission (`/mission`): Company mission and values
  - Privacy Policy (`/privacy-policy`): Legal information
  - Terms of Service (`/terms-of-service`): Legal terms

- **Admin Routes**:
  - Admin Dashboard (`/admin`): Overview and analytics
  - Blog Management (`/admin/blogs`): Create and edit blog posts
  - User Management (`/admin/users`): Manage user accounts
  - Authentication (`/auth`): Login, register, password reset

## 🧪 Scripts

- `pnpm dev`: Start the development server with Turbopack
- `pnpm build`: Build the application for production
- `pnpm start`: Start the production server
- `pnpm lint`: Run ESLint
- `pnpm db:generate`: Generate database migrations
- `pnpm db:migrate`: Apply database migrations
- `pnpm db:studio`: Open Drizzle Studio for database management

## 🔍 Advanced Features

### SEO Optimization

The application includes built-in SEO optimization with Next.js metadata:

```tsx
// Example metadata configuration
export const metadata = {
  title:
    "Healthcare Solutions Provider | Medical Technology for Modern Practices",
  description:
    "Innovative healthcare technology solutions designed to improve patient care, streamline clinical workflows, and optimize medical practice operations.",
  openGraph: {
    title: "MS Solutions - Healthcare Technology",
    description:
      "Innovative healthcare technology solutions for modern medical practices",
    images: [{ url: "/images/og-image.jpg" }],
  },
};
```

### Authentication Flow

The application uses Better Auth for secure authentication:

```tsx
// src/auth.ts example
import { BetterAuth } from "better-auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/auth";
import { eq } from "drizzle-orm";

export const auth = new BetterAuth({
  providers: [
    {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ email, password }) {
        // Find user and verify password
        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (!user) return null;

        // Verify password (implementation details omitted)
        const isValid = await verifyPassword(password, user.passwordHash);

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    },
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
});
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

- Phone: +1 (800) 123-4567
- Email: info@example.com
- Address: 123 Medical Center Blvd, Suite 200

## 🔗 Social Media

- [Instagram](https://www.instagram.com/example)
- [Facebook](https://www.facebook.com/example)
- [Twitter](https://www.twitter.com/example)
- [LinkedIn](https://www.linkedin.com/company/example)
