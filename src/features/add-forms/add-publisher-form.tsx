"use client";

import { Button, Input } from '@/components/form';
import { addPublisher } from '@/server-actions/add-publisher';
import clsx from 'clsx';
import { FormEvent, useState } from "react";

export function AddPublisherForm({
  className,
  cb,
}: {
  className?: string;
  cb?: () => void | Promise<void>;
}) {
  const [Наименование, setНаименование] = useState("");
  const [Город, setГород] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await addPublisher({ Наименование, Город });
    if (response.success) {
      setНаименование("");
      setГород("");
      cb?.();
    } else {
      setMessage(response.error || "Произошла ошибка");
    }
  };

  return (
    <div className={clsx(className)}>
      <h1>Добавить издательство</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
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
        <div>
          <label>
            Город:
            <Input
              type="text"
              value={Город}
              onChange={(e) => setГород(e.target.value)}
              required
            />
          </label>
        </div>
        <Button type="submit" className={clsx("mt-4")}>
          Добавить издательство
        </Button>
      </form>
    </div>
  );
}
