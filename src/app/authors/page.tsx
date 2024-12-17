"use client";

import { Input } from '@/components/form';
import { AddAuthorForm } from "@/features/add-forms";
import { DeleteAuthorButton } from "@/features/delete-buttons/delete-author-button";
import { AuthorResult, getAuthors } from "@/server-actions/get-authors";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<AuthorResult[]>([]);
  const [authorsToDisplay, setAuthorsToDisplay] =
    useState<AuthorResult[]>(authors);
  const refresh = useCallback(() => {
    getAuthors().then((data) => {
      setAuthors(data);
      setAuthorsToDisplay([...data].sort((a, b) => b.Код_автора - a.Код_автора));
    });
  }, []);
  useEffect(() => {
    refresh();
  }, [refresh]);
  return (
    <main className={clsx("p-4")}>
      <h1 className={clsx("text-4xl", "font-bold", "mb-4")}>Авторы</h1>
      <AddAuthorForm className={clsx("mb-4")} cb={refresh} />
      <h1 className={clsx("text-lg", "font-bold", "mb-4")}>Список авторов</h1>
      <div className={clsx("mb-4")}>
        Поиск по ФИО:{" "}
        <Input
          type="text"
          onChange={(e) => {
            const sorted = [...authors].sort(
              (a, b) => b.Код_автора - a.Код_автора
            );
            if (e.target.value) {
              setAuthorsToDisplay(
                sorted.filter((b) =>
                  b.ФИО
                    .toLocaleLowerCase()
                    .includes(e.target.value.toLocaleLowerCase())
                )
              );
            } else {
              setAuthorsToDisplay(sorted);
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
            <th>Код автора</th>
            <th>ФИО</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {authorsToDisplay.map((author) => (
            <tr key={author.Код_автора}>
              <td>{author.Код_автора}</td>
              <td>{author.ФИО}</td>
              <td>
                <DeleteAuthorButton
                  id={author.Код_автора.toString()}
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
