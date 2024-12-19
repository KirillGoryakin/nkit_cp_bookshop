"use client";

import { Button, Input } from "@/components/form";
import { addGenre } from "@/server-actions/add-genre";
import clsx from "clsx";
import { FormEvent, useState } from "react";

export function AddGenreForm({
  className,
  cb,
}: {
  className?: string;
  cb?: () => void | Promise<void>;
}) {
  const [Наименование, setНаименование] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await addGenre({ Наименование });
    if (response.success) {
      setНаименование("");
      cb?.();
    } else {
      setMessage(response.error || "Произошла ошибка");
    }
  };

  return (
    <div className={clsx(className)}>
      <h1 className={clsx("text-lg", "font-bold", "mb-4")}>Добавить жанр</h1>
      {message && (
        <p className={clsx("mb-4", "text-red-600", "font-bold")}>{message}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className={clsx(
          "w-max",
          "py-4",
          "pr-4",
          "border-y",
          "border-r",
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
              value={Наименование}
              onChange={(e) => setНаименование(e.target.value)}
              required
            />
          </label>
        </div>
        <Button type="submit" className={clsx("mt-4")}>
          Добавить жанр
        </Button>
      </form>
    </div>
  );
}
