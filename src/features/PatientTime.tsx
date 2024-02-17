import React from 'react';
import { BtnTime } from '../shared/ui/BtnTime';

import rejectedIcon from '../shared/icon/rejected.svg';

interface PatientTimeProps {
  variant: string;
  fullName: string;
  diagnosis: string;
  arrivalTime: string;
}

export const PatientTime: React.FC<PatientTimeProps> = ({
  variant,
  fullName,
  diagnosis,
  arrivalTime,
}) => {
  console.log(fullName, diagnosis, arrivalTime);
  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-[23px] pr-[13px] ">
      <div className="flex items-center space-x-3 ">
        <BtnTime variant={variant} arrivalTime={arrivalTime} />
        <div className="flex flex-col items-start ">
          <h2 className="text-black text-[18px] font-semibold">{fullName}</h2>
          <span className="text-black text-opacity-40 text-[16px] font-normal">{diagnosis}</span>
        </div>
      </div>
      <img src={rejectedIcon} alt="Rejected Icon" />
    </div>
  );
};
