import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { C as DC, getBorderColor, FONTS } from '@/constants/design';

const { width: W } = Dimensions.get('window');
const H_PAD = 16;

const C = {
  primary: DC.primary,
  bg: DC.bg,
  onSurface: DC.onSurface,
  tertiary: DC.tertiary,
  secondaryContainer: DC.secondaryContainer,
  onSecondaryContainer: DC.onSecondaryContainer,
  surfaceLowest: DC.surfaceLowest,
  surface: DC.surfaceContainer,
  surfaceHigh: DC.surfaceContainerHigh,
  surfaceHighest: DC.surfaceContainerHighest,
  onSurfaceVariant: DC.onSurfaceVariant,
  outline: DC.outline,
  surfaceLow: DC.surfaceContainerLow,
};

const AV = {
  a: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUT-Akyo4eNiqYiNuxyEGIuqFiuwQfsOETVyFHGmv0pf5SKuLZSm5vNX1S21M06jJ-S2W0WDx0rNtE04UEo7m4Ujrfb9mFYVhitkWkRPcOHkRxVc2BiTXUNx5UsHaQCDTDUBeGPM8VHI-rVyJufBvy0pU_hCQu2GNAyMJOxEs8tiBr_3aWqlGIZ2PjM-9PVa7ikOyQH9pzzWY0B3q41IDd9Vfi7Ue7dVhQfq8ZjcG-L5W-7I4o94-ndZj_gBnssCG-N-IvNJ-FYh8',
  b: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ57GBE-4OnB3WrWZqvHqyaRhf2ezUf8K14IYw0HfUSW-gdhruFeZMCdr13fkiIOr_uYVyN_D-hAZPOUsQN5RYD63fDZaLJMN2kbMBvsD6uDXAQKrteXVVnvNXBVyvb-sZKFPV2O-D-fZlT4hmF9BLQM34hRpOE_6Mi4Nd7bINTsC4WPuczI7ziXqKcTy9HkeBrEeZ3MkJNG6KqqlEKhFUG7lIDi87eFpZS36DY-ycLXXuSbdMHH9M8yJK-isXkMci3FSTu4zJrZw',
  c: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwE_OKcppWBshv02lW7v-NXT6dzcjCWNuw5udYlDUDbLrf9JdXWRrRL36IWqbsvwFAgTxcIhZRob1jvGOPGZ4jvj__q6d6RrU1lMFhcbmL12IywGPbubMObyoHLR9JJ5HDBZHeAQEBOF5ZaZj8_8NvSRlpcI2DW3GMfirvET5hmw1X5sNJ9QVg8uqd6J5T90ojJT7RuEKKeN8mFygLp9XVWMROZliur1EkLxAOy6ZfngOZSvutIPVcM_nSfe6G3MVh3g_6ueWWbIs',
};

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;
  attendeeCount: number;
  avatars: string[];
  isJoin: boolean;
  trending?: boolean;
}

