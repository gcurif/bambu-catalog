export type FilterType = 'text' | 'number' | 'option' | 'textlg';

export interface FilterSchemaItem {
  name: string;
  type: FilterType;
  options?: string[];
  filterable: boolean;
}
