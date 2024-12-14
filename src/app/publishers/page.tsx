import { AddPublisherForm } from '@/features/add-forms/add-publisher-form';
import { DeletePublisherButton } from '@/features/delete-buttons/delete-publisher-button';
import { getPublishers } from '@/server-actions/get-publishers';
import clsx from 'clsx';

export default async function PublishersPage() {
  const publishers = await getPublishers();

  return (
    <main className={clsx("p-4")}>
      <h1 className={clsx("text-4xl", "font-bold", "mb-4")}>Издательства</h1>
      <AddPublisherForm className={clsx("mb-4")} />
      <h1 className={clsx("text-lg", "font-bold", "mb-4")}>
        Список издательств
      </h1>
      <table
        cellPadding="10"
        className={clsx(
          "border-collapse",
          "w-full",
          "[&_th]:bg-zinc-100",
          "[&_th]:border",
          "[&_td]:border",
          "[&_th]:border-zinc-300",
          "[&_td]:border-zinc-300"
        )}
      >
        <thead>
          <tr>
            <th>Код издательства</th>
            <th>Наименование</th>
            <th>Город</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {[...publishers]
            .sort((a, b) => b.Код_издательства - a.Код_издательства)
            .map((publisher) => (
              <tr key={publisher.Код_издательства}>
                <td>{publisher.Код_издательства}</td>
                <td>{publisher.Наименование}</td>
                <td>{publisher.Город}</td>
                <td>
                  <DeletePublisherButton
                    id={publisher.Код_издательства.toString()}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}
