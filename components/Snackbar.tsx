import { Portal } from "./index";
import { ExclamationCircleIcon, XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

type SnackBarProps = {
  title: string;
  type?: "error" | "success" | "warning";
  message?: string | string[];
  delay?: number;
}

export default function Snackbar({ title, type, message, delay = 5 }: SnackBarProps) {
  const [open, setOpen] = useState(true);
  let background, titleColor, iconColor, messageColor;

  useEffect(() => {
    const timeout = setTimeout(() => setOpen(false), delay * 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  switch (type) {
    case "error": {
      background = "bg-red-100";
      titleColor = "text-red-900";
      iconColor = "text-red-500";
      messageColor = "text-red-500";
      break;
    }
    case "success": {
      background = "bg-green-100";
      titleColor = "text-green-700";
      iconColor = "text-green-500";
      messageColor = "text-green-600";
      break;
    }
    case "warning": {
      background = "bg-yellow-100";
      titleColor = "text-yellow-600";
      iconColor = "text-yellow-500";
      messageColor = "text-yellow-500";
      break;
    }
    default: {
      background = "bg-gray-600";
      titleColor = "text-white";
      iconColor = "text-white";
      messageColor = "text-white";
    }
  }

  const onClose = () => setOpen(false);

  if (!open) return null;

  return (
    <Portal>
      <div className={`py-4 px-5 min-w-min fixed bottom-4 rounded left-1/2 transform -translate-x-1/2 ${background}`}>
        <div className="flex flex-row items-center gap-3">
          <ExclamationCircleIcon className={`${iconColor} w-5 h-5`} />
          <h6 className={`${titleColor} font-semibold flex-1 mr-8`}>{title}</h6>
          <button onClick={onClose}>
            <XIcon className={`${iconColor} w-5 h-5`} />
          </button>
        </div>
        {message && (
          <div className="flex flex-row items-center gap-3 mt-2">
            <div className={`${messageColor} pl-8`}>
              {Array.isArray(message)
                ? (
                  <ul className="list-disc list-inside">
                    {message.map(m => (<li key={m}>{m}</li>))}
                  </ul>
                )
                : (
                  <span>{message}</span>
                )
              }
            </div>
          </div>
        )}
      </div>
    </Portal>
  );
}
