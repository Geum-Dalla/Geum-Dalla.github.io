import type { Metadata } from "next";
import "./globals.css";

import NavContainer from "@/components/nav/Container";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "금달라 블로그",
  description: "금달라 블로그",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body>
        <main>{children}</main>
        <nav>
          <NavContainer />
        </nav>
      </body>
    </html>
  );
}
