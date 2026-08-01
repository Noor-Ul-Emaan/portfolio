# Premium AI/Frontend Portfolio

A production-ready personal portfolio built with React 19, Vite, Tailwind CSS,
Framer Motion, React Three Fiber, and EmailJS.

## Features

- Dark / Light theme toggle (persisted in localStorage)
- Animated 3D hero (React Three Fiber + Drei, mouse-reactive distorted sphere)
- Glassmorphism UI, gradient text, animated blobs, floating elements
- Framer Motion scroll reveals, stagger, hover, and page-load animations
- Custom animated cursor + magnetic buttons
- Sections: Hero, About, Skills, Projects, Experience, Education,
  Certifications, Services, Testimonials, Contact
- Contact form wired to EmailJS
- Fully responsive (mobile, tablet, laptop, desktop)
- Animated loading screen

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview
```

## Configuration

1. **Your content** — edit `src/constants/data.js`. This is the single
   source of truth for your name, bio, skills, projects, experience,
   education, certifications, services, testimonials, and social links.

2. **Contact form (EmailJS)** — open `src/sections/Contact.jsx` and replace:
   ```js
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'
   ```
   Get these from https://www.emailjs.com/ after creating a free account,
   an email service, and a template with `from_name`, `from_email`,
   `subject`, `message` variables.

3. **CV download** — place your PDF at `public/Alex_Rivera_CV.pdf`, or
   update `PROFILE.cvUrl` in `src/constants/data.js`.

4. **Profile photo & project images** — currently using Unsplash/Pravatar
   placeholder URLs. Replace with your own images in `src/constants/data.js`
   and `src/sections/About.jsx`.

5. **Colors** — defined in `tailwind.config.js` under `theme.extend.colors`
   (`dark.*` and `light.*`).

## Folder Structure

```
src/
  components/   Reusable UI (Navbar, Footer, Cursor, Cards, Timeline...)
  sections/     Page sections (Hero, About, Skills, Projects...)
  hooks/        useTheme, useMousePosition
  constants/    data.js — all your content lives here
  pages/        Home.jsx composes all sections
  styles/       index.css — Tailwind + custom utilities
  App.jsx
  main.jsx
```

## Deploying

Works out of the box on Vercel, Netlify, or GitHub Pages after `npm run build`
(output in `dist/`).
