import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/header";
import "./globals.css";

export default async function RootLayout({
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
          <Header />
          <main className="mx-auto max-w-[1920px] px-20">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
