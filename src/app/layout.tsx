import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Leaf, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AgroWise | Smart Farming Solutions',
  description: 'AI-powered agricultural support platform for modern farmers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 w-full border-b bg-blur">
              <div className="container flex h-16 items-center justify-between py-4">
                <div className="flex items-center gap-2">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <Leaf className="h-6 w-6 text-primary" />
                    </div>
                    <span className="hidden font-bold text-xl sm:inline-block">AgroWise</span>
                  </Link>
                </div>
                
                <nav className="hidden md:flex items-center gap-6">
                  <Link 
                    href="/" 
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Home
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    About
                  </Link>
                  <Link 
                    href="/about#contact-section" 
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Contact
                  </Link>
                  <ThemeToggle />
                </nav>
                
                <div className="flex md:hidden items-center gap-4">
                  <ThemeToggle />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    aria-label="Toggle Menu"
                    className="text-foreground"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </header>
            
            <main className="flex-1">
              {children}
            </main>
            
            <footer className="border-t py-6 md:py-0">
              <div className="container">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 py-8">
                  <div className="flex flex-col gap-2">
                    <Link href="/" className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-1">
                        <Leaf className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-bold">AgroWise</span>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      AI-powered agricultural support platform for modern farmers.
                    </p>
                  </div>
                  
                  <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-sm font-medium">Platform</h3>
                      <Link href="/#weather" className="text-sm text-muted-foreground hover:text-primary">
                        Weather
                      </Link>
                      <Link href="/#crop-suggestions" className="text-sm text-muted-foreground hover:text-primary">
                        Crop Suggestions
                      </Link>
                      <Link href="/#farming-advice" className="text-sm text-muted-foreground hover:text-primary">
                        Farming Advice
                      </Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-sm font-medium">Resources</h3>
                      <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                        About
                      </Link>
                      <Link href="/about#contact-section" className="text-sm text-muted-foreground hover:text-primary">
                        Contact
                      </Link>
                      <Link href="https://agmarknet.gov.in/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary">
                        Resources
                      </Link>
                    </div>
                  </nav>
                </div>
                
                <div className="flex flex-col gap-4 sm:flex-row py-6 border-t items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} AgroWise. All rights reserved.
                  </p>
                  <div className="flex gap-4">
                    <Link href="/about#mission-section" className="text-xs text-muted-foreground hover:text-primary">
                      Our Mission
                    </Link>
                    <Link href="/about#contact-section" className="text-xs text-muted-foreground hover:text-primary">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

