import '../styles/globals.css';
import TopBar from "@/components/TopBar";

export const metadata = {
  title: "College Algebra App",
  description: "An interactive way to learn algebra using gamified learning modules.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-secondary text-text">
        <TopBar /> {/* Render Top Bar on All Pages */}
        <main>{children}</main>
      </body>
    </html>
  );
}