'use client';

import { getOrder, OrderResult } from '@/server-actions/get-order';
import clsx from 'clsx';
import { useState, useEffect } from "react";

export function SingleOrder({ id }: { id: string }) {
  const [order, setOrder] = useState<OrderResult[]>();
  
  useEffect(() => {
    if (id) {
      getOrder(id).then(setOrder);
    }
  }, [id]);

  if (!order) {
    return <p className={clsx('p-4')}>Загрузка данных о заказе...</p>;
  }
  if (!order.length) {
    return <p className={clsx("p-4")}>Заказ пуст.</p>;
  }

  const { Имя_клиента, Имя_продавца, Дата_заказа, Сумма_заказа } =
    order[0];

  return (
    <main className={clsx("p-4")}>
      <h1 className={clsx("text-4xl", "font-bold", "mb-4")}>
        Детали заказа #{id}
      </h1>
      <p>
        <strong>Дата заказа:</strong> {Дата_заказа.toLocaleString()}
      </p>
      <p>
        <strong>Имя клиента:</strong> {Имя_клиента}
      </p>
      <p>
        <strong>Имя продавца:</strong> {Имя_продавца}
      </p>
      <p>
        <strong>Сумма заказа:</strong> {Сумма_заказа} ₽
      </p>

      <h2 className={clsx("text-xl", "font-bold", "my-4")}>Состав заказа</h2>
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
            <th>Наименование книги</th>
            <th>Количество</th>
            <th>Стоимость</th>
          </tr>
        </thead>
        <tbody>
          {order.map((item) => (
            <tr key={item.Код_книги}>
              <td>{item.Код_книги}</td>
              <td>{item.Книга}</td>
              <td>{item.Количество}</td>
              <td>{item.Стоимость} ₽</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
