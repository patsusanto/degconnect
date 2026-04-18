import React from 'react';
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
import { Event } from '@/constants/events';
import { C, FONTS } from '@/constants/design';
import { useEvents } from '@/context/events-context';

const DEFAULT_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeYwP3zwzpx-B-uCkiMCn7GwT5a40e9WIqS5bvLIXzDstpVFCVNBcPSaV25MaG4X8H_QqvHZPVw2iUU692AKwSe5E2BKknFERapAIFIifdEEt9S7bLUhsnQG2rQFoxBhYZlDEBkQ7vVp-G9IxWfU0q8pXcQ9elkwukLy1HTTv7IWaslEfynV7FMw_T6Mg53yVEXSmV7kx7L2F7ZZyP-oH3GbD7IbdwSiE_QVhC7-fou-1qusmfP0J1dRB0_f2ITYZZp-wsJrrdu6w';

function EventCard({ event, onPress }: { event: Event; onPress: () => void }) {
  const { toggleSave, isSaved } = useEvents();
  const saved = isSaved(event.id);
  const timeLabel = event.isLive ? 'LIVE NOW' : event.date;

  const hostName = event.host?.name ?? 'DegConnect';
  const hostAvatar = event.host?.avatar ?? DEFAULT_AVATAR;

  return (
    <View style={s.card}>
      {/* Host header */}
      <View style={s.cardHeader}>
        <View style={s.hostAvatarWrap}>
          <Image source={{ uri: hostAvatar }} style={s.hostAvatar} contentFit="cover" />
          {event.isLive && <View style={s.hostLiveBadge} />}
        </View>
        <View style={s.hostInfo}>
          <Text style={s.hostName}>{hostName}</Text>
          <Text style={s.hostMeta}>{event.category} · {event.location}</Text>
        </View>
        <TouchableOpacity hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <MaterialIcons name="more-horiz" size={20} color={C.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      {/* Image */}
      <TouchableOpacity activeOpacity={0.95} onPress={onPress}>
        <View style={s.imageWrap}>
          <Image
            source={event.image ? { uri: event.image } : require('@/assets/images/img.png')}
            style={s.image}
            contentFit="cover"
          />

          {/* Live / category badge */}
          <View style={[s.badge, event.isLive ? s.badgeLive : { backgroundColor: 'rgba(0,0,0,0.45)' }]}>
            {event.isLive && <View style={s.liveDot} />}
            <Text style={s.badgeText}>{timeLabel}</Text>
          </View>

          {/* Save button overlaid top-right */}
          <TouchableOpacity
            style={s.saveOverlay}
            onPress={() => toggleSave(event)}
            activeOpacity={0.8}
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            <MaterialIcons
              name={saved ? 'bookmark' : 'bookmark-border'}
              size={22}
              color={saved ? C.secondary : 'white'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Body */}
      <View style={s.body}>
        {/* Title row */}
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <Text style={s.title}>{event.title}</Text>
        </TouchableOpacity>

        {/* Location */}
        <View style={s.locationRow}>
          <MaterialIcons name="location-on" size={13} color={C.onSurfaceVariant} />
          <Text style={s.location}>{event.location}</Text>
        </View>

        {/* Description */}
        {event.description ? (
          <Text style={s.description} numberOfLines={2}>{event.description}</Text>
        ) : null}

        {/* Footer */}
        <View style={s.footer}>
          {/* Avatars + count */}
          <View style={s.avatarRow}>
            {event.avatars.slice(0, 2).map((uri, i) => (
              <Image
                key={i}
                source={{ uri }}
                style={[s.avatar, i > 0 && { marginLeft: -8 }]}
                contentFit="cover"
              />
            ))}
            <Text style={s.attendeeText}>
              {event.maxAttendees
                ? `${event.attendeeCount}/${event.maxAttendees} joined`
                : `${event.attendeeCount} going`}
            </Text>
          </View>

          {/* CTA */}
          <TouchableOpacity style={s.ctaBtn} onPress={onPress} activeOpacity={0.85}>
            <Text style={s.ctaText}>{event.cta}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function EventFeed() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { feedEvents } = useEvents();

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      {/* Header */}
      <View style={[s.header, { paddingTop: insets.top + 4 }]}>
        <TouchableOpacity onPress={() => router.push('/create-event')} activeOpacity={0.6} hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <MaterialIcons name="add" size={28} color={C.primary} />
        </TouchableOpacity>
<TouchableOpacity style={s.notifBtn}>
          <MaterialIcons name="notifications-none" size={22} color={C.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {feedEvents.map(ev => (
          <EventCard
            key={ev.id}
            event={ev}
            onPress={() => router.push(`/event/${ev.id}`)}
          />
        ))}
      </ScrollView>

    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 6,
    backgroundColor: C.bg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.outlineVariant,
  },
  notifBtn: { padding: 4 },

  card: {
    backgroundColor: C.surfaceLowest,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.outlineVariant,
    marginBottom: 4,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  hostAvatarWrap: {
    position: 'relative',
  },
  hostAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: C.outlineVariant,
  },
  hostLiveBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#1a56db',
    borderWidth: 2,
    borderColor: C.surfaceLowest,
  },
  hostInfo: { flex: 1, gap: 1 },
  hostName: {
    fontSize: 13,
    fontWeight: '700',
    color: C.onSurface,
    fontFamily: FONTS.sans,
  },
  hostMeta: {
    fontSize: 11,
    color: C.onSurfaceVariant,
    fontFamily: FONTS.sans,
  },

  imageWrap: {
    width: '100%',
    height: 260,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeLive: { backgroundColor: C.primary },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontFamily: FONTS.sans,
  },

  saveOverlay: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  body: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 6,
  },

  title: {
    fontSize: 19,
    fontFamily: FONTS.bold,
    color: C.onSurface,
    lineHeight: 24,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  location: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    fontFamily: FONTS.sans,
  },

  description: {
    fontSize: 13,
    color: C.onSurfaceVariant,
    lineHeight: 19,
    fontFamily: FONTS.sans,
    marginTop: 2,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: C.surfaceLowest,
  },
  attendeeText: {
    fontSize: 12,
    fontWeight: '600',
    color: C.onSurfaceVariant,
    fontFamily: FONTS.sans,
    marginLeft: 4,
  },

  ctaBtn: {
    backgroundColor: C.secondary,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 8,
    shadowColor: C.secondary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: FONTS.sans,
  },

});
