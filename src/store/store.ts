import { configureStore } from '@reduxjs/toolkit';
import { consentSlice } from '../features/consents/consentSlice';

export const store = configureStore({
	reducer: {
		consent: consentSlice.reducer,
	},
});
