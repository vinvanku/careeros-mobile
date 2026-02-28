import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS } from '../../constants/theme';

export default function Card({ children, style, variant = 'default', padding = 'base' }) {
  const paddingMap = {
    none: 0,
    sm: SPACING.sm,
    base: SPACING.base,
    lg: SPACING.lg,
    xl: SPACING.xl,
  };

  const variantStyles = {
    default: { backgroundColor: COLORS.surface, ...SHADOWS.md },
    elevated: { backgroundColor: COLORS.surface, ...SHADOWS.lg },
    flat: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
    primary: { backgroundColor: COLORS.primaryBg, borderWidth: 1, borderColor: COLORS.primaryLight },
    success: { backgroundColor: COLORS.secondaryBg, borderWidth: 1, borderColor: COLORS.secondaryLight },
    warning: { backgroundColor: COLORS.warningBg, borderWidth: 1, borderColor: COLORS.warningLight },
    danger: { backgroundColor: COLORS.dangerBg, borderWidth: 1, borderColor: COLORS.dangerLight },
  };

  return (
    <View style={[
      styles.card,
      variantStyles[variant],
      { padding: paddingMap[padding] },
      style,
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
});