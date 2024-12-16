"use client";

import { FaRegTrashAlt } from "react-icons/fa";

import { Button } from "@/components/form";
import clsx from "clsx";
import { deleteClient } from "@/server-actions/delete-client";

export type DeleteClientButtonProps = {
  id: string;
  cb?: () => void | Promise<void>;
};

export function DeleteClientButton({ id, cb }: DeleteClientButtonProps) {
  return (
    <Button
      onClick={() => deleteClient(id).then(cb)}
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
