import { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler;
  children: ReactNode[] | ReactNode | string;
  className?: string;
}
export default function Button({ type = "button", onClick, className, children }: ButtonProps) {
  return (
    <button
      className={`bg-indigo-800 px-6 py-2 rounded text-white flex items-center gap-2 ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
