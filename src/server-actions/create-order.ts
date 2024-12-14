'use server';

import pool from '@/lib/db';

export type OrderContent = { Код_книги: string; Стоимость: number; Количество: number };

export type CreateOrderParams = { Код_клиента: string, Код_продавца: string, Состав: OrderContent[] };

export async function createOrder({ Код_клиента, Код_продавца, Состав }: CreateOrderParams) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Создаем заказ
    const [orderResult] = await connection.query(
      'INSERT INTO Заказы (Дата_заказа, Код_клиента, Код_продавца, Сумма_заказа) VALUES (NOW(), ?, ?, ?)',
      [
        Код_клиента,
        Код_продавца,
        Состав.reduce((sum, item) => sum + +item.Стоимость * item.Количество, 0), // Рассчитываем сумму заказа
      ]
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orderId = (orderResult as any).insertId;

    // Добавляем книги в состав заказа и обновляем количество на складе
    for (const item of Состав) {
      await connection.query(
        'INSERT INTO Состав_заказов (Код_заказа, Код_книги, Количество, Стоимость) VALUES (?, ?, ?, ?)',
        [orderId, item.Код_книги, item.Количество, item.Стоимость]
      );

      await connection.query(
        'UPDATE Книги SET Количество_на_складе = Количество_на_складе - ? WHERE Код_книги = ?',
        [item.Количество, item.Код_книги]
      );
    }

    await connection.commit();
    return { success: true };
  } catch (error) {
    await connection.rollback();
    console.error(error);
    return { success: false, error: 'Ошибка при создании заказа' };
  } finally {
    connection.release();
  }
}
