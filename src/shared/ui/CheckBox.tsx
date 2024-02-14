import { useState } from 'react';
import { Stack } from '@mui/material';
import btnCheck from '../icon/check-box.svg';

export const Checkbox = () => {
  const [onCheck, setOnCheck] = useState({ checkbox1: false, checkbox2: false });

  const handleCheckboxToggle = (checkbox: string) => {
    setOnCheck((prevOnCheck) => ({
      ...prevOnCheck,
      [checkbox]: !prevOnCheck[checkbox],
    }));
  };
  return (
    <Stack
      onClick={() => handleCheckboxToggle('checkbox1')}
      sx={{
        width: '23px',
        height: '23px',
        border: '1px solid #00A6FB',
        borderRadius: '6px',
      }}>
      {onCheck.checkbox1 && <img src={btnCheck} alt="Checked" />}
    </Stack>
  );
};
