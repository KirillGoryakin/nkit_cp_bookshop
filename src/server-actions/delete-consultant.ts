'use server';

import pool from '@/lib/db';

export async function deleteConsultant(id: string) {
  try {
    const query = 'DELETE FROM Продавцы_консультанты WHERE Код_продавца = ?';
    await pool.query(query, [id]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Ошибка при удалении' };
  }
}
