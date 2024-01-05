import React from 'react';
import { Box } from '@mui/material';
import { containerStyle, barStyle } from './horizontalStepper.styles';

const HorizontalStepper = () => {
  return (
    <>
      <div style={{ height: '40px', background: 'white' }}></div>
      <div style={containerStyle}>
        {Array.from({ length: 23 }, (_, index) => (
          <Box key={index} sx={barStyle} />
        ))}
      </div>
    </>
  );
}

export default HorizontalStepper;
