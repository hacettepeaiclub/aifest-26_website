# AI Fest '26 Official Website

The official interactive web experience for **AI Fest 2026**, organized by Hacettepe AI Club. This project serves as a highly immersive, 3D-driven landing page that introduces the event's vision, speakers, schedule, and stakeholders.

## 🚀 Technologies Used

- **Framework:** [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations & Interactivity:** 
  - [Framer Motion](https://www.framer.com/motion/) (Scroll animations, view transitions)
  - CSS 3D Transforms (Glassmorphism, 3D flip cards)
  - `react-pageflip` (3D interactive calendar/timeline)
  - `@react-three/fiber` & `@react-three/drei` (3D Countdown component)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🧠 Core Logic & Architecture

The application is built using a modern, component-driven React architecture. It prioritizes high-performance interactive 3D elements and a responsive mobile-first approach.

### Key Components
- **`App.tsx`**: Main entry point, orchestrates the assembly of all section components and handles the global state (e.g., the Side Drawer navigation).
- **`Hero.tsx` & `Countdown3D.tsx`**: The first impression of the site. Features a 3D animated countdown timer built with React Three Fiber to build anticipation.
- **`Vision2026.tsx`**: Showcases the core goals of the event using advanced CSS 3D Transforms (`rotateX`) and glassmorphism. It uses custom hover-flip card logic without heavy external libraries.
- **`Timeline.tsx`**: A skeuomorphic 3D interactive flipbook calendar (using `react-pageflip`), styled with metallic binding rings and dynamic headers.
- **`SideDrawer.tsx` & `Navbar.tsx`**: Ensures seamless navigation across both desktop and mobile devices.

### Design System
- **Aesthetic:** Deep space / modern tech-inspired UI. It heavily utilizes gradients, glowing background blobs (`blur` utilities), and glassmorphism (`backdrop-blur`).
- **Color Palette:** 
  - `Deep`: Dark background theme
  - `CTA`, `Accent`, `Badge`: Vibrant highlight colors used dynamically across different sections for visual hierarchy.

## 📦 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```
