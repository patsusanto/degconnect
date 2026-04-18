import React, { useMemo, useState } from 'react';
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
import { C as DC } from '@/constants/design';
import { useOnboarding } from '@/context/onboarding-context';
import { MAIN_INTERESTS, getSuggestedInterests } from '@/constants/interests';

const C = {
  primary: DC.secondary,
  primaryContainer: DC.secondaryContainer,
  bg: DC.bg,
  onSurface: DC.onSurface,
  onSurfaceVariant: DC.onSurfaceVariant,
  tertiary: DC.primary,
  surface: DC.surfaceContainer,
  surfaceLow: DC.surfaceContainerLow,
  surfaceHigh: DC.surfaceContainerHigh,
  surfaceHighest: DC.surfaceContainerHighest,
  surfaceLowest: DC.surfaceLowest,
  onSecondaryContainer: DC.onSecondaryContainer,
  outline: DC.outline,
};

const PROFILE_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhE8O9_lfG5fhMFvx2_Q7iV9k7iEQ6EKAiAduXNLekZNdCvbBFjMIpw_33i1TqfVMHe_-8D6N0vUeHpV7MWdcWzkUF-rG12ChamdNhc7jLxK491fKUSkBLtNpJoROAPvoCWBSjRe1fv_Csrz6eZaIwT0ZYmg_LczceuFyvg2mF-Ujunh5EgXfXksGilXMtL1JYwR9h3rkDoR7NTN6MCZypTAQvu1_0S1m8YXa2h-eYx0TmGm-HL_u8sLJw9BQ3kj8X4wyhnGk6MKI';
const MAP_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbuWSAmLsO74K1ec1QfFj6E9R_m0oPfmx0x2xu7KmJVPYV6yJYFtwYDRPGaGc0Nl1IjEYvqqF3IN7Okfb8hrrehQ0LOTXvPbgEbx2AlrPoGVHcyv-YSwIoAG4clw7d0klTRuqvo1sVbkHZUrNLXqBBpWYdNFdFlLGUaLlMiuJ9YIoEots7FeuqT0w0kAyvKgIqryEf8vTKQE4ApjM-9PepnUxb1Lu4yOO0kUxRNs-ZSh_oBbOzFA6KdqHLmOb28551Mka49leGGUk';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { account, updateInterests } = useOnboarding();
  const [selected, setSelected] = useState<Set<string>>(new Set(account.interests));
  const selectedInterests = useMemo(() => Array.from(selected), [selected]);
  const suggestedInterests = useMemo(
    () => getSuggestedInterests(selectedInterests),
    [selectedInterests],
  );

  const toggleInterest = (interest: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(interest)) next.delete(interest);
      else next.add(interest);
      updateInterests(Array.from(next));
      return next;
    });
  };

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      {/* Header */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          <TouchableOpacity style={s.iconBtn}>
            <MaterialIcons name="arrow-back" size={22} color={C.primary} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Profile</Text>
        </View>
        <TouchableOpacity style={s.iconBtn}>
          <MaterialIcons name="settings" size={22} color={C.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[s.scroll, { paddingBottom: insets.bottom + 32 }]}
      >
        {/* Avatar */}
        <View style={s.avatarSection}>
          <View style={s.avatarWrap}>
            <View style={s.avatarGlow} />
            <Image source={{ uri: PROFILE_IMG }} style={s.avatar} contentFit="cover" />
            <TouchableOpacity style={s.editBtn}>
              <MaterialIcons name="edit" size={14} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={s.name}>Marco</Text>

          {/* Level badge */}
          <View style={s.levelBadge}>
            <MaterialIcons name="bolt" size={14} color="white" />
            <Text style={s.levelText}>Level 4 · Connector</Text>
          </View>

          {/* XP bar */}
          <View style={s.xpWrap}>
            <View style={s.xpBar}>
              <View style={[s.xpFill, { width: '72%' }]} />
            </View>
            <Text style={s.xpLabel}>720 / 1000 XP · Level 5 next</Text>
          </View>

          <Text style={s.name}>{account.name}</Text>
          <Text style={s.bio}>
            Based in {account.city}. Focused on finding the right people, the right events and a feed that matches your interests.
          </Text>
        </View>

        {/* Stats */}
        <View style={s.statsGrid}>
          <View style={s.statCard}>
            <Text style={[s.statValue, { color: C.primary }]}>12</Text>
            <Text style={s.statLabel}>Events Attended</Text>
          </View>
          <View style={s.statCard}>
            <Text style={[s.statValue, { color: C.tertiary }]}>42</Text>
            <Text style={s.statLabel}>Connections</Text>
          </View>
        </View>

        {/* Interests */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Set Interests</Text>
            <View style={s.selectedBadge}>
              <Text style={s.selectedBadgeText}>{selected.size} Selected</Text>
            </View>
          </View>
          <View style={s.chipsCard}>
            <View style={s.interestBlock}>
              <Text style={s.blockLabel}>Main Interests</Text>
              <View style={s.chips}>
                {MAIN_INTERESTS.map(interest => {
                  const active = selected.has(interest);
                  return (
                    <TouchableOpacity
                      key={interest}
                      style={[s.chip, active ? s.chipActive : s.chipInactive]}
                      onPress={() => toggleInterest(interest)}
                      activeOpacity={0.8}
                    >
                      <Text style={[s.chipText, active ? s.chipTextActive : s.chipTextInactive]}>
                        {interest}
                      </Text>
                      {active && (
                        <MaterialIcons name="check" size={13} color="white" />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {suggestedInterests.length > 0 ? (
              <View style={s.interestBlock}>
                <Text style={s.blockLabel}>Suggested Matches</Text>
                <View style={s.chips}>
                  {suggestedInterests.map(interest => {
                    const active = selected.has(interest);
                    return (
                      <TouchableOpacity
                        key={interest}
                        style={[s.chip, active ? s.chipActive : s.chipSuggested]}
                        onPress={() => toggleInterest(interest)}
                        activeOpacity={0.8}
                      >
                        <Text style={[s.chipText, active ? s.chipTextActive : s.chipSuggestedText]}>
                          {interest}
                        </Text>
                        {active && (
                          <MaterialIcons name="check" size={13} color="white" />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ) : null}
          </View>
        </View>

        {/* Location */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>My Location</Text>
          <View style={s.locationCard}>
            <Image source={{ uri: MAP_IMG }} style={s.mapImg} contentFit="cover" />
            <View style={s.mapOverlay} pointerEvents="none" />
            <View style={s.locationBottom}>
              <View style={s.locationLeft}>
                <View style={s.locationIcon}>
                  <MaterialIcons name="location-on" size={20} color={C.primary} />
                </View>
                <View>
                  <Text style={s.locationCity}>Deggendorf, Germany</Text>
                  <Text style={s.locationRadius}>Radius: 25 km</Text>
                </View>
              </View>
              <View style={s.locationBtns}>
                <TouchableOpacity style={s.radiusBtn}>
                  <Text style={s.radiusBtnText}>Set Radius</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.changeBtn}>
                  <Text style={s.changeBtnText}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
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
    paddingVertical: 12,
    backgroundColor: 'rgba(240,246,255,0.9)',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: C.onSurface },
  iconBtn: { padding: 4 },

  scroll: { paddingHorizontal: 20 },

  avatarSection: { alignItems: 'center', paddingVertical: 28, gap: 12 },
  avatarWrap: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  avatarGlow: {
    position: 'absolute',
    width: 148,
    height: 148,
    borderRadius: 74,
    backgroundColor: C.primary,
    opacity: 0.15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: C.surfaceLowest,
  },
  editBtn: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: C.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  name: {
    fontSize: 30,
    fontWeight: '800',
    color: C.onSurface,
    letterSpacing: -0.5,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: C.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  levelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  xpWrap: {
    width: '70%',
    gap: 5,
    alignItems: 'center',
  },
  xpBar: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: C.surfaceHigh,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: C.primary,
  },
  xpLabel: {
    fontSize: 11,
    color: C.onSurfaceVariant,
    fontWeight: '500',
  },
  bio: {
    fontSize: 14,
    color: C.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 21,
    maxWidth: 280,
  },

  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: C.surfaceLow,
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 4,
  },
  statValue: { fontSize: 28, fontWeight: '900', letterSpacing: -0.5 },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: C.onSurfaceVariant,
  },

  section: { marginBottom: 28 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: C.onSurface, letterSpacing: -0.3 },
  selectedBadge: {
    backgroundColor: 'rgba(26,86,219,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  selectedBadgeText: { fontSize: 12, fontWeight: '600', color: C.primary },

  chipsCard: {
    backgroundColor: C.surfaceLowest,
    borderRadius: 16,
    padding: 20,
    gap: 18,
    shadowColor: C.onSurface,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  interestBlock: { gap: 10 },
  blockLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: C.onSurfaceVariant,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 30,
  },
  chipActive: { backgroundColor: C.primary },
  chipInactive: { backgroundColor: C.surface },
  chipSuggested: { backgroundColor: DC.secondaryFixed },
  chipText: { fontSize: 14, fontWeight: '600' },
  chipTextActive: { color: 'white' },
  chipTextInactive: { color: C.onSecondaryContainer },
  chipSuggestedText: { color: DC.onSecondaryContainer },

  locationCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: C.surfaceLow,
  },
  mapImg: { width: '100%', height: 140, opacity: 0.5 },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(224,242,254,0.85)',
  },
  locationBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    flexWrap: 'wrap',
    gap: 10,
  },
  locationLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: C.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationCity: { fontSize: 15, fontWeight: '700', color: C.onSurface },
  locationRadius: { fontSize: 12, color: C.onSurfaceVariant, marginTop: 1 },
  locationBtns: { flexDirection: 'row', gap: 8 },
  radiusBtn: {
    backgroundColor: C.surfaceHighest,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  radiusBtnText: { fontSize: 13, fontWeight: '700', color: C.onSurfaceVariant },
  changeBtn: {
    backgroundColor: C.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  changeBtnText: { fontSize: 13, fontWeight: '700', color: 'white' },
});
