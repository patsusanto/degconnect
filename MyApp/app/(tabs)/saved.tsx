import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C as DC } from '@/constants/design';

export default function SavedScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <View style={s.header}>
        <Text style={s.title}>Saved</Text>
      </View>
      <View style={s.empty}>
        <View style={s.emptyIcon}>
          <MaterialIcons name="bookmark-border" size={40} color={DC.outline} />
        </View>
        <Text style={s.emptyTitle}>No saved events yet</Text>
        <Text style={s.emptySubtitle}>Tap the bookmark icon on any event to save it here.</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DC.bg },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: DC.outlineVariant,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    fontStyle: 'italic',
    color: DC.secondary,
    letterSpacing: -0.5,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: DC.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle: {
    color: '#312950',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#5e5680',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
