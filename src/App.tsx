import { createTheme, ThemeProvider } from "@mui/material";
import Routing from "./Routing";
import Layout from "./basecomponents/Layout";
import { useState } from "react";
import { store } from "./store/Store";
import { Provider } from "react-redux";


function App() {

  const theme = createTheme({});
  const [darkMode] = useState("");

  const clsMain = `${darkMode} h-full`

  return (
    <>
      <main className = {clsMain} >
        <Provider store= {store}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Routing />
            </Layout>
          </ThemeProvider>
        </Provider>
      </main>
    </>
  )
}

export default App
