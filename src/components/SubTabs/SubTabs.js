import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import RequestTabPanel from "../RequestTabPanel/RequestTabPanel";
import {
  tabContainerStyle,
  tabHeaderStyle,
  whiteTextStyle,
  selectedTabStyle,
  addButtonStyle,
  moveButtonStyle,
} from "./subTabs.styles";


const SubTabs = ({
  subTab,
  subTabs,
  setSubTab,
  handleSubTabChange,
  handleSubTabStateChange,
}) => {
  const [newTabName, setNewTabName] = useState("");
  const [tabStates, setTabStates] = useState(subTabs);

  

  const handlePlusIconClick = () => {
    if (newTabName === "") {
      const newTabValue =
        Object.keys(tabStates).length === 0
          ? "request1"
          : `request${Object.keys(tabStates).length + 1}`;
      setSubTab(newTabValue);
      const newTabState = {
        method: "GET",
        api: "",
        response: "",
        body: "",
      };

      setTabStates((prevState) => ({
        ...prevState,
        [newTabValue]: newTabState,
      }));

      handleSubTabStateChange(newTabValue, newTabState);

      setNewTabName("");
    }
  };

  const handleTabStateChange = (newState) => {
    if (!subTab) {
      setTabStates({ request1: newState });
      handleSubTabStateChange("request1", newState);
    } else {
      setTabStates((prevState) => ({
        ...prevState,
        [subTab]: newState,
      }));
      handleSubTabStateChange(subTab, newState);
    }
  };

  const handleTabClose = (value) => {
    const { [value]: _, ...updatedSubTabs } = tabStates;
    const remainingTabs = Object.keys(updatedSubTabs);

    if (remainingTabs.length === 0) {
      setSubTab("");
    } else {
      const currentIndex = remainingTabs.indexOf(subTab);
      setSubTab(remainingTabs[currentIndex === 0 ? 0 : currentIndex - 1]);
    }

    handleSubTabStateChange(value, null);
  };

  const handleMoveLeft = () => {
    const remainingTabs = Object.keys(tabStates).filter((tabValue) => subTabs[tabValue] !== null);
    const currentIndex = remainingTabs.indexOf(subTab);
    if (currentIndex > 0) {
      setSubTab(remainingTabs[currentIndex - 1]);
    }
  };

  const handleMoveRight = () => {
    const remainingTabs = Object.keys(tabStates).filter((tabValue) => subTabs[tabValue] !== null);
    const currentIndex = remainingTabs.indexOf(subTab);
    if (currentIndex < remainingTabs.length - 1) {
      setSubTab(remainingTabs[currentIndex + 1]);
    }
  };

  return (
    <Box>
      <TabContext value={subTab}>
        <Box sx={tabContainerStyle}>
          <Box sx={tabHeaderStyle}>
            <IconButton
              size="small"
              disabled={
                Object.keys(subTabs).filter((tabValue) => subTabs[tabValue] !== null).length < 1 ||
                Object.keys(subTabs).filter((tabValue) => subTabs[tabValue] !== null).indexOf(subTab) === 0
              }
              onClick={handleMoveLeft}
              sx={moveButtonStyle}
            >
              <ChevronLeftOutlinedIcon />
            </IconButton>
            <TabList
              onChange={handleSubTabChange}
              sx={{ backgroundColor: "transparent" }}
            >
              {Object.keys(tabStates)
                .filter((tabValue) => subTabs[tabValue] !== null)
                .map((tabValue) => (
                  <Tab
                    key={tabValue}
                    label={
                      <div style={{ ...tabHeaderStyle, ...whiteTextStyle }}>
                        <div>{`Request ${extractNumericValue(tabValue)}`}</div>
                        <IconButton
                          size="small"
                          onClick={() => handleTabClose(tabValue)}
                          sx={{
                            ...whiteTextStyle,
                            ...selectedTabStyle,
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>
                    }
                    value={tabValue}
                    sx={selectedTabStyle}
                  />
                ))}
            </TabList>
            <IconButton
              size="small"
              onClick={handlePlusIconClick}
              sx={addButtonStyle}
            >
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
            <div style={{marginInlineStart:"93vw", position:"absolute"}}>
            <IconButton
              size="small"
              disabled={
                Object.keys(subTabs).filter((tabValue) => subTabs[tabValue] !== null).indexOf(subTab) ===
                Object.keys(subTabs).filter((tabValue) => subTabs[tabValue] !== null).length - 1
              }
              onClick={handleMoveRight}
              sx={moveButtonStyle}
            >
              <ChevronRightOutlinedIcon />
            </IconButton>
            </div>
          </Box>

          {Object.keys(tabStates).filter((tabValue) => subTabs[tabValue] !== null)
            .length !== 0 &&
            subTab !== "" && (
              <TabPanel value={subTab} sx={{ flex: 1, overflowY: "auto" }}>
                <RequestTabPanel
                  key={subTab}
                  tabState={tabStates[subTab] || {}}
                  setTabState={handleTabStateChange}
                />
              </TabPanel>
            )}
        </Box>
      </TabContext>
    </Box>
  );
};

export default SubTabs;

function extractNumericValue(str) {
  const numericPart = str.replace("request", "");
  const numericValue = parseInt(numericPart, 10);

  if (!isNaN(numericValue)) {
    return numericValue;
  }

  return null;
}
