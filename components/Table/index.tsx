import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useReducer
} from "react";
import SelectableContext, { selectableReducer } from "./SelectableContext";
import Cell from "./Cell";
import SelectableCell from "./SelectableCell";
import SelectableCellHeader from "./SelectableCellHeader";
import Pagination from "./Pagination";

type TableProps = {
  title?: string;
  headerAction?: ReactElement;
  columns: { [name: string]: string | boolean, id: string, capitalize?: boolean }[];
  rows?: { [name: string]: any }[];
  selectable?: boolean;
  perPage?: number;
  page?: number;
  count?: number;
  onPagination?: Dispatch<SetStateAction<number>>;
  actionColumn?: ReactElement;
}

export default function Table({ title, headerAction, columns, rows, selectable, perPage, count, page, onPagination, actionColumn }: TableProps) {
  const [selected, dispatch] = useReducer(selectableReducer, []);
  const value = { selected, dispatch };
  let columnCount = columns.length;

  if (selectable) columnCount += 1;
  if (actionColumn) columnCount += 1;

  return (
    <SelectableContext.Provider value={value}>
      <div className="max-w-full mx-auto sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg bg-white">
          {title && (
            <div className="mx-auto sm:px-6 lg:px-10">
              <div className="py-4 flex flex-row justify-between items-center">
                <h2 className="text-xl font-semibold">{title}</h2>
                {headerAction && (
                  <div>
                    {headerAction}
                  </div>
                )}
              </div>
            </div>
          )}
          <table className="table-auto min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                {selectable && (
                  <SelectableCellHeader length={rows.length} />
                )}
                {columns.map(column => (
                  <th
                    key={column.id}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.title}
                  </th>
                ))}
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, i) => (
              <tr key={i} className="hover:shadow-y">
                {selectable && (
                  <SelectableCell index={i} checked={selected.indexOf(i) !== -1} />
                )}
                {columns.map(column => (
                  <Cell
                    key={column.id}
                    capitalize={column.capitalize}
                  >
                    {row[column.id]}
                  </Cell>
                ))}
                {actionColumn && (
                  <td className="px-6 whitespace-nowrap text-right text-sm font-medium" style={{ maxHeight: 56.8 }}>
                    {React.cloneElement(actionColumn, row)}
                  </td>
                )}
              </tr>
            ))}
            </tbody>
            <tfoot>
            {count > perPage && (
              <tr>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                  colSpan={columnCount}
                >
                  <Pagination page={page} count={count} perPage={perPage}
                              onPagination={onPagination} />
                </td>
              </tr>
            )}
            {!rows.length && (
              <tr>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center"
                  colSpan={columnCount}
                >
                  No se han encontrado resultados
                </td>
              </tr>
            )}
            </tfoot>
          </table>
        </div>
      </div>
    </SelectableContext.Provider>
  );
}
