import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { SKILL_SCORES, SKILLS } from '../../constants/mockData';
import Card from '../../components/common/Card';
import ScoreGauge from '../../components/common/ScoreGauge';
import ProgressBar, { ScoreProgressBar } from '../../components/common/ProgressBar';
import SectionHeader from '../../components/common/SectionHeader';

export default function SkillsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('overview');
  const scores = SKILL_SCORES;

  const domainData = [
    { key: 'core', label: 'Core CS', score: scores.domainScores.core, color: COLORS.primary, icon: 'code-slash' },
    { key: 'webDev', label: 'Web Dev', score: scores.domainScores.webDev, color: COLORS.secondary, icon: 'globe' },
    { key: 'aiMl', label: 'AI / ML', score: scores.domainScores.aiMl, color: COLORS.purple, icon: 'brain' },
    { key: 'data', label: 'Data', score: scores.domainScores.data, color: COLORS.info, icon: 'bar-chart' },
    { key: 'devOps', label: 'DevOps', score: scores.domainScores.devOps, color: COLORS.warning, icon: 'cloud' },
    { key: 'security', label: 'Security', score: scores.domainScores.security, color: COLORS.danger, icon: 'shield' },
  ];

  const breakdownItems = Object.values(scores.breakdown);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <LinearGradient colors={['#8B5CF6', '#6366F1']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Skill Intelligence</Text>
            <Text style={styles.headerSub}>Industry Readiness Analysis</Text>
          </View>
          <View style={styles.gaugeWrap}>
            <ScoreGauge score={scores.industryReadinessScore} size={90} label="Score" strokeWidth={8} />
          </View>
        </View>
        <View style={styles.rankRow}>
          <View style={styles.rankChip}>
            <Ionicons name="trophy" size={12} color={COLORS.warning} />
            <Text style={styles.rankText}>Rank #{scores.batchRank} / {scores.batchSize}</Text>
          </View>
          <View style={styles.rankChip}>
            <Ionicons name="ribbon" size={12} color="rgba(255,255,255,0.9)" />
            <Text style={styles.rankText}>Top {100 - scores.percentile + 1}% of Batch</Text>
          </View>
          <View style={styles.rankChip}>
            <Ionicons name="star" size={12} color={COLORS.warning} />
            <Text style={styles.rankText}>{scores.primaryDomain}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'domains', label: 'Domain Scores' },
          { key: 'breakdown', label: 'Score Breakdown' },
          { key: 'gaps', label: 'Skill Gaps' },
        ].map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.content}>

          {/* ── Overview Tab ── */}
          {activeTab === 'overview' && (
            <View>
              {/* Top Skills */}
              <SectionHeader title="Top Skills" icon="star" />
              {SKILLS.filter(s => s.score >= 75).sort((a, b) => b.score - a.score).map(skill => (
                <Card key={skill.id} style={styles.skillRow}>
                  <View style={styles.skillLeft}>
                    {skill.verified && (
                      <Ionicons name="checkmark-circle" size={14} color={COLORS.secondary} />
                    )}
                    <View>
                      <Text style={styles.skillName}>{skill.name}</Text>
                      <Text style={styles.skillCat}>{skill.category} • {skill.proficiency}</Text>
                    </View>
                  </View>
                  <View style={styles.skillRight}>
                    <Text style={[styles.skillScore, { color: skill.score >= 80 ? COLORS.secondary : COLORS.primary }]}>
                      {skill.score}
                    </Text>
                    <Text style={styles.skillScoreLabel}>/100</Text>
                  </View>
                </Card>
              ))}

              {/* Skills to Improve */}
              <SectionHeader title="Needs Improvement" icon="trending-up" style={{ marginTop: SPACING.md }} />
              {SKILLS.filter(s => s.score < 75).sort((a, b) => a.score - b.score).slice(0, 5).map(skill => (
                <Card key={skill.id} style={styles.skillRow}>
                  <View style={styles.skillLeft}>
                    <Ionicons name="alert-circle-outline" size={14} color={COLORS.warning} />
                    <View>
                      <Text style={styles.skillName}>{skill.name}</Text>
                      <Text style={styles.skillCat}>{skill.category} • {skill.proficiency}</Text>
                    </View>
                  </View>
                  <View style={styles.skillRight}>
                    <Text style={[styles.skillScore, { color: COLORS.warning }]}>{skill.score}</Text>
                    <Text style={styles.skillScoreLabel}>/100</Text>
                  </View>
                </Card>
              ))}
            </View>
          )}

          {/* ── Domain Scores Tab ── */}
          {activeTab === 'domains' && (
            <View>
              <Card style={styles.domainCard}>
                <Text style={styles.domainTitle}>Domain Radar Overview</Text>
                {domainData.map(d => (
                  <View key={d.key} style={styles.domainRow}>
                    <View style={[styles.domainIcon, { backgroundColor: d.color + '18' }]}>
                      <Ionicons name={d.icon} size={16} color={d.color} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.domainLabelRow}>
                        <Text style={styles.domainLabel}>{d.label}</Text>
                        <Text style={[styles.domainScore, { color: d.color }]}>{d.score}/100</Text>
                      </View>
                      <View style={styles.domainTrack}>
                        <View style={[styles.domainFill, { width: `${d.score}%`, backgroundColor: d.color }]} />
                      </View>
                      <Text style={styles.domainLevel}>
                        {d.score >= 80 ? 'Expert' : d.score >= 65 ? 'Advanced' : d.score >= 50 ? 'Intermediate' : 'Beginner'}
                      </Text>
                    </View>
                  </View>
                ))}
              </Card>

              {/* Domain insights */}
              <Card variant="primary" style={styles.insightCard}>
                <View style={styles.insightRow}>
                  <Ionicons name="bulb" size={20} color={COLORS.primary} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.insightTitle}>AI Insight</Text>
                    <Text style={styles.insightText}>
                      Your Core CS foundation is excellent at 85. Focus on DevOps (55) and Security (48) to become a well-rounded engineer and increase Tier 1 company probability.
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
          )}

          {/* ── Score Breakdown Tab ── */}
          {activeTab === 'breakdown' && (
            <View>
              <Card style={styles.breakdownCard}>
                <Text style={styles.breakdownTitle}>Industry Readiness Formula</Text>
                <Text style={styles.breakdownSub}>How your overall score is calculated</Text>
                {breakdownItems.map((item, idx) => (
                  <View key={idx} style={styles.breakdownItem}>
                    <View style={styles.breakdownHeader}>
                      <Text style={styles.breakdownLabel}>{item.label}</Text>
                      <View style={styles.breakdownRight}>
                        <Text style={styles.breakdownWeight}>×{(item.weight * 100).toFixed(0)}%</Text>
                        <Text style={[styles.breakdownScore, { color: item.score >= 75 ? COLORS.secondary : item.score >= 55 ? COLORS.primary : COLORS.warning }]}>
                          {item.score}
                        </Text>
                      </View>
                    </View>
                    <ProgressBar value={item.score} color={COLORS.primary} showValue={false} height={6} />
                    <Text style={styles.contributes}>
                      Contributes: <Text style={{ fontWeight: '700', color: COLORS.primary }}>
                        {(item.score * item.weight).toFixed(1)} pts
                      </Text>
                    </Text>
                  </View>
                ))}
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total Industry Readiness Score</Text>
                  <Text style={[styles.totalScore, { color: COLORS.primary }]}>{scores.industryReadinessScore}</Text>
                </View>
              </Card>

              {/* Verified Badges */}
              <SectionHeader title="Verified Skills" icon="checkmark-circle" />
              <Card>
                <Text style={styles.verifiedSub}>Skills with verified credentials carry higher weight</Text>
                <View style={styles.verifiedWrap}>
                  {SKILLS.filter(s => s.verified).map(skill => (
                    <View key={skill.id} style={styles.verifiedChip}>
                      <Ionicons name="checkmark-circle" size={12} color={COLORS.secondary} />
                      <Text style={styles.verifiedName}>{skill.name}</Text>
                    </View>
                  ))}
                </View>
              </Card>
            </View>
          )}

          {/* ── Skill Gaps Tab ── */}
          {activeTab === 'gaps' && (
            <View>
              <Card variant="primary" style={styles.gapInfoCard}>
                <View style={styles.gapInfoRow}>
                  <Ionicons name="flag" size={18} color={COLORS.primary} />
                  <Text style={styles.gapInfoText}>
                    Gaps identified for your <Text style={{ fontWeight: '700' }}>Campus Placement</Text> goal
                  </Text>
                </View>
              </Card>

              {scores.skillGaps.map((gap, idx) => {
                const gapSize = gap.required - gap.current;
                const priorityColor = gap.priority === 'high' ? COLORS.danger : gap.priority === 'medium' ? COLORS.warning : COLORS.info;
                return (
                  <Card key={idx} style={styles.gapCard}>
                    <View style={styles.gapHeader}>
                      <Text style={styles.gapSkill}>{gap.skill}</Text>
                      <View style={[styles.priorityBadge, { backgroundColor: priorityColor + '18' }]}>
                        <Text style={[styles.priorityText, { color: priorityColor }]}>
                          {gap.priority.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <ScoreProgressBar
                      label="Current vs Required"
                      current={gap.current}
                      required={gap.required}
                      color={priorityColor}
                    />
                    <View style={styles.gapFooter}>
                      <Ionicons name="alert-circle-outline" size={13} color={priorityColor} />
                      <Text style={[styles.gapFooterText, { color: priorityColor }]}>
                        Need to improve by {gapSize} points to meet goal requirement
                      </Text>
                    </View>
                  </Card>
                );
              })}

              <Card variant="success" style={styles.gapTip}>
                <View style={styles.tipRow}>
                  <Ionicons name="bulb" size={16} color={COLORS.secondary} />
                  <Text style={styles.tipText}>
                    Focus on high-priority gaps first. Closing the System Design and Behavioral Interview gaps alone could increase your placement probability by ~15 points.
                  </Text>
                </View>
              </Card>
            </View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.base, paddingTop: SPACING.sm, paddingBottom: SPACING.xl },
  backBtn: { marginBottom: SPACING.sm },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SPACING.md },
  headerTitle: { fontSize: FONT_SIZES['2xl'], fontWeight: '800', color: COLORS.white },
  headerSub: { fontSize: FONT_SIZES.sm, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  gaugeWrap: { alignItems: 'center' },
  rankRow: { flexDirection: 'row', gap: SPACING.sm, flexWrap: 'wrap' },
  rankChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: BORDER_RADIUS.full },
  rankText: { fontSize: FONT_SIZES.xs, color: 'rgba(255,255,255,0.9)', fontWeight: '600' },

  tabsRow: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.md, gap: SPACING.sm, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tab: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full, backgroundColor: COLORS.gray100 },
  tabActive: { backgroundColor: COLORS.purple },
  tabText: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textSecondary },
  tabTextActive: { color: COLORS.white },

  scroll: { paddingBottom: SPACING['3xl'] },
  content: { padding: SPACING.base },

  skillRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SPACING.sm },
  skillLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, flex: 1 },
  skillName: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textPrimary },
  skillCat: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, marginTop: 1, textTransform: 'capitalize' },
  skillRight: { flexDirection: 'row', alignItems: 'baseline', gap: 2 },
  skillScore: { fontSize: FONT_SIZES.xl, fontWeight: '800' },
  skillScoreLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary },

  domainCard: { marginBottom: SPACING.base },
  domainTitle: { fontSize: FONT_SIZES.base, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 4 },
  domainRow: { flexDirection: 'row', gap: SPACING.md, alignItems: 'flex-start', marginBottom: SPACING.md },
  domainIcon: { width: 36, height: 36, borderRadius: BORDER_RADIUS.sm, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  domainLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  domainLabel: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textPrimary },
  domainScore: { fontSize: FONT_SIZES.sm, fontWeight: '800' },
  domainTrack: { height: 8, backgroundColor: COLORS.gray100, borderRadius: 4, overflow: 'hidden', marginBottom: 3 },
  domainFill: { height: 8, borderRadius: 4 },
  domainLevel: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary },

  insightCard: { marginBottom: SPACING.base },
  insightRow: { flexDirection: 'row', gap: SPACING.md, alignItems: 'flex-start' },
  insightTitle: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.primaryDark, marginBottom: 2 },
  insightText: { fontSize: FONT_SIZES.xs, color: COLORS.primaryDark, lineHeight: 17 },

  breakdownCard: { marginBottom: SPACING.base },
  breakdownTitle: { fontSize: FONT_SIZES.base, fontWeight: '700', color: COLORS.textPrimary },
  breakdownSub: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, marginBottom: SPACING.md },
  breakdownItem: { marginBottom: SPACING.md, paddingBottom: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  breakdownHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  breakdownLabel: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textPrimary },
  breakdownRight: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  breakdownWeight: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, backgroundColor: COLORS.gray100, paddingHorizontal: 6, paddingVertical: 2, borderRadius: BORDER_RADIUS.full },
  breakdownScore: { fontSize: FONT_SIZES.lg, fontWeight: '800' },
  contributes: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, marginTop: 3 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: SPACING.sm, borderTopWidth: 2, borderTopColor: COLORS.primaryLight },
  totalLabel: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textPrimary },
  totalScore: { fontSize: FONT_SIZES['3xl'], fontWeight: '800' },

  verifiedSub: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, marginBottom: SPACING.md },
  verifiedWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  verifiedChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: COLORS.secondaryBg, paddingHorizontal: 10, paddingVertical: 5, borderRadius: BORDER_RADIUS.full },
  verifiedName: { fontSize: FONT_SIZES.xs, fontWeight: '600', color: COLORS.secondaryDark },

  gapInfoCard: { marginBottom: SPACING.md },
  gapInfoRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  gapInfoText: { fontSize: FONT_SIZES.sm, color: COLORS.primaryDark, flex: 1 },

  gapCard: { marginBottom: SPACING.md },
  gapHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  gapSkill: { fontSize: FONT_SIZES.base, fontWeight: '700', color: COLORS.textPrimary },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: BORDER_RADIUS.full },
  priorityText: { fontSize: FONT_SIZES.xs, fontWeight: '700' },
  gapFooter: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  gapFooterText: { fontSize: FONT_SIZES.xs, fontWeight: '500', flex: 1 },

  gapTip: { marginTop: SPACING.sm },
  tipRow: { flexDirection: 'row', gap: SPACING.md, alignItems: 'flex-start' },
  tipText: { fontSize: FONT_SIZES.xs, color: COLORS.secondaryDark, lineHeight: 17, flex: 1 },
});