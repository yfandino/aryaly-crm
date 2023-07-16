import React, { useMemo, useState } from "react";
import { PhoneIcon, PhoneOutgoingIcon } from "@heroicons/react/solid";
import {
  AddPrinterForm,
  Button,
  Form, LinearProgress,
  Modal,
  Table
} from "./index";
import { columns, inputs, attemptColumns, attemptInputs } from "../config/accountId";
import { useInsert, useTable } from "../lib/supabase";
import TableActions from "./Table/TableActions";
import IconButton from "./IconButton";

export default function AccountAssets({ account, selected }) {
  const [open, setOpen] = useState(false);
  const [attemptList, setAttemptList] = useState(null);
  const [openAddAttemptForm, setOpenAddAttemptForm] = useState(null);
  const [insertContactAttempt] = useInsert("table_contact_attempt");
  const [
    { loading: contactLoading, rows: contacts, error: contactError },
    insertContact,
    deleteContact
  ] = useTable("table_contact_person", {
    initialRows: account.tableContactPerson || []
  })
  const [
    { loading: printerLoading, rows: printers, error: printerError },
    insertPrinter,
    deletePrinter
  ] = useTable("table_account_printer", {
    initialRows: account.tablePrinter
  });
  const tables = { contacts, printers };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addContact = async (contact) => {
    contact.phoneNumber = [contact.phoneNumber];
    contact.accountId = account.id;
    await insertContact([contact]);
    setOpen(false);
  }

  const removeContact = async (contact) => {
    await deleteContact([["id", contact.id]]);
  }

  const addPrinter = async (printer) => {
    await insertPrinter([{ accountId: account.id, printerId: printer.id }]);
    setOpen(false);
  }
  const removePrinter = async (printer) => {
    await deletePrinter([["account_id", account.id], ["printer_id", printer.id]]);
  }

  const openContactAttempts = (id) => {
    const contact = contacts.find(e => e.id === id);
    const list = contact?.tableContactAttempt;
    setAttemptList({ list, contact });
  }

  const addContactAttempt = async (attempt) => {
    // add caller and contact id
    attempt.contact = openAddAttemptForm;
    await insertContactAttempt([attempt]);
  }

  const Actions = useMemo(() => (
    <TableActions
      onDelete={selected === "contacts" ? removeContact : removePrinter}
    >
      {(row) => (
        <>
          <IconButton icon={<PhoneIcon className="w-5 h-5" />} onClick={() => openContactAttempts(row.id)} tooltipText="Mostrar llamadas" />
          <IconButton icon={<PhoneOutgoingIcon className="w-5 h-5" />} onClick={() => setOpenAddAttemptForm(row.id)} tooltipText="Añadir llamada" />
        </>
      )}
    </TableActions>
  ), [selected]);

  if (contactLoading || printerLoading) return <LinearProgress />

  return (
    <>
      <Table
        title="Personas de contacto"
        headerAction={<Button onClick={handleOpen}>Añadir</Button>}
        columns={columns[selected]}
        rows={tables[selected]}
        actionComponent={Actions}
        shadow
      />
      {open && (
        <Modal open={open} handleClose={handleClose} fullScreen>
          {selected === 'contacts' ?
            <Form
              inputs={inputs}
              title="Añadir persona de contacto"
              onSubmit={addContact}
            />
            :
            <AddPrinterForm
              onSubmit={addPrinter}
            />
          }
        </Modal>
      )}
      {attemptList && (
        <Modal open={!!attemptList} handleClose={() => setAttemptList(null)}>
            <Table
              title={`Llamadas realizadas a ${attemptList.contact.firstName} ${attemptList.contact.lastName}`}
              columns={attemptColumns}
              rows={attemptList.list}
            />
        </Modal>
      )}
      {openAddAttemptForm && (
        <Modal open handleClose={() => setOpenAddAttemptForm(false)} className="w-1/3" >
          <Form
            inputs={attemptInputs}
            title="Añadir llamada"
            onSubmit={addContactAttempt}
          />
        </Modal>
      )}
    </>
  );
}
