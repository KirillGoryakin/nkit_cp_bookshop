"use client";

import { FaRegTrashAlt } from "react-icons/fa";

import { Button } from "@/components/form";
import clsx from "clsx";
import { deletePublisher } from '@/server-actions/delete-publisher';

export type DeletePublisherButtonProps = {
  id: string;
  cb?: () => void | Promise<void>;
};

export function DeletePublisherButton({ id, cb }: DeletePublisherButtonProps) {
  return (
    <Button
      onClick={() => deletePublisher(id).then(cb)}
      className={clsx("bg-red-600", '!p-2', 'border-0', 'rounded-md', 'hover:bg-red-700')}
    >
      <FaRegTrashAlt className={clsx("text-white")} />
    </Button>
  );
}
