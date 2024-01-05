export const tabContainerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };
  
  export const tabHeaderStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"

  };
  
  export const whiteTextStyle = {
    color: "white",
  };
  
  export const selectedTabStyle = {
    backgroundColor: "transparent",
    "&.Mui-selected": {
      fontSize: "15px",
      color: "white",
      background: "#5c6bc0",
    },
  };
  
  export const iconButtonStyle = {
    ...whiteTextStyle,
  };
  
  export const addButtonStyle = {
    ...whiteTextStyle,
    marginRight:"50px"
  };
  
  export const moveButtonStyle = {
    ...whiteTextStyle,
    ...(selectedTabStyle.fontWeight === "normal" && { ...selectedTabStyle }),
  };
  