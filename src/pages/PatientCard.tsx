import React from 'react';
import Fab from '@mui/material/Fab';
import { Btn } from '../shared/ui/Btn';
import AddIcon from '@mui/icons-material/Add';

import callIcon from '../shared/icon/call.svg';
import toothIcon from '../shared/icon/tooth.svg';

import { BtnTime } from '../shared/ui/BtnTime';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const PatientCard = () => {
  const { id } = useParams();
  const [patientInfo, setPatientInfo] = React.useState([]);
  console.log();
  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`http://localhost:5000/patients/${id}`);
        setPatientInfo(data);
        console.log(data);
      } catch (error) {
        setPatientInfo([]);
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-col">
      {patientInfo.map((items) => {
        return (
          <>
            <div className="flex flex-col">
              <h2 className="font-bold text-[28px]">{items.fullName}</h2>
              <span className="font-medium text-[20px] text-gray-400">+{items.phoneNumber}</span>
            </div>
            <div className="flex items-center justify-between mt-[25px] space-x-3">
              <img src={callIcon} onClick={() => (window.location.href = `tel:+79992006655`)} />
              <Btn variant="secondary" width="65%">
                Формула зубов
              </Btn>
              <Fab color="primary" aria-label="add" style={{ backgroundColor: '#00A6FB' }}>
                <AddIcon />
              </Fab>
            </div>
            <h2 className="text-black text-[20px] font-semibold mt-[45px] ">Предстоящие</h2>
            <div className="flex items-center justify-between py-[23px]  ">
              <div className="flex items-center space-x-3 ">
                <BtnTime />
                <div className="flex flex-col items-start ">
                  <h2 className="text-black text-[18px] font-semibold">Пульпит</h2>
                  <span className="flex items-center text-black text-opacity-40 text-[16px] font-normal space-x-2 ">
                    <img src={toothIcon} /> <span>32</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end ">
                <h2 className="text-green-500 text-[18px] font-semibold ">5000 P</h2>
                <span className="text-black text-opacity-40 text-[16px] font-normal">
                  предоплата
                </span>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
