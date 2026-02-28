import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

// Pure React Native score gauge — no SVG dependency
export default function ScoreGauge({ score, size = 120, label, sublabel, strokeWidth = 10 }) {
  const getColor = () => {
    if (score >= 80) return COLORS.secondary;
    if (score >= 60) return COLORS.primary;
    if (score >= 40) return COLORS.accent;
    return COLORS.danger;
  };
  const color = getColor();

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      {/* Outer ring */}
      <View style={[styles.outerRing, { width: size, height: size, borderRadius: size / 2, borderColor: COLORS.gray100, borderWidth: strokeWidth }]} />
      {/* Colored arc simulation using border */}
      <View style={[styles.colorArc, {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderColor: color,
        borderWidth: strokeWidth,
        borderTopColor: score >= 25 ? color : 'transparent',
        borderRightColor: score >= 50 ? color : 'transparent',
        borderBottomColor: score >= 75 ? color : 'transparent',
        borderLeftColor: score >= 100 ? color : 'transparent',
        transform: [{ rotate: '-135deg' }],
        opacity: 0.9,
      }]} />
      {/* Center content */}
      <View style={[styles.center, { width: size - strokeWidth * 2, height: size - strokeWidth * 2, borderRadius: (size - strokeWidth * 2) / 2 }]}>
        <Text style={[styles.score, { color, fontSize: size * 0.22 }]}>{score}</Text>
        {label && <Text style={[styles.label, { fontSize: size * 0.1 }]}>{label}</Text>}
        {sublabel && <Text style={[styles.sublabel, { fontSize: size * 0.09 }]}>{sublabel}</Text>}
      </View>
    </View>
  );
}

export function MiniGauge({ score, size = 60, strokeWidth = 6 }) {
  const color = score >= 80 ? COLORS.secondary : score >= 60 ? COLORS.primary : score >= 40 ? COLORS.accent : COLORS.danger;
  return (
    <View style={[styles.miniWrapper, { width: size, height: size }]}>
      <View style={[styles.miniOuter, { width: size, height: size, borderRadius: size / 2, borderColor: COLORS.gray100, borderWidth: strokeWidth }]} />
      <View style={[styles.miniOuter, {
        width: size, height: size,
        borderRadius: size / 2,
        borderColor: color,
        borderWidth: strokeWidth,
        borderTopColor: score >= 25 ? color : 'transparent',
        borderRightColor: score >= 50 ? color : 'transparent',
        borderBottomColor: score >= 75 ? color : 'transparent',
        borderLeftColor: score >= 100 ? color : 'transparent',
        transform: [{ rotate: '-135deg' }],
        position: 'absolute',
      }]} />
      <View style={StyleSheet.absoluteFillObject}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: size * 0.28, fontWeight: '800', color }}>{score}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  outerRing: {
    position: 'absolute',
  },
  colorArc: {
    position: 'absolute',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  score: {
    fontWeight: '800',
  },
  label: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 1,
  },
  sublabel: {
    color: COLORS.textTertiary,
    marginTop: 1,
  },
  miniWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniOuter: {},
});