"use client";

import { FaRegTrashAlt } from "react-icons/fa";

import { Button } from "@/components/form";
import clsx from "clsx";
import { deleteAuthor } from "@/server-actions/delete-author";

export type DeleteAuthorButtonProps = {
  id: string;
  cb?: () => void | Promise<void>;
};

export function DeleteAuthorButton({ id, cb }: DeleteAuthorButtonProps) {
  return (
    <Button
      onClick={() => deleteAuthor(id).then(cb)}
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
