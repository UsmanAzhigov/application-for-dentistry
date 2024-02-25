import React, { FC, useState } from 'react';
import { Divider, Input, Select } from 'antd';
import { Btn } from '../shared/ui/Btn';
import { BtnDay } from '../shared/ui/BtnDay';
import { Checkbox } from '../shared/ui/CheckBox';

import { useForm, Controller } from 'react-hook-form';
import { BtnListTime } from '../shared/ui/BtnListTime';
import { useLocation, useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddVisit, fetchPatients } from '../redux/addVisit/addVisitSlice';
import { fetchChangeVisit } from '../redux/changeVisit/changeVisitSlice';
import { ModalComponent } from '../widgets/Layout/Modal';
import { setVisits } from '../redux/home/homeSlice';

export const AddVisiting: FC = () => {
  const numberOfDays = 31;
  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const currentDayOfWeek = currentDate.getDay();
  const [activeDay, setActiveDay] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { items } = useSelector((state: RootState) => state.addVisit);
  const { id } = useParams();
  const dispatch = useDispatch();
  const hoursOptions = Array.from({ length: 14 }, (_, index) => {
    const formattedHour = (index + 10).toString().padStart(2, '0');
    return `${formattedHour}:00`;
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectPatient: '',
      selectDay: 0,
      selectDiagnosis: '',
      selectArrivalTime: '',
      selectPrice: 0,
      selectNumberTooth: 0,
      prepayment: false,
    },
  });

  React.useEffect(() => {
    async function fetchData() {
      try {
        dispatch(fetchPatients());
      } catch (error) {
        console.log(error);
        alert('Не удалось получить пациентов!');
      }
    }
    fetchData();
  }, []);
  const changeVisit = (formData: any) => {
    try {
      const selectedPatient = items.find(
        (patient: { fullName: string }) => patient.fullName === formData.selectPatient,
      );
      const visit = {
        patientId: selectedPatient._id,
        fullName: formData.selectPatient,
        date: formData.selectDay,
        month: currentDate.toLocaleDateString('ru-RU', { month: 'long' }),
        diagnosis: formData.selectDiagnosis,
        arrivalTime: formData.selectArrivalTime,
        price: formData.selectPrice,
        numberTooth: formData.selectNumberTooth,
      };
      dispatch(fetchChangeVisit({ id, visit }));
    } catch (error) {
      console.log(error);
    }
  };
  const addVisit = async (formData: any) => {
    try {
      const selectedPatient = items.find(
        (patient: { fullName: string }) => patient.fullName === formData.selectPatient,
      );
      const obj = {
        patientId: selectedPatient._id,
        fullName: formData.selectPatient,
        prepayment: formData.prepayment ? 'Предоплата' : '',
        date: formData.selectDay,
        month: currentDate.toLocaleDateString('ru-RU', { month: 'long' }),
        diagnosis: formData.selectDiagnosis,
        arrivalTime: formData.selectArrivalTime,
        price: formData.selectPrice,
        numberTooth: formData.selectNumberTooth,
      };
      dispatch(fetchAddVisit({ obj }));
      dispatch(setVisits([obj]));
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
                status={errors.selectPatient ? 'error' : ''}
                helperText={errors.selectPatient?.message}
                onChange={(value) => field.onChange(value)}
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
                    <div
                      style={{ padding: '8px', cursor: 'pointer', color: '#038cfc' }}
                      onClick={() => setIsModalOpen(true)}>
                      Добавить пациента
                      <ModalComponent
                        isModalOpen={isModalOpen}
                        setIsModalClose={() => setIsModalOpen(false)}
                      />
                    </div>
                  </div>
                )}
                options={
                  items.map((items: { fullName: string }) => {
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
                status={errors.selectDiagnosis ? 'error' : ''}
                helperText={errors.selectDiagnosis?.message}
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
                  status={errors.selectNumberTooth ? 'error' : ''}
                  helperText={errors.selectNumberTooth?.message}
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
                  status={errors.selectPrice ? 'error' : ''}
                  helperText={errors.selectPrice?.message}
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
                <Checkbox onPrepayment={() => setValue('prepayment', !field.value)} {...field} />
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
                variant="secondary"
                options={hoursOptions}
                onChange={(value: string) => {
                  field.onChange(value);
                }}
              />
            )}
            control={control}
            name="selectArrivalTime"
          />
        </div>
        <Btn
          closeModal={
            location.pathname === '/add-visiting'
              ? handleSubmit(addVisit)
              : handleSubmit(changeVisit)
          }
          variant="active"
          width="100%">
          {location.pathname === '/add-visiting' ? 'Добавить посещение' : 'Сохранить изменения'}
        </Btn>
      </div>
    </form>
  );
};
