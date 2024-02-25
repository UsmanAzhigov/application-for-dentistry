import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVisits = createAsyncThunk('home/fetchVisits', async ({ date, month }: any) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/visits/${date}/${month}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const fetchDeleteVisit = createAsyncThunk('home/fetchDeleteVisit', async ({ id }: any) => {
  try {
    const { data } = await axios.delete(`http://localhost:5000/deleteVisit/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  items: [],
  status: 'loading' || 'success' || 'error',
};
export const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    setVisits: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVisits.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchVisits.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
    builder.addCase(fetchVisits.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });

    builder.addCase(fetchDeleteVisit.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchDeleteVisit.fulfilled, (state, action) => {
      state.status = 'success';
      state.items.filter((obj: any) => obj._id !== action.payload._id);
    });
    builder.addCase(fetchDeleteVisit.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const { setVisits } = homeSlice.actions;

export const homeReducer = homeSlice.reducer;
