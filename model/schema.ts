
export type FilterType = 'text' | 'number' | 'option' | 'textlg';

export interface FilterSchemaOption {
  name: string;
  fav: boolean | null;
}

export interface FilterSchemaItem {
  id: string;
  name: string;
  type: FilterType;
  options?: FilterSchemaOption[];
  filterable: boolean;
  order: number;
  orderToShow?: number;
}

export type UserType = 'admin' | 'operator';

export interface User {
  username: string;
  password: string;
  type: UserType;
}

export interface ItemImg {
  id: string;
  publicUrl: string;
  width: number;
  height: number;
}


export interface Item {
  id?: string; // Optional for new items
  name: string;
  code: string;
  imgs: ItemImg[];
  properties: { [key: string]: string | number | undefined };
}
