export const details = {
  companyName: "Nombre",
  taxId: "NIF /CIF",
  phoneNumber: "Teléfono(s)",
  address: "Dirección",
  email: "Correo Electrónico",
  web: "Página Web",
  avgPurchTime: "Tiempo de compra promedio",
  isInterested: "Enviar presupuesto",
  quoteSentAt: "Presupuesto Enviado el",
  isClient: "Es cliente",
  lastContactedAt: "Última vez contactado"

}

const columns_contacts = [
  { title: "Nombre", id: "firstName", capitalize: true },
  { title: "Apellido(s)", id: "lastName", capitalize: true },
  { title: "Correo Electrónico", id: "email" },
  { title: "Teléfono(s)", id: "phoneNumber" },
  { title: "Extensión", id: "ext" },
  { title: "Cargo", id: "role", capitalize: true }
];

const columns_printer = [
  { title: "Marca", id: "brand", capitalize: true },
  { title: "Modelo", id: "model", capitalize: true }
];

export const columns = { contacts: columns_contacts, printers: columns_printer };

export const attemptColumns = [
  { title: "Fecha", id: "insertedAt" },
  { title: "Operador", id: "caller", capitalize: true },
  { title: "Tipo", id: "type" },
  { title: "Respondida", id: "answered" }
];

export const inputs = [
  { name: "firstName", type: "text", label: "Nombre", placeholder: "Ana" },
  { name: "lastName", type: "text", label: "Apellido(s)", placeholder: "Fernández Gómez" },
  { name: "email", type: "email", label: "Correo electrónico", placeholder: "madrid.lopezdehoyos@prink.es" },
  { name: "phoneNumber", type: "tel", label: "Teléfono(s)", placeholder: "912000000" },
  { name: "ext", type: "text", label: "Extensión", placeholder: "212" },
  { name: "role", type: "text", label: "Cargo", placeholder: "Jefe de compras" }
];

export const selectors = [
  { id: "contacts", label: "Personas de contacto" },
  { id: "printers", label: "Impresoras" }
];

export const attemptInputs = [
  {
    name: "type",
    type: "text",
    label: "Tipo de contacto",
    placeholder: "Selecciona una opción",
    enum: ["INIT", "FOLLOWUP", "LOYALTY"],
    enumNames: ["Captación", "Seguimiento", "Fidelización"]
  },
  { name: "answered", type: "boolean", label: "¿Ha respondido?" },
  { name: "comment", type: "text", label: "Comentario", placeholder: "Describe que ha pasado" }
];