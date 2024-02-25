import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHistory = createAsyncThunk('patientHistory/fetchHistory', async ({ id }) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/historyVisits/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  history: [],
  status: 'loading' || 'success' || 'error',
};

const patientHistorySlice = createSlice({
  name: 'patientHistory',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.pending, (state) => {
      state.status = 'loading';
      state.history = [];
    });
    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      state.status = 'success';
      state.history = action.payload;
    });
    builder.addCase(fetchHistory.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export const patientHistoryReducer = patientHistorySlice.reducer;
