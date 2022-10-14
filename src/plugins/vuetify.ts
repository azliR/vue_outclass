// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify, type ThemeDefinition } from 'vuetify';

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFBFE',
    surface: '#f3edf7',
    primary: '#6750A4',
    secondary: '#625B71',
    error: '#B3261E',
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
    VAppBar: { flat: true },
    VBtn: { rounded: 'xl' },
    VCard: { rounded: 'xl', elevation: 0 },
    VExpansionPanel: { rounded: 'xl', elevation: 0 },
    VList: { rounded: 'xl' },
    VTextarea: { color: 'primary' },
    VTextField: { color: 'primary' },
    VSheet: { rounded: 'xl' },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
