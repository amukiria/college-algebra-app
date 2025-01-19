import '../styles/globals.css';

export const metadata = {
  title: 'College Algebra App',
  description: 'An interactive learning platform for college algebra.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
