import { Platform } from 'react-native';

export const C = {
  primary: '#720009',
  primaryContainer: '#9d0011',
  onPrimary: '#ffffff',
  secondary: '#2b5bb5',
  secondaryContainer: '#759efd',
  secondaryFixed: '#d9e2ff',
  onSecondary: '#ffffff',
  onSecondaryContainer: '#00337c',
  tertiary: '#463200',
  tertiaryContainer: '#624800',
  tertiaryFixed: '#ffdfa0',
  onTertiary: '#ffffff',
  onTertiaryContainer: '#edb41e',
  bg: '#f9f9f9',
  surface: '#f9f9f9',
  surfaceContainer: '#eeeeee',
  surfaceContainerLow: '#f3f3f3',
  surfaceContainerHigh: '#e8e8e8',
  surfaceContainerHighest: '#e2e2e2',
  surfaceLowest: '#ffffff',
  onSurface: '#1a1c1c',
  onSurfaceVariant: '#424751',
  outline: '#737783',
  outlineVariant: '#c2c6d3',
};

export const BORDER_COLORS: Record<string, string> = {
  Nightlife: C.secondary,
  Sports: C.primary,
  Matchmaking: C.tertiary,
  Outdoors: C.secondary,
  Social: C.primary,
  Culture: C.tertiary,
  Community: C.secondary,
  Default: C.secondary,
};

export const getBorderColor = (category: string) =>
  BORDER_COLORS[category] ?? BORDER_COLORS.Default;

export const FONTS = {
  serif: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia, serif' }),
  sans: Platform.select({ ios: 'System', android: 'Roboto', default: 'Manrope, system-ui, sans-serif' }),
};
