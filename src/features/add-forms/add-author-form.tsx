"use client";

import { Button, Input } from "@/components/form";
import { addAuthor } from "@/server-actions/add-author";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function AddAuthorForm({ className }: { className?: string }) {
  const { refresh } = useRouter();

  const [ФИО, setФИО] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await addAuthor({ ФИО });
    if (response.success) {
      setФИО("");
      refresh();
    } else {
      setMessage(response.error || "Произошла ошибка");
    }
  };

  return (
    <div className={clsx(className)}>
      <h1 className={clsx("text-lg", "font-bold", "mb-4")}>Добавить автора</h1>
      {message && (
        <p className={clsx("mb-4", "text-red-600", "font-bold")}>{message}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            ФИО:
            <Input
              type="text"
              value={ФИО}
              onChange={(e) => setФИО(e.target.value)}
              required
            />
          </label>
        </div>
        <Button type="submit" className={clsx("mt-4")}>
          Добавить автора
        </Button>
      </form>
    </div>
  );
}
