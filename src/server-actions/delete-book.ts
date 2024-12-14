'use server';

import pool from '@/lib/db';

export async function deleteBook(id: string) {
  try {
    const query = 'DELETE FROM Книги WHERE Код_книги = ?';
    await pool.query(query, [id]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Ошибка при удалении' };
  }
}
