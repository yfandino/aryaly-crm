import { Button } from "./index";
import { details } from "../config/accountId";

export default function AccountDetails({ data }) {
  return (
    <div className="max-w-full mx-auto sm:px-6 lg:px-8 mb-4">
      <div className="shadow overflow-hidden divide-y divide-gray-200 rounded-lg bg-white">
        <div className="flex justify-between items-center max-w-full mx-auto sm:px-6 lg:px-10 py-4">
          <h2 className="text-xl font-semibold">Detalles de la cuenta</h2>
          <Button>Editar</Button>
        </div>
        <div className="flex flex-wrap sm:px-6 lg:px-10">
          {Object.keys(details).map(key => (
            <div key={key} className="mb-4 inline-flex flex-col flex-noshrink-nogrow-25">
              <div className="text-gray-400">{details[key]}:</div>
              <div>{data[key]}&nbsp;</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}