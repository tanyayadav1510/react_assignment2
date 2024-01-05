import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import { tabStyle, boldTabStyle } from './mainTabs.styles';
import LanguageIcon from '@mui/icons-material/Language';

export default function MainTabs({ tab, handleTabChange }) {
  return (
    <Box>
      <div style={{marginInlineStart:"96vw", position:"absolute", padding:"1vh", background: "#5c6bc0",}}>
        <LanguageIcon/>
      </div>
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
