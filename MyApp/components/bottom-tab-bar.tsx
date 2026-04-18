import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { C } from '@/constants/design';

const TABS: {
  name: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  activeIcon: React.ComponentProps<typeof MaterialIcons>['name'];
}[] = [
  { name: 'index',   icon: 'groups',         activeIcon: 'groups' },
  { name: 'explore', icon: 'explore',         activeIcon: 'explore' },
  { name: 'saved',   icon: 'bookmark-border', activeIcon: 'bookmark' },
  { name: 'profile', icon: 'person-outline',  activeIcon: 'person' },
];

export default function BottomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.bar, { paddingBottom: insets.bottom }]}>
      {TABS.map((tab, index) => {
        const focused = state.index === index;
        return (
          <TouchableOpacity
            key={tab.name}
            style={s.item}
            onPress={() => navigation.navigate(tab.name)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={focused ? tab.activeIcon : tab.icon}
              size={30}
              color={focused ? C.primary : C.onSurfaceVariant}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  bar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: C.outlineVariant,
    height: 64,
  },
  item: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
