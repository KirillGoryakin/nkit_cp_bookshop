'use server';

import pool from '@/lib/db';

export type ClientResult = {
  Код_клиента: number;
  ФИО: string;
  Адрес: string;
  Телефон: string;
};

const query = 'SELECT * FROM Клиенты';

export async function getClients() {
  const [rows] = await pool.query(query);
  return rows as ClientResult[];
}
