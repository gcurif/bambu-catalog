import { FilterSchemaItem } from "@/model/schema";

const schema: FilterSchemaItem[] = [
  {
    "name": "caracteristica1",
    "type": "text"
  },
  {
    "name": "caracteristica2",
    "type": "number"
  },
  {
    "name": "caracteristica3",
    "type": "option",
    "options": ["opcionA", "opcionB", "opcionC"]
  },
  {
    "name": "caracteristica4",
    "type": "text"
  },
  {
    "name": "caracteristica5",
    "type": "option",
    "options": ["opcionX", "opcionY"]
  }
]

export const getSchema = () => schema;