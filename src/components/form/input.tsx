import clsx from 'clsx';
import { ComponentProps } from 'react';

export type InputProps = ComponentProps<'input'>;

export function Input(props: InputProps) {
  return <input {...props} className={clsx("border", "border-zinc-400", "rounded-md", props.className)} />;
}
