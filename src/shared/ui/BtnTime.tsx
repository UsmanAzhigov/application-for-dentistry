import React from 'react';

export const BtnTime = ({ variant }) => {
  let buttonClassName = `flex items-center py-[9px] px-[8px] rounded-[10px] w-[55px] h-[32px]`;
  let backgroundColor, textColor;

  switch (variant) {
    case 'upcoming':
      backgroundColor = 'bg-[#00A6FB]';
      textColor = 'text-white ';
      break;
    case 'expectation':
      backgroundColor = 'bg-[#E9F5FF]';
      textColor = 'text-[#4294FF] ';
      break;
    case 'skipped':
      backgroundColor = 'bg-[#F2F2F2]';
      textColor = 'text-[#8F8F8F]';
      break;
    case 'cancelled':
      backgroundColor = 'bg-[#FFE5E5]';
      textColor = 'text-[#D08888]';
      break;
    case 'occupied':
      backgroundColor = 'bg-[#F6F6F6] opacity-50';
      textColor = 'text-[#949494]';
      break;
    default: {
      backgroundColor = 'bg-[#DCF3FF]';
      textColor = 'text-[#00A6FB]';
    }
  }
  return (
    <div className={`${buttonClassName} ${backgroundColor}`}>
      <span className={`${textColor} text-[14px] font-bold`}>12:30</span>
    </div>
  );
};
