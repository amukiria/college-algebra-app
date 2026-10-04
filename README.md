# College Algebra Learning Platform

A full-stack interactive learning platform built to support College Algebra instruction through structured lessons, guided practice, assessment workflows, interactive graphing, and mathematical visualization.

**Live Demo:** https://college-algebra-app.vercel.app/

## Overview

This project was developed as an educational software product rather than a static collection of course notes. It combines a responsive Next.js frontend with authentication, persistent data, mathematical computation, interactive visualizations, assessment workflows, and client-side document generation.

The platform organizes College Algebra into topic-based learning and practice experiences and provides authenticated users with a structured path from instruction to practice and assessment.

## Engineering Highlights

- Full-stack application built with **Next.js and React**
- User authentication and account management with **Clerk**
- Persistent application data using **MongoDB and Mongoose**
- API routes for server-side application functionality
- Mathematical expression handling and computation using **Algebra.js**
- Mathematical rendering with **KaTeX** and **MathLive**
- Interactive data visualization with **Plotly** and **Chart.js**
- Interactive graphing assignment workflow
- PDF generation using **jsPDF** and **html2canvas**
- Responsive UI built with **Tailwind CSS**
- Deployment through **Vercel**

## Learning & Assessment Workflow

The application is organized around a repeatable learning workflow:

**Learn → Practice → Quiz / Assessment → Applied Work**

The current course structure covers:

| Topic | Learn | Practice |
|---|:---:|:---:|
| Sets | ✓ | ✓ |
| Polynomials | ✓ | ✓ |
| Factoring Expressions | ✓ | ✓ |
| Rational Expressions | ✓ | ✓ |
| Linear Equations | ✓ | ✓ |
| Quadratic Equations | ✓ | ✓ |
| Radicals | ✓ | ✓ |
| Complex Numbers | ✓ | ✓ |
| Integers, Exponents, and Roots | ✓ | ✓ |
| Binomial Expansions | ✓ | ✓ |
| Progressions | ✓ | ✓ |

The platform also includes quiz, exam-practice, and graphing-assignment experiences.

## Interactive Mathematics

A key engineering challenge in the project was presenting mathematics as an interactive experience rather than treating it as ordinary text content.

The application uses:

- **KaTeX / React KaTeX** for formatted mathematical notation
- **MathLive** for interactive mathematical input
- **Algebra.js** for algebraic expression handling
- **Plotly** for interactive graphing
- **Chart.js** for chart-based visualization

This combination allows mathematical concepts, expressions, graphs, and student responses to be handled inside the application interface.

## Graphing Assignment

The project includes an applied graphing workflow where authenticated users can work with graph-based mathematical tasks and generate a PDF submission.

The workflow combines:

1. Interactive graph visualization
2. Student interaction with plotted mathematical content
3. Authenticated user information
4. Client-side rendering of the completed assignment
5. PDF generation using `jsPDF` and `html2canvas`

This was implemented as part of the effort to move assessment beyond conventional text-based quizzes.

## Application Architecture

At a high level, the application is structured around:

- **Next.js / React** — application and UI layer
- **Clerk** — authentication
- **Next.js API routes** — server-side application endpoints
- **MongoDB / Mongoose** — persistent data layer
- **Mathematical libraries** — expression processing and rendering
- **Visualization libraries** — graphs and charts
- **Vercel** — deployment platform

The project uses environment variables for service credentials and configuration rather than committing those credentials to source control.

## Technology Stack

### Frontend

- Next.js
- React
- Tailwind CSS
- Radix UI components
- Lucide icons

### Authentication & Data

- Clerk
- MongoDB Atlas
- Mongoose

### Mathematics & Visualization

- Algebra.js
- KaTeX
- MathLive
- Plotly
- Chart.js

### Document & Media Generation

- jsPDF
- html2canvas

### Deployment

- Vercel

## My Role

I designed and developed the application as a full-stack educational software project, covering the product structure, user experience, application architecture, interactive mathematics workflows, assessment experiences, data integration, and deployment.

The project also served as a practical exploration of how software engineering and gamified/interactive learning techniques can be combined to improve the experience of learning College Algebra.

## Project Status

**Portfolio project / deployed prototype.**

The application remains available as a live demonstration of the implemented software and engineering work. The repository is maintained primarily as a portfolio reference rather than as a general-purpose open-source package.

## Privacy & Repository Note

This application was designed for authenticated educational users and may process user-specific information during normal operation. The public repository should therefore contain only source code and non-sensitive configuration.

No student records, credentials, API keys, or other private user data should be committed to the repository.

## Live Demo

https://college-algebra-app.vercel.app/

## Author

**Albert Mukiria**

Software Engineer — Real-Time 3D, XR & Interactive Applications

Portfolio: https://amukiria.github.io
