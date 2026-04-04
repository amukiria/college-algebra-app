import "@/styles/globals.css"; // Import Tailwind and global styles
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "College Algebra",
  description: "Learn and practice College Algebra interactively.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-text font-body">
        {/* Topbar */}
        <TopBar />

        {/* Layout */}
        <div className="flex pt-[64px]">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-grow p-6 ml-64">{children}</main>
        </div>
      </body>
    </html>
  );
}
