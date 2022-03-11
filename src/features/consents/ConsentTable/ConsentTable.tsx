import React from 'react';
import styles from './ConsentTable.module.scss';
import MUITable from '../../../shared/MUITable/MUITable';
import { Consent } from '../../../types/Consent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsents } from '../consentSlice';
import configData from '../../../config.json';
import { MUITableRow } from '../../../types/MUITableRow';

const ConsentTable: React.FC<{}> = () => {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(fetchConsents());
	}, [dispatch]);

	const consents: Consent[] = useSelector((state: any) => state.consent.list);

	/**
	 * Converts consents array to array of objects suitable to be shown in the table.
	 * Three boolean values are converted to string.
	 */
	let muiTableRows: MUITableRow[] = consents.map((row) => {
		const muiTableRow: MUITableRow = {
			id: row.id,
			name: row.name,
			email: row.email,
		};

		muiTableRow.consentGivenFor = '';
		if (row.newsletter) {
			muiTableRow.consentGivenFor += 'Receive newsletter, ';
		}
		if (row.ads) {
			muiTableRow.consentGivenFor += 'Be shown targeted ads, ';
		}
		if (row.statistics) {
			muiTableRow.consentGivenFor +=
				'Contribute to anonymous visit statistics, ';
		}
		if (muiTableRow.consentGivenFor && muiTableRow.consentGivenFor.length > 1) {
			muiTableRow.consentGivenFor = muiTableRow.consentGivenFor.slice(0, -2);
		}
		return muiTableRow;
	});

	return (
		<div className={styles.ConsentTable} data-testid="ConsentTable">
			<MUITable
				rows={muiTableRows}
				columns={[
					{ id: 'name', label: 'Name' },
					{ id: 'email', label: 'Email' },
					{ id: 'consentGivenFor', label: 'Consent given for' },
				]}
				pageSize={configData.TABLE_PAGE_SIZE}
			/>
		</div>
	);
};

export default ConsentTable;