const ALL_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Spontan Cocktail Night',
    category: 'Nightlife',
    date: 'Today • 9:00 PM',
    location: 'Deggendorf Altstadt',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-5t3Dwhmo6oFoWilN2lzFjLJdVOMUzamolLoASm-EZziUIrGkqOSSOXL_NmZgHDzX0Mxpko90oAx8_VliE-tKPqcPyavHumT28u5LOy962an-rTFy_y6zn3ypKfQXHgi9P6dJV3M6z5JakkOpPTzMgtMrJX-geM-jaivEnYRIF8eiJB4ITw49N9Ql71NQMITrwNLb2l09VaMQyu-1hDulQy8Blt7uwfYQKULXzRSeHOlulPlwzhHkA6R_JpWxaZGBq5srdDSskGY',
    attendeeCount: 18,
    avatars: [AV.a, AV.b],
    isJoin: true,
    trending: true,
  },
  {
    id: '2',
    title: 'Full Court Pick-up @ Eisstadion',
    category: 'Sports',
    date: 'Started 15m ago',
    location: 'Eisstadion Basketball Courts',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXkebfWZzHI0lkhVzhgzpDoLRHwB7F73jauvbzi0DTuCiCR2o2slyCydEfOJki2ELYfUQ8TJZ3u51ke0jWEFBUwoLYhqvGWg0Xld16bIHhmVZ85ws8I4p9uzbD4wEhGZYaPegopB5xTl_wrG_NOhTaGzxl3HSuRSMv05EEwg5izofhE9rClP9dXuQsrgm35d_LQJKCshLgiuV3x12YakCAzbWSWs1RPpqoStEIgfseITQpwsDejbFOICFpW-HmVWnpWvzlilb-aoo',
    attendeeCount: 10,
    avatars: [AV.b, AV.c],
    isJoin: true,
    trending: true,
  },
  {
    id: '3',
    title: 'Padel Partners: Deggendorf Open',
    category: 'Matchmaking',
    date: 'Tomorrow • 10:00 AM',
    location: 'Sports Arena Deggendorf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRY-hQSJnAUNuMssxkgAWNqvH9b7gjq5M9HcVUZ9JUcumbnw2RtL_9fnRiuL80D6xhXgXhnsSyz8b9sM4cHhdU3jo_F3YS3CZyqvmwLjeeMpzOzJj2zJxn5rj0n_WYxqZcBnHGI1W0Sa50IIkmr2aA37yy7PDFrL7ReK9P8UcgjV23x_cd5XNR2nyzyV-LArVYYZNlc9Qm7QGoKmxtP0BwUYWJCslPZAbVxah17A9qyaCeIR8e4iu4eLSv5qWxiA3oLO1qvJe4tLo',
    attendeeCount: 4,
    avatars: [AV.a],
    isJoin: false,
    trending: true,
  },
  {
    id: '4',
    title: 'Donau Cycling Tour',
    category: 'Outdoors',
    date: 'Sat • 9:00 AM',
    location: 'Donauradweg, Deggendorf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzkQpz0VbP81h5q1kDQwsU6TVSgf6KXUgOMn5-acESNS18Qqku47fs5TfXjzQ-ZdJ4q2zh1vmDqIBABU4dM6ZWD1bG7_NusISfF_G3BAcYQ5eBCeVC7H7u9RvCur5VeYhDEEcvi8okj78bdkUrHBV6-va2yvrChetFCJfQhauaxvaVNadS0rAt-u4rTKEZYYF20mjv35yI2Z-tjpw_BIvKRFKMetLSqes9NHyGOC3KuGws1XC1Pm0j59uYmsK4NU9TYI8oaRQ6pIA',
    attendeeCount: 22,
    avatars: [AV.a, AV.b],
    isJoin: false,
  },
  {
    id: '5',
    title: 'Bayerischer Wald Group Hike',
    category: 'Outdoors',
    date: 'Sun • 8:00 AM',
    location: 'Trailhead Grafling, 10km from Deg',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx1g0XSlsS4n4pPZ09i6qN_zVYMpso7n6HLMI_4LG5CX8hZ5QPtqZVZ0EwR3o5e3sYSv2Ur7A1sZe5nJ41z9DgCaqG4O61Ek7sAWoU75AIgh7nimrK6bOs2bRUQ7WhnmuERNv7OWLl5f7UrvLXME2ItiJt9dT7_h7Abh2aQmMMgNi_RxyLP7bPm8aHKOZPK1sHWp5L_4sJGY8AAopOdquHGXUuCof0aMFWuzPCVofBLCZe3Hj_kikFG1r1tIMZq9_yRBxROoHNN04',
    attendeeCount: 14,
    avatars: [AV.b, AV.c],
    isJoin: false,
  },
  {
    id: '6',
    title: 'Stadtpark Biergarten Evening',
    category: 'Social',
    date: 'Today • 6:00 PM',
    location: 'Stadtpark, Deggendorf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuNLk_nKR7WzDe9ldU_g0Yg7-2SmYu981OG9eSnguNVoUi6xpR7LaA0cqC-ZnhPD5QaE8KaRBCyX7_3EriWcMBSLlVnraa_LqlqN9Rdyeqdkbk4Bb8xh8EWrK9XAALFzPbTSiUzf4eO1qcNkPclYCU1llZq_v5CYxKHL_iCJykpm2_FPzqb7b54Ov3Mg0U5wHyNrtxW2JP-BRPxr0ArGO5GmryCFl_XKEh4hUCYVCTb-8WUZ7aJdNt1cDEWZJj2q7MRD42C054nOE',
    attendeeCount: 31,
    avatars: [AV.a, AV.b],
    isJoin: true,
  },
  {
    id: '7',
    title: 'Open Swim @ Freibad Deggendorf',
    category: 'Sports',
    date: 'Today • 2:00 PM',
    location: 'Freibad Deggendorf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClOa0-DptQotuiqe7CoAop-xcL87jWLgepsUpZEVJ5CGrWUHrDoHrb94YAbZvKbFsZTax8C9bxVeBtvzDYyyiH6qpemVgHdniqWCHKHZPUtg8L8OMAIpKttiGYOwpd9f-74VlC-o5OecaSu8c9KNyoFuUAxJ0KKwzq0FX0mF7otRn9aHNJxt8xkvxw0STUEZFan32LQsbaXvJBk44AIEwjacjQKQ_ui2HPwQrSuIiVAF0V5pIhx1ctj9QHIZQBKW9oFcfLNQfi85E',
    attendeeCount: 27,
    avatars: [AV.c],
    isJoin: false,
  },
  {
    id: '8',
    title: 'Luitpoldplatz Farmers Market',
    category: 'Community',
    date: 'Sat • 8:00 AM',
    location: 'Luitpoldplatz, Deggendorf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB32GrKhO_J-3gnNHe8LG1-ZutGwZJ3xiP0waXZ5pQGoSzMG0iY0Hxiu_s1HjVOfGldvUe7eveto_NAR1L2RjhWezSCSm8ebGNvQAJ19gWZtLRb0Dpu2jgDudT0deUeQfmPArZYZLsKmjwVO6LfsxgpSNMlMuO6mShrSap6aOFDsP7odjeDw_jKQ5EEz2PwENXN24BD5Y7M7oDg5jsouE1ZKftL6efx4XtKIUD-IMHhb_Cgy5IMShW16R33NT5tOAxQHcX9aG6EFVc',
    attendeeCount: 55,
    avatars: [AV.a, AV.b],
    isJoin: false,
  },
  {
    id: '9',
    title: 'Comedy Night @ Stadttheater',
    category: 'Culture',
    date: 'Fri • 8:00 PM',
    location: 'Stadttheater Deggendorf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkuxfGG_eQ0DkQKXHsAKghWJhU4dctemi1DtZ5Onm2isTqBuxZhdWuFxzByZ9lw3jRof-7_Zl32IEBSerEeKXd9nPl1AHPvmPNYKBxB40vYH03KxPC6BbiUPDxNTB_NX1TK2hYMwgAU1PHXZSoUYH8y2RYVtg6lqZNnOTdg3-O_CQuIJ6thmRSqBmB6mzjXPg8Tf5ZRjS2KR3RqB3b8u6_8fx0XLWfNleRglkSxczO5dSH2yibHtEni9SS8GGLIONE27CqxhjTlKQ',
    attendeeCount: 42,
    avatars: [AV.b, AV.c],
    isJoin: false,
  },
  {
    id: '10',
    title: 'Kayaking on the Danube',
    category: 'Outdoors',
    date: 'Sun • 10:00 AM',
    location: 'Donauhafen, Deggendorf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhmaEic-AHWob8M9kVz0F_a8z9E-xjVdtUz1X3pGLEoPwaXjeOEI9S0DOh8jeDOtaHdS-yMYG-PYq8J5c9zGPuIc7F4FesxusEqzqy0kXxc1spVMiwHXtCbZPOTb4stPFOFYiDyVK8Jf344B0sTSH0fYh_daZg9oLz4USMHdALtCx2_wQsf9Ej3pwWVfSHotT0KK5jYNQQ92pgDVSN1SuADTBZiClHXQo6oznurQRBX8qq-0XiQ3Z8-N-EHyYjOw_GpmNr7MSduS8',
    attendeeCount: 9,
    avatars: [AV.a],
    isJoin: false,
  },
];

