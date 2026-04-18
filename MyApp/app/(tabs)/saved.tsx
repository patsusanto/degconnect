import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { C as DC } from '@/constants/design';
import { useEvents } from '@/context/events-context';

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { savedEvents, toggleSave } = useEvents();

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <View style={s.header}>
        <Text style={s.title}>Saved</Text>
        {savedEvents.length > 0 && (
          <View style={s.countBadge}>
            <Text style={s.countText}>{savedEvents.length}</Text>
          </View>
        )}
      </View>

      {savedEvents.length === 0 ? (
        <View style={s.empty}>
          <View style={s.emptyIcon}>
            <MaterialIcons name="bookmark-border" size={40} color={DC.outline} />
          </View>
          <Text style={s.emptyTitle}>No saved events yet</Text>
          <Text style={s.emptySubtitle}>Tap the bookmark icon on any event to save it here.</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[s.list, { paddingBottom: insets.bottom + 100 }]}
        >
          {savedEvents.map(event => (
            <TouchableOpacity
              key={event.id}
              style={s.card}
              onPress={() => router.push(`/event/${event.id}`)}
              activeOpacity={0.85}
            >
              <Image
                source={event.image ? { uri: event.image } : require('@/assets/images/img.png')}
                style={s.cardImage}
                contentFit="cover"
              />
              <View style={s.cardBody}>
                <View style={s.cardTop}>
                  <Text style={s.cardCategory}>{event.category}</Text>
                  {event.isLive && (
                    <View style={s.livePill}>
                      <View style={s.liveDot} />
                      <Text style={s.liveText}>Live</Text>
                    </View>
                  )}
                </View>
                <Text style={s.cardTitle} numberOfLines={2}>{event.title}</Text>
                <View style={s.cardMeta}>
                  <MaterialIcons name="location-on" size={12} color={DC.onSurfaceVariant} />
                  <Text style={s.cardLocation} numberOfLines={1}>{event.location}</Text>
                </View>
                <Text style={s.cardDate}>{event.date}</Text>
              </View>
              <TouchableOpacity
                style={s.unsaveBtn}
                onPress={() => toggleSave(event)}
                hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
              >
                <MaterialIcons name="bookmark" size={22} color={DC.secondary} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DC.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: DC.outlineVariant,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_800ExtraBold',
    color: DC.secondary,
    letterSpacing: -0.5,
  },
  countBadge: {
    backgroundColor: DC.secondary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  countText: { color: 'white', fontSize: 12, fontWeight: '700' },

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
  emptyTitle: { color: DC.onSurface, fontSize: 18, fontWeight: '700', textAlign: 'center' },
  emptySubtitle: { color: DC.onSurfaceVariant, fontSize: 14, textAlign: 'center', lineHeight: 20 },

  list: { padding: 16, gap: 12 },

  card: {
    flexDirection: 'row',
    backgroundColor: DC.surfaceLowest,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: { width: 90, height: 90 },
  cardBody: { flex: 1, padding: 12, gap: 3 },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardCategory: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: DC.secondary,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: DC.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  liveDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'white' },
  liveText: { color: 'white', fontSize: 9, fontWeight: '700' },
  cardTitle: { fontSize: 14, fontWeight: '700', color: DC.onSurface, lineHeight: 19 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  cardLocation: { fontSize: 11, color: DC.onSurfaceVariant, flex: 1 },
  cardDate: { fontSize: 11, color: DC.outline },
  unsaveBtn: { paddingHorizontal: 12 },
});
