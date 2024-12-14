import clsx from 'clsx';
import { ComponentProps } from 'react';

export type SelectProps = ComponentProps<"select">;

export function Select(props: SelectProps) {
  return <select {...props} className={clsx("border", "border-zinc-400", "rounded-md", props.className)} />;
}
