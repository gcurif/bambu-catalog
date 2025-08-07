export type FilterType = 'text' | 'number' | 'option';

export interface FilterSchemaItem {
  name: string;
  type: FilterType;
  options?: string[];
  filterable: boolean;
}
