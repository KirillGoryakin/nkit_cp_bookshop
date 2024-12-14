"use client";

import { FaRegTrashAlt } from "react-icons/fa";

import { useRouter } from "next/navigation";
import { Button } from "@/components/form";
import clsx from "clsx";
import { deleteGenre } from '@/server-actions/delete-genre';

export type DeleteGenreButtonProps = { id: string };

export function DeleteGenreButton({ id }: DeleteGenreButtonProps) {
  const { refresh } = useRouter();
  return (
    <Button
      onClick={() => deleteGenre(id).then(refresh)}
      className={clsx("bg-red-600", '!p-2', 'border-0', 'rounded-md', 'hover:bg-red-700')}
    >
      <FaRegTrashAlt className={clsx("text-white")} />
    </Button>
  );
}
