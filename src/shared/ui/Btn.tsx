import { Button } from 'antd';

export const Btn = ({ children, width, closeModal, variant }) => {
  let buttonClassName = `flex items-center justify-center py-[13px] h-[50px] text-[16px] border-[0px]  rounded-[10px] ${
    width ? 'w-[364px || 200px]' : width
  }`;
  let backgroundColor, textColor;

  switch (variant) {
    case 'active':
      backgroundColor = 'bg-[#00A6FB]';
      textColor = 'text-white';
      break;
    case 'secondary':
      backgroundColor = 'bg-[#DCF3FF]';
      textColor = 'text-[#00A6FB]';
      break;
    default: {
      backgroundColor = 'bg-[#DCF3FF]';
      textColor = 'text-[#00A6FB]';
    }
  }

  return (
    <Button
      onClick={closeModal}
      className={`${buttonClassName} w-[${width}] ${backgroundColor} ${textColor}`}>
      {children}
    </Button>
  );
};
