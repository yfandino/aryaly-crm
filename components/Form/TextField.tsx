import { ChangeEvent } from "react";
import BaseField from "./BaseField";

type InputProps = {
  type: "text" | "tel";
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent) => void;
}

export default function TextField({ label, type, name, placeholder, value = "", onChange }: InputProps) {
  return (
    <BaseField label={label}>
      <input
        className="p-2 border-2 mt-1.5 focus:outline-none focus:ring-2"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </BaseField>
  );
}