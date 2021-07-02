import React from "react";

type InputProps = {
  children: React.ReactNode;
  label: string;
}

export default function BaseField({ children, label }: InputProps) {
  return (
    <div className="grid grid-cols-1 mb-4">
      <label className="uppercase">{label}</label>
      {children}
    </div>
  );
}
