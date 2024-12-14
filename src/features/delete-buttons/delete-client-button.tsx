"use client";

import { FaRegTrashAlt } from "react-icons/fa";

import { useRouter } from "next/navigation";
import { Button } from "@/components/form";
import clsx from "clsx";
import { deleteClient } from '@/server-actions/delete-client';

export type DeleteClientButtonProps = { id: string };

export function DeleteClientButton({ id }: DeleteClientButtonProps) {
  const { refresh } = useRouter();
  return (
    <Button
      onClick={() => deleteClient(id).then(refresh)}
      className={clsx("bg-red-600", '!p-2', 'border-0', 'rounded-md', 'hover:bg-red-700')}
    >
      <FaRegTrashAlt className={clsx("text-white")} />
    </Button>
  );
}
