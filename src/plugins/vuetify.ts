// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify, type ThemeDefinition } from 'vuetify';

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#6750A4',
    'primary-container': '#EADDFF',
    secondary: '#625B71',
    'secondary-container': '#E8DEF8',
    tertiary: '#7D5260',
    'tertiary-container': '#FFD8E4',
    surface: '#F3EDF7',
    'surface-variant': '#E7E0EC',
    background: '#FFFBFE',
    error: '#B3261E',
    'error-container': '#F9DEDC',
    'on-primary': '#FFFFFF',
    'on-primary-container': '#21005E',
    'on-secondary': '#FFFFFF',
    'on-secondary-container': '#1E192B',
    'on-tertiary': '#FFFFFF',
    'on-tertiary-container': '#370B1E',
    'on-surface': '#1C1B1F',
    'on-surface-variant': '#49454E',
    'on-error': '#FFFFFF',
    'on-error-container': '#370B1E',
    'on-background': '#1C1B1F',
    outline: '#79747E',
    'outline-variant': '#C4C7C5',
    shadow: '#000000',
    'surface-tint': '#6750A4',
    'inverse-surface': '#313033',
    'inverse-on-surface': '#F4EFF4',
    'inverse-primary': '#D0BCFF',
    scrim: '#000000',
  },
};

export default createVuetify({
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
    },
  },
  defaults: {
    VAlert: { rounded: 'lg' },
    VAppBar: { flat: true },
    VBtn: { rounded: 'xl' },
    VCard: { rounded: 'xl', elevation: 0 },
    VExpansionPanel: { rounded: 'xl', elevation: 0 },
    VList: { rounded: 'xl' },
    VTextarea: {
      'bg-color': lightTheme.colors?.['surface-variant'],
      color: lightTheme.colors?.['on-surface-variant'],
    },
    VTextField: {
      'bg-color': lightTheme.colors?.['surface-variant'],
      color: lightTheme.colors?.['on-surface-variant'],
    },
    VSheet: { rounded: 'xl' },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
