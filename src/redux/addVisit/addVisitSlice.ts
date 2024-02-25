import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPatients = createAsyncThunk('addVisit/fetchPatients', async () => {
  try {
    const { data } = await axios.get(`http://localhost:5000/patients`);
    return data;
  } catch (error) {
    console.log(error);
    alert('Произошла ошибка при получении посещений!');
  }
});

export const fetchAddVisit = createAsyncThunk('addVisit/fetchAddVisit', async ({ obj }: any) => {
  try {
    const { data } = await axios.post(`http://localhost:5000/addVisit`, obj);
    return data;
  } catch (error) {
    console.log(error);
    alert('Произошла ошибка при получении посещений!');
  }
});

export const fetchAddPatient = createAsyncThunk(
  'addVisit/fetchAddPatient',
  async ({ obj }: any) => {
    try {
      const { data } = await axios.post(`http://localhost:5000/addPatient`, obj);
      return data;
    } catch (error) {
      console.log(error);
      alert('Произошла ошибка при получении посещений!');
    }
  },
);

export const fetchTodayVisit = createAsyncThunk(
  'addVisit/fetchTodayVisit',
  async ({ date, id }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/patientVisit/${date}/${id}`);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

const initialState = {
  items: [],
  status: 'loading' || 'success' || 'error',
  todayVisit: [],
};

export const addVisitSlice = createSlice({
  name: 'addVisit',
  initialState: initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPatients.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPatients.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
    builder.addCase(fetchPatients.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });

    builder.addCase(fetchAddVisit.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchAddVisit.fulfilled, (state, action) => {
      state.status = 'success';
      state.items.push(action.payload);
    });
    builder.addCase(fetchAddVisit.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
    builder.addCase(fetchTodayVisit.pending, (state) => {
      state.status = 'loading';
      state.todayVisit = [];
    });
    builder.addCase(fetchTodayVisit.fulfilled, (state, action) => {
      state.status = 'success';
      state.todayVisit = action.payload;
    });
    builder.addCase(fetchTodayVisit.rejected, (state) => {
      state.status = 'error';
      state.todayVisit = [];
    });

    builder.addCase(fetchAddPatient.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchAddPatient.fulfilled, (state, action) => {
      state.status = 'success';
      state.items.push(action.payload);
    });
    builder.addCase(fetchAddPatient.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const { setItems } = addVisitSlice.actions;

export const addVisitReducer = addVisitSlice.reducer;
