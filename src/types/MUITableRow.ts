/**
 * Generic type for the MUI table
 */
export interface MUITableRow {
	id: number | null;
	[key: string]: string | number | boolean | null;
}
