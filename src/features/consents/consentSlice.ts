import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Consent } from '../../types/Consent';
import configData from '../../config.json';

export interface ConsentState {
	list: Consent[];
	status: 'idle' | 'loading' | 'failed';
	addStatus: 'idle' | 'loading' | 'failed';
}

const initialState: ConsentState = {
	list: [],
	status: 'idle',
	addStatus: 'idle',
};

export const fetchConsents = createAsyncThunk('consent/fetch', async () => {
	const response = await fetch(`${configData.SERVER_URL}/consents`);
	return response.json();
});

export const addConsent = createAsyncThunk(
	'consent/add',
	async (consent: Consent, { dispatch }) => {
		const response = await fetch(`${configData.SERVER_URL}/consents`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(consent),
		});
		dispatch(fetchConsents());
		return response.status;
	}
);

export const consentSlice = createSlice({
	name: 'consent',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchConsents.pending, (state: ConsentState) => {
				state.status = 'loading';
			})
			.addCase(fetchConsents.fulfilled, (state: ConsentState, action) => {
				state.status = 'idle';
				state.list = action.payload;
			})
			.addCase(addConsent.pending, (state: ConsentState) => {
				state.addStatus = 'loading';
			})
			.addCase(addConsent.rejected, (state: ConsentState, action) => {
				state.addStatus = 'failed';
			})
			.addCase(addConsent.fulfilled, (state: ConsentState, action) => {
				state.addStatus = 'idle';
			});
	},
});

export default consentSlice.reducer