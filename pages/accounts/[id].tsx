import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery, useInsert, useSearch } from "../../lib/supabase";
import {
  AccountDetails,
  AddPrinterForm,
  BubbleSelector,
  Button,
  Form,
  Modal, Snackbar,
  Table
} from "../../components";
import { details, columns, inputs, selectors } from '../../config/accountId';

export default function Account() {
  const { query: { id } } = useRouter();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("contacts")
  const [contacts, setContacts] = useState([]);
  const [printers, setPrinters] = useState([]);
  const tables = { contacts, printers };
  const [insertContact, { error: contactError }] = useInsert("table_contact_person");
  const [insertPrinter, { error: printerError }] = useInsert("table_account_printer");
  const {
    loading: queryLoading,
    rows: [account],
    error: queryError
  } = useQuery("table_account", {
    columns: "*, table_contact_person(*, table_contact_attemp(*)), table_printer(*)",
    filter: { key: "id", value: id }
  });

  useEffect(() => {
    if (!account) return;
    setContacts(account.tableContactPerson);
    setPrinters(account.tablePrinter);
  }, [account]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addContact = async (contact) => {
    contact.phoneNumber = [contact.phoneNumber];
    contact.accountId = account.id;
    await insertContact([contact]);
    if (!contactError) setOpen(false);
  }

  const addPrinter = async (printer) => {
    await insertPrinter([{ accountId: account.id, printer }]);
    setOpen(false);
  }

  if (queryLoading) return <div>Loading...</div>
  if (queryError) return <div>Error... {queryError.message}</div>

  return (
    <>
      <Head>
        <title>Account {id}</title>
      </Head>
      <main>
        <AccountDetails data={account} />
        <BubbleSelector options={selectors} selected={selected} onSelect={setSelected}/>
        <Table
          title="Personas de contacto"
          headerAction={<Button onClick={handleOpen}>Añadir</Button>}
          columns={columns[selected]}
          rows={tables[selected]}
        />
      </main>
      <Modal open={open} handleClose={handleClose} fullScreen>
        {selected === 'contacts' ?
          <Form
            inputs={inputs}
            title="Añadir persona de contacto"
            onSubmit={addContact}
          />
          :
          <AddPrinterForm
            accountId={account.id}
            onSubmit={addPrinter}
          />
        }
      </Modal>
      {printerError && (
        <Snackbar
          title="Error al añadir una nueva impresora"
          type="error"
          message={["Código: " + printerError.code, printerError.details]}
        />
      )}
      {contactError && (
        <Snackbar
          title="Error al añadir un nuevo contacto"
          type="error"
          message={["Código: " + contactError.code, contactError.details]}
        />
      )}
    </>
  );
};

export async function getServerSideProps(ctx) {
  return {
    props: {},
  };
}