const CATEGORIES = [
  { label: 'All', icon: 'apps' as const },
  { label: 'Sports', icon: 'sports-basketball' as const },
  { label: 'Outdoors', icon: 'park' as const },
  { label: 'Nightlife', icon: 'nightlife' as const },
  { label: 'Social', icon: 'people' as const },
  { label: 'Culture', icon: 'theater-comedy' as const },
  { label: 'Community', icon: 'storefront' as const },
];

const TOP_EVENTS = ALL_EVENTS.slice(0, 3);
const TRENDING = ALL_EVENTS.filter(e => e.trending);


function HeroCard({ event, onPress }: { event: Event; onPress: () => void }) {
  const cardW = W * 0.72;
  return (
    <TouchableOpacity style={[hc.card, { width: cardW }]} onPress={onPress} activeOpacity={0.92}>
      <Image source={{ uri: event.image }} style={hc.image} contentFit="cover" />
      <View style={hc.overlay} pointerEvents="none" />
      <View style={hc.content}>
        <View style={hc.badgeRow}>
          <View style={hc.badge}>
            <Text style={hc.badgeText}>{event.category}</Text>
          </View>
          {event.trending && (
            <View style={hc.trendingBadge}>
              <MaterialIcons name="trending-up" size={11} color="#4441e3" />
              <Text style={hc.trendingText}>Trending</Text>
            </View>
          )}
        </View>
        <Text style={hc.title} numberOfLines={2}>{event.title}</Text>
        <View style={hc.meta}>
          <MaterialIcons name="location-on" size={12} color="rgba(255,255,255,0.75)" />
          <Text style={hc.metaText} numberOfLines={1}>{event.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const hc = StyleSheet.create({
  card: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
  },
  image: { ...StyleSheet.absoluteFillObject as any },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 130,
    backgroundColor: 'rgba(15,7,45,0.72)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
    gap: 5,
  },
  badgeRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  badge: {
    backgroundColor: 'rgba(252,139,206,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: { color: '#600247', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8 },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
  },
  trendingText: { color: '#4441e3', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  title: { color: 'white', fontSize: 15, fontWeight: '800', lineHeight: 20 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: { color: 'rgba(255,255,255,0.75)', fontSize: 11 },
});

function ListCard({ event, rank, onPress }: { event: Event; rank: number; onPress: () => void }) {
  return (
    <TouchableOpacity style={lc.card} onPress={onPress} activeOpacity={0.85}>
      <View style={lc.rankWrap}>
        <Text style={lc.rank}>#{rank}</Text>
      </View>
      <Image source={{ uri: event.image }} style={lc.image} contentFit="cover" />
      <View style={lc.body}>
        <View style={lc.topRow}>
          <View style={lc.catBadge}>
            <Text style={lc.catText}>{event.category}</Text>
          </View>
          {event.trending && (
            <MaterialIcons name="trending-up" size={14} color={C.primary} />
          )}
        </View>
        <Text style={lc.title} numberOfLines={2}>{event.title}</Text>
        <View style={lc.metaRow}>
          <MaterialIcons name="calendar-today" size={11} color={C.onSurfaceVariant} />
          <Text style={lc.metaText}>{event.date}</Text>
        </View>
        <View style={lc.metaRow}>
          <MaterialIcons name="location-on" size={11} color={C.onSurfaceVariant} />
          <Text style={lc.metaText} numberOfLines={1}>{event.location}</Text>
        </View>
        <View style={lc.footer}>
          <View style={lc.avatarRow}>
            {event.avatars.slice(0, 2).map((uri, i) => (
              <Image
                key={i}
                source={{ uri }}
                style={[lc.avatar, i > 0 && { marginLeft: -7 }]}
                contentFit="cover"
              />
            ))}
            <Text style={lc.countText}>+{event.attendeeCount}</Text>
          </View>
          <TouchableOpacity style={[lc.btn, event.isJoin ? lc.btnJoin : lc.btnInt]}>
            <Text style={[lc.btnText, !event.isJoin && lc.btnTextInt]}>
              {event.isJoin ? 'Join' : 'Interested'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const lc = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: C.surfaceLowest,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 10,
    alignItems: 'stretch',
  },
  rankWrap: {
    width: 36,
    backgroundColor: C.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rank: { color: C.primary, fontSize: 13, fontWeight: '800' },
  image: { width: 110, height: 130 },
  body: { flex: 1, padding: 12, gap: 4 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  catBadge: {
    backgroundColor: C.surfaceLow,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 3,
  },
  catText: { color: C.onSurfaceVariant, fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6 },
  title: { color: C.onSurface, fontSize: 14, fontWeight: '700', lineHeight: 19 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: C.onSurfaceVariant, fontSize: 11 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'white',
  },
  countText: { color: C.onSurfaceVariant, fontSize: 11, marginLeft: 4 },
  btn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  btnJoin: { backgroundColor: C.primary },
  btnInt: { backgroundColor: C.secondaryContainer },
  btnText: { color: 'white', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6 },
  btnTextInt: { color: C.onSecondaryContainer },
});

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const filtered = query.trim()
    ? ALL_EVENTS.filter(
        e =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.location.toLowerCase().includes(query.toLowerCase()) ||
          e.category.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_EVENTS;

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      {/* Header */}
      <View style={s.header}>
        <View>
          <Text style={s.greeting}>Discover</Text>
          <Text style={s.subtitle}>Find your next experience</Text>
        </View>
        <TouchableOpacity style={s.filterBtn}>
          <MaterialIcons name="tune" size={20} color={C.primary} />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={s.searchWrap}>
        <MaterialIcons name="search" size={20} color={C.outline} />
        <TextInput
          style={s.searchInput}
          placeholder="Search events, places..."
          placeholderTextColor={C.outline}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <MaterialIcons name="close" size={18} color={C.outline} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 24 }]}
      >
        {!query.trim() && (
          <>
            {/* Category chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={s.catsScroll}
              contentContainerStyle={s.catsContent}
            >
              {CATEGORIES.map(cat => {
                const active = selectedCat === cat.label;
                return (
                  <TouchableOpacity
                    key={cat.label}
                    style={[s.catChip, active && s.catChipActive]}
                    onPress={() => setSelectedCat(cat.label)}
                    activeOpacity={0.75}
                  >
                    <MaterialIcons
                      name={cat.icon}
                      size={15}
                      color={active ? 'white' : C.onSurfaceVariant}
                    />
                    <Text style={[s.catLabel, active && s.catLabelActive]}>{cat.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Top picks horizontal scroll */}
            <View style={s.section}>
              <View style={s.sectionHeader}>
                <Text style={s.sectionTitle}>Top Picks</Text>
                <TouchableOpacity>
                  <Text style={s.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: H_PAD, paddingRight: 4 }}
              >
                {TOP_EVENTS.map(ev => (
                  <HeroCard key={ev.id} event={ev} onPress={() => router.push(`/event/${ev.id}`)} />
                ))}
              </ScrollView>
            </View>

            {/* Trending section */}
            <View style={s.section}>
              <View style={s.sectionHeader}>
                <View style={s.trendingTitle}>
                  <MaterialIcons name="trending-up" size={18} color={C.primary} />
                  <Text style={s.sectionTitle}>Trending Now</Text>
                </View>
                <TouchableOpacity>
                  <Text style={s.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              <View style={s.listWrap}>
                {TRENDING.map((ev, i) => (
                  <ListCard key={ev.id} event={ev} rank={i + 1} onPress={() => router.push(`/event/${ev.id}`)} />
                ))}
              </View>
            </View>

            {/* All events */}
            <View style={s.section}>
              <View style={s.sectionHeader}>
                <Text style={s.sectionTitle}>All Events</Text>
                <Text style={s.eventCount}>{ALL_EVENTS.length} events</Text>
              </View>
              <View style={s.listWrap}>
                {ALL_EVENTS.map((ev, i) => (
                  <ListCard key={ev.id} event={ev} rank={i + 1} onPress={() => router.push(`/event/${ev.id}`)} />
                ))}
              </View>
            </View>
          </>
        )}

        {/* Search results */}
        {query.trim() && (
          <View style={s.section}>
            <Text style={s.searchResultLabel}>
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{query}"
            </Text>
            {filtered.length === 0 ? (
              <View style={s.noResults}>
                <MaterialIcons name="search-off" size={40} color={C.outline} />
                <Text style={s.noResultsText}>No events found</Text>
                <Text style={s.noResultsSub}>Try a different search term</Text>
              </View>
            ) : (
              <View style={s.listWrap}>
                {filtered.map((ev, i) => (
                  <ListCard key={ev.id} event={ev} rank={i + 1} onPress={() => router.push(`/event/${ev.id}`)} />
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: H_PAD,
    paddingTop: 12,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '900',
    fontStyle: 'italic',
    color: C.primary,
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 13, color: C.onSurfaceVariant, marginTop: 1 },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: C.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surfaceLowest,
    marginHorizontal: H_PAD,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 14,
    gap: 10,
    borderWidth: 1.5,
    borderColor: C.surfaceHigh,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: C.onSurface,
    padding: 0,
  },

  scrollContent: { paddingHorizontal: H_PAD },

  catsScroll: { marginBottom: 20, marginHorizontal: -H_PAD },
  catsContent: { paddingHorizontal: H_PAD, gap: 8 },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: C.surfaceLow,
  },
  catChipActive: { backgroundColor: C.primary },
  catLabel: { fontSize: 12, fontWeight: '600', color: C.onSurfaceVariant },
  catLabelActive: { color: 'white' },

  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: C.onSurface, letterSpacing: -0.3 },
  trendingTitle: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  seeAll: { fontSize: 13, fontWeight: '600', color: C.primary },
  eventCount: { fontSize: 12, color: C.onSurfaceVariant, fontWeight: '500' },

  listWrap: { gap: 0 },

  searchResultLabel: {
    fontSize: 14,
    color: C.onSurfaceVariant,
    marginBottom: 14,
    fontWeight: '500',
  },
  noResults: { alignItems: 'center', paddingVertical: 48, gap: 10 },
  noResultsText: { fontSize: 16, fontWeight: '700', color: C.onSurface },
  noResultsSub: { fontSize: 13, color: C.onSurfaceVariant },
});
