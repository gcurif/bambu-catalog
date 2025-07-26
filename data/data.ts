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
    "type": "number"
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

export const getSchema = () => schema;