import '../index.css';
import { ThemeProvider } from '../components/ThemeProvider';

export const metadata = {
    title: 'XFrame X-Tech',
    description: 'Portfolio and Services',
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
