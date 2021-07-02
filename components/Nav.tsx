import Link from "next/link";

export default function Nav() {
  return (
    <div className="bg-indigo-800 fixed h-screen w-16">
      <ul>
        <MenuItem path="/" label="Home" />
        <MenuItem path="/accounts" label="Cuentas" />
        <MenuItem path="/leads" label="Poten..." />
        <MenuItem path="/clients" label="Clientes" />
      </ul>
    </div>
  );
}

function MenuItem({ path, label }) {
  return (
    <li>
      <Link href={path}>
        <a>{label}</a>
      </Link>
    </li>
  );
}

