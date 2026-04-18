export const C = {
  primary: '#1a56db',           // main blue
  primaryContainer: '#1e40af',  // deeper blue
  onPrimary: '#ffffff',
  secondary: '#1a56db',         // same blue — unified
  secondaryContainer: '#3b82f6',
  secondaryFixed: '#dbeafe',    // light blue tint
  onSecondary: '#ffffff',
  onSecondaryContainer: '#1e3a8a',
  tertiary: '#0ea5e9',          // sky blue accent
  tertiaryContainer: '#0284c7',
  tertiaryFixed: '#e0f2fe',
  onTertiary: '#ffffff',
  onTertiaryContainer: '#075985',
  bg: '#f0f6ff',                // very faint blue-white background
  surface: '#f0f6ff',
  surfaceContainer: '#e1effe',
  surfaceContainerLow: '#eaf2ff',
  surfaceContainerHigh: '#d1e4fd',
  surfaceContainerHighest: '#bfdbfe',
  surfaceLowest: '#ffffff',
  onSurface: '#0f172a',
  onSurfaceVariant: '#334155',
  outline: '#64748b',
  outlineVariant: '#bfdbfe',
};

export const BORDER_COLORS: Record<string, string> = {
  Nightlife: C.primary,
  Sports: C.tertiary,
  Matchmaking: C.secondaryContainer,
  Outdoors: C.tertiary,
  Social: C.primary,
  Culture: C.secondaryContainer,
  Community: C.primary,
  Default: C.primary,
};

export const getBorderColor = (category: string) =>
  BORDER_COLORS[category] ?? BORDER_COLORS.Default;

export const FONTS = {
  serif: 'Inter_700Bold',
  sans: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
  black: 'Inter_900Black',
};
