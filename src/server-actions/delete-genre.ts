'use server';

import pool from '@/lib/db';

export async function deleteGenre(id: string) {
  try {
    const query = 'DELETE FROM Жанры WHERE Код_жанра = ?';
    await pool.query(query, [id]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Ошибка при удалении' };
  }
}
