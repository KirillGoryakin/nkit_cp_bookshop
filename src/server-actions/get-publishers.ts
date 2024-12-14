'use server';

import pool from '@/lib/db';


export type PublisherResult = {
  Код_издательства: number;
  Наименование: string;
  Город: string;
};

const query = 'SELECT * FROM Издательства';

export async function getPublishers() {
  const [rows] = await pool.query(query);
  return rows as PublisherResult[];
}
