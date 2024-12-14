'use server';

import pool from '@/lib/db';

const query = `
  INSERT INTO Книги (
    Наименование, Год_издания, Код_автора, Код_жанра, Код_издательства, Количество_на_складе, Стоимость
  ) VALUES (?, ?, ?, ?, ?, ?, ?)
`;

export async function addBook(book: Record<string, string>) {
  const values = [
    book.Наименование,
    book.Год_издания,
    book.Код_автора,
    book.Код_жанра,
    book.Код_издательства,
    book.Количество_на_складе,
    book.Стоимость,
  ];
  
  try {
    await pool.query(query, values);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Ошибка при добавлении книги' };
  }
}
