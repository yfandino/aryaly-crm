import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useQuery, useInsert } from "../../lib/supabase";
import { Form, Modal, Snackbar, Table, Button } from "../../components";
import { EyeIcon, TrashIcon } from "@heroicons/react/outline";

const inputs = [
  { name: "companyName", type: "text", label: "Nombre", placeholder: "Nombre" +
    " de compañia o Autónomo"},
  { name: "taxId", type: "text", label: "NIF / CIF", placeholder: "NIF" },
  { name: "phoneNumber", type: "tel", label: "Teléfono", placeholder: "912000000" },
  { name: "address", type: "text", label: "Dirección", placeholder: "Calle" +
    " López de hoyos, 127, Local 1, Madrid" },
  { name: "email", type: "email", label: "Correo electrónico", placeholder: "madrid.lopezdehoyos@prink.es" },
];

const columns = [
  { title: "Nombre", id: "companyName" },
  { title: "NIF/ CIF", id: "taxId" },
  { title: "Teléfono(s)", id: "phoneNumber" },
  { title: "Dirección", id: "address" },
  { title: "email", id: "email" }
];

export default function Index() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1)
  const [offset, setOffset] = useState((page - 1) * limit);
  const [open, setOpen] = useState(false);
  const {
    loading: queryIsLoading,
    error: queryError,
    rows,
    count
  } = useQuery("table_account", { offset, limit });
  const [
    insertAccount,
    { loading: insertIsLoading,
      data,
      error: insertError
    }] = useInsert("table_account");

  useEffect(() => {
    setOffset((page - 1) * limit);
  }, [page, limit]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (account) => {
    account.phoneNumber = [account.phoneNumber];
    await insertAccount([account]);
    setOpen(false);
  }

  if (queryIsLoading) return <div>Loading...</div>

  return (
    <>
      <Head>
        <title>Store manager - Cuentas</title>
      </Head>
      <main>
        <Table
          title="Cuentas"
          headerAction={<Button onClick={handleOpen}>Añadir</Button>}
          columns={columns}
          rows={rows}
          perPage={limit}
          count={count}
          page={page}
          onPagination={setPage}
          selectable
          actionColumn={<TableActions />}
        />
      </main>
      <Modal open={open} handleClose={handleClose} fullScreen>
        <Form
          inputs={inputs}
          title="Crear nueva cuenta"
          onSubmit={handleSubmit}
        />
      </Modal>
      {insertError && (
        <Snackbar
          title="Ops, ha ocurrido un error"
          type="error"
          message={insertError.message}
          delay={10}
        />
      )}
      {queryError && (
        <Snackbar
          title="Ops, ha ocurrido un error"
          type="error"
          message={queryError.message}
          delay={10}
        />
      )}
    </>
  );
}

function TableActions(row) {
  return (
    <div className="inline-flex px-4">
      <button onClick={() => console.log(row)} className="p-2 mx-1 hover:bg-gray-100 rounded-full focus:outline-none">
        <TrashIcon className="w-5 h-5" />
      </button>
      <Link href={`/accounts/${row.id}`}>
        <a className="p-2 mx-1 hover:bg-gray-100 rounded-full">
          <EyeIcon className="w-5 h-5" />
        </a>
      </Link>
    </div>
  );
}
