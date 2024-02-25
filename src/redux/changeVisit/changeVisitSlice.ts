import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChangeVisit = createAsyncThunk(
  'changeVisit/fetchChangeVisit',
  async ({ id, visit }) => {
    try {
      const { data } = await axios.patch(`http://localhost:5000/changeVisit/${id}`, visit);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

const initialState = {
  items: [],
  status: 'loading' || 'success' || 'error',
};

export const changeVisitSlice = createSlice({
  name: 'changeVisit',
  initialState: initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChangeVisit.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchChangeVisit.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
    builder.addCase(fetchChangeVisit.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const changeVisitReducer = changeVisitSlice.reducer;

export const { setItems } = changeVisitSlice.actions;
