"use client";

import { FaRegTrashAlt } from "react-icons/fa";

import { deleteBook } from "@/server-actions/delete-book";
import { useRouter } from "next/navigation";
import { Button } from "@/components/form";
import clsx from "clsx";

export type DeleteBookButtonProps = { id: string };

export function DeleteBookButton({ id }: DeleteBookButtonProps) {
  const { refresh } = useRouter();
  return (
    <Button
      onClick={() => deleteBook(id).then(refresh)}
      className={clsx("bg-red-600", '!p-2', 'border-0', 'rounded-md', 'hover:bg-red-700')}
    >
      <FaRegTrashAlt className={clsx("text-white")} />
    </Button>
  );
}
