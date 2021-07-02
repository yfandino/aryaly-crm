import { PlusIcon } from "@heroicons/react/outline";
import Portal from "./Portal";

export default function FloatButton({ onClick }) {
  return (
    <Portal>
      <button
        className="bg-indigo-800 rounded-full w-16 h-16 shadow-lg flex items-center
          justify-center fixed bottom-8 right-16 hover:bg-indigo-900 focus:outline-none
          transition-colors"
        onClick={onClick}
      >
        <PlusIcon className="w-5 h-5 color text-white"/>
      </button>
    </Portal>
  );
}
