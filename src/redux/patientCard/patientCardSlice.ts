import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPatientsCards = createAsyncThunk('patientCard/fetchPatients', async ({ id }) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/patients/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    alert('Произошла ошибка при получении посещений!');
  }
});
export const fetchChangePatientCard = createAsyncThunk(
  'patientCard/fetchChangePatient',
  async ({ id, obj }) => {
    try {
      const { data } = await axios.patch(`http://localhost:5000/changePatient/${id}`, obj);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);
export const fetchDeletePatient = createAsyncThunk(
  'patientCard/fetchDeletePatient',
  async ({ id }) => {
    try {
      const { data } = await axios.delete(`http://localhost:5000/deletePatient/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

const initialState = {
  items: [],
  isModal: false,
  status: 'loading' || 'success' || 'error',
  changedPatientItems: [],
};
const patientCardSlice = createSlice({
  name: 'patientCard',
  initialState: initialState,
  reducers: {
    openModal: (state) => {
      state.isModal = true;
    },
    closeModal: (state) => {
      state.isModal = false;
    },
    setItems: (state, action) => {
      state.id = action.payload;
    },
    setNewItems: (state, action) => {
      state.items = [action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPatientsCards.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPatientsCards.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
    builder.addCase(fetchPatientsCards.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });

    builder.addCase(fetchChangePatientCard.pending, (state) => {
      state.status = 'loading';
      state.changedPatientItems = [];
    });
    builder.addCase(fetchChangePatientCard.fulfilled, (state, action) => {
      state.status = 'success';
      state.changedPatientItems = action.payload;
    });
    builder.addCase(fetchChangePatientCard.rejected, (state) => {
      state.status = 'error';
      state.changedPatientItems = [];
    });

    builder.addCase(fetchDeletePatient.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchDeletePatient.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
    builder.addCase(fetchDeletePatient.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const { openModal, closeModal, setItems, setNewItems } = patientCardSlice.actions;

export const patientCardReducer = patientCardSlice.reducer;
