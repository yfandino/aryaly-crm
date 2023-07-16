import React, { Children, FunctionComponent, ReactElement } from "react";
import { EyeIcon, TrashIcon } from "@heroicons/react/solid";
import IconButton from "../IconButton";

type TableActionsProps = {
  row?: { [name: string]: any },
  onDelete?: (any) => void;
  redirectPath?: string;
  children?: (row) => ReactElement;
}

export default function TableActions({ row, onDelete, redirectPath, children }: TableActionsProps) {
  return (
    <div className="inline-flex px-4">
      <IconButton onClick={() => onDelete(row)} icon={<TrashIcon className="w-5 h-5" />} tooltipText="Eliminar" />
      {redirectPath && (
        <IconButton icon={<EyeIcon className="w-5 h-5" />} href={`${redirectPath}/${row.id}`} />
      )}
      {children(row)}
    </div>
  );
}
