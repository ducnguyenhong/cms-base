export interface UserProps {
  prefix?: string;
  type?: string;
  title?: string;
  disableHelmet?: boolean;
}

export interface FilterProps {
  prefix?: string;
}
export const PREFIX_USER = 'user';
export const FILTER_KEY = {
  KEYWORD: 'keyword',
  STATUS: 'status',
  TYPE: 'type',
};
