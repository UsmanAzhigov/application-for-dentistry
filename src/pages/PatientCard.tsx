import React from 'react';
import Fab from '@mui/material/Fab';
import { Btn } from '../shared/ui/Btn';
import AddIcon from '@mui/icons-material/Add';
import callIcon from '../shared/icon/call.svg';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchPatientsCards, setItems } from '../redux/patientCard/patientCardSlice';
import { PatientHistoryVisits } from '../features/PatientHistoryVisits';
import { fetchHistory } from '../redux/patientHistory/patientHistorySlice';
import { PatientTodayVisit } from '../features/PatientTodayVisit';
import { fetchTodayVisit } from '../redux/addVisit/addVisitSlice';

export const PatientCard = () => {
  const { id } = useParams();
  const { items, changedPatientItems } = useSelector((state: RootState) => state.patientCard);
  const { history } = useSelector((state: RootState) => state.patientHistory);
  const { todayVisit } = useSelector((state: RootState) => state.addVisit);
  const currentDate = new Date();
  const dispatch = useDispatch();
  React.useEffect(() => {
    async function fetchData() {
      try {
        dispatch(fetchPatientsCards({ id }));
        dispatch(setItems({ id }));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    async function fetchHistoryVisit() {
      try {
        // @ts-ignore
        dispatch(fetchHistory({ id }));
      } catch (error) {
        console.log(error);
      }
    }
    fetchHistoryVisit();
  }, []);

  React.useEffect(() => {
    async function fetchTodayVisitData() {
      try {
        const date = currentDate.getDate();
        dispatch(fetchTodayVisit({ date, id }));
      } catch (error) {
        console.log(error);
        alert('Произошла ошибка');
      }
    }
    fetchTodayVisitData();
  }, []);
  return (
    <div className="flex flex-col">
      {changedPatientItems &&
        items.map((items: { _id: string; fullName: string; phoneNumber: string }) => {
          return (
            <>
              <React.Fragment key={items._id}>
                <div className="flex flex-col">
                  <h2 className="font-bold text-[28px]">{items.fullName}</h2>
                  <span className="font-medium text-[20px] text-gray-400">
                    +{items.phoneNumber}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-[25px] space-x-3">
                  <img
                    src={callIcon}
                    onClick={() => (window.location.href = `tel:${items.phoneNumber}`)}
                  />
                  <Btn variant="secondary" width="65%">
                    Формула зубов
                  </Btn>
                  <Fab color="primary" aria-label="add" style={{ backgroundColor: '#00A6FB' }}>
                    <AddIcon />
                  </Fab>
                </div>
              </React.Fragment>
              <h2 className="text-black text-[20px] font-semibold mt-[45px] ">Предстоящие</h2>
              {todayVisit &&
                todayVisit.map((obj: any) => (
                  <React.Fragment key={obj._id}>
                    <PatientTodayVisit {...obj} />
                  </React.Fragment>
                ))}

              <h2 className="text-black text-[20px] font-semibold mt-[45px] ">История посещений</h2>
              {history.map(
                (item: {
                  _id: string;
                  diagnosis: string;
                  arrivalTime: string;
                  price: string;
                  numberTooth: string;
                }) => {
                  return <PatientHistoryVisits key={item._id} {...item} />;
                },
              )}
            </>
          );
        })}
    </div>
  );
};
