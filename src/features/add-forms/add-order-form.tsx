"use client";

import { Button, Select } from "@/components/form";
import { createOrder, CreateOrderParams } from "@/server-actions/create-order";
import { BookResult, getBooks } from "@/server-actions/get-books";
import { ClientResult } from "@/server-actions/get-client";
import { ConsultantResult } from "@/server-actions/get-consultants";
import clsx from "clsx";
import { useState, useEffect, FormEvent } from "react";

export function AddOrderForm({
  clients,
  consultants,
}: {
  clients: ClientResult[];
  consultants: ConsultantResult[];
}) {
  const [books, setBooks] = useState<BookResult[]>([]);
  const [order, setOrder] = useState<CreateOrderParams>({
    Код_клиента: clients?.[0].Код_клиента.toString(),
    Код_продавца: consultants?.[0].Код_продавца.toString(),
    Состав: [],
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      const books = await getBooks();
      setBooks(books);
    }
    fetchBooks();
  }, []);

  const handleAddBook = (bookId: string) => {
    const book = books.find((b) => b.Код_книги === +bookId);
    if (!book) return;

    const existing = order.Состав.find((item) => item.Код_книги === bookId);
    if (existing) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        Состав: prevOrder.Состав.map((item) =>
          item.Код_книги === bookId
            ? { ...item, Количество: item.Количество + 1 }
            : item
        ),
      }));
    } else {
      setOrder((prevOrder) => ({
        ...prevOrder,
        Состав: [
          ...prevOrder.Состав,
          { Код_книги: bookId, Количество: 1, Стоимость: +book.Стоимость },
        ],
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await createOrder(order);
    if (response.success) {
      setMessage("Заказ успешно создан!");
      setOrder({ Код_клиента: "", Код_продавца: "", Состав: [] });
    } else {
      setMessage(response.error || "Произошла ошибка при создании заказа");
    }
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Клиент:
            <Select
              value={order.Код_клиента}
              onChange={(e) =>
                setOrder({ ...order, Код_клиента: e.target.value })
              }
              required
            >
              {clients.map(({ Код_клиента, ФИО }) => (
                <option key={Код_клиента} value={Код_клиента}>
                  {ФИО}
                </option>
              ))}
            </Select>
          </label>
        </div>
        <div>
          <label>
            Продавец:
            <Select
              value={order.Код_продавца}
              onChange={(e) =>
                setOrder({ ...order, Код_продавца: e.target.value })
              }
              required
            >
              {consultants.map(({ Код_продавца, ФИО }) => (
                <option key={Код_продавца} value={Код_продавца}>
                  {ФИО}
                </option>
              ))}
            </Select>
          </label>
        </div>
        <h2 className={clsx("text-xl", "font-bold", "mt-4")}>Добавить книги</h2>
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
              <th>Наименование</th>
              <th>Количество на складе</th>
              <th>Стоимость</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.Код_книги}>
                <td>{book.Код_книги}</td>
                <td>{book.Наименование}</td>
                <td>{book.Количество_на_складе}</td>
                <td>{book.Стоимость} ₽</td>
                <td>
                  <Button
                    type="button"
                    onClick={() => handleAddBook(book.Код_книги.toString())}
                  >
                    Добавить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className={clsx("text-xl", "font-bold", "mt-4")}>Состав заказа</h2>
        <ul className={clsx("list-disc", "pl-4", "py-4")}>
          {order.Состав.map((item) => (
            <li key={item.Код_книги}>
              <b>
                {
                  books.find((b) => b.Код_книги === +item.Код_книги)
                    ?.Наименование
                }
              </b>
              , Количество: {item.Количество}, Сумма:{" "}
              {item.Количество * item.Стоимость} ₽
              <Button
                className={clsx("ml-4")}
                onClick={() =>
                  setOrder((prevOrder) => ({
                    ...prevOrder,
                    Состав: prevOrder.Состав.filter(
                      (i) => i.Код_книги !== item.Код_книги
                    ),
                  }))
                }
              >
                Удалить
              </Button>
            </li>
          ))}
        </ul>
        <div>
          Итог:{" "}
          {order.Состав.reduce((sum, i) => i.Стоимость * i.Количество + sum, 0)}{" "}
          ₽
        </div>
        <Button type="submit">Создать заказ</Button>
      </form>
    </div>
  );
}
