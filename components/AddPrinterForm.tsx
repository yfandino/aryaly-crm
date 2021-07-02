import { useSearch } from "../lib/supabase";
import { Button, Form } from "./index";
import { useState } from "react";
import { XIcon } from "@heroicons/react/solid";

type Props = {
  accountId: number;
  onSubmit: (printerId: string) => void;
}

export default function AddPrinterForm({ accountId, onSubmit }: Props) {
  const [search, { data, loading }] = useSearch("table_printer");
  const [selected, setSelected] = useState(null);

  const handleSubmit = async ({ searchTerms }) => {
    await search("model", searchTerms)
  }

  const onSelect = (printer) => {
    setSelected(printer);
  }

  return (
    <>
      <Form
        inputs={[{ name: "searchTerms", type: "text", label: "Buscar", placeholder: "Canon Maxify MB750" }]}
        onSubmit={handleSubmit}
      >
        {loading && "Buscando..."}
        {data && (
          <ul className="relative -top-4 max-h-36 overflow-x-auto shadow-xl">
            {data.map(printer => (
              <li
                key={printer.id}
                className="p-1 hover:bg-gray-50 cursor-pointer capitalize"
                onClick={() => onSelect(printer)}
              >
                {printer.model}
              </li>
            ))}
          </ul>
        )}
          <Button type="submit">Buscar</Button>
      </Form>
      {selected && (
        <div>
          <div className="mt-8 p-4 bg-gray-100 capitalize flex justify-between">
            <span>{selected.model}</span>
            <XIcon className="h-5 w-5" onClick={() => setSelected(null)}/>
          </div>
          <div className="mt-4">
            <Button onClick={() => onSubmit(selected.id)}>Guardar</Button>
          </div>
        </div>
      )}
    </>
  );
}