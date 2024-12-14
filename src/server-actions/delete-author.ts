'use server';

import pool from '@/lib/db';

export async function deleteAuthor(id: string) {
  try {
    const query = 'DELETE FROM Авторы WHERE Код_автора = ?';
    await pool.query(query, [id]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Ошибка при удалении' };
  }
}
