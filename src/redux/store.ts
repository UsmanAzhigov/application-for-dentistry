import { configureStore } from '@reduxjs/toolkit';
import { patientCardReducer } from './patientCard/patientCardSlice';
import { addVisitReducer } from './addVisit/addVisitSlice';
import { homeReducer } from './home/homeSlice';
import { patientHistoryReducer } from './patientHistory/patientHistorySlice';
import { changeVisitReducer } from './changeVisit/changeVisitSlice';
export const store = configureStore({
  reducer: {
    patientCard: patientCardReducer,
    addVisit: addVisitReducer,
    home: homeReducer,
    patientHistory: patientHistoryReducer,
    changeVisit: changeVisitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
