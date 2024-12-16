"use client";

import { FaRegTrashAlt } from "react-icons/fa";

import { Button } from "@/components/form";
import clsx from "clsx";
import { deleteConsultant } from '@/server-actions/delete-consultant';

export type DeleteConsultantButtonProps = {
  id: string;
  cb?: () => void | Promise<void>;
};

export function DeleteConsultantButton({ id, cb }: DeleteConsultantButtonProps) {
  return (
    <Button
      onClick={() => deleteConsultant(id).then(cb)}
      className={clsx("bg-red-600", '!p-2', 'border-0', 'rounded-md', 'hover:bg-red-700')}
    >
      <FaRegTrashAlt className={clsx("text-white")} />
    </Button>
  );
}
