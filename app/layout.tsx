import { Metadata } from 'next';
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'StreamPanel',
  description: 'Create modern apps in minutes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
