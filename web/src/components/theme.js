/** @type {import("@mui/material").ThemeOptions} */
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/source-sans-pro/700.css';

// See: https://bareynol.github.io/mui-theme-creator

const baseThemeOptions = {
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "36px",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          ":last-child": {
            paddingBottom: "16px",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: [
      'Source Sans Pro',
    ].join(','),
    fontSize: 12,
  },
};

// https://github.com/binwiederhier/ntfy-android/blob/main/app/src/main/res/values/colors.xml

/** @type {import("@mui/material").ThemeOptions} */
export const lightTheme = {
  ...baseThemeOptions,
  components: {
    ...baseThemeOptions.components,
  },
  palette: {
    type: 'light',
    primary: {
      main: '#3f563f',
    },
    secondary: {
      main: '#87afda',
    },
    background: {
      default: '#f5f5f5',
      paper: "white",
    },
  },
  typography: {
    fontFamily: 'Source Sans Pro',
    fontSize: 14,
  },
  shape: {
    borderRadius: 2,
  },
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: 'small',
    },
    MuiButton: {
      size: 'small',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
    MuiTooltip: {
      arrow: true,
    },
  },
};

/** @type {import("@mui/material").ThemeOptions} */
export const darkTheme = {
  ...baseThemeOptions,
  components: {
    ...baseThemeOptions.components,
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: '#a5b5a5',
    },
    secondary: {
      main: '#bee2e2',
    },
    background: {
      default: '#1e1e1e',
      paper: '#1e1e1e',
    },
    error: {
      main: '#f37971',
    },
  },
  spacing: 4,
  shape: {
    borderRadius: 2,
  },
  shadows: ["none"],
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: 'small',
    },
    MuiButton: {
      size: 'small',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
    MuiTooltip: {
      arrow: true,
    },
  }
};
