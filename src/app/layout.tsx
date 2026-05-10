import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import TopBar from "../components/TopBar";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
          <title>College Algebra</title>
          <meta name="description" content="College Algebra" />
        </head>
        <body className="full-height bg-background text-text">
          <TopBar />
          <div className="pt-20 container">
            <main>{children}
              <Analytics />
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}