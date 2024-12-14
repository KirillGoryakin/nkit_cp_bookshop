'use server';

import pool from '@/lib/db';

export async function deletePublisher(id: string) {
  try {
    const query = 'DELETE FROM Издательства WHERE Код_издательства = ?';
    await pool.query(query, [id]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Ошибка при удалении' };
  }
}
