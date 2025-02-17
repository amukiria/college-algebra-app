import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import TopBar from "../components/TopBar"; // Adjust the path as needed
import "../styles/globals.css"; // Ensure this path is correct
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
          <title>MTH 1109 - College Algebra</title>
          <meta name="description" content="College Algebra" />
        </head>
        <body className="full-height bg-background text-text">
          <TopBar />
          {/* Add top padding equal to the height of your fixed header */}
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
