export interface DataShape {
  [key: string]: any;
}

export type DataToHeadersMap<S extends DataShape> = {
  [P in keyof S]: string;
};

export interface OriginalDataShape extends DataShape {
  name: string;
  address_1: string;
  city: string;
  zip: string;
  id: number;
  date_recent: string;
}

export const OriginalDataToHeadersMap: DataToHeadersMap<OriginalDataShape> = {
  name: 'Name',
  address_1: 'Address',
  city: 'City',
  zip: 'ZipCode',
  id: 'ID',
  date_recent: 'Recent Date'
};
