import { createTheme, ThemeProvider } from "@mui/material";
import HorizontalStepper from "./components/HorizontalStepper/HorizontalStepper";
import TabsBar from "./components/TabsBar/TabsBar";

// const deepPurple = '#482880'
const theme = createTheme({
  palette: {
    primary: { main: "#482880" },
    secondary: {
      main: "#880e4f",
    }
  },
});


function App() {
  return (
    <div style={{backgroundColor: '#3949ab'}}>
    <ThemeProvider theme={theme}>
        <HorizontalStepper />
        <TabsBar/> 
    </ThemeProvider>
    </div>
  );
}

export default App;
