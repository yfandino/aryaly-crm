import Portal from "./Portal";
import { XIcon } from "@heroicons/react/outline";
import { MouseEventHandler, ReactNode } from "react";
import IconButton from "./IconButton";

type ModalProps = {
  open?: boolean;
  fullScreen?: boolean,
  handleClose: MouseEventHandler,
  children: ReactNode[] | ReactNode;
  className?: string;
}

export default function Modal({ open, fullScreen, handleClose, children, className }: ModalProps) {
  if (!open) return null;

  let classes = "p-8 bg-white";

  if (fullScreen) classes += " w-full h-full fixed top-0"
  else classes += " absolute top-1/2 left-1/2 transform -translate-x-1/2" +
                  " -translate-y-1/2 shadow-2xl rounded";

  if (className) classes += " " + className;

  if (fullScreen)
    return (
      <Portal>
        <div className={classes}>
          <div className="absolute top-6 right-8">
            <IconButton
              icon={<XIcon className="w-5 h-5" />}
              onClick={handleClose}
            />
          </div>
          {children}
        </div>
      </Portal>
    );

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(e.target === e.currentTarget) handleClose(e);
  }

  return (
    <Portal>
      <div className="min-w-full h-full fixed top-0 bg-black bg-opacity-30" onClick={onClick}>
        <div className={classes}>
          <div className="absolute top-6 right-8">
            <IconButton
              icon={<XIcon className="w-5 h-5" />}
              onClick={handleClose}
            />
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
}
