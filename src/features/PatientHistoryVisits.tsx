import { BtnTime } from '../shared/ui/BtnTime';
import toothIcon from '../shared/icon/tooth.svg';

export const PatientHistoryVisits = ({
  _id,
  diagnosis,
  arrivalTime,
  price,
  numberTooth,
  prepayment,
}) => {
  return (
    <div>
      <div key={_id} className="flex items-center justify-between py-[23px]">
        <div className="flex items-center space-x-3 ">
          <BtnTime arrivalTime={arrivalTime} />
          <div className="flex flex-col items-start ">
            <h2 className="text-black text-[18px] font-semibold">{diagnosis}</h2>
            <span className="flex items-center text-black text-opacity-40 text-[16px] font-normal space-x-2 ">
              <img src={toothIcon} /> <span>{numberTooth}</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end ">
          <h2 className="text-green-500 text-[18px] font-semibold ">{price} P</h2>
          <span className="text-black text-opacity-40 text-[16px] font-normal">{prepayment}</span>
        </div>
      </div>
    </div>
  );
};
