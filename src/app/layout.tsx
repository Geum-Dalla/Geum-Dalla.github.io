import type { Metadata } from "next";
import "./globals.css";

import ResponsiveNavContainer from "@/components/nav/Container";

export const metadata: Metadata = {
  title: "금달라 블로그",
  description: "금달라 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <main>{children}</main>
        <nav>
          <ResponsiveNavContainer />
        </nav>
      </body>
    </html>
  );
}
