import React, { ReactNode } from "react";

type CellProps = {
  children?: ReactNode | ReactNode[];
  capitalize?: boolean;
}

export default function Cell({ children, capitalize }: CellProps) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap ${capitalize && "capitalize"}`} style={{ maxHeight: 56.8 }} >
      {children}
    </td>
  );
}
