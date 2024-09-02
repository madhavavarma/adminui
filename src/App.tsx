import { createTheme, ThemeProvider } from "@mui/material";
import Routing from "./Routing";
import { useState } from "react";
import { store } from "./store/Store";
import { Provider } from "react-redux";


function App() {

  const theme = createTheme({
    typography: {
      fontFamily: 'Play',
      fontSize: 12
    },
    palette: {
      primary: {
        main: 'rgb(255, 108, 47)'
      }
    }
  });
  const [darkMode] = useState("");

  const clsMain = `${darkMode} h-full`

  return (
    <>
      <main className = {clsMain} >
        <Provider store= {store}>
          <ThemeProvider theme={theme}>
              <Routing />
          </ThemeProvider>
        </Provider>
      </main>
    </>
  )
}

export default App
