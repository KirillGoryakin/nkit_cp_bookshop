"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { addConsultant } from "@/server-actions/add-consultant";
import clsx from "clsx";
import { Button, Input } from "@/components/form";

export function AddConsultantForm({
  className,
  cb,
}: {
  className?: string;
  cb?: () => void | Promise<void>;
}) {
  const [form, setForm] = useState({
    ФИО: "",
    Адрес: "",
    Телефон: "",
    Зарплата: "",
    Администратор: false,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await addConsultant(form);
    if (response.success) {
      setForm({
        ФИО: "",
        Адрес: "",
        Телефон: "",
        Зарплата: "",
        Администратор: false,
      });
      cb?.();
    } else {
      setMessage(response.error || "Произошла ошибка");
    }
  };

  return (
    <div className={clsx(className)}>
      <h1 className={clsx("text-lg", "font-bold", "mb-4")}>
        Добавить консультанта
      </h1>
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
        <div>
          <label>
            Зарплата:
            <Input
              type="number"
              name="Зарплата"
              value={form.Зарплата}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Администратор:
            <Input
              type="checkbox"
              name="Администратор"
              checked={form.Администратор}
              onChange={handleChange}
            />
          </label>
        </div>
        <Button type="submit" className={clsx("mt-4")}>
          Добавить продавца
        </Button>
      </form>
    </div>
  );
}
