import React from 'react';
import { BtnTime } from '../shared/ui/BtnTime';
import 'react-swipeable-list/dist/styles.css';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import changeIcon from '../shared/icon/change.svg';

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
  deleteVisit,
  patientId,
  _id,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-[23px] pr-[13px] ">
      <Link to={`/patients-card/${patientId}`} key={patientId}>
        <div className="flex items-center space-x-3 ">
          <BtnTime variant={variant} arrivalTime={arrivalTime} />
          <div className="flex flex-col items-start ">
            <h2 className="text-black text-[18px] font-semibold">{fullName}</h2>
            <span className="text-black text-opacity-40 text-[16px] font-normal">{diagnosis}</span>
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-[20px]">
        <Link to={`/change-visiting/${_id}`}>
          <img src={changeIcon} style={{ cursor: 'pointer' }} />
        </Link>

        <MdDelete onClick={() => deleteVisit(_id)} size={25} style={{ color: '#28282880' }} />
      </div>
    </div>
  );
};
