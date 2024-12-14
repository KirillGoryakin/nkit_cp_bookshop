"use client";

import { FaRegTrashAlt } from "react-icons/fa";

import { useRouter } from "next/navigation";
import { Button } from "@/components/form";
import clsx from "clsx";
import { deletePublisher } from '@/server-actions/delete-publisher';

export type DeletePublisherButtonProps = { id: string };

export function DeletePublisherButton({ id }: DeletePublisherButtonProps) {
  const { refresh } = useRouter();
  return (
    <Button
      onClick={() => deletePublisher(id).then(refresh)}
      className={clsx("bg-red-600", '!p-2', 'border-0', 'rounded-md', 'hover:bg-red-700')}
    >
      <FaRegTrashAlt className={clsx("text-white")} />
    </Button>
  );
}
