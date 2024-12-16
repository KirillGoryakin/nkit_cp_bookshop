'use server';

import pool from '@/lib/db';

export type ReportResult = {
  Код_книги: number;
  Книга: string;
  Продано_экземпляров: string;
  Общая_выручка: string;
}

const query = `
  SELECT 
    Книги.Код_книги,
    Книги.Наименование AS Книга,
    SUM(Состав_заказов.Количество) AS Продано_экземпляров,
    SUM(Состав_заказов.Количество * Состав_заказов.Стоимость) AS Общая_выручка
  FROM Состав_заказов
  JOIN Книги ON Состав_заказов.Код_книги = Книги.Код_книги
  JOIN Заказы ON Состав_заказов.Код_заказа = Заказы.Код_заказа
  WHERE Заказы.Дата_заказа BETWEEN ? AND ?
  GROUP BY Книги.Код_книги, Книги.Наименование
  ORDER BY Общая_выручка DESC
`;

export async function getSalesReport({ start, end }: {start: string, end: string}) {
  try {
    const [rows] = await pool.query(query, [start, end]);
    return rows as ReportResult[];
  } catch (error) {
    console.error(error);
    return [];
  }
}
