import '../index.css';
import { ThemeProvider } from '../components/ThemeProvider';

export const metadata = {
  title: 'FrameX-Tech Farm | Design & Develop with us',
  description:
    'FrameX-Tech Farm is a creative agency offering UI/UX design, web development, and digital solutions to grow your business online.',

  keywords: [
    'UI UX Design',
    'Web Development',
    'Design Agency',
    'Frontend Developer',
    'Next.js Development',
    'Kerala Web Designer'
  ],

  authors: [{ name: 'FrameX-Tech Farm' }],
  creator: 'FrameX-Tech Farm',

  metadataBase: new URL('https://www.framextechfarm.in'),

  openGraph: {
    title: 'FrameX-Tech Farm | UI/UX & Web Development',
    description:
      'Creative UI/UX design and web development agency helping brands grow online.',
    url: 'https://www.framextechfarm.in',
    siteName: 'FrameX-Tech Farm',
    images: [
      {
        url: '/og-image.jpg', // ✅ relative path use pannom
        width: 1200,
        height: 630,
        alt: 'FrameX-Tech Farm Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'FrameX-Tech Farm',
    description:
      'UI/UX Design & Web Development Agency for modern businesses.',
    images: ['/og-image.png'], // ✅ fixed
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}