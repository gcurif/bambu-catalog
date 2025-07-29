import { FilterSchemaItem } from "@/model/schema";

const schema: FilterSchemaItem[] = [
  {
    "name": "marca",
    "type": "option",
    "options": ["marca1", "marca2", "marca3", "marca4", "marca5", "marca6"]
  },
  {
    "name": "modelo",
    "type": "option",
    "options": ["modelo1", "modelo2", "modelo3", "modelo4", "modelo5", "modelo6"]
  },
  {
    "name": "año",
    "type": "number"
  },
  {
    "name": "cilindrada",
    "type": "text"
  },
  {
    "name": "traccion",
    "type": "option",
    "options": ["delantera 4x2", "trasera 4x2", "4x4"]
  },
  {
    "name": "combustible",
    "type": "option",
    "options": ["gasolina", "diésel", "híbrido", "eléctrico"]
  }
];

const items = [
  {
    name: "Modelo 1",
    code: "ABC123",
    img: "https://example.com/image1.jpg",
    properties: [
      { name: "Marca", value: "Marca 1", order: 1 },
      { name: "Modelo", value: "Modelo 1", order: 2 },
      { name: "Año", value: "1990", order: 3 },
      { name: "Cilindrada", value: "432432", order: 4 },
      { name: "Color", value: "Rojo", order: 5 },
      { name: "Combustible", value: "Gasolina", order: 6 },
    ],
  },
  {
    name: "Modelo 2",
    code: "DEF456",
    img: "https://example.com/image2.jpg",
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
    img: "https://example.com/image3.jpg",
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
    img: "https://example.com/image4.jpg",
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