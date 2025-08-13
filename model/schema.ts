
export type FilterType = 'text' | 'number' | 'option' | 'textlg';

export interface FilterSchemaItem {
  name: string;
  type: FilterType;
  options?: string[];
  filterable: boolean;
}

export type UserType = 'admin' | 'operator';

export interface User {
  username: string;
  password: string;
  type: UserType;
}
