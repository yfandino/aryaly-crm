import React, { useState } from "react";
import { useSelectable } from "./SelectableContext";

type SelectableCellHeaderProps = {
  length: number;
}

export default function SelectableCellHeader({ length }: SelectableCellHeaderProps) {
  const [checked, setChecked] = useState(false);
  const { dispatch } = useSelectable();

  const onChange = () => {
    if (checked) {
      dispatch({ type: "unselectAll" });
    } else {
      dispatch({ type: "selectAll", payload: length });
    }
    setChecked(!checked);
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
