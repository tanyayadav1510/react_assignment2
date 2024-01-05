import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import { tabStyle, boldTabStyle } from './mainTabs.styles';

export default function MainTabs({ tab, handleTabChange }) {
  return (
    <Box>
      <TabList onChange={handleTabChange}>
        <Tab
          label="Test APIs"
          value="testAPI"
          sx={{
            ...tabStyle,
            ...(tab === 'testAPI' && boldTabStyle),
            '&.Mui-selected': {
              ...boldTabStyle,
            },
          }}
          disableRipple
        />
        <Tab
          label="Server"
          value="server"
          sx={{
            ...tabStyle,
            ...(tab === 'server' && boldTabStyle),
            '&.Mui-selected': {
              ...boldTabStyle,
            },
          }}
          disableRipple
        />
      </TabList>
    </Box>
  );
}
