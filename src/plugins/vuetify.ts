// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify, type ThemeDefinition } from 'vuetify'

const lightColor = {
  primary: '#0058cc',
  onPrimary: '#ffffff',
  primaryContainer: '#d8e2ff',
  onPrimaryContainer: '#001947',
  secondary: '#585e71',
  onSecondary: '#ffffff',
  secondaryContainer: '#dce2f9',
  onSecondaryContainer: '#141b2c',
  tertiary: '#725472',
  onTertiary: '#ffffff',
  tertiaryContainer: '#fdd7fa',
  onTertiaryContainer: '#2a122c',
  error: '#ba1b1b',
  errorContainer: '#ffdad4',
  onError: '#ffffff',
  onErrorContainer: '#410001',
  background: '#fdfbff',
  onBackground: '#1b1b1e',
  surface: '#eaeefb',
  onSurface: '#1b1b1e',
  surfaceVariant: '#e2e2ec',
  onSurfaceVariant: '#44464e',
  outline: '#757780',
  inverseOnSurface: '#f2f0f4',
  inverseSurface: '#303033',
  inversePrimary: '#afc6ff',
  shadow: '#000000',
}

const darkColor = {
  primary: '#afc6ff',
  onPrimary: '#002c72',
  primaryContainer: '#00419f',
  onPrimaryContainer: '#d8e2ff',
  secondary: '#c0c6dc',
  onSecondary: '#293042',
  secondaryContainer: '#404659',
  onSecondaryContainer: '#dce2f9',
  tertiary: '#e0bbde',
  onTertiary: '#412842',
  tertiaryContainer: '#593d5a',
  onTertiaryContainer: '#fdd7fa',
  error: '#ffb4a9',
  errorContainer: '#930006',
  onError: '#680003',
  onErrorContainer: '#ffdad4',
  background: '#1b1b1e',
  onBackground: '#e4e2e6',
  surface: '#272931',
  onSurface: '#e4e2e6',
  surfaceVariant: '#44464e',
  onSurfaceVariant: '#c5c6d0',
  outline: '#8e9099',
  inverseOnSurface: '#1b1b1e',
  inverseSurface: '#e4e2e6',
  inversePrimary: '#0058cc',
  shadow: '#000000',
}

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
}

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
}

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
})
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
