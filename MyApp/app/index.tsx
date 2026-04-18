import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useOnboarding } from '@/context/onboarding-context';
import { C, FONTS } from '@/constants/design';
import { DEFAULT_INTERESTS, MAIN_INTERESTS, getSuggestedInterests } from '@/constants/interests';

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { completeOnboarding, hasCompletedOnboarding } = useOnboarding();
  const [name, setName] = useState('Timo');
  const [email, setEmail] = useState('timo@degconnect.de');
  const [city, setCity] = useState('Deggendorf');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(DEFAULT_INTERESTS);

  useEffect(() => {
    if (hasCompletedOnboarding) {
      router.replace('/(tabs)');
    }
  }, [hasCompletedOnboarding, router]);

  const isValid = useMemo(
    () => name.trim().length >= 2 && email.trim().length >= 5 && selectedInterests.length >= 3,
    [email, name, selectedInterests.length],
  );
  const suggestedInterests = useMemo(
    () => getSuggestedInterests(selectedInterests),
    [selectedInterests],
  );

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(item => item !== interest) : [...prev, interest],
    );
  };

  const handleCreateAccount = () => {
    if (!isValid) return;

    completeOnboarding({
      name: name.trim(),
      email: email.trim(),
      city: city.trim() || 'Deggendorf',
      interests: selectedInterests,
    });
    router.replace('/(tabs)');
  };

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.secondary} />
      <View style={s.hero}>
        <View style={s.heroGlowPrimary} />
        <View style={s.heroGlowAccent} />
        <View style={[s.heroInner, { paddingTop: insets.top + 18 }]}>
          <Text style={s.eyebrow}>DEG CONNECT</Text>
          <Text style={s.title}>
            Dein Start{'\n'}
            <Text style={s.titleAccent}>in die Community</Text>
          </Text>
          <Text style={s.subtitle}>
            Erstelle deinen Account und sag uns direkt, welche Leute, Events und Themen dich wirklich interessieren.
          </Text>
        </View>
        <View style={s.heroBridge} />
      </View>

      <ScrollView
        style={s.sheet}
        contentContainerStyle={[s.sheetContent, { paddingBottom: insets.bottom + 36 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.card}>
          <View style={s.cardHeader}>
            <Text style={s.cardTitle}>Account anlegen</Text>
            <Text style={s.cardText}>Mindestens 3 Interessen sorgen direkt fuer einen besseren Feed.</Text>
          </View>

          <View style={s.fieldGroup}>
            <Text style={s.label}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Zum Beispiel Marco"
              placeholderTextColor="#8c7e81"
              style={s.input}
            />
          </View>

          <View style={s.fieldGroup}>
            <Text style={s.label}>E-Mail</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="name@mail.de"
              placeholderTextColor="#8c7e81"
              keyboardType="email-address"
              autoCapitalize="none"
              style={s.input}
            />
          </View>

          <View style={s.fieldGroup}>
            <Text style={s.label}>Ort</Text>
            <TextInput
              value={city}
              onChangeText={setCity}
              placeholder="Deggendorf"
              placeholderTextColor="#8c7e81"
              style={s.input}
            />
          </View>
        </View>

        <View style={s.card}>
          <View style={s.interestsHeader}>
            <View>
              <Text style={s.cardTitle}>Deine Interessen</Text>
              <Text style={s.cardText}>Waehle zuerst die Hauptinteressen. Danach schlagen wir automatisch passende Themen vor.</Text>
            </View>
            <View style={s.counterPill}>
              <Text style={s.counterText}>{selectedInterests.length} aktiv</Text>
            </View>
          </View>

          <View style={s.interestBlock}>
            <Text style={s.blockLabel}>Hauptinteressen</Text>
            <View style={s.chips}>
              {MAIN_INTERESTS.map(interest => {
                const active = selectedInterests.includes(interest);
                return (
                  <TouchableOpacity
                    key={interest}
                    style={[s.chip, active ? s.chipActive : s.chipInactive]}
                    onPress={() => toggleInterest(interest)}
                    activeOpacity={0.86}
                  >
                    <Text style={[s.chipText, active ? s.chipTextActive : s.chipTextInactive]}>{interest}</Text>
                    {active ? <MaterialIcons name="check" size={16} color="#fff" /> : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {suggestedInterests.length > 0 ? (
            <View style={s.interestBlock}>
              <Text style={s.blockLabel}>Passend zu deiner Auswahl</Text>
              <View style={s.chips}>
                {suggestedInterests.map(interest => {
                  const active = selectedInterests.includes(interest);
                  return (
                    <TouchableOpacity
                      key={interest}
                      style={[s.chip, active ? s.chipActive : s.chipSuggestion]}
                      onPress={() => toggleInterest(interest)}
                      activeOpacity={0.86}
                    >
                      <Text style={[s.chipText, active ? s.chipTextActive : s.chipSuggestionText]}>{interest}</Text>
                      {active ? <MaterialIcons name="check" size={16} color="#fff" /> : null}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          style={[s.cta, !isValid && s.ctaDisabled]}
          activeOpacity={0.9}
          onPress={handleCreateAccount}
          disabled={!isValid}
        >
          <Text style={s.ctaText}>Account erstellen</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  hero: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: C.secondary,
    paddingBottom: 72,
  },
  heroGlowPrimary: {
    position: 'absolute',
    top: 72,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(217,226,255,0.22)',
  },
  heroGlowAccent: {
    position: 'absolute',
    top: 10,
    left: -22,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(114,0,9,0.18)',
  },
  heroInner: {
    paddingHorizontal: 24,
    gap: 14,
  },
  heroBridge: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -1,
    height: 38,
    backgroundColor: C.bg,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  eyebrow: {
    color: '#d8e4fb',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2.4,
  },
  title: {
    color: '#ffffff',
    fontSize: 42,
    lineHeight: 46,
    fontFamily: FONTS.serif,
    fontWeight: '700',
    letterSpacing: -1,
  },
  titleAccent: {
    color: '#f2d5d8',
    fontStyle: 'italic',
  },
  subtitle: {
    color: '#e6eefc',
    fontSize: 15,
    lineHeight: 23,
    maxWidth: 320,
    fontFamily: FONTS.sans,
  },
  sheet: {
    flex: 1,
    marginTop: -12,
  },
  sheetContent: {
    paddingTop: 10,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: C.surfaceLowest,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#102447',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.09,
    shadowRadius: 20,
    elevation: 8,
    gap: 18,
  },
  cardHeader: {
    marginBottom: 18,
    gap: 6,
  },
  cardTitle: {
    color: C.onSurface,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  cardText: {
    color: C.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 21,
    fontFamily: FONTS.sans,
  },
  fieldGroup: {
    marginBottom: 14,
    gap: 7,
  },
  label: {
    color: C.secondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  input: {
    height: 54,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: C.surfaceContainerLow,
    borderWidth: 1,
    borderColor: C.outlineVariant,
    color: C.onSurface,
    fontSize: 16,
  },
  interestsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 18,
  },
  counterPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: C.secondaryFixed,
  },
  counterText: {
    color: C.onSecondaryContainer,
    fontSize: 12,
    fontWeight: '700',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  interestBlock: {
    gap: 12,
  },
  blockLabel: {
    color: C.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chipActive: {
    backgroundColor: C.secondary,
  },
  chipInactive: {
    backgroundColor: C.surfaceContainer,
  },
  chipSuggestion: {
    backgroundColor: C.secondaryFixed,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '700',
  },
  chipTextActive: {
    color: '#fff',
  },
  chipTextInactive: {
    color: C.onSurfaceVariant,
  },
  chipSuggestionText: {
    color: C.onSecondaryContainer,
  },
  cta: {
    marginHorizontal: 20,
    marginTop: 2,
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: C.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  ctaDisabled: {
    opacity: 0.48,
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
