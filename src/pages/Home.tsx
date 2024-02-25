import React, { FC } from 'react';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { BtnDay } from '../shared/ui/BtnDay';
import { PatientTime } from '../features/PatientTime';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchDeleteVisit, fetchVisits, setVisits } from '../redux/home/homeSlice';
export const Home: FC = () => {
  const numberOfDays = 31;
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const currentDayOfMonth = currentDate.getDate();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const [activeDay, setActiveDay] = React.useState(0);
  const { items } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const date = currentDate.getDate();
    const month = currentDate.toLocaleDateString('ru-RU', { month: 'long' });
    dispatch(fetchVisits({ date, month }));
  }, []);
  const onChoiceDay = async (dayIndex: React.SetStateAction<null>) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDayOfMonth + dayIndex,
    );
    try {
      const month = selectedDate.toLocaleDateString('ru-RU', { month: 'long' });
      const date = selectedDate.getDate();
      await dispatch(fetchVisits({ date, month }));
    } catch (error) {
      console.log(error);
      setVisits([]);
    }
    setActiveDay(dayIndex);
  };
  const deleteVisit = (id) => {
    try {
      dispatch(fetchDeleteVisit({ id }));
      dispatch(setVisits(items.filter((obj: any) => obj._id !== id)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex border-b border-gray-300">
        <div className="flex items-center space-x-2 mb-[23px] overflow-x-auto  ">
          {Array.from({ length: numberOfDays }, (_, index) => {
            const day = (currentDayOfMonth + index) % daysInMonth || daysInMonth;
            return (
              <BtnDay
                key={index}
                dayOfMonth={day}
                isActive={activeDay === index}
                choiceDay={() => onChoiceDay(index)}
                dayOfWeek={(currentDayOfWeek + index - 1) % 7}
              />
            );
          })}
        </div>
      </div>
      {items ? (
        items.map(
          (item: {
            _id: string;
            patientId: string;
            fullName: string;
            diagnosis: string;
            arrivalTime: string;
            prepayment: string;
            status: string;
          }) => (
            <PatientTime
              variant={item.status}
              fullName={item.fullName}
              diagnosis={item.diagnosis}
              arrivalTime={item.arrivalTime}
              deleteVisit={deleteVisit}
              patientId={item.patientId}
              _id={item._id}
            />
          ),
        )
      ) : (
        <div>
          <h2>На сегодня пациентов нет, отдыхай!</h2>
        </div>
      )}

      <Link to={'/add-visiting'} key="add-visiting">
        <Fab
          color="primary"
          aria-label="add"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#00A6FB',
          }}>
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
};
