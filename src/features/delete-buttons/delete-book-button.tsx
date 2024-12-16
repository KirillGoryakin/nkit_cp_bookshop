"use client";

import { FaRegTrashAlt } from "react-icons/fa";

import { deleteBook } from "@/server-actions/delete-book";
import { Button } from "@/components/form";
import clsx from "clsx";

export type DeleteBookButtonProps = {
  id: string;
  cb?: () => void | Promise<void>;
};

export function DeleteBookButton({ id, cb }: DeleteBookButtonProps) {
  return (
    <Button
      onClick={() => deleteBook(id).then(cb)}
      className={clsx(
        "bg-red-600",
        "!p-2",
        "border-0",
        "rounded-md",
        "hover:bg-red-700"
      )}
    >
      <FaRegTrashAlt className={clsx("text-white")} />
    </Button>
  );
}
