import { Providers } from './providers/page';
import './globals.css'; 

export const metadata = {
  title: 'Wan - Software Engineer',
  description: 'My portfolio website showcasing my projects and skills as a software engineer.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="shortcut icon" href="/static/images/logo.png" />
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}