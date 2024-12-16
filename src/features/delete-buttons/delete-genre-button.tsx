"use client";

import { FaRegTrashAlt } from "react-icons/fa";

import { Button } from "@/components/form";
import clsx from "clsx";
import { deleteGenre } from "@/server-actions/delete-genre";

export type DeleteGenreButtonProps = {
  id: string;
  cb?: () => void | Promise<void>;
};

export function DeleteGenreButton({ id, cb }: DeleteGenreButtonProps) {
  return (
    <Button
      onClick={() => deleteGenre(id).then(cb)}
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
