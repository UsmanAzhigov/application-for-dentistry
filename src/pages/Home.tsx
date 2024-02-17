import React, { FC } from 'react';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { BtnDay } from '../shared/ui/BtnDay';
import { PatientTime } from '../features/PatientTime';

export const Home: FC = () => {
  const numberOfDays = 31;
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const currentDayOfMonth = currentDate.getDate();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const [visit, setVisit] = React.useState([]);
  const [activeDay, setActiveDay] = React.useState(null);

  const onChoiceDay = async (dayIndex: React.SetStateAction<null>) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDayOfMonth + dayIndex,
    );
    try {
      const month = selectedDate.toLocaleDateString('ru-RU', { month: 'long' });
      const { data } = await axios.get(
        `http://localhost:5000/visits/${selectedDate.getDate()}/${month}`,
      );
      setVisit(data);
    } catch (error) {
      setVisit([]);
    }
    setActiveDay(dayIndex);
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
      {visit.map(
        (items: { _id: string; fullName: string; diagnosis: string; arrivalTime: string }) => {
          return (
            <Link to={`/patients/${items.fullName}`} key={items._id}>
              <PatientTime
                variant="expectation"
                fullName={items.fullName}
                diagnosis={items.diagnosis}
                arrivalTime={items.arrivalTime}
              />
            </Link>
          );
        },
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
