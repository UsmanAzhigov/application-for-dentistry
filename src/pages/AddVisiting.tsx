import { Input, Select } from 'antd';
import { Btn } from '../shared/ui/Btn';
import { BtnDay } from '../shared/ui/BtnDay';
import { BtnTime } from '../shared/ui/BtnTime';
import { Checkbox } from '../shared/ui/CheckBox';

export const AddVisiting = () => {
  const numberOfDays = 14;

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col space-y-5">
        <Select
          style={{ height: '60px' }}
          showSearch
          placeholder="Выберите пациента"
          optionFilterProp="children"
          options={[
            {
              value: 'jack',
              label: 'Jack',
            },
            {
              value: 'lucy',
              label: 'Lucy',
            },
            {
              value: 'tom',
              label: 'Tom',
            },
          ]}
        />
        <Select
          style={{ height: '60px' }}
          showSearch
          placeholder="Диагноз"
          optionFilterProp="children"
          options={[
            {
              value: 'jack',
              label: 'Jack',
            },
            {
              value: 'lucy',
              label: 'Lucy',
            },
            {
              value: 'tom',
              label: 'Tom',
            },
          ]}
        />
        <div className="flex align-center space-x-3">
          <Input style={{ height: '60px' }} type="text" placeholder="Номер зуба" />
          <Input style={{ height: '60px' }} type="number" placeholder="Цена" />
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-[29px] mb-[28px]">
        <Checkbox />
        <span>Предоплата</span>
      </div>
      <div className="flex  flex-col space-y-3">
        <span className="font-medium text-[16px] text-gray-400 ">Июль, 2023</span>
        <div className="flex items-center space-x-2 mb-[23px] overflow-x-auto  ">
          {Array.from({ length: numberOfDays }, (_, index) => (
            <BtnDay key={index} />
          ))}
        </div>
      </div>
      <div className="flex  flex-col space-y-3 mb-[40px] mt-[23px]">
        <span className="font-medium text-[16px] text-gray-400 ">Время</span>
        <BtnTime variant="skipped" />
      </div>
      <Btn variant="active" width="100%">
        Добавить посещение
      </Btn>
    </div>
  );
};
