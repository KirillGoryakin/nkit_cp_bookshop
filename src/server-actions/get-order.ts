'use server';

import pool from '@/lib/db';

export type OrderResult = {
  Код_заказа: number,
  Дата_заказа: Date,
  Имя_клиента: string,
  Имя_продавца: string,
  Сумма_заказа: string,
  Код_книги: number,
  Книга: string,
  Количество: number,
  Стоимость: string,
}

const query = `
  SELECT 
    Заказы.Код_заказа, 
    Заказы.Дата_заказа, 
    Клиенты.ФИО AS Имя_клиента, 
    Продавцы_консультанты.ФИО AS Имя_продавца, 
    Заказы.Сумма_заказа,
    Состав_заказов.Код_книги,
    Книги.Наименование AS Книга,
    Состав_заказов.Количество,
    Состав_заказов.Стоимость
  FROM Заказы
  JOIN Клиенты ON Заказы.Код_клиента = Клиенты.Код_клиента
  JOIN Продавцы_консультанты ON Заказы.Код_продавца = Продавцы_консультанты.Код_продавца
  JOIN Состав_заказов ON Заказы.Код_заказа = Состав_заказов.Код_заказа
  JOIN Книги ON Состав_заказов.Код_книги = Книги.Код_книги
  WHERE Заказы.Код_заказа = ?
`;

export async function getOrder(id: string) {
  try {
    const [rows] = await pool.query(query, [id]);
    return rows as OrderResult[];
  } catch (error) {
    console.error("Ошибка получения деталей заказа:", error);
    return [];
  }
}