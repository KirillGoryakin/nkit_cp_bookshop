import { AddGenreForm } from '@/features/add-forms';
import { DeleteGenreButton } from '@/features/delete-buttons/delete-genre-button';
import { getGenres } from '@/server-actions/get-genres';
import clsx from 'clsx';

export default async function GenresPage() {
  const genres = await getGenres();

  return (
    <main className={clsx("p-4")}>
      <h1 className={clsx("text-4xl", "font-bold", "mb-4")}>Жанры</h1>
      <AddGenreForm className={clsx("mb-4")} />
      <h1 className={clsx("text-lg", "font-bold", "mb-4")}>Список жанров</h1>
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
            <th>Код жанра</th>
            <th>Наименование</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {[...genres]
            .sort((a, b) => b.Код_жанра - a.Код_жанра)
            .map((genre) => (
              <tr key={genre.Код_жанра}>
                <td>{genre.Код_жанра}</td>
                <td>{genre.Наименование}</td>
                <td>
                  <DeleteGenreButton id={genre.Код_жанра.toString()} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}
