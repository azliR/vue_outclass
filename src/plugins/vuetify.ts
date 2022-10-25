// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify, type ThemeDefinition } from 'vuetify';

const lightColor = {
  primary: '#6e5e00',
  onPrimary: '#ffffff',
  primaryContainer: '#fce365',
  onPrimaryContainer: '#211b00',
  secondary: '#655e40',
  onSecondary: '#ffffff',
  secondaryContainer: '#ede2bc',
  onSecondaryContainer: '#201c04',
  tertiary: '#436650',
  onTertiary: '#ffffff',
  tertiaryContainer: '#c4ecd0',
  onTertiaryContainer: '#002110',
  error: '#ba1b1b',
  errorContainer: '#ffdad4',
  onError: '#ffffff',
  onErrorContainer: '#410001',
  background: '#fffbf7',
  onBackground: '#1d1b16',
  surface: '#f3eeeb',
  onSurface: '#1d1b16',
  surfaceVariant: '#e9e2d0',
  onSurfaceVariant: '#4b4739',
  outline: '#7c7767',
  inverseOnSurface: '#f6f0e7',
  inverseSurface: '#32302a',
  inversePrimary: '#dec74d',
  shadow: '#000000',
};

const darkColor = {
  primary: '#dec74d',
  onPrimary: '#393000',
  primaryContainer: '#534600',
  onPrimaryContainer: '#fce365',
  secondary: '#d1c7a2',
  onSecondary: '#363116',
  secondaryContainer: '#4d472a',
  onSecondaryContainer: '#ede2bc',
  tertiary: '#a8d0b4',
  onTertiary: '#133724',
  tertiaryContainer: '#2b4e39',
  onTertiaryContainer: '#c4ecd0',
  error: '#ffb4a9',
  errorContainer: '#930006',
  onError: '#680003',
  onErrorContainer: '#ffdad4',
  background: '#1d1b16',
  onBackground: '#e7e2d9',
  surface: '#2c291d',
  onSurface: '#e7e2d9',
  surfaceVariant: '#4b4739',
  onSurfaceVariant: '#ccc6b4',
  outline: '#969181',
  inverseOnSurface: '#1d1b16',
  inverseSurface: '#e7e2d9',
  inversePrimary: '#6e5e00',
  shadow: '#000000',
};

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: lightColor.primary,
    'primary-container': lightColor.primaryContainer,
    secondary: lightColor.secondary,
    'secondary-container': lightColor.secondaryContainer,
    tertiary: lightColor.tertiary,
    'tertiary-container': lightColor.tertiaryContainer,
    surface: lightColor.surface,
    'surface-variant': lightColor.surfaceVariant,
    background: lightColor.background,
    error: lightColor.error,
    'error-container': lightColor.errorContainer,
    'on-primary': lightColor.onPrimary,
    'on-primary-container': lightColor.onPrimaryContainer,
    'on-secondary': lightColor.onSecondary,
    'on-secondary-container': lightColor.onSecondaryContainer,
    'on-tertiary': lightColor.onTertiary,
    'on-tertiary-container': lightColor.onTertiaryContainer,
    'on-surface': lightColor.onSurface,
    'on-surface-variant': lightColor.onSurfaceVariant,
    'on-error': lightColor.onError,
    'on-error-container': lightColor.onErrorContainer,
    'on-background': lightColor.onBackground,
    outline: lightColor.outline,
    'outline-variant': lightColor.outline,
    shadow: lightColor.shadow,
    // 'surface-tint': lightColor.surfaceTint,
    'inverse-surface': lightColor.inverseSurface,
    'inverse-on-surface': lightColor.inverseOnSurface,
    'inverse-primary': lightColor.inversePrimary,
    // scrim: lightColor.scrim,
  },
};

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: darkColor.primary,
    'primary-container': darkColor.primaryContainer,
    secondary: darkColor.secondary,
    'secondary-container': darkColor.secondaryContainer,
    tertiary: darkColor.tertiary,
    'tertiary-container': darkColor.tertiaryContainer,
    surface: darkColor.surface,
    'surface-variant': darkColor.surfaceVariant,
    background: darkColor.background,
    error: darkColor.error,
    'error-container': darkColor.errorContainer,
    'on-primary': darkColor.onPrimary,
    'on-primary-container': darkColor.onPrimaryContainer,
    'on-secondary': darkColor.onSecondary,
    'on-secondary-container': darkColor.onSecondaryContainer,
    'on-tertiary': darkColor.onTertiary,
    'on-tertiary-container': darkColor.onTertiaryContainer,
    'on-surface': darkColor.onSurface,
    'on-surface-variant': darkColor.onSurfaceVariant,
    'on-error': darkColor.onError,
    'on-error-container': darkColor.onErrorContainer,
    'on-background': darkColor.onBackground,
    outline: darkColor.outline,
    'outline-variant': darkColor.outline,
    shadow: darkColor.shadow,
    // 'surface-tint': darkColor.surfaceTint,
    'inverse-surface': darkColor.inverseSurface,
    'inverse-on-surface': darkColor.inverseOnSurface,
    'inverse-primary': darkColor.inversePrimary,
    // scrim: darkColor.scrim,
  },
};

export default createVuetify({
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      darkTheme,
    },
  },
  defaults: {
    VAlert: {
      rounded: 'lg',
      color: 'primary',
    },
    VAppBar: {
      flat: true,
    },
    VAvatar: {
      color: 'primary-container',
      rounded: 'lg',
    },
    VBtn: {
      rounded: 'xl',
    },
    VCard: {
      rounded: 'xl',
      color: 'surface',
      elevation: 1,
    },
    VExpansionPanel: {
      rounded: 'xl',
      bgColor: 'surface-variant',
      elevation: 0,
    },
    VList: {
      bgColor: 'transparent',
    },
    VProgressLinear: {
      color: 'primary',
      bgColor: 'surface-variant',
    },
    VTextarea: {
      bgColor: 'surface-variant',
      color: 'primary',
    },
    VTextField: {
      bgColor: 'surface-variant',
      color: 'primary',
    },
    VToolbar: {
      color: 'surface',
    },
    VSheet: {
      rounded: 'xl',
      color: 'surface-variant',
    },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
