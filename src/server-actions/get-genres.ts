'use server';

import pool from '@/lib/db';

export type GenreResult = {
  Код_жанра: number;
  Наименование: string;
};

const query = 'SELECT * FROM Жанры';

export async function getGenres() {
  const [rows] = await pool.query(query);
  return rows as GenreResult[];
}
