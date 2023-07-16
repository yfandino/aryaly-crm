import { ChangeEvent } from "react";
import BaseField from "./BaseField";

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent) => void;
  enum: string[];
  enumNames: string[];
}

export default function Select({ label, name, placeholder, value = "", onChange, enum: options, enumNames }: InputProps) {
  return (
    <BaseField label={label}>
      <select name={name} onChange={onChange} value={value} className="p-2 border-2 mt-1.5 focus:outline-none focus:ring-2">
        <option value="">{placeholder}</option>
        {options?.map((option, i) => (
          <option key={i} value={option}>{enumNames[i]}</option>
        ))}
      </select>
    </BaseField>
  );
}