import { Input, Select } from 'antd';
import { Btn } from '../shared/ui/Btn';
import { BtnDay } from '../shared/ui/BtnDay';
import { Checkbox } from '../shared/ui/CheckBox';
import axios from 'axios';
import { FC } from 'react';
import * as React from 'react';
import { BtnListTime } from '../shared/ui/BtnListTime';

export const AddVisiting: FC = () => {
  const [selectPatient, setSelectPatient] = React.useState('');
  const [selectDiagnosis, setSelectDiagnosis] = React.useState('');
  const [selectArrivalTime, setSelectArrivalTime] = React.useState('');
  const [selectDay, setSelectDay] = React.useState();
  const [selectPrice, setSelectPrice] = React.useState();
  const [selectNumberTooth, setSelectNumberTooth] = React.useState();
  const [patients, setPatients] = React.useState([]);
  const numberOfDays = 31;
  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const currentDayOfWeek = currentDate.getDay();
  const [activeDay, setActiveDay] = React.useState(null);
  const hoursOptions = Array.from({ length: 24 }, (_, index) => {
    const formattedHour = index.toString().padStart(2, '10');
    return `${formattedHour}:00`;
  });
  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('http://localhost:5000/patients');
        setPatients(data);
      } catch (error) {
        setPatients([]);
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const addVisit = async () => {
    try {
      const obj = {
        fullName: selectPatient,
        date: selectDay,
        month: currentDate.toLocaleDateString('ru-RU', { month: 'long' }),
        diagnosis: selectDiagnosis,
        arrivalTime: selectArrivalTime,
        price: selectPrice,
        numberTooth: selectNumberTooth,
      };
      await axios.post('http://localhost:5000/addVisit', obj);
    } catch (error) {
      console.error(error);
    }
  };
  const handleActiveDay = (dayIndex: React.SetStateAction<null>) => {
    setActiveDay(dayIndex);
  };
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col space-y-5">
        <Select
          style={{ height: '60px' }}
          placeholder="Выберите пациента"
          showSearch
          optionFilterProp="children"
          value={selectPatient}
          onChange={(value) => setSelectPatient(value)}
          options={
            patients.map((items: { fullName: string }) => {
              return {
                value: items.fullName,
                label: items.fullName,
              };
            }) || []
          }
        />
        <Select
          style={{ height: '60px' }}
          showSearch
          placeholder="Диагноз"
          optionFilterProp="children"
          value={selectDiagnosis}
          onChange={(value) => setSelectDiagnosis(value)}
          options={[
            {
              value: 'Удаление зуба',
              label: 'Удаление зуба',
            },
            {
              value: 'Пульпит',
              label: 'Пульпит',
            },
            {
              value: 'Карис',
              label: 'Карис',
            },
          ]}
        />
        <div className="flex align-center space-x-3">
          <Input
            style={{ height: '60px' }}
            type="number"
            placeholder="Номер зуба"
            value={selectNumberTooth}
            onChange={(e) => setSelectNumberTooth(Number(e.target.value))}
          />
          <Input
            style={{ height: '60px' }}
            type="number"
            placeholder="Цена"
            value={selectPrice}
            onChange={(e) => setSelectPrice(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-[29px] mb-[28px]">
        <Checkbox />
        <span>Предоплата</span>
      </div>
      <div className="flex  flex-col space-y-3">
        <span className="font-medium text-[16px] text-gray-400 ">Июль, 2023</span>
        <div className="flex items-center space-x-2 mb-[23px] overflow-x-auto  ">
          {Array.from({ length: numberOfDays }, (_, index: any) => {
            const day = (currentDayOfMonth + index) % daysInMonth || daysInMonth;

            return (
              <BtnDay
                key={index}
                dayOfMonth={day}
                dayOfWeek={(currentDayOfWeek + index - 1) % 7}
                choiceDay={() => handleActiveDay(index)}
                isActive={activeDay === index}
                onSelectDay={() => setSelectDay(day)}
              />
            );
          })}
        </div>
      </div>
      <div className="flex  flex-col space-y-3 mb-[40px] mt-[23px]">
        <span className="font-medium text-[16px] text-gray-400 ">Время</span>
        <BtnListTime
          variant="skipped"
          options={hoursOptions}
          onChange={(value: React.SetStateAction<string>) => setSelectArrivalTime(value)}
        />
      </div>
      <Btn closeModal={addVisit} variant="active" width="100%">
        Добавить посещение
      </Btn>
    </div>
  );
};
