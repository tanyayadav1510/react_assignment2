import React, { useState } from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import MainTabs from "../MainTabs/MainTabs";
import SubTabs from "../SubTabs/SubTabs";
import { boxStyle } from "./tabsBar.styles";

const initialMainTab = "testAPI";
const initialSubTabs = {};

export default function TabsContainer() {
  const [mainTab, setMainTab] = useState(initialMainTab);
  const [subTabs, setSubTabs] = useState(initialSubTabs);
  const [subTab, setSubTab] = useState("");

  const handleMainTabChange = (event, newValue) => {
    setMainTab(newValue);
  };

  const handleSubTabChange = (event, subTabValue) => {
    setSubTab(subTabValue);
  };

  const handleSubTabStateChange = (tabValue, newState) => {
    setSubTabs((prevSubTabs) => ({
      ...prevSubTabs,
      [tabValue]: newState,
    }));
  };

  return (
    <div style={{ height: "100vh" }}>
      <Box sx={boxStyle}>
        <TabContext value={mainTab}>
          <MainTabs tab={mainTab} handleTabChange={handleMainTabChange} />
          {mainTab === "testAPI" && (
            <TabPanel value="testAPI">
              <Box sx={boxStyle}>
                <SubTabs
                  subTab={subTab}
                  subTabs={subTabs}
                  setSubTab={setSubTab}
                  handleSubTabChange={handleSubTabChange}
                  handleSubTabStateChange={handleSubTabStateChange}
                />
              </Box>
            </TabPanel>
          )}
          {mainTab === "server" && (
            <TabPanel value="server">
              <Box sx={boxStyle}>Server</Box>
            </TabPanel>
          )}
        </TabContext>
      </Box>
    </div>
  );
}
