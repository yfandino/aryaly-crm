import Portal from "./Portal";
import { XIcon } from "@heroicons/react/outline";
import { MouseEventHandler, ReactNode } from "react";

type ModalProps = {
  open?: boolean;
  fullScreen?: boolean,
  handleClose: MouseEventHandler,
  children: ReactNode[] | ReactNode;
}

export default function Modal({ open, fullScreen, handleClose, children }: ModalProps) {
  if (!open) return null;

  let classes = "p-8";

  if (fullScreen) classes += " w-full h-full bg-white fixed top-0"

  return (
    <Portal>
      <div className={classes}>
        <button
          className="absolute top-6 right-8"
          onClick={handleClose}
        >
          <XIcon className="w-5 h-5" />
        </button>
        {children}
      </div>
    </Portal>
  );
}