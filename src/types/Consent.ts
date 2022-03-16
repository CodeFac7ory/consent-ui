import { MUITableRow } from './MUITableRow';

export interface Consent extends MUITableRow {
  id: number | null;
  name: string;
  email: string;
  newsletter: boolean;
  ads: boolean;
  statistics: boolean;
}
