import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';

const VARIANTS = {
  primary:   { bg: COLORS.primaryBg,   text: COLORS.primaryDark,   border: COLORS.primaryLight },
  secondary: { bg: COLORS.secondaryBg, text: COLORS.secondaryDark, border: COLORS.secondaryLight },
  success:   { bg: COLORS.secondaryBg, text: COLORS.secondaryDark, border: COLORS.secondaryLight },
  warning:   { bg: COLORS.warningBg,   text: COLORS.warningDark,   border: COLORS.warningLight },
  danger:    { bg: COLORS.dangerBg,    text: COLORS.dangerDark,    border: COLORS.dangerLight },
  info:      { bg: COLORS.infoBg,      text: COLORS.infoDark,      border: COLORS.infoLight },
  purple:    { bg: COLORS.purpleBg,    text: COLORS.purpleDark,    border: COLORS.purpleLight },
  pink:      { bg: COLORS.pinkBg,      text: COLORS.pink,          border: COLORS.pink + '44' },
  gray:      { bg: COLORS.gray100,     text: COLORS.gray600,       border: COLORS.gray200 },
};

const TIER_VARIANTS = {
  tier1:   { bg: COLORS.primaryBg,   text: COLORS.primaryDark },
  tier2:   { bg: COLORS.secondaryBg, text: COLORS.secondaryDark },
  tier3:   { bg: COLORS.warningBg,   text: COLORS.warningDark },
  startup: { bg: COLORS.pinkBg,      text: COLORS.pink },
};

const PROFICIENCY_VARIANTS = {
  beginner:     { bg: COLORS.gray100,     text: COLORS.gray600 },
  intermediate: { bg: COLORS.infoBg,      text: COLORS.infoDark },
  advanced:     { bg: COLORS.primaryBg,   text: COLORS.primaryDark },
  expert:       { bg: COLORS.purpleBg,    text: COLORS.purpleDark },
};

export default function Badge({ label, variant = 'primary', size = 'sm', style }) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const fontSize = size === 'xs' ? FONT_SIZES.xs : size === 'sm' ? FONT_SIZES.sm : FONT_SIZES.base;
  const px = size === 'xs' ? 6 : size === 'sm' ? 8 : 10;
  const py = size === 'xs' ? 2 : size === 'sm' ? 3 : 4;

  return (
    <View style={[styles.badge, { backgroundColor: v.bg, borderColor: v.border, paddingHorizontal: px, paddingVertical: py }, style]}>
      <Text style={[styles.text, { color: v.text, fontSize }]}>{label}</Text>
    </View>
  );
}

export function TierBadge({ tier, style }) {
  const labels = { tier1: 'Tier 1', tier2: 'Tier 2', tier3: 'Tier 3', startup: 'Startup' };
  const v = TIER_VARIANTS[tier] || TIER_VARIANTS.tier3;
  return (
    <View style={[styles.badge, { backgroundColor: v.bg, borderColor: v.bg, paddingHorizontal: 8, paddingVertical: 3 }, style]}>
      <Text style={[styles.text, { color: v.text, fontSize: FONT_SIZES.xs, fontWeight: '700' }]}>{labels[tier] || tier}</Text>
    </View>
  );
}

export function ProficiencyBadge({ level, style }) {
  const v = PROFICIENCY_VARIANTS[level] || PROFICIENCY_VARIANTS.beginner;
  const labels = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced', expert: 'Expert' };
  return (
    <View style={[styles.badge, { backgroundColor: v.bg, borderColor: v.bg, paddingHorizontal: 8, paddingVertical: 3 }, style]}>
      <Text style={[styles.text, { color: v.text, fontSize: FONT_SIZES.xs }]}>{labels[level] || level}</Text>
    </View>
  );
}

export function StatusBadge({ status, style }) {
  const map = {
    completed:   { label: 'Completed',   bg: COLORS.secondaryBg, text: COLORS.secondaryDark },
    in_progress: { label: 'In Progress', bg: COLORS.primaryBg,   text: COLORS.primaryDark },
    pending:     { label: 'Pending',     bg: COLORS.gray100,     text: COLORS.gray500 },
    active:      { label: 'Active',      bg: COLORS.secondaryBg, text: COLORS.secondaryDark },
    ongoing:     { label: 'Ongoing',     bg: COLORS.infoBg,      text: COLORS.infoDark },
    paused:      { label: 'Paused',      bg: COLORS.warningBg,   text: COLORS.warningDark },
  };
  const v = map[status] || map.pending;
  return (
    <View style={[styles.badge, { backgroundColor: v.bg, borderColor: v.bg, paddingHorizontal: 8, paddingVertical: 3 }, style]}>
      <Text style={[styles.text, { color: v.text, fontSize: FONT_SIZES.xs }]}>{v.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
  },
});