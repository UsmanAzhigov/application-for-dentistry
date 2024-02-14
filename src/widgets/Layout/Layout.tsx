import { useState } from 'react';

import { ModalComponent } from './Modal';
import { useLocation, Link } from 'react-router-dom';

import { MdDelete } from 'react-icons/md';
import searchIcon from '../../shared/icon/search.svg';
import changeIcon from '../../shared/icon/change.svg';
import arrowLeftIcon from '../../shared/icon/arrow-left.svg';

export const Layout = ({ children }) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const titlePage =
    location.pathname === '/'
      ? 'text-black font-extrabold text-[28px]'
      : 'text-[#00A6FB] font-semibold text-[20px] ';

  return (
    <div className="flex flex-col p-[24px] space-y-5">
      <div className="flex items-center justify-between">
        <Link to={'/'}>
          <div className="flex  space-x-6">
            {location.pathname !== '/' && <img src={arrowLeftIcon} />}
            <h1 className={`${titlePage}`}>
              {location.pathname === '/'
                ? 'Пациенты'
                : location.pathname === '/add-visiting'
                ? 'Добавить посещение'
                : location.pathname === '/patient-card'
                ? 'Карта пациента'
                : ''}
            </h1>
          </div>
        </Link>
        {location.pathname === '/' && <img src={searchIcon} />}
        {location.pathname === '/patient-card' && (
          <div className="flex items-center space-x-3">
            <MdDelete size={25} style={{ color: '#28282880' }} />
            <img src={changeIcon} onClick={openModal} style={{ cursor: 'pointer' }} />
          </div>
        )}
      </div>
      {children}

      <ModalComponent isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};
