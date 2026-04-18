import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { C } from '@/constants/design';

const TABS: { name: string; icon: React.ComponentProps<typeof MaterialIcons>['name']; activeIcon: React.ComponentProps<typeof MaterialIcons>['name'] }[] = [
  { name: 'index',   icon: 'groups',           activeIcon: 'groups' },
  { name: 'explore', icon: 'explore',           activeIcon: 'explore' },
  { name: 'saved',   icon: 'bookmark-border',   activeIcon: 'bookmark' },
  { name: 'profile', icon: 'person-outline',    activeIcon: 'person' },
];

export default function SidebarTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.sidebar, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }]}>
      {TABS.map((tab, index) => {
        const focused = state.index === index;
        return (
          <TouchableOpacity
            key={tab.name}
            style={[s.item, focused && s.itemActive]}
            onPress={() => navigation.navigate(tab.name)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={focused ? tab.activeIcon : tab.icon}
              size={26}
              color={focused ? C.primary : C.onSurfaceVariant}
            />
            {focused && <View style={s.activeDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 64,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: C.outlineVariant,
  },
  item: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  itemActive: {
    backgroundColor: C.secondaryFixed,
  },
  activeDot: {
    position: 'absolute',
    left: 0,
    top: '25%',
    width: 3,
    height: '50%',
    borderRadius: 2,
    backgroundColor: C.primary,
  },
});
