'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = React.useState(false);

  // useEffect runs only on the client after the first render
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and the very first client-side pass, 
  // we render a fragment to avoid the script-tag mismatch error.
  if (!mounted) {
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}