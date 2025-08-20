import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import PageCurtain from '@/components/PageCurtain';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageCurtain />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
