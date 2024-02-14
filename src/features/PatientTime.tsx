import React from 'react';
import { BtnTime } from '../shared/ui/BtnTime';

import rejectedIcon from '../shared/icon/rejected.svg';

export const PatientTime = ({ variant }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-[23px] pr-[13px] ">
      <div className="flex items-center space-x-3 ">
        <BtnTime variant={variant} />
        <div className="flex flex-col items-start ">
          <h2 className="text-black text-[18px] font-semibold">Арчаков Хаваж</h2>
          <span className="text-black text-opacity-40 text-[16px] font-normal">
            повторный прием
          </span>
        </div>
      </div>
      <img src={rejectedIcon} />
    </div>
  );
};
