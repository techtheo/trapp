// routes
import Router from "./routes";
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import CustomSnackbar from './components/Snackbar';


function App() {
  return (
    <ThemeProvider>
      <ThemeSettings>
        {" "}
        <Router />{" "}
        <CustomSnackbar />
      </ThemeSettings>
    </ThemeProvider>
  );
}

export default App;
