"use client";

import { FaRegTrashAlt } from "react-icons/fa";

import { useRouter } from "next/navigation";
import { Button } from "@/components/form";
import clsx from "clsx";
import { deleteAuthor } from '@/server-actions/delete-author';

export type DeleteAuthorButtonProps = { id: string };

export function DeleteAuthorButton({ id }: DeleteAuthorButtonProps) {
  const { refresh } = useRouter();
  return (
    <Button
      onClick={() => deleteAuthor(id).then(refresh)}
      className={clsx("bg-red-600", '!p-2', 'border-0', 'rounded-md', 'hover:bg-red-700')}
    >
      <FaRegTrashAlt className={clsx("text-white")} />
    </Button>
  );
}
