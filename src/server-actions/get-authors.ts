'use server';

import pool from '@/lib/db';

export type AuthorResult = {
  Код_автора: number;
  ФИО: string;
};

const query = 'SELECT * FROM Авторы';

export async function getAuthors() {
  const [rows] = await pool.query(query);
  return rows as AuthorResult[];
}
