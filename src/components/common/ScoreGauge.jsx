import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS, FONT_SIZES } from '../../constants/theme';

export default function ScoreGauge({ score, size = 120, label, sublabel, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(score, 0), 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const center = size / 2;

  const getColor = () => {
    if (score >= 80) return [COLORS.secondary, COLORS.secondaryDark];
    if (score >= 60) return [COLORS.primary, COLORS.primaryDark];
    if (score >= 40) return [COLORS.accent, COLORS.accentDark];
    return [COLORS.danger, COLORS.dangerDark];
  };

  const [colorStart, colorEnd] = getColor();

  return (
    <View style={styles.wrapper}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colorStart} />
            <Stop offset="100%" stopColor={colorEnd} />
          </LinearGradient>
        </Defs>
        {/* Background track */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={COLORS.gray100}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress arc */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#scoreGrad)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${center}, ${center}`}
        />
      </Svg>
      <View style={[styles.centerContent, { width: size, height: size }]}>
        <Text style={[styles.scoreText, { color: colorStart, fontSize: size * 0.22 }]}>{score}</Text>
        {label && <Text style={[styles.label, { fontSize: size * 0.1 }]}>{label}</Text>}
        {sublabel && <Text style={[styles.sublabel, { fontSize: size * 0.09 }]}>{sublabel}</Text>}
      </View>
    </View>
  );
}

export function MiniGauge({ score, size = 60, strokeWidth = 6 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(score, 0), 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const center = size / 2;

  const color = score >= 80 ? COLORS.secondary : score >= 60 ? COLORS.primary : score >= 40 ? COLORS.accent : COLORS.danger;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle cx={center} cy={center} r={radius} stroke={COLORS.gray100} strokeWidth={strokeWidth} fill="none" />
        <Circle
          cx={center} cy={center} r={radius}
          stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" rotation="-90" origin={`${center}, ${center}`}
        />
      </Svg>
      <View style={[StyleSheet.absoluteFillObject, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ fontSize: size * 0.24, fontWeight: '800', color }}>{score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
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
});