import { ChevronDownIcon } from "@heroicons/react/outline";
import { useState } from "react";

export default function Menu() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <div className="mx-auto w-64 text-right">
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button"
            onClick={toggle}
          >
            Options
          <ChevronDownIcon className="w-5 h-5" />
          </button>
        </div>
        {open && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1" role="none">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700">Account settings</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Support</a>
              <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">License</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
