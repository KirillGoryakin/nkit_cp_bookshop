"use client";

import { Button, Input, Select } from "@/components/form";
import { addBook } from "@/server-actions/add-book";
import { AuthorResult } from "@/server-actions/get-authors";
import { GenreResult } from "@/server-actions/get-genres";
import { PublisherResult } from "@/server-actions/get-publishers";
import clsx from "clsx";
import { ChangeEvent, FormEvent, useState } from "react";

export function AddBookForm({
  className,
  authors,
  genres,
  publishers,
  cb,
}: {
  className?: string;
  authors: AuthorResult[];
  genres: GenreResult[];
  publishers: PublisherResult[];
  cb?: () => void | Promise<void>;
}) {
  const [form, setForm] = useState({
    Наименование: "",
    Год_издания: "",
    Код_автора: "",
    Код_жанра: "",
    Код_издательства: "",
    Количество_на_складе: "",
    Стоимость: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await addBook(form);
    if (response.success) {
      setForm({
        Наименование: "",
        Год_издания: "",
        Код_автора: "",
        Код_жанра: "",
        Код_издательства: "",
        Количество_на_складе: "",
        Стоимость: "",
      });

      cb?.();
    } else {
      setMessage(response.error || "Произошла ошибка");
    }
  };

  return (
    <div className={clsx(className)}>
      <h1 className={clsx("text-lg", "font-bold", "mb-4")}>
        Добавить новую книгу
      </h1>
      {message && (
        <p className={clsx("mb-4", "text-red-600", "font-bold")}>{message}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className={clsx(
          'w-max',
          'py-4',
          'pr-4',
          "border-y",
          'border-r',
          "border-zinc-400",
          "[&_label]:block",
          "[&_label]:my-2"
        )}
      >
        <div>
          <label>
            Наименование:
            <Input
              type="text"
              name="Наименование"
              value={form.Наименование}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Год издания:
            <Input
              type="number"
              name="Год_издания"
              value={form.Год_издания}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Код автора:
            <Select
              name="Код_автора"
              value={form.Код_автора}
              onChange={handleChange}
              required
            >
              {authors.map(({ Код_автора, ФИО }) => (
                <option key={Код_автора} value={Код_автора}>
                  {ФИО}
                </option>
              ))}
            </Select>
          </label>
        </div>
        <div>
          <label>
            Код жанра:
            <Select
              name="Код_жанра"
              value={form.Код_жанра}
              onChange={handleChange}
              required
            >
              {genres.map(({ Код_жанра, Наименование }) => (
                <option key={Код_жанра} value={Код_жанра}>
                  {Наименование}
                </option>
              ))}
            </Select>
          </label>
        </div>
        <div>
          <label>
            Код издательства:
            <Select
              name="Код_издательства"
              value={form.Код_издательства}
              onChange={handleChange}
              required
            >
              {publishers.map(({ Код_издательства, Наименование }) => (
                <option key={Код_издательства} value={Код_издательства}>
                  {Наименование}
                </option>
              ))}
            </Select>
          </label>
        </div>
        <div>
          <label>
            Количество на складе:
            <Input
              type="number"
              name="Количество_на_складе"
              value={form.Количество_на_складе}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Стоимость:
            <Input
              type="number"
              step="0.01"
              name="Стоимость"
              value={form.Стоимость}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <Button type="submit" className={clsx("mt-4")}>
          Добавить книгу
        </Button>
      </form>
    </div>
  );
}
