"use client";

import { Input } from "@/components/form";
import { AddClientForm } from "@/features/add-forms";
import { DeleteClientButton } from "@/features/delete-buttons/delete-client-button";
import { ClientResult, getClients } from "@/server-actions/get-client";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientResult[]>([]);
  const [clientsToDisplay, setClientsToDisplay] =
    useState<ClientResult[]>(clients);
  const refresh = useCallback(() => {
    getClients().then((data) => {
      setClients(data);
      setClientsToDisplay(
        [...data].sort((a, b) => b.Код_клиента - a.Код_клиента)
      );
    });
  }, []);
  useEffect(() => {
    refresh();
  }, [refresh]);
  return (
    <main className={clsx("p-4")}>
      <h1 className={clsx("text-4xl", "font-bold", "mb-4")}>Клиенты</h1>
      <AddClientForm className={clsx("mb-4")} cb={refresh} />
      <h1 className={clsx("text-lg", "font-bold", "mb-4")}>Список клиентов</h1>
      <div className={clsx("mb-4")}>
        Поиск по ФИО:{" "}
        <Input
          type="text"
          onChange={(e) => {
            const sorted = [...clients].sort(
              (a, b) => b.Код_клиента - a.Код_клиента
            );
            if (e.target.value) {
              setClientsToDisplay(
                sorted.filter((b) =>
                  b.ФИО
                    .toLocaleLowerCase()
                    .includes(e.target.value.toLocaleLowerCase())
                )
              );
            } else {
              setClientsToDisplay(sorted);
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
            <th>Код клиента</th>
            <th>ФИО</th>
            <th>Адрес</th>
            <th>Телефон</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {clientsToDisplay.map((client) => (
            <tr key={client.Код_клиента}>
              <td>{client.Код_клиента}</td>
              <td>{client.ФИО}</td>
              <td>{client.Адрес}</td>
              <td>{client.Телефон}</td>
              <td>
                <DeleteClientButton
                  id={client.Код_клиента.toString()}
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
