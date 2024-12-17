"use client";

import { Input } from '@/components/form';
import { AddPublisherForm } from "@/features/add-forms/add-publisher-form";
import { DeletePublisherButton } from "@/features/delete-buttons/delete-publisher-button";
import {
  getPublishers,
  PublisherResult,
} from "@/server-actions/get-publishers";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

export default function PublishersPage() {
  const [publishers, setPublishers] = useState<PublisherResult[]>([]);
  const [publishersToDisplay, setPublishersToDisplay] =
    useState<PublisherResult[]>(publishers);
  const refresh = useCallback(() => {
    getPublishers().then((data) => {
      setPublishers(data);
      setPublishersToDisplay(
        [...data].sort((a, b) => b.Код_издательства - a.Код_издательства)
      );
    });
  }, []);
  useEffect(() => {
    refresh();
  }, [refresh]);
  return (
    <main className={clsx("p-4")}>
      <h1 className={clsx("text-4xl", "font-bold", "mb-4")}>Издательства</h1>
      <AddPublisherForm className={clsx("mb-4")} cb={refresh} />
      <h1 className={clsx("text-lg", "font-bold", "mb-4")}>
        Список издательств
      </h1>
      <div className={clsx("mb-4")}>
        Поиск по наименованию:{" "}
        <Input
          type="text"
          onChange={(e) => {
            const sorted = [...publishers].sort(
              (a, b) => b.Код_издательства - a.Код_издательства
            );
            if (e.target.value) {
              setPublishersToDisplay(
                sorted.filter((b) =>
                  b.Наименование
                    .toLocaleLowerCase()
                    .includes(e.target.value.toLocaleLowerCase())
                )
              );
            } else {
              setPublishersToDisplay(sorted);
            }
          }}
        />
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
            <th>Код издательства</th>
            <th>Наименование</th>
            <th>Город</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {publishersToDisplay.map((publisher) => (
            <tr key={publisher.Код_издательства}>
              <td>{publisher.Код_издательства}</td>
              <td>{publisher.Наименование}</td>
              <td>{publisher.Город}</td>
              <td>
                <DeletePublisherButton
                  id={publisher.Код_издательства.toString()}
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
