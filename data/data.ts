import { FilterSchemaItem } from "@/model/schema";

const schema: FilterSchemaItem[] = [
  {
    name: "Marca",
    type: "option",
    options: ["marca1", "marca2", "marca3", "marca4", "marca5", "marca6"],
    filterable: true,
  },
  {
    name: "Modelo",
    type: "option",
    options: ["modelo1", "modelo2", "modelo3", "modelo4", "modelo5", "modelo6"],
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
      { name: "Año", value: "Hyundai", order: 3 },
      { name: "Cilindrada", value: "432432", order: 4 },
      { name: "Color", value: "Rojo", order: 5 },
      { name: "Combustible", value: "Gasolina", order: 6 },
    ],
  },
  {
    name: "Modelo 2",
    code: "DEF456",
    properties: [
      { name: "Marca", value: "Marca 2", order: 1 },
      { name: "Modelo", value: "Modelo 2", order: 2 },
      { name: "Año", value: "1995", order: 3 },
      { name: "Cilindrada", value: "123456", order: 4 },
      { name: "Color", value: "Azul", order: 5 },
      { name: "Combustible", value: "Diésel", order: 6 },
    ],
  },
  {
    name: "Modelo 3",
    code: "GHI789",
    properties: [
      { name: "Marca", value: "Marca 3", order: 1 },
      { name: "Modelo", value: "Modelo 3", order: 2 },
      { name: "Año", value: "2000", order: 3 },
      { name: "Cilindrada", value: "654321", order: 4 },
      { name: "Color", value: "Verde", order: 5 },
      { name: "Combustible", value: "Híbrido", order: 6 },
    ],
  },
  {
    name: "Modelo 4",
    code: "JKL012",
    properties: [
      { name: "Marca", value: "Marca 4", order: 1 },
      { name: "Modelo", value: "Modelo 4", order: 2 },
      { name: "Año", value: "2005", order: 3 },
      { name: "Cilindrada", value: "789012", order: 4 },
      { name: "Color", value: "Amarillo", order: 5 },
      { name: "Combustible", value: "Eléctrico", order: 6 },
    ],
  },
];

export const getSchema = () => schema;
export const getItems = () => items;
