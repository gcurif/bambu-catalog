import { FilterSchemaItem } from "@/model/schema";

const schema: FilterSchemaItem[] = [
  {
    "name": "marca",
    "type": "text"
  },
  {
    "name": "modelo",
    "type": "text"
  },
  {
    "name": "año",
    "type": "number"
  },
  {
    "name": "cilindrada",
    "type": "number"
  },
  {
    "name": "traccion",
    "type": "option",
    "options": ["delantera", "trasera"]
  },
  {
    "name": "sistema_traccion",
    "type": "option",
    "options": ["4x2", "4x4"]
  },
  {
    "name": "combustible",
    "type": "option",
    "options": ["gasolina", "diésel", "híbrido", "eléctrico"]
  },
  {
    "name": "transmision",
    "type": "option",
    "options": ["mecánico", "automático"]
  }
];

export const getSchema = () => schema;