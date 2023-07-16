import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "../../lib/supabase";
import {
  AccountAssets, AccountDetails, BubbleSelector, LinearProgress, Snackbar,
} from "../../components";
import { selectors } from '../../config/accountId';

export default function Account() {
  const { query: { id } } = useRouter();
  const [selected, setSelected] = useState("contacts")
  const {
    loading,
    rows: [account],
    error
  } = useQuery("table_account", {
    columns: `
      *,
      table_contact_person(*, table_contact_attempt(*)),
      table_printer(*)
    `,
    filter: [["id", id.toString()]]
  });

  if (loading) return <LinearProgress />;

  if (error) return (
    <Snackbar
      title="Ops, ha ocurrido un error"
      type="error"
      message={["Código: " + error.code, error.message]}
    />
  )

  return (
    <>
      <Head>
        <title>Account {id}</title>
      </Head>
      <main>
        <AccountDetails data={account} />
        <BubbleSelector options={selectors} selected={selected} onSelect={setSelected}/>
        <AccountAssets account={account} selected={selected} />
      </main>
    </>
  );
};

export async function getServerSideProps(ctx) {
  return {
    props: {},
  };
}

