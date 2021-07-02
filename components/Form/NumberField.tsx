import { ChangeEvent } from "react";
import BaseField from "./BaseField";

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  step?: number
  value: number;
  onChange: (event: ChangeEvent) => void;
}

export default function TextField({ label, step, name, placeholder, value, onChange }: InputProps) {
  return (
    <BaseField label={label}>
      <input
        className="py-2 border-2 mt-1.5 focus:outline-none focus:ring-2"
        type="number"
        name={name}
        step={step}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </BaseField>
  );
}