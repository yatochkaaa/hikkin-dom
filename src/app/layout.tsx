import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ModeToggle } from "@/components/ui/modeToggle";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="w-full py-6">
            <div className="mx-auto max-w-[1920px] px-20">
              <div className="ml-auto w-fit">
                <ModeToggle />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-[1920px] px-20">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
