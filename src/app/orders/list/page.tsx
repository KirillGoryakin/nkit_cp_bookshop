"use client";

import { useState, useEffect, ChangeEvent } from "react";
import {
  getOrders,
  OrderFilters,
  OrderResult,
} from "@/server-actions/get-orders";
import clsx from "clsx";
import { Button, Input, Select } from "@/components/form";
import Link from "next/link";
import { ClientResult, getClients } from "@/server-actions/get-client";
import {
  ConsultantResult,
  getConsultants,
} from "@/server-actions/get-consultants";

const defaultFilters: OrderFilters = {
  startDate: "",
  endDate: "",
  client: "",
  seller: "",
};

export default function OrdersPage() {
  const [[clients, consultants], setState] = useState<
    [ClientResult[], ConsultantResult[]]
  >([[], []]);
  const [orders, setOrders] = useState<OrderResult[]>([]);
  const [filters, setFilters] = useState<OrderFilters>(defaultFilters);
  useEffect(() => {
    Promise.all([getClients(), getConsultants()]).then(setState);
  }, []);
  useEffect(() => {
    getOrders(filters).then((data) =>
      setOrders(
        [...data].sort(
          (a, b) => b.Дата_заказа.getTime() - a.Дата_заказа.getTime()
        )
      )
    );
  }, [filters]);
  const handleChangeFilter = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };
  return (
    <main className={clsx("p-4")}>
      <h1 className={clsx("text-4xl", "font-bold", "mb-4")}>Список заказов</h1>
      <form className={clsx("my-4", "space-y-2", "[&>label]:block")}>
        <div>
          <label>
            Дата начала:
            <Input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChangeFilter}
            />
          </label>
          <span> &mdash; </span>
          <label>
            Дата окончания:
            <Input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChangeFilter}
            />
          </label>
        </div>
        <label>
          Клиент:
          <Select
            name="client"
            value={filters.client}
            onChange={handleChangeFilter}
          >
            <option value="">-</option>
            {clients.map((i) => (
              <option key={i.Код_клиента} value={i.Код_клиента}>
                {i.ФИО}
              </option>
            ))}
          </Select>
        </label>
        <label>
          Продавец:
          <Select
            name="seller"
            value={filters.seller}
            onChange={handleChangeFilter}
          >
            <option value="">-</option>
            {consultants.map((i) => (
              <option key={i.Код_продавца} value={i.Код_продавца}>
                {i.ФИО}
              </option>
            ))}
          </Select>
        </label>
        <Button onClick={() => setFilters(defaultFilters)}>Сбросить фильтры</Button>
      </form>
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
            <th>Код заказа</th>
            <th>Дата заказа</th>
            <th>Клиент</th>
            <th>Продавец</th>
            <th>Сумма заказа</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.Код_заказа}>
              <td>{order.Код_заказа}</td>
              <td>{order.Дата_заказа.toLocaleString()}</td>
              <td>{order.Имя_клиента}</td>
              <td>{order.Имя_продавца}</td>
              <td>{order.Сумма_заказа} ₽</td>
              <td>
                <Button>
                  <Link href={`/orders/${order.Код_заказа}`}>Просмотр</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
