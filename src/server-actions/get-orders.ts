'use server';

import pool from '@/lib/db';

export type OrderResult = {
  Код_заказа: number;
  Дата_заказа: Date;
  Имя_клиента: string;
  Имя_продавца: string;
  Сумма_заказа: string;
};

export type OrderFilters = { startDate: string, endDate: string, client: string, seller: string };

const query = `
  SELECT 
    Заказы.Код_заказа, 
    Заказы.Дата_заказа, 
    Клиенты.ФИО AS Имя_клиента, 
    Продавцы_консультанты.ФИО AS Имя_продавца, 
    Заказы.Сумма_заказа
  FROM Заказы
  JOIN Клиенты ON Заказы.Код_клиента = Клиенты.Код_клиента
  JOIN Продавцы_консультанты ON Заказы.Код_продавца = Продавцы_консультанты.Код_продавца
`;

const filteredQuery = `
  SELECT 
    Заказы.Код_заказа, 
    Заказы.Дата_заказа, 
    Клиенты.ФИО AS Имя_клиента, 
    Продавцы_консультанты.ФИО AS Имя_продавца, 
    Заказы.Сумма_заказа
  FROM Заказы
  JOIN Клиенты ON Заказы.Код_клиента = Клиенты.Код_клиента
  JOIN Продавцы_консультанты ON Заказы.Код_продавца = Продавцы_консультанты.Код_продавца
  WHERE (? IS NULL OR Заказы.Дата_заказа >= ?)
    AND (? IS NULL OR Заказы.Дата_заказа <= ?)
    AND (? IS NULL OR Клиенты.Код_клиента = ?)
    AND (? IS NULL OR Продавцы_консультанты.Код_продавца = ?)
`;

export async function getOrders(filters?: OrderFilters) {
  const hasFilters = !!filters && Object.values(filters).every((v) => !!v);
  try {
    if (!hasFilters) {
      const [rows] = await pool.query(query);
      return rows as OrderResult[];
    }
    const { startDate, endDate, client, seller } = filters;
    const values = [
      startDate, startDate, 
      endDate, endDate, 
      client, client, 
      seller, seller
    ];
    const [rows] = await pool.query(filteredQuery, values);
    return rows as OrderResult[];
  } catch (error) {
    console.error("Ошибка получения заказов:", error);
    return [];
  }
}