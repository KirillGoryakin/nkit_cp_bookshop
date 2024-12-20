"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { addClient } from "@/server-actions/add-client";
import { Button, Input } from "@/components/form";
import clsx from "clsx";

export function AddClientForm({
  className,
  cb,
}: {
  className?: string;
  cb?: () => void | Promise<void>;
}) {
  const [form, setForm] = useState({ ФИО: "", Адрес: "", Телефон: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await addClient(form);
    if (response.success) {
      setForm({ ФИО: "", Адрес: "", Телефон: "" });
      cb?.();
    } else {
      setMessage(response.error || "Произошла ошибка");
    }
  };

  return (
    <div className={clsx(className)}>
      <h1 className={clsx("text-lg", "font-bold", "mb-4")}>Добавить клиента</h1>
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
            ФИО:
            <Input
              type="text"
              name="ФИО"
              value={form.ФИО}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Адрес:
            <Input
              type="text"
              name="Адрес"
              value={form.Адрес}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Телефон:
            <Input
              type="text"
              name="Телефон"
              value={form.Телефон}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <Button type="submit" className={clsx("mt-4")}>
          Добавить клиента
        </Button>
      </form>
    </div>
  );
}
