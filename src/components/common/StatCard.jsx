import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

export default function StatCard({ label, value, subtitle, icon, color = COLORS.primary, gradientColors, trend, trendValue, style }) {
  const bg = gradientColors || [color + '22', color + '11'];

  return (
    <View style={[styles.container, SHADOWS.md, style]}>
      <LinearGradient colors={bg} style={styles.gradient}>
        <View style={styles.topRow}>
          <View style={[styles.iconBox, { backgroundColor: color + '22' }]}>
            <Ionicons name={icon} size={20} color={color} />
          </View>
          {trend && (
            <View style={[styles.trendBadge, { backgroundColor: trend === 'up' ? COLORS.secondaryBg : COLORS.dangerBg }]}>
              <Ionicons
                name={trend === 'up' ? 'trending-up' : 'trending-down'}
                size={12}
                color={trend === 'up' ? COLORS.secondary : COLORS.danger}
              />
              {trendValue && (
                <Text style={[styles.trendText, { color: trend === 'up' ? COLORS.secondary : COLORS.danger }]}>
                  {trendValue}
                </Text>
              )}
            </View>
          )}
        </View>
        <Text style={[styles.value, { color }]}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
  },
  gradient: {
    padding: SPACING.base,
    borderRadius: BORDER_RADIUS.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.full,
    gap: 2,
  },
  trendText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  value: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: '800',
    marginBottom: 2,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
});