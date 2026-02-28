import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/theme';

export default function ProgressBar({ value, max = 100, label, showValue = true, color = COLORS.primary, height = 8, style }) {
  const percentage = Math.min((value / max) * 100, 100);

  const getColor = () => {
    if (color !== COLORS.primary) return color;
    if (percentage >= 80) return COLORS.secondary;
    if (percentage >= 60) return COLORS.primary;
    if (percentage >= 40) return COLORS.accent;
    return COLORS.danger;
  };

  const barColor = getColor();

  return (
    <View style={[styles.container, style]}>
      {(label || showValue) && (
        <View style={styles.labelRow}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showValue && <Text style={[styles.valueText, { color: barColor }]}>{Math.round(percentage)}%</Text>}
        </View>
      )}
      <View style={[styles.track, { height }]}>
        <View
          style={[
            styles.fill,
            { width: `${percentage}%`, backgroundColor: barColor, height },
          ]}
        />
      </View>
    </View>
  );
}

export function ScoreProgressBar({ label, current, required, color, style }) {
  const percentage = Math.min((current / required) * 100, 100);
  const gap = required - current;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.scoreText}>
          <Text style={{ color: color || COLORS.primary, fontWeight: '700' }}>{current}</Text>
          <Text style={{ color: COLORS.textTertiary }}> / {required}</Text>
        </Text>
      </View>
      <View style={[styles.track, { height: 8 }]}>
        <View style={[styles.fill, { width: `${percentage}%`, backgroundColor: color || COLORS.primary, height: 8 }]} />
      </View>
      {gap > 0 && (
        <Text style={styles.gapText}>Gap: {gap} points needed</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.sm,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
    flex: 1,
  },
  valueText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
  },
  scoreText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  track: {
    backgroundColor: COLORS.gray100,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: BORDER_RADIUS.full,
  },
  gapText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.danger,
    marginTop: 3,
  },
});