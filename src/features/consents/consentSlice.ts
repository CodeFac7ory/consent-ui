import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Consent } from '../../types/Consent';
import configData from '../../config.json';

export interface ConsentState {
  list: Consent[];
  status: 'idle' | 'loading' | 'failed';
  addStatus: 'idle' | 'loading' | 'failed' | 'success';
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

/**
 * Sends async request to create the consent in backend
 * and after that fetches the consents list from backend
 */
export const addConsent = createAsyncThunk(
  'consent/add',
  async (consent: Consent, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${configData.SERVER_URL}/consents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consent),
      });

      if (!response.ok) {
        const err = new Error('Not 2xx response');
        err.message = response.statusText;
        throw err;
      } else {
        dispatch(fetchConsents());
        return response.status;
      }
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const consentSlice = createSlice({
  name: 'consent',
  initialState: initialState,
  reducers: {
    setAddConsentStatus: (
      state,
      action: PayloadAction<'idle' | 'loading' | 'failed'>
    ) => {
      state.addStatus = action.payload;
    },
  },
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
        state.addStatus = 'success';
      });
  },
});

export default consentSlice.reducer;
export const { setAddConsentStatus } = consentSlice.actions;
