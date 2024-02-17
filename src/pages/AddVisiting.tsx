import axios from 'axios';
import React, { FC } from 'react';
import { Input, Select } from 'antd';
import { Btn } from '../shared/ui/Btn';
import { BtnDay } from '../shared/ui/BtnDay';
import { Checkbox } from '../shared/ui/CheckBox';

import { useForm, Controller } from 'react-hook-form';
import { BtnListTime } from '../shared/ui/BtnListTime';

export const AddVisiting: FC = () => {
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

  const [patients, setPatients] = React.useState([]);
  const { control, handleSubmit, setValue, register } = useForm();

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

  const addVisit = async (formData: any) => {
    try {
      const obj = {
        fullName: formData.selectPatient,
        date: formData.selectDay,
        month: currentDate.toLocaleDateString('ru-RU', { month: 'long' }),
        diagnosis: formData.selectDiagnosis,
        arrivalTime: formData.selectArrivalTime,
        price: formData.selectPrice,
        numberTooth: formData.selectNumberTooth,
      };
      await axios.post('http://localhost:5000/addVisit', obj);
    } catch (error) {
      console.error(error);
    }
  };

  const handleActiveDay = (dayIndex: number) => {
    setActiveDay(dayIndex);
    setValue('selectDay', (currentDayOfMonth + dayIndex) % daysInMonth || daysInMonth);
  };

  return (
    <form onSubmit={handleSubmit(addVisit)}>
      <div className="flex flex-col ">
        <div className="flex flex-col space-y-5">
          <Controller
            render={({ field }) => (
              <Select
                style={{ height: '60px' }}
                placeholder="Выберите пациента"
                showSearch
                optionFilterProp="children"
                value={field.value}
                onChange={(value) => field.onChange(value)}
                options={
                  patients.map((items: { fullName: string }) => {
                    return {
                      value: items.fullName,
                      label: items.fullName,
                    };
                  }) || []
                }
              />
            )}
            control={control}
            name="selectPatient"
            rules={{ required: 'Выберите пациента' }}
          />
          <Controller
            render={({ field }) => (
              <Select
                style={{ height: '60px' }}
                showSearch
                placeholder="Диагноз"
                optionFilterProp="children"
                value={field.value}
                onChange={(value) => field.onChange(value)}
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
            )}
            control={control}
            name="selectDiagnosis"
            rules={{ required: 'Выберите диагноз' }}
          />
          <div className="flex align-center space-x-3">
            <Controller
              render={({ field }) => (
                <Input
                  style={{ height: '60px' }}
                  type="number"
                  placeholder="Номер зуба"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
              control={control}
              name="selectNumberTooth"
            />
            <Controller
              render={({ field }) => (
                <Input
                  style={{ height: '60px' }}
                  type="number"
                  placeholder="Цена"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
              control={control}
              name="selectPrice"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-[29px] mb-[28px]">
          <Controller
            render={({ field }) => (
              <>
                <Checkbox {...field} />
                <span>Предоплата</span>
              </>
            )}
            control={control}
            name="prepayment"
          />
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
                  onSelectDay={() => setValue('selectDay', day)}
                />
              );
            })}
          </div>
        </div>
        <div className="flex  flex-col space-y-3 mb-[40px] mt-[23px]">
          <span className="font-medium text-[16px] text-gray-400 ">Время</span>
          <Controller
            render={({ field }) => (
              <BtnListTime
                variant="skipped"
                options={hoursOptions}
                onChange={(value: string) => field.onChange(value)}
              />
            )}
            control={control}
            name="selectArrivalTime"
          />
        </div>
        <Btn closeModal={handleSubmit(addVisit)} variant="active" width="100%">
          Добавить посещение
        </Btn>
      </div>
    </form>
  );
};
