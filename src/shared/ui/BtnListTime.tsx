import { Key } from 'react';

export const BtnListTime = ({ variant, options, onChange }) => {
  let buttonClassName = `flex items-center py-1 px-2 rounded-md w-24 h-12`;
  let backgroundColor: string, textColor: string;

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
    <div className="max-w-[318px] h-[427px] flex flex-wrap cursor-pointer">
      {options.map((item: any, index: Key) => (
        <div
          onClick={() => onChange(item)}
          key={index}
          className={`${buttonClassName} ${backgroundColor} mx-1 my-1`}>
          <span className={`${textColor} text-14 font-bold`}>{item}</span>
        </div>
      ))}
    </div>
  );
};
