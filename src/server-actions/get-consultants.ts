'use server';

import pool from '@/lib/db';

export type ConsultantResult = {
  Код_продавца: number;
  ФИО: string;
  Адрес: string;
  Телефон: string;
  Зарплата: string;
  Администратор: boolean;
};

const query = 'SELECT * FROM Продавцы_консультанты';

export async function getConsultants() {
  const [rows] = await pool.query(query);
  return (rows as ConsultantResult[]).map((r) => ({
    ...r,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Администратор: (r.Администратор as any)[0] === 1
  }));
}
