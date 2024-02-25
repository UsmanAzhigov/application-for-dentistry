import React from 'react';
import Modal from '@mui/material/Modal';
import { Btn } from '../../shared/ui/Btn';
import TextField from '@mui/material/TextField';
import { fetchChangePatientCard, setNewItems } from '../../redux/patientCard/patientCardSlice';
import { useDispatch } from 'react-redux';
import { fetchAddPatient } from '../../redux/addVisit/addVisitSlice';
import { useLocation } from 'react-router-dom';

export const ModalComponent = ({ id, isModalOpen, closeModal, setIsModalClose }) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const changePatient = () => {
    try {
      const obj = {
        fullName,
        phoneNumber,
      };
      dispatch(fetchChangePatientCard({ id, obj }));
      dispatch(setNewItems(obj));
      closeModal();
    } catch (error) {
      console.log(error);
      alert('Не удалось изменить данные пациента');
    }
  };
  const addPatient = () => {
    try {
      const obj = {
        fullName,
        phoneNumber,
      };
      dispatch(fetchAddPatient({ obj }));
      dispatch(setNewItems(obj));
      setIsModalClose();
    } catch (error) {
      console.log(error);
      alert('Не удалось изменить данные пациента');
    }
  };
  return (
    <Modal
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      open={isModalOpen}>
      <div className="flex flex-col bg-white px-[27px] py-[31px] rounded-[15px] w-[338px] space-y-6">
        <TextField
          label="Имя пациента"
          variant="standard"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          type="number"
          label="Номер телефона"
          variant="standard"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Btn
          variant="active"
          width="100%"
          closeModal={() => (location.pathname === '/add-visiting' ? addPatient : changePatient)()}>
          Сохранить
        </Btn>
      </div>
    </Modal>
  );
};
