'use server';

import pool from '@/lib/db';

const query = 'INSERT INTO Издательства (Наименование, Город) VALUES (?, ?)';

export async function addPublisher({ Наименование, Город }: { Наименование: string, Город: string }) {
  try {
    await pool.query(query, [Наименование, Город]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Ошибка при добавлении издательства' };
  }
}
