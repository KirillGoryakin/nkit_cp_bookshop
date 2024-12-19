"use client";

import { Button, Input, Select } from "@/components/form";
import { createOrder, CreateOrderParams } from "@/server-actions/create-order";
import { BookResult, getBooks } from "@/server-actions/get-books";
import { ClientResult } from "@/server-actions/get-client";
import { ConsultantResult } from "@/server-actions/get-consultants";
import clsx from "clsx";
import { useState, useEffect, FormEvent, useCallback } from "react";

export function AddOrderForm({
  clients,
  consultants,
}: {
  clients: ClientResult[];
  consultants: ConsultantResult[];
}) {
  const [books, setBooks] = useState<BookResult[]>([]);
  const [booksToDisplay, setBooksToDisplay] = useState<BookResult[]>([]);
  const [order, setOrder] = useState<CreateOrderParams>({
    Код_клиента: clients?.[0].Код_клиента.toString(),
    Код_продавца: consultants?.[0].Код_продавца.toString(),
    Состав: [],
  });
  const [message, setMessage] = useState("");

  const fetchBooks = useCallback(async () => {
    const books = (await getBooks()).filter(
      (book) => book.Количество_на_складе > 0
    );
    setBooks(books);
    setBooksToDisplay([...books].sort((a, b) => b.Код_книги - a.Код_книги));
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleAddBook = (bookId: string) => {
    const book = books.find((b) => b.Код_книги === +bookId);
    if (!book) return;

    const existing = order.Состав.find((item) => item.Код_книги === bookId);
    if (existing) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        Состав: prevOrder.Состав.map((item) =>
          item.Код_книги === bookId
            ? {
                ...item,
                Количество: Math.min(
                  item.Количество + 1,
                  book.Количество_на_складе
                ),
              }
            : item
        ),
      }));
    } else if (book.Количество_на_складе > 0) {
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

    if (!order.Состав.length) return;

    const response = await createOrder(order);
    if (response.success) {
      setMessage("Заказ успешно создан!");
      setOrder({ Код_клиента: "", Код_продавца: "", Состав: [] });
      fetchBooks();
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
        <div className={clsx('mt-2')}>
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
        <div className={clsx("mb-4")}>
          Поиск по наименованию:{" "}
          <Input
            type="text"
            onChange={(e) => {
              const sorted = [...books].sort(
                (a, b) => b.Код_книги - a.Код_книги
              );
              if (e.target.value) {
                setBooksToDisplay(
                  sorted.filter((b) =>
                    b.Наименование
                      .toLocaleLowerCase()
                      .includes(e.target.value.toLocaleLowerCase())
                  )
                );
              } else {
                setBooksToDisplay(sorted);
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
              <th>Код книги</th>
              <th>Наименование книги</th>
              <th>Количество на складе</th>
              <th>Стоимость</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {booksToDisplay.map((book) => (
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
                    Добавить к заказу
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className={clsx("text-xl", "font-bold", "mt-4")}>Состав заказа</h2>
        <ul className={clsx("list-disc", "pl-4", "py-4")}>
          {order.Состав.map((item) => {
            const book = books.find((b) => b.Код_книги === +item.Код_книги);
            if (!book) return null;
            return (
              <li key={item.Код_книги}>
                <b>{book.Наименование}</b>, Количество:{" "}
                <Input
                  type="number"
                  value={item.Количество}
                  min={1}
                  max={book.Количество_на_складе}
                  onChange={(e) =>
                    setOrder((prevOrder) => ({
                      ...prevOrder,
                      Состав: prevOrder.Состав.map((i) =>
                        i.Код_книги === item.Код_книги
                          ? {
                              ...i,
                              Количество: Math.min(
                                +e.target.value,
                                book.Количество_на_складе
                              ),
                            }
                          : i
                      ),
                    }))
                  }
                />
                , Сумма: {item.Количество * item.Стоимость} ₽
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
            );
          })}
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
