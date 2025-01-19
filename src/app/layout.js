import '../styles/globals.css';
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export const metadata = {
  title: "MTH 1109 - College Algebra", // Updated title
  description: "An interactive way to learn algebra using gamified learning modules.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex bg-secondary text-text">
        <Sidebar /> {/* Sidebar Component */}
        <div className="flex-1 ml-64">
          <TopBar /> {/* Top Bar Component */}
          <main className="p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}