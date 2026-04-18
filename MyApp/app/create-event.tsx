import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, FONTS } from '@/constants/design';

const CATEGORIES = ['Sports', 'Nightlife', 'Outdoors', 'Social', 'Culture', 'Community', 'Matchmaking'];

export default function CreateEvent() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [isLive, setIsLive] = useState(false);

  const canPost = title.trim().length > 0 && category.length > 0 && location.trim().length > 0;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      {/* Header */}
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}>
          <MaterialIcons name="close" size={22} color={C.onSurface} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>New Event</Text>
        <TouchableOpacity
          style={[s.postBtn, !canPost && s.postBtnDisabled]}
          onPress={() => router.back()}
          disabled={!canPost}
          activeOpacity={0.8}
        >
          <Text style={[s.postBtnText, !canPost && s.postBtnTextDisabled]}>Post</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[s.scroll, { paddingBottom: insets.bottom + 40 }]}
      >
        {/* Title */}
        <View style={s.field}>
          <Text style={s.label}>Event Title *</Text>
          <TextInput
            style={s.input}
            placeholder="e.g. Spontan Volleyball im Park"
            placeholderTextColor={C.outline}
            value={title}
            onChangeText={setTitle}
            maxLength={80}
          />
        </View>

        {/* Category */}
        <View style={s.field}>
          <Text style={s.label}>Category *</Text>
          <View style={s.chips}>
            {CATEGORIES.map(cat => {
              const active = category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[s.chip, active ? s.chipActive : s.chipInactive]}
                  onPress={() => setCategory(cat)}
                  activeOpacity={0.8}
                >
                  <Text style={[s.chipText, active ? s.chipTextActive : s.chipTextInactive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Location */}
        <View style={s.field}>
          <Text style={s.label}>Location *</Text>
          <View style={s.inputRow}>
            <MaterialIcons name="location-on" size={18} color={C.secondary} style={s.inputIcon} />
            <TextInput
              style={[s.input, s.inputFlex]}
              placeholder="e.g. Eisstadion, Deggendorf"
              placeholderTextColor={C.outline}
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        {/* Live Now toggle */}
        <View style={s.field}>
          <View style={s.switchRow}>
            <View style={s.switchLeft}>
              <View style={[s.liveDot, isLive && s.liveDotActive]} />
              <Text style={s.label}>Happening Right Now</Text>
            </View>
            <Switch
              value={isLive}
              onValueChange={val => {
                setIsLive(val);
                if (val) { setDate(''); setTime(''); }
              }}
              trackColor={{ false: C.surfaceContainerHigh, true: C.secondary }}
              thumbColor="white"
            />
          </View>
        </View>

        {/* Date & Time — only when not live */}
        {!isLive && (
          <View style={s.fieldRow}>
            <View style={[s.field, { flex: 1 }]}>
              <Text style={s.label}>Date</Text>
              <TextInput
                style={s.input}
                placeholder="e.g. Sat, 21 Jun"
                placeholderTextColor={C.outline}
                value={date}
                onChangeText={setDate}
              />
            </View>
            <View style={[s.field, { flex: 1 }]}>
              <Text style={s.label}>Time</Text>
              <TextInput
                style={s.input}
                placeholder="e.g. 6:00 PM"
                placeholderTextColor={C.outline}
                value={time}
                onChangeText={setTime}
              />
            </View>
          </View>
        )}

        {/* Description */}
        <View style={s.field}>
          <Text style={s.label}>Description</Text>
          <TextInput
            style={s.textarea}
            placeholder="What's the vibe? Give people a reason to show up."
            placeholderTextColor={C.outline}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            maxLength={400}
          />
          <Text style={s.charCount}>{description.length}/400</Text>
        </View>

        {/* Tips */}
        <View style={s.tipsCard}>
          <MaterialIcons name="tips-and-updates" size={16} color={C.secondary} />
          <Text style={s.tipsText}>
            Spontaneous events get more traction — post it now and people will show up.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.outlineVariant,
    backgroundColor: C.bg,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: C.onSurface,
    fontFamily: FONTS.sans,
  },
  iconBtn: { padding: 4 },

  postBtn: {
    backgroundColor: C.secondary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postBtnDisabled: { backgroundColor: C.surfaceContainerHigh },
  postBtnText: { color: 'white', fontSize: 14, fontWeight: '700' },
  postBtnTextDisabled: { color: C.outline },

  scroll: { paddingHorizontal: 20, paddingTop: 24, gap: 24 },

  field: { gap: 8 },
  fieldRow: { flexDirection: 'row', gap: 14 },

  label: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: C.onSurfaceVariant,
    fontFamily: FONTS.sans,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surfaceLowest,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: C.outlineVariant,
  },
  inputIcon: { paddingLeft: 14 },
  inputFlex: { flex: 1, borderWidth: 0, backgroundColor: 'transparent' },

  input: {
    backgroundColor: C.surfaceLowest,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: C.outlineVariant,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: C.onSurface,
    fontFamily: FONTS.sans,
  },

  textarea: {
    backgroundColor: C.surfaceLowest,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: C.outlineVariant,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: C.onSurface,
    minHeight: 120,
    fontFamily: FONTS.sans,
  },
  charCount: {
    fontSize: 11,
    color: C.outline,
    textAlign: 'right',
    marginTop: -4,
  },

  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipActive: { backgroundColor: C.secondary },
  chipInactive: { backgroundColor: C.surfaceContainerHigh },
  chipText: { fontSize: 13, fontWeight: '600', fontFamily: FONTS.sans },
  chipTextActive: { color: 'white' },
  chipTextInactive: { color: C.onSurfaceVariant },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.surfaceLowest,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: C.outlineVariant,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  switchLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: C.outlineVariant,
  },
  liveDotActive: { backgroundColor: '#1a56db' },

  tipsCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: C.secondaryFixed,
    borderRadius: 12,
    padding: 14,
  },
  tipsText: {
    flex: 1,
    fontSize: 13,
    color: C.onSecondaryContainer,
    lineHeight: 19,
    fontFamily: FONTS.sans,
  },
});
