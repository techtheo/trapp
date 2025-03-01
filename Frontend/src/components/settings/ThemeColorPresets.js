import PropTypes from 'prop-types';
import { useMemo } from 'react';
// @mui
import { alpha, ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
// hooks
import useSettings from '../../hooks/useSettings';
//
import componentsOverride from '../../theme/overrides';

// ----------------------------------------------------------------------

ThemeColorPresets.propTypes = {
  children: PropTypes.node,
};
 
export default function ThemeColorPresets({ children }) {
  const defaultTheme = useTheme();

  const { setColor } = useSettings();
  
  console.log("setColor:", setColor); // Add this line to check the value of setColor

  const themeOptions = useMemo(
    () => ({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
        primary: setColor ? setColor : defaultTheme.palette.primary, // Handle case when setColor is undefined
      },
      customShadows: {
        ...defaultTheme.customShadows,
        primary: setColor ? `0 8px 16px 0 ${alpha(setColor.main, 0.24)}` : 'some-default-value', // Handle case when setColor is undefined
      },
    }),
    [setColor, defaultTheme]
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
