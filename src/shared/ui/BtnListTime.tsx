import { useState } from 'react';

export const BtnListTime = ({ variant, options, onChange }) => {
  let buttonClassName = `flex items-center justify-center px-3 rounded-[10px] w-[75px] h-[40px]`;
  let backgroundColor: string, textColor: string;
  const [activeIndex, setActiveIndex] = useState(null);

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
    case 'secondary':
      backgroundColor = 'bg-[#00A6FB] shadow-blue-900';
      break;
    default: {
      backgroundColor = 'bg-[#DCF3FF]';
      textColor = 'text-[#00A6FB]';
    }
  }
  return (
    <div className="h-[227px] flex flex-wrap cursor-pointer">
      {options.map((item: string, index: number) => (
        <div
          onClick={() => {
            setActiveIndex(index);
            onChange(item);
          }}
          key={index}
          className={`${buttonClassName} ${backgroundColor} mx-1 my-1 ${
            activeIndex === index ? 'bg-[#00A6FB] shadow-blue-900' : 'bg-gray-100'
          }`}>
          <span
            className={`${textColor}  ${activeIndex === index ? 'text-white' : 'text-[#949494]'}`}>
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};
