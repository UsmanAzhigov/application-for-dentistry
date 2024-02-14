import React from 'react';
import Modal from '@mui/material/Modal';
import { Btn } from '../../shared/ui/Btn';
import TextField from '@mui/material/TextField';

export const ModalComponent = ({ isModalOpen, closeModal }) => {
  return (
    <Modal
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      open={isModalOpen}>
      <div className="flex flex-col bg-white px-[27px] py-[31px] rounded-[15px] w-[338px] space-y-6">
        <TextField label="Имя пациента" variant="standard" />
        <TextField type="number" label="Номер телефона" variant="standard" />
        <Btn variant="active" width="100%" closeModal={closeModal}>
          Сохранить
        </Btn>
      </div>
    </Modal>
  );
};
