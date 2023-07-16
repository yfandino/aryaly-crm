export const inputs = [
  { name: "companyName", type: "text", label: "Nombre", placeholder: "Nombre" +
                                                                     " de compañía o Autónomo"},
  { name: "taxId", type: "text", label: "NIF / CIF", placeholder: "NIF" },
  { name: "phoneNumber", type: "tel", label: "Teléfono", placeholder: "912000000" },
  { name: "address", type: "text", label: "Dirección", placeholder: "Calle" +
                                                                    " López de hoyos, 127, Local 1, Madrid" },
  { name: "email", type: "email", label: "Correo electrónico", placeholder: "madrid.lopezdehoyos@prink.es" },
];

export const columns = [
  { title: "Nombre", id: "companyName" },
  { title: "NIF/ CIF", id: "taxId" },
  { title: "Teléfono(s)", id: "phoneNumber" },
  { title: "Dirección", id: "address" },
  { title: "email", id: "email" }
];