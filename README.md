# ShopCraft - E-Commerce Platform

A high-performance e-commerce application built with Next.js App Router, TypeScript, React, and Tailwind CSS. This project demonstrates a production-ready application focusing on clean architecture, performance optimization, and excellent user experience.

## 🚀 Live Demo

**Live URL:** [https://wecommerce-psi.vercel.app/]

## ✨ Key Features

- **Product Catalog (500+ items):** Fully scalable product catalog utilizing Static Site Generation (SSG) and Incremental Static Regeneration (ISR).
- **Advanced Search & Filtering:** Filter by category, price range, multi-select rating, and sort via URL search parameters for link-sharing and persistence.
- **Robust Cart System:** State managed via Zustand with local storage persistence. Features quantity controls, stock limits, and subtotal calculation.
- **Secure Checkout:** Multi-step checkout form with strict client-side validation using React Hook Form and Zod.
- **Performance Optimized:** Judicious use of `useMemo`, `useCallback`, dynamic imports, and optimized Next.js Image components.
- **SEO Friendly:** Dynamic metadata generation and structured JSON-LD data for products.
- **Responsive UI/UX:** Premium design with Framer Motion and Swiper.js for smooth animations and carousels.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn UI
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 📂 Architecture & Folder Structure

This project strictly adheres to **Feature-Sliced Design (FSD)** principles. Instead of lumping all components and hooks into flat global folders, the logic is highly modularized by feature domain.

```text
src/
├── app/                  # Next.js App Router pages and API routes
├── components/           # Global reusable UI components (Shadcn UI, structural UI)
├── features/             # Feature-based domain modules (FSD)
│   ├── about/            # About page components and datasets
│   ├── cart/             # Cart components, logic, and Zustand store
│   ├── checkout/         # Checkout forms, Zod schemas, and hooks
│   ├── contact/          # Contact page components and data
│   ├── home/             # Homepage specific sections (Hero, Testimonials, etc.)
│   └── products/         # Product listing, filtering, UI, and API services
├── hooks/                # Global React hooks (useMounted, etc.)
├── lib/                  # Global utilities (clsx, formatters)
└── types/                # Global TypeScript interfaces
```

### Why Feature-Sliced Design?
By isolating logic into `features/`, we ensure that components, hooks, constants, and data fetchers that only belong to one domain (e.g., `checkout`) do not pollute the global space. This makes the codebase scalable, easier to navigate, and prevents tight coupling.

### Server vs. Client Components
- **Server Components (Default):** Used for fetching data (e.g., product details, related products) and rendering static sections to minimize JS bundle size and improve SEO.
- **Client Components (`"use client"`):** Used strictly where necessary, such as interactive UI elements (Carousels, Cart buttons), Form validations, and state-driven components (Zustand hooks).

## 💻 Running Locally

Follow these steps to run the project on your local machine:

### Prerequisites
- Node.js (v18.17.0 or higher)
- npm or pnpm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd wecommerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or yarn install
   # or pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or yarn dev
   # or pnpm dev
   ```

4. **Open the app:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## ⚡ Performance Decisions

- **URL State over React State:** The Shop page utilizes URL Query Parameters (`?category=...&price=...`) instead of heavy local state for filters. This allows users to share direct links to filtered results and ensures server components can read the filters immediately.
- **Memoization (`useMemo` / `useCallback`):** Expensive calculations like cart subtotal logic and threshold calculations are memoized to avoid recalculation on unrelated re-renders.
- **React Hook Form:** Uncontrolled inputs drastically reduce component re-renders during checkout form typing.
- **ISR & SSG:** Product pages are statically generated at build time using `generateStaticParams`. `fetchRelatedSSG` is heavily cached so that users navigating the site experience near-instant load times.

## 📝 Guidelines for Future Development

- **Adding a new page:** Create the directory inside `src/app/`. If the page requires complex logic or multiple unique components, create a new feature module in `src/features/`.
- **Modifying Forms:** All Zod schemas and TypeScript interfaces should be co-located with their respective features (e.g., `src/features/checkout/checkout.schema.ts`).
- **Global Styles:** Modify `src/app/globals.css` for Tailwind base configurations.

---
*Developed as a high-performance e-commerce task.*
