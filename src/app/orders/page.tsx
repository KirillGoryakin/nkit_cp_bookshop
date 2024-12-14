"use client";

import { AddOrderForm } from "@/features/add-forms";
import { ClientResult, getClients } from "@/server-actions/get-client";
import {
  ConsultantResult,
  getConsultants,
} from "@/server-actions/get-consultants";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function AddOrderPage() {
  const [[clients, consultants], setState] = useState<
    [ClientResult[], ConsultantResult[]]
  >([[], []]);
  useEffect(() => {
    Promise.all([getClients(), getConsultants()]).then(setState);
  }, []);
  return (
    <main className={clsx("p-4")}>
      <h1 className={clsx("text-4xl", "font-bold", "mb-4")}>Создать заказ</h1>
      {clients.length > 0 && consultants.length > 0 ? (
        <AddOrderForm clients={clients} consultants={consultants} />
      ) : (
        "Нет консультантов или клиентов"
      )}
    </main>
  );
}
