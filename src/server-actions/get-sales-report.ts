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
  GROUP BY Книги.Код_книги, Книги.Наименование
  ORDER BY Общая_выручка DESC
`;

export async function getSalesReport() {
  try {
    const [rows] = await pool.query(query);
    return rows as ReportResult[];
  } catch (error) {
    console.error(error);
    return [];
  }
}
