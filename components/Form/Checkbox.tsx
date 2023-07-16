import React, { ChangeEvent, useState } from "react";

type InputProps = {
  label: string;
  name: string;
  value: boolean;
  onChange: (event: ChangeEvent) => void;
}

export default function Checkbox({ label, name, value = false, onChange }: InputProps) {
  // const onClick = (e) => e.stopPropagation();
  return (
    <div className="flex gap-4 mb-4">
      <input
        className="py-2 border-2 mt-1.5 focus:outline-none focus:ring-2"
        name={name}
        type="checkbox"
        checked={value}
        onChange={onChange}
        // onClick={onClick}
      />
      <label className="uppercase">
        {label}
      </label>
    </div>
  );
}