import React, { useRef } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import { Image } from 'expo-image';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ALL_EVENTS, FEED_EVENT_IDS, Event } from '@/constants/events';
import { C, getBorderColor, FONTS } from '@/constants/design';

const EVENTS = ALL_EVENTS.filter(e => FEED_EVENT_IDS.includes(e.id));

const PROFILE_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCeYwP3zwzpx-B-uCkiMCn7GwT5a40e9WIqS5bvLIXzDstpVFCVNBcPSaV25MaG4X8H_QqvHZPVw2iUU692AKwSe5E2BKknFERapAIFIifdEEt9S7bLUhsnQG2rQFoxBhYZlDEBkQ7vVp-G9IxWfU0q8pXcQ9elkwukLy1HTTv7IWaslEfynV7FMw_T6Mg53yVEXSmV7kx7L2F7ZZyP-oH3GbD7IbdwSiE_QVhC7-fou-1qusmfP0J1dRB0_f2ITYZZp-wsJrrdu6w';

function EventCard({ event, onPress }: { event: Event; onPress: () => void }) {
  const borderColor = getBorderColor(event.category);

  const timeLabel = event.isLive ? 'NOW' : event.date.split('•')[1]?.trim() ?? event.date;

  return (
    <TouchableOpacity style={[s.card, { borderLeftColor: borderColor }]} onPress={onPress} activeOpacity={0.82}>
      <View style={s.cardTop}>
        <View style={s.cardTitleWrap}>
          <Text style={s.cardTitle}>{event.title}</Text>
          <Text style={s.cardLocation}>{event.location}</Text>
        </View>
        <View style={[s.timePill, { borderColor: C.outlineVariant }]}>
          <MaterialIcons name="schedule" size={13} color={borderColor} />
          <Text style={[s.timeText, { color: borderColor }]}>{timeLabel}</Text>
        </View>
      </View>

      <View style={s.cardBottom}>
        <View style={s.avatarRow}>
          {event.avatars.slice(0, 2).map((uri, i) => (
            <Image
              key={i}
              source={{ uri }}
              style={[s.avatar, i > 0 && { marginLeft: -8 }]}
              contentFit="cover"
            />
          ))}
          <View style={[s.avatarCount, { marginLeft: -8 }]}>
            <Text style={s.avatarCountText}>+{event.attendeeCount}</Text>
          </View>
        </View>

        <TouchableOpacity style={s.joinBtn} onPress={onPress} activeOpacity={0.85}>
          <Text style={s.joinBtnText}>{event.cta}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function EventFeed() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[s.root, { backgroundColor: C.bg }]}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      {/* Header */}
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <Text style={s.logoText}>Deg Connect</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 100 }]}
      >

        {/* Event cards */}
        <View style={s.cardList}>
          {EVENTS.map(ev => (
            <EventCard
              key={ev.id}
              event={ev}
              onPress={() => router.push(`/event/${ev.id}`)}
            />
          ))}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={[s.fab, { bottom: insets.bottom + 92 }]} activeOpacity={0.85}>
        <MaterialIcons name="add" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 12,
    backgroundColor: 'rgba(249,249,249,0.9)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.outlineVariant,
  },
  logoText: {
    fontSize: 22,
    fontFamily: FONTS.serif,
    fontStyle: 'italic',
    fontWeight: '700',
    color: C.secondary,
    letterSpacing: -0.3,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.outlineVariant,
  },

  scrollContent: { paddingHorizontal: 24 },

  editorialHeader: { paddingTop: 32, paddingBottom: 28, gap: 10 },
  pulseLabel: {
    fontSize: 10,
    fontFamily: FONTS.sans,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: C.primary,
  },
  editorialTitle: {
    fontSize: 44,
    fontFamily: FONTS.serif,
    fontWeight: '700',
    color: C.onSurface,
    lineHeight: 50,
    letterSpacing: -1,
  },
  editorialTitleItalic: {
    fontStyle: 'italic',
    color: C.secondary,
  },
  editorialSubtitle: {
    fontSize: 15,
    color: C.onSurfaceVariant,
    lineHeight: 22,
    fontFamily: FONTS.sans,
    maxWidth: 300,
  },

  cardList: { gap: 14 },

  card: {
    backgroundColor: C.surfaceLowest,
    borderRadius: 14,
    borderLeftWidth: 4,
    paddingHorizontal: 18,
    paddingVertical: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  cardTitleWrap: { flex: 1, gap: 4 },
  cardTitle: {
    fontSize: 21,
    fontFamily: FONTS.serif,
    fontWeight: '700',
    color: C.onSurface,
    lineHeight: 26,
  },
  cardLocation: {
    fontSize: 13,
    color: C.onSurfaceVariant,
    fontFamily: FONTS.sans,
  },
  timePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: C.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  timeText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: FONTS.sans,
    letterSpacing: 0.8,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: C.surfaceLowest,
  },
  avatarCount: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.secondaryFixed,
    borderWidth: 2,
    borderColor: C.surfaceLowest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCountText: {
    fontSize: 9,
    fontWeight: '700',
    color: C.onSecondaryContainer,
    fontFamily: FONTS.sans,
  },

  joinBtn: {
    backgroundColor: C.secondary,
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 8,
    shadowColor: C.secondary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  joinBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontFamily: FONTS.sans,
  },

  fab: {
    position: 'absolute',
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: C.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: C.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
});
