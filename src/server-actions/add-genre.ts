'use server';

import pool from '@/lib/db';

const query = 'INSERT INTO Жанры (Наименование) VALUES (?)';

export async function addGenre({ Наименование }: { Наименование: string }) {
  try {
    await pool.query(query, [Наименование]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Ошибка при добавлении жанра' };
  }
}
