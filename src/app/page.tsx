"use client";

import { AddBookForm } from "@/features/add-forms";
import { DeleteBookButton } from "@/features/delete-buttons/delete-book-button";
import { AuthorResult, getAuthors } from "@/server-actions/get-authors";
import { BookResult, getBooks } from "@/server-actions/get-books";
import { GenreResult, getGenres } from "@/server-actions/get-genres";
import {
  getPublishers,
  PublisherResult,
} from "@/server-actions/get-publishers";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [[books, authors, genres, publishers], setState] = useState<
    [BookResult[], AuthorResult[], GenreResult[], PublisherResult[]]
  >([[], [], [], []]);
  const refresh = useCallback(
    () =>
      Promise.all([
        getBooks(),
        getAuthors(),
        getGenres(),
        getPublishers(),
      ]).then(setState),
    []
  );
  useEffect(() => {
    refresh();
  }, [refresh]);
  return (
    <main className={clsx("p-4")}>
      <h1 className={clsx("text-4xl", "font-bold", "mb-4")}>Книги</h1>
      <AddBookForm
        className={clsx("mb-4")}
        authors={authors}
        genres={genres}
        publishers={publishers}
        cb={refresh}
      />
      <h1 className={clsx("text-lg", "font-bold", "mb-4")}>Каталог книг</h1>
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
            <th>Год издания</th>
            <th>Автор</th>
            <th>Жанр</th>
            <th>Издательство</th>
            <th>Количество на складе</th>
            <th>Стоимость</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {[...books]
            .sort((a, b) => b.Код_книги - a.Код_книги)
            .map((book) => (
              <tr key={book.Код_книги}>
                <td>{book.Код_книги}</td>
                <td>{book.Наименование}</td>
                <td>{book.Год_издания}</td>
                <td>{book.Автор}</td>
                <td>{book.Жанр}</td>
                <td>{book.Издательство}</td>
                <td>{book.Количество_на_складе}</td>
                <td>{book.Стоимость} ₽</td>
                <td>
                  <DeleteBookButton
                    id={book.Код_книги.toString()}
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
