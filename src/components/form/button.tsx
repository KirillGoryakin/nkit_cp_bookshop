import clsx from "clsx";
import { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button">;

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "border",
        "border-zinc-400",
        "rounded-md",
        "px-1",
        "py-0.5",
        props.className
      )}
    />
  );
}
