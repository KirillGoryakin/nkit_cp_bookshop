'use server';

import pool from '@/lib/db';

export type BookResult = {
  'Код_книги': number;
  'Наименование': string;
  'Год_издания': number;
  'Автор': string;
  'Жанр': string;
  'Издательство': string;
  'Количество_на_складе': number;
  'Стоимость': string;
};

const query = `
  SELECT 
    Книги.Код_книги,
    Книги.Наименование,
    Книги.Год_издания,
    Авторы.ФИО AS Автор,
    Жанры.Наименование AS Жанр,
    Издательства.Наименование AS Издательство,
    Книги.Количество_на_складе,
    Книги.Стоимость
  FROM Книги
  JOIN Авторы ON Книги.Код_автора = Авторы.Код_автора
  JOIN Жанры ON Книги.Код_жанра = Жанры.Код_жанра
  JOIN Издательства ON Книги.Код_издательства = Издательства.Код_издательства
`;

export async function getBooks() {
  const [rows] = await pool.query(query);
  return rows as BookResult[];
}
