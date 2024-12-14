import { AddOrderForm } from '@/features/add-forms';
import { getClients } from "@/server-actions/get-client";
import { getConsultants } from "@/server-actions/get-consultants";
import clsx from 'clsx';

export default async function AddOrderPage() {
  const [clients, consultants] = await Promise.all([
    getClients(),
    getConsultants(),
  ]);
  return (
    <main className={clsx('p-4')}>
      <h1 className={clsx("text-4xl", "font-bold", "mb-4")}>Создать заказ</h1>
      <AddOrderForm clients={clients} consultants={consultants} />
    </main>
  );
}
