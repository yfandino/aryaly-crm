import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { EyeIcon, TrashIcon } from "@heroicons/react/outline";
import { useTable } from "../../lib/supabase";
import { Form, Modal, Snackbar, Table, Button, LinearProgress } from "../../components";
import { columns, inputs } from "../../config/account";

export default function Accounts() {
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1)
  const [offset, setOffset] = useState((page - 1) * limit);
  const [open, setOpen] = useState(false);
  const [{ loading, rows, count, error: tableError }, insertAccount, deleteRows] = useTable("table_account", {
    queryParams: {
      count: true,
      offset,
      limit
    }
  });

  useEffect(() => {
    setOffset((page - 1) * limit);
  }, [page, limit]);

  useEffect(()=> {
    setError(tableError);
  }, [tableError])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (account) => {
    account.phoneNumber = [account.phoneNumber];
    await insertAccount([account]);
    setOpen(false);
  }

  const handleDelete = async (account) => {
    await deleteRows([["id", account.id]]);
  }

  return (
    <>
      <Head>
        <title>Store manager - Cuentas</title>
      </Head>
      {loading && <LinearProgress />}
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
          actionComponent={<TableActions onDelete={handleDelete} showEye/>}
        />
      </main>
      <Modal open={open} handleClose={handleClose} fullScreen>
        <Form
          inputs={inputs}
          title="Crear nueva cuenta"
          onSubmit={handleSubmit}
        />
      </Modal>
      {error && (
        <Snackbar
          title="Ops, ha ocurrido un error"
          type="error"
          message={["Código: " + error.code, error.message]}
          delay={10}
          onFinish={setError}
        />
      )}
    </>
  );
};

type TableActionsProps = {
  row?: { [name: string]: any },
  onDelete?: (any) => void;
  showEye?: boolean;
}

function TableActions({ row, onDelete, showEye }: TableActionsProps) {
  return (
    <div className="inline-flex px-4">
      <button onClick={() => onDelete(row)} className="p-2 mx-1 hover:bg-gray-100 rounded-full focus:outline-none">
        <TrashIcon className="w-5 h-5" />
      </button>
      {showEye && (
        <Link href={`/accounts/${row.id}`}>
          <a className="p-2 mx-1 hover:bg-gray-100 rounded-full">
            <EyeIcon className="w-5 h-5" />
          </a>
        </Link>
      )}
    </div>
  );
}
