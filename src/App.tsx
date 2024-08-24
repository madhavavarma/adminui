import { createTheme, ThemeProvider } from "@mui/material";
import Routing from "./Routing";
import Layout from "./basecomponents/Layout";


function App() {

  const theme = createTheme({});

  return (
    <>
    <ThemeProvider theme={theme}>
      <Layout>
        <Routing />
      </Layout>
    </ThemeProvider>
    </>
  )
}

export default App
