"use client";

import { Input } from "@/components/form";
import {
  getSalesReport,
  ReportResult,
} from "@/server-actions/get-sales-report";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

export default function SalesReportPage() {
  const [report, setReport] = useState<ReportResult[]>([]);
  const [start, setStart] = useState(new Date().toISOString().split("T")[0]);
  const [end, setEnd] = useState(new Date().toISOString().split("T")[0]);
  useEffect(() => {
    getSalesReport({ start, end }).then(setReport);
  }, [start, end]);
  return (
    <main className={clsx("p-4")}>
      <h1 className={clsx("text-4xl", "font-bold", "mb-4")}>
        Отчёт по Продажам
      </h1>
      <div className={clsx("mb-4")}>
        <label>
          Начало{" "}
          <Input
            type="date"
            value={start}
            onChange={(e) => {
              if (
                new Date(e.target.value).getTime() < new Date(end).getTime()
              ) {
                setStart(e.target.value);
              }
            }}
          />
        </label>
        <span> &mdash; </span>
        <label>
          Конец{" "}
          <Input
            type="date"
            value={end}
            onChange={(e) => {
              if (
                new Date(e.target.value).getTime() > new Date(end).getTime()
              ) {
                setEnd(e.target.value);
              }
            }}
          />
        </label>
        <div className={clsx("mt-4")}>
          Итог за период:{" "}
          {useMemo(
            () => report.reduce((sum, i) => sum + +i.Общая_выручка, 0),
            [report]
          )}{" "}
          ₽
        </div>
      </div>
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
