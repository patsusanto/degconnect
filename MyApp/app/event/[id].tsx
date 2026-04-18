import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  StatusBar,
  Share,
} from 'react-native';
import { Image } from 'expo-image';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getEventById } from '@/constants/events';

import { C, getBorderColor, FONTS } from '@/constants/design';

export default function EventDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [bookmarked, setBookmarked] = useState(false);

  const event = getEventById(id);

  if (!event) {
    return (
      <View style={[s.root, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: C.onSurface }}>Event not found</Text>
      </View>
    );
  }

  const onShare = () => {
    Share.share({ message: `${event.title} — ${event.date} at ${event.location}` });
  };

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Floating nav */}
      <View style={[s.nav, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={s.navBtn} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={20} color={C.onSurface} />
        </TouchableOpacity>
        <TouchableOpacity style={s.navBtn} onPress={onShare}>
          <MaterialIcons name="share" size={20} color={C.onSurface} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces>
        {/* Hero */}
        <View style={s.hero}>
          <Image source={{ uri: event.image }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
          <View style={s.heroGradient} pointerEvents="none" />
          <View style={s.heroContent}>
            <View style={s.heroBadgeRow}>
              <View style={[s.catBadge, event.isLive && s.catBadgeLive]}>
                {event.isLive && <View style={s.liveDot} />}
                <Text style={[s.catBadgeText, event.isLive && s.catBadgeTextLive]}>
                  {event.isLive ? 'Live Now' : event.category}
                </Text>
              </View>
              {event.trending && !event.isLive && (
                <View style={s.trendingBadge}>
                  <MaterialIcons name="trending-up" size={11} color={C.primary} />
                  <Text style={s.trendingText}>Trending</Text>
                </View>
              )}
            </View>
            <Text style={s.heroTitle}>{event.title}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={s.content}>

          {/* Info bento */}
          <View style={s.infoGrid}>
            <View style={s.infoCard}>
              <MaterialIcons name="calendar-today" size={20} color={C.primary} />
              <Text style={s.infoLabel}>Date & Time</Text>
              <Text style={s.infoValue}>{event.date}</Text>
            </View>
            <View style={s.infoCard}>
              <MaterialIcons name="location-on" size={20} color={C.tertiary} />
              <Text style={s.infoLabel}>Location</Text>
              <Text style={s.infoValue}>{event.location}</Text>
            </View>
          </View>

          {/* Host card */}
          {event.host && (
            <View style={s.hostCard}>
              <Image source={{ uri: event.host.avatar }} style={s.hostAvatar} contentFit="cover" />
              <View style={s.hostInfo}>
                <Text style={s.hostName}>Hosted by {event.host.name}</Text>
                <Text style={s.hostMeta}>★ {event.host.rating} · {event.host.games} Games played</Text>
              </View>
              <TouchableOpacity style={s.msgBtn}>
                <MaterialIcons name="chat-bubble-outline" size={18} color={C.primary} />
              </TouchableOpacity>
            </View>
          )}

          {/* Description */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>About</Text>
            <Text style={s.description}>{event.description}</Text>
          </View>

          {/* Guest list */}
          <View style={s.guestRow}>
            <View style={s.avatarStack}>
              {event.avatars.slice(0, 3).map((uri, i) => (
                <Image
                  key={i}
                  source={{ uri }}
                  style={[s.guestAvatar, i > 0 && { marginLeft: -12 }]}
                  contentFit="cover"
                />
              ))}
              <View style={[s.guestCount, { marginLeft: -12 }]}>
                <Text style={s.guestCountText}>+{event.attendeeCount}</Text>
              </View>
            </View>
            <Text style={s.joiningText}>joining the scene</Text>
          </View>

          {/* Requirements */}
          {event.requirements && event.requirements.length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Good to Know</Text>
              <View style={s.requirementsCard}>
                {event.requirements.map((req, i) => (
                  <View key={i} style={s.reqRow}>
                    <MaterialIcons name="check-circle" size={18} color="#22c55e" />
                    <Text style={s.reqText}>{req}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Bottom spacer for fixed footer */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Fixed CTA footer */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity
          style={[s.bookmarkFooterBtn, bookmarked && s.bookmarkFooterBtnActive]}
          onPress={() => setBookmarked(b => !b)}
        >
          <MaterialIcons
            name={bookmarked ? 'bookmark' : 'bookmark-border'}
            size={22}
            color={bookmarked ? 'white' : C.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={s.ctaBtn} activeOpacity={0.85}>
          <Text style={s.ctaText}>{event.cta}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const HERO_H = 420;

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  nav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.surfaceLowest,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  hero: { height: HERO_H, overflow: 'hidden' },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 280,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    gap: 10,
  },
  heroBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  catBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  catBadgeLive: { backgroundColor: C.secondary, borderColor: C.secondary },
  liveDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: 'rgba(255,255,255,0.7)' },
  catBadgeText: { color: 'white', fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8 },
  catBadgeTextLive: { color: 'white' },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  trendingText: { color: C.primary, fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  heroTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 37,
    letterSpacing: -0.5,
  },

  content: { paddingHorizontal: 20, paddingTop: 20 },

  infoGrid: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  infoCard: {
    flex: 1,
    backgroundColor: C.surfaceLowest,
    borderRadius: 16,
    padding: 16,
    gap: 6,
    shadowColor: C.onSurface,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  infoLabel: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, color: C.onSurfaceVariant },
  infoValue: { fontSize: 15, fontWeight: '800', color: C.onSurface, lineHeight: 20 },

  hostCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surfaceLowest,
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    gap: 12,
    shadowColor: C.onSurface,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  hostAvatar: { width: 46, height: 46, borderRadius: 23 },
  hostInfo: { flex: 1, gap: 3 },
  hostName: { fontSize: 14, fontWeight: '700', color: C.onSurface },
  hostMeta: { fontSize: 12, color: C.onSurfaceVariant },
  msgBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: C.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
  },

  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: C.onSurface, marginBottom: 10, letterSpacing: -0.3 },
  description: { fontSize: 15, color: C.onSurfaceVariant, lineHeight: 24 },

  guestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surfaceLow,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    marginBottom: 20,
  },
  avatarStack: { flexDirection: 'row', alignItems: 'center' },
  guestAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: C.surfaceLow,
  },
  guestCount: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.primary,
    borderWidth: 2,
    borderColor: C.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestCountText: { color: 'white', fontSize: 10, fontWeight: '700' },
  joiningText: { fontSize: 14, fontWeight: '600', color: C.primary },

  requirementsCard: {
    backgroundColor: C.surfaceLowest,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1.5,
    borderColor: C.surfaceHigh,
  },
  reqRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  reqText: { fontSize: 14, color: C.onSurfaceVariant, flex: 1 },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    backgroundColor: 'rgba(249,249,249,0.97)',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: C.surfaceHigh,
  },
  bookmarkFooterBtn: {
    width: 52,
    height: 52,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: C.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkFooterBtnActive: { backgroundColor: C.secondary, borderColor: C.secondary },
  ctaBtn: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    backgroundColor: C.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: C.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaText: { color: 'white', fontSize: 16, fontWeight: '800', letterSpacing: 0.2 },
});
