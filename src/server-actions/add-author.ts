'use server';

import pool from '@/lib/db';

const query = 'INSERT INTO Авторы (ФИО) VALUES (?)';

export async function addAuthor({ ФИО }: { ФИО: string }) {
  try {
    await pool.query(query, [ФИО]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Ошибка при добавлении автора' };
  }
}
