import React from 'react';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

import axios from 'axios';

import { BtnDay } from '../shared/ui/BtnDay';
import { PatientTime } from '../features/PatientTime';

export const Home = () => {
  const numberOfDays = 31;
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const currentDayOfMonth = currentDate.getDate();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const [patient, setPatient] = React.useState([]);
  const [activeDay, setActiveDay] = React.useState(null);

  const onChoiceDay = async (dayIndex) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDayOfMonth + dayIndex,
    );
    try {
      const { data } = await axios.get(`/${selectedDate.getDate()}`);
      setPatient(data);
    } catch (error) {}
    setActiveDay(dayIndex);

    console.log(
      selectedDate.toLocaleDateString('ru-RU', { weekday: 'long' }),
      selectedDate.getDate(),
      selectedDate.toLocaleDateString('ru-RU', { month: 'long' }),
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex border-b border-gray-300 ">
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
      {patient?.map(() => {
        <Link to={'/patient-card'}>
          <PatientTime variant="expectation" />
        </Link>;
      })}

      <Link to={'/add-visiting'}>
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
