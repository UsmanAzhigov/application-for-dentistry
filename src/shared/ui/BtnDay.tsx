export const BtnDay = ({ isActive, choiceDay, dayOfWeek, dayOfMonth, onSelectDay }) => {
  const activeStyles = 'bg-[#00A6FB] shadow-blue-900';
  const inactiveStyles = 'bg-gray-100 ';
  const baseStyles = 'flex flex-col items-center py-[14px] px-[18px] rounded-[10px]';

  const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

  return (
    <div
      onClick={choiceDay}
      onClickCapture={onSelectDay}
      className={`${baseStyles} ${isActive ? activeStyles : inactiveStyles}`}>
      <span
        className={
          isActive
            ? 'text-white text-[20px] font-bold'
            : 'text-black text-opacity-40 text-[20px] font-bold'
        }>
        {dayOfMonth}
      </span>
      <span
        className={
          isActive
            ? 'text-white text-[12px] font-medium'
            : 'text-black text-opacity-50 text-[12px] font-medium'
        }>
        {daysOfWeek[dayOfWeek]}
      </span>
    </div>
  );
};
