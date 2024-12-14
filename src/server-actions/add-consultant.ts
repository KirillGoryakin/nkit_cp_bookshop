'use server';

import pool from '@/lib/db';

const query = `
  INSERT INTO Продавцы_консультанты (ФИО, Адрес, Телефон, Зарплата, Администратор)
  VALUES (?, ?, ?, ?, ?)
`;

export async function addConsultant({ ФИО, Адрес, Телефон, Зарплата, Администратор }: { ФИО: string, Адрес: string, Телефон: string, Зарплата: string, Администратор: boolean }) {
  try {
    await pool.query(query, [ФИО, Адрес, Телефон, Зарплата, Администратор]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Ошибка при добавлении продавца' };
  }
}
