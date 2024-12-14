"use client";

import {
  getSalesReport,
  ReportResult,
} from "@/server-actions/get-sales-report";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function SalesReportPage() {
  const [report, setReport] = useState<ReportResult[]>([]);
  useEffect(() => {
    getSalesReport().then(setReport);
  }, []);
  return (
    <main className={clsx("p-4")}>
      <h1 className={clsx("text-4xl", "font-bold", "mb-4")}>
        Отчёт по Продажам
      </h1>
      <table
        cellPadding="10"
        className={clsx(
          "border-collapse",
          "w-full",
          "[&_th]:bg-zinc-100",
          "[&_th]:border",
          "[&_td]:border",
          "[&_th]:border-zinc-300",
          "[&_td]:border-zinc-300"
        )}
      >
        <thead>
          <tr>
            <th>Код книги</th>
            <th>Наименование</th>
            <th>Продано экземпляров</th>
            <th>Общая выручка (₽)</th>
          </tr>
        </thead>
        <tbody>
          {report.map((item) => (
            <tr key={item.Код_книги}>
              <td>{item.Код_книги}</td>
              <td>{item.Книга}</td>
              <td>{item.Продано_экземпляров}</td>
              <td>{item.Общая_выручка}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
