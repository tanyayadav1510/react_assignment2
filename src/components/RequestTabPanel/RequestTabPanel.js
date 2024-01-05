import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TextField } from "@mui/material";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import {
  containerStyle,
  menuItemStyle,
  inputStyle,
  sendButtonStyle,
  textAreaStyle,
  dividerStyle,
  submitButtonStyle,
} from "./requestTabPanel.styles";

const menuItems = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PUT", value: "PUT" },
  { label: "DELETE", value: "DELETE" },
];

export default function RequestTabPanel({ tabState = {}, setTabState }) {
  const {
    method = menuItems[0].value,
    api = "",
    response = "",
    body = "",
  } = tabState;

  const handleBodyChange = (event) => {
    setTabState({
      ...tabState,
      body: event.target.value,
    });
  };

  const handleMethodChange = (selectedMethod) => {
    setTabState({
      ...tabState,
      method: selectedMethod,
    });
  };

  const handleApiChange = (e) => {
    setTabState({
      ...tabState,
      api: e.target.value,
    });
  };

  const handleSendRequest = async () => {
    try {
      const requestOptions = {
        method: method,
      };

      if (method === "POST") {
        requestOptions.headers = {
          "Content-Type": "application/json",
        };
        requestOptions.body = JSON.stringify({ body: body });
      }

      const apiResponse = await fetch(api, requestOptions);
      const data = await apiResponse.json();
      setTabState({
        ...tabState,
        response: JSON.stringify(data, null, 2),
      });
    } catch (error) {
      setTabState({
        ...tabState,
        response: `Error: ${error.message}`,
      });
    }
  };

  return (
    <div style={containerStyle}>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <div style={{ display: "flex"}}>
              <div style={{ background: "white" }}>
                <MenuItem {...bindTrigger(popupState)} style={menuItemStyle} disableRipple>
                  {method} <ArrowDropDownIcon sx={{ position: 'absolute',paddingLeft: '80px'}}/>
                </MenuItem>
                <Menu {...bindMenu(popupState)}>
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.value}
                      onClick={() => {
                        popupState.close();
                        handleMethodChange(item.value);
                      }}
                      style={menuItemStyle}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
              <div style={{ background: "white", fontSize:"18px", color:"grey", padding: "5px 20px 5px 50px" }} >
              Domain URL
              </div>
              <input
                style={inputStyle}
                placeholder="API"
                type="text"
                id="api"
                value={api}
                onChange={handleApiChange}
              />

              <div>
                <MenuItem style={sendButtonStyle} onClick={handleSendRequest}>
                  Send
                </MenuItem>
              </div>
            </div>
          </React.Fragment>
        )}
      </PopupState>
      <div
        style={{
          marginTop: "20px",
          width: "100%",
          height: "200px",
          background: "#283593",
          overflowY: "auto",
        }}
      >
        <TextField
          InputProps={{
            disableUnderline: true,
            style: { color: "white" },
          }}
          variant="standard"
          key="body"
          value={body}
          multiline
          style={textAreaStyle}
          onChange={handleBodyChange}
        />
      </div>

      <div
        style={{
          marginTop: "20px",
          width: "100%",
          height: "200px",
          background: "#283593",
          overflowY: "auto",
        }}
      >
        <TextField
          InputProps={{
            disableUnderline: true,
            style: { color: "white" },
          }}
          variant="standard"
          key="response"
          value={response}
          multiline
          style={textAreaStyle}
          aria-readonly
        />
      </div>
      <div style={{ marginTop: "50px" }}>
        <Divider variant="fullWidth" style={dividerStyle} />
      </div>
      <div style={submitButtonStyle}>
        <Button
          variant="contained"
          sx={{
            ...submitButtonStyle,
            borderRadius: "80px",
            fontWeight: "bold",
            color: "#283593",
            backgroundColor: "white",
          }}
          onClick={handleSendRequest}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
