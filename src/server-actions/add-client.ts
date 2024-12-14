'use server';

import pool from '@/lib/db';

const query = 'INSERT INTO Клиенты (ФИО, Адрес, Телефон) VALUES (?, ?, ?)';

export async function addClient({ ФИО, Адрес, Телефон }: { ФИО: string, Адрес: string, Телефон: string }) {
  try {
    await pool.query(query, [ФИО, Адрес, Телефон]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Ошибка при добавлении клиента' };
  }
}
