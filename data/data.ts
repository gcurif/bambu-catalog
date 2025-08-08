import { FilterSchemaItem } from "@/model/schema";

const schema: FilterSchemaItem[] = [
  {
    name: "Marca",
    type: "option",
    options: [
      "ZF",
      "Aisin",
      "Getrag",
      "General Motors",
      "Ford",
      "Volkswagen",
      "Mercedes-Benz",
      "Honda",
      "Toyota",
      "Hyundai",
      "Subaru",
      "Jatco",
      "Peugeot",
      "Citroën",
      "Fiat",
      "Alfa Romeo",
      "Renault",
      "Mazda",
      "Volvo",
      "Mitsubishi",
      "BMW",
      "Porsche",
      "Tesla",
    ],
    filterable: true,
  },
  {
    name: "Modelo",
    type: "option",
    options: [
      "4HP22",
      "4HP24",
      "5HP18",
      "5HP19",
      "5HP24",
      "5HP30",
      "6HP19",
      "6HP21",
      "6HP26",
      "6HP28",
      "8HP45",
      "8HP70",
      "9HP48",
      "S6-53",
      "AW4",
      "AW55-50SN",
      "TF-60SN",
      "TF-80SC",
      "TL-80SN",
      "AM6",
      "DCT250",
      "DCT450",
      "7DCL750",
      "420G",
      "4L60-E",
      "4L80-E",
      "6L80",
      "8L90",
      "10L90",
      "C4",
      "E4OD",
      "6R80",
      "10R80",
      "MTX-75",
      "Powershift",
      "DQ200",
      "DQ250",
      "DQ500",
      "DL501",
      "Tiptronic 01V",
      "722.3",
      "722.6",
      "722.9",
      "725.0",
      "724.0",
      "M24A",
      "H5",
      "K310",
      "K311",
      "U151E",
      "A340E",
      "E-series",
      "A4CF1",
      "A8LF",
      "7DCT",
      "Smartstream IVT",
      "TR580",
      "TR690",
      "5MT",
      "JF011E",
      "JF015E",
      "RE5R05A",
      "JR507E",
      "BE4",
      "ML5T",
      "AL4",
      "EAT6",
      "C514",
      "Dualogic",
      "TCT",
      "PK6",
      "Proactive",
      "EDC",
      "FN4A-EL",
      "FW6A-EL",
      "Skyactiv-Drive 6AT",
      "M66",
      "TF-81SC",
      "INVECS-II",
      "W5M33",
      "DKG",
      "PDK",
      "Tiptronic S",
      "1-Speed Fixed Gear",
    ],
    filterable: true,
  },
  {
    name: "Compatibilidad",
    type: "text",
    filterable: true,
  },
  {
    name: "Año",
    type: "number",
    filterable: true,
  },
  {
    name: "Cilindrada",
    type: "text",
    filterable: true,
  },
  {
    name: "Tracción",
    type: "option",
    options: ["delantera 4x2", "trasera 4x2", "4x4"],
    filterable: true,
  },
  {
    name: "Combustible",
    type: "option",
    options: ["gasolina", "diésel", "híbrido", "eléctrico"],
    filterable: true,
  },
  {
    name: "Costo",
    type: "number",
    filterable: false,
  },
  {
    name: "Seguro",
    type: "number",
    filterable: false,
  },
  {
    name: "Flete",
    type: "number",
    filterable: false,
  },
  {
    name: "valor CIF",
    type: "number",
    filterable: false,
  },
];

