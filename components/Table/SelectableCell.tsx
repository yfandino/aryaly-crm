import React, { ReactNode, useState } from "react";
import { useSelectable } from "./SelectableContext";

type CellProps = {
  index?: number;
  checked: boolean;
}

export default function SelectableCell({ index, checked }: CellProps) {
  const { dispatch } = useSelectable();

  const onChange = () => {
    if (checked) dispatch({ type: "unselect", payload: index });
    else dispatch({ type: "select", payload: index });
  }

  return (
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex flex-col items-center justify-center">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-gray-600"
            checked={checked}
            onChange={onChange}
          />
        </label>
      </div>
    </td>
  );
}
