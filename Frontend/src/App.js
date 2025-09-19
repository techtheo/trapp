// routes
import Router from "./routes";
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import CustomSnackbar from './components/Snackbar';
// contexts
import { SocketProvider } from './contexts/SocketContext';


function App() {
  return (
    <ThemeProvider>
      <ThemeSettings>
        <SocketProvider>
          <Router />
          <CustomSnackbar />
        </SocketProvider>
      </ThemeSettings>
    </ThemeProvider>
  );
}

export default App;
