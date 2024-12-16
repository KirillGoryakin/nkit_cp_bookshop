import clsx from "clsx";
import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "Bookshop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <header className={clsx("p-4")}>
          <div className={clsx("flex", "gap-2")}>
            <HeaderLink href="/">Книги</HeaderLink>
            <HeaderLink href="/authors">Авторы</HeaderLink>
            <HeaderLink href="/genres">Жанры</HeaderLink>
            <HeaderLink href="/publishers">Издательство</HeaderLink>
            <HeaderLink href="/clients">Клиенты</HeaderLink>
            <HeaderLink href="/consultants">Консультанты</HeaderLink>
            <HeaderLink href="/orders">Заказы</HeaderLink>
          </div>
          <div className={clsx("flex", "gap-2", 'mt-2')}>
            <HeaderLink href="/orders/reports">Отчёт по Продажам</HeaderLink>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

function HeaderLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "block",
        "px-1",
        "py-0.5",
        "border",
        "border-zinc-400",
        "rounded",
        "hover:bg-zinc-100",
        "transition-colors"
      )}
    >
      {children}
    </Link>
  );
}
