import './globals.css';

export const metadata = {
  title: 'Setup Patients',
  description: 'Interactive setup flow for managing patient onboarding.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