const items = [
  {
    name: "Caja Hyundai accent cvt",
    code: "ABC123",
    img: require("@/assets/images/detail/6.jpeg"),
    properties: [
      { name: "Marca", value: "Hyundai 1", order: 1 },
      { name: "Modelo", value: "Caja Hyundai accent cvt", order: 2 },
      {
        name: "Compatibilidad",
        value:
          "Agregar aqui texto descriptivo para compatibilidad del producto",
        order: 3,
      },
      { name: "Año", value: "Hyundai", order: 4 },
      { name: "Cilindrada", value: "432432", order: 5 },
      { name: "Color", value: "Rojo", order: 6 },
      { name: "Combustible", value: "Gasolina", order: 7 },
      { name: "Costo", value: "21321", order: 8 },
      { name: "Seguro", value: "213210", order: 9 },
      { name: "Flete", value: "213", order: 10 },
      { name: "Valor CIF", value: "21321", order: 11 },
    ],
  },
  {
    name: "Modelo 2",
    code: "DEF456",
    properties: [
      { name: "Marca", value: "Marca 2", order: 1 },
      { name: "Modelo", value: "Modelo 2", order: 2 },
      {
        name: "Compatibilidad",
        value:
          "Agregar aqui texto descriptivo para compatibilidad del producto",
        order: 3,
      },

      { name: "Año", value: "1995", order: 4 },
      { name: "Cilindrada", value: "123456", order: 5 },
      { name: "Color", value: "Azul", order: 6 },
      { name: "Combustible", value: "Diésel", order: 7 },
      { name: "Costo", value: "21321", order: 8 },
      { name: "Seguro", value: "213210", order: 9 },
      { name: "Flete", value: "213", order: 10 },
      { name: "Valor CIF", value: "21321", order: 11 }      
    ],
  },
  {
    name: "Modelo 3",
    code: "GHI789",
    properties: [
      { name: "Marca", value: "Marca 3", order: 1 },
      { name: "Modelo", value: "Modelo 3", order: 2 },
      {
        name: "Compatibilidad",
        value:
          "Agregar aqui texto descriptivo para compatibilidad del producto",
        order: 3,
      },

      { name: "Año", value: "2000", order: 4 },
      { name: "Cilindrada", value: "654321", order: 5 },
      { name: "Color", value: "Verde", order: 6 },
      { name: "Combustible", value: "Híbrido", order: 7 },
      { name: "Costo", value: "21321", order: 8 },
      { name: "Seguro", value: "213210", order: 9 },
      { name: "Flete", value: "213", order: 10 },
      { name: "Valor CIF", value: "21321", order: 11 },
    ],
  },
  {
    name: "Modelo 4",
    code: "JKL012",
    properties: [
      { name: "Marca", value: "Marca 4", order: 1 },
      { name: "Modelo", value: "Modelo 4", order: 2 },
      {
        name: "Compatibilidad",
        value:
          "Agregar aqui texto descriptivo para compatibilidad del producto",
        order: 3,
      },
      { name: "Año", value: "2005", order: 4 },
      { name: "Cilindrada", value: "789012", order: 5 },
      { name: "Color", value: "Amarillo", order: 6 },
      { name: "Combustible", value: "Eléctrico", order: 7 },
      { name: "Costo", value: "21321", order: 8 },
      { name: "Seguro", value: "213210", order: 9 },
      { name: "Flete", value: "213", order: 10 },
      { name: "Valor CIF", value: "21321", order: 11 },
    ],
  },
];

export const getSchema = () => schema;
export const getItems = () => items;
export const addItem = (item: (typeof items)[0]) => {
  items.push(item);
};
export const addOption = (name: string, option: string) => {
  const schemaItem = schema.find(
    (item) => item.name === name && item.type === "option"
  );
  if (schemaItem && !schemaItem.options?.includes(option)) {
    schemaItem.options?.push(option);
  }
};
export const editOption = (
  name: string,
  oldOption: string,
  newOption: string
) => {
  const schemaItem = schema.find(
    (item) => item.name === name && item.type === "option"
  );
  if (schemaItem && schemaItem.options) {
    const index = schemaItem.options.indexOf(oldOption);
    if (index !== -1) {
      schemaItem.options[index] = newOption;
    }
  }
};
export const deleteOption = (name: string, option: string) => {
  const schemaItem = schema.find(
    (item) => item.name === name && item.type === "option"
  );
  if (schemaItem && schemaItem.options) {
    const index = schemaItem.options.indexOf(option);
    if (index !== -1) {
      schemaItem.options.splice(index, 1);
    }
  }
};
