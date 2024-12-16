"use client";

import { AddConsultantForm } from "@/features/add-forms";
import { DeleteConsultantButton } from "@/features/delete-buttons/delete-consultant-button";
import {
  ConsultantResult,
  getConsultants,
} from "@/server-actions/get-consultants";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

export default function ConsultantsPage() {
  const [consultants, setConsultants] = useState<ConsultantResult[]>([]);
  const refresh = useCallback(() => {
    getConsultants().then(setConsultants);
  }, []);
  useEffect(() => {
    refresh();
  }, [refresh]);
  return (
    <main className={clsx("p-4")}>
      <h1 className={clsx("text-4xl", "font-bold", "mb-4")}>Консультанты</h1>
      <AddConsultantForm className={clsx("mb-4")} cb={refresh} />
      <h1 className={clsx("text-lg", "font-bold", "mb-4")}>
        Список консультантов
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
            <th>Код продавца</th>
            <th>ФИО</th>
            <th>Адрес</th>
            <th>Телефон</th>
            <th>Зарплата</th>
            <th>Администратор</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {[...consultants]
            .sort((a, b) => b.Код_продавца - a.Код_продавца)
            .map((consultant) => (
              <tr key={consultant.Код_продавца}>
                <td>{consultant.Код_продавца}</td>
                <td>{consultant.ФИО}</td>
                <td>{consultant.Адрес}</td>
                <td>{consultant.Телефон}</td>
                <td>{consultant.Зарплата} ₽</td>
                <td>{consultant.Администратор ? "Да" : "Нет"}</td>
                <td>
                  <DeleteConsultantButton
                    id={consultant.Код_продавца.toString()}
                    cb={refresh}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}
