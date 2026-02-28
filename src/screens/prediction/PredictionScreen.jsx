import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { PLACEMENT_PREDICTION } from '../../constants/mockData';
import Card from '../../components/common/Card';
import ScoreGauge from '../../components/common/ScoreGauge';
import { TierBadge } from '../../components/common/Badge';
import SectionHeader from '../../components/common/SectionHeader';

export default function PredictionScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('overview');
  const pred = PLACEMENT_PREDICTION;

  const priorityColor = (p) => p === 'high' ? COLORS.danger : p === 'medium' ? COLORS.warning : COLORS.info;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <LinearGradient colors={['#10B981', '#6366F1']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Placement Prediction</Text>
            <Text style={styles.headerSub}>AI-powered analysis based on your profile</Text>
          </View>
          <ScoreGauge score={pred.predictionScore} size={90} label="Probability" strokeWidth={8} />
        </View>
        <View style={styles.headerChips}>
          <View style={styles.chip}>
            <Ionicons name="cash-outline" size={12} color="rgba(255,255,255,0.9)" />
            <Text style={styles.chipText}>{pred.predictedSalaryBand}</Text>
          </View>
          <View style={styles.chip}>
            <Ionicons name="business-outline" size={12} color="rgba(255,255,255,0.9)" />
            <Text style={styles.chipText}>Expected: Tier 2</Text>
          </View>
          <View style={styles.chip}>
            <Ionicons name="star-outline" size={12} color="rgba(255,255,255,0.9)" />
            <Text style={styles.chipText}>Interview Ready: {pred.interviewReadinessScore}%</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'companies', label: 'Company Matches' },
          { key: 'factors', label: 'Factors' },
          { key: 'recommendations', label: 'Action Plan' },
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

          {/* ── Overview ── */}
          {activeTab === 'overview' && (
            <View>
              {/* Main Score Card */}
              <Card style={styles.scoreCard}>
                <View style={styles.scoreCardRow}>
                  <View style={styles.scoreMainBlock}>
                    <Text style={styles.scoreMainValue}>{pred.predictionScore}%</Text>
                    <Text style={styles.scoreMainLabel}>Placement Probability</Text>
                    <View style={styles.scoreTrack}>
                      <View style={[styles.scoreFill, { width: `${pred.predictionScore}%`, backgroundColor: pred.predictionScore >= 70 ? COLORS.secondary : pred.predictionScore >= 50 ? COLORS.warning : COLORS.danger }]} />
                    </View>
                  </View>
                  <View style={styles.scoreMiniStats}>
                    <View style={styles.scoreMiniItem}>
                      <Text style={[styles.scoreMiniVal, { color: COLORS.primary }]}>{pred.interviewReadinessScore}%</Text>
                      <Text style={styles.scoreMiniLabel}>Interview Ready</Text>
                    </View>
                    <View style={styles.scoreMiniDivider} />
                    <View style={styles.scoreMiniItem}>
                      <Text style={[styles.scoreMiniVal, { color: COLORS.secondary }]}>{pred.predictedSalaryBand}</Text>
                      <Text style={styles.scoreMiniLabel}>Expected CTC</Text>
                    </View>
                  </View>
                </View>
              </Card>

              {/* Strengths & Weaknesses */}
              <View style={styles.swRow}>
                <Card style={[styles.swCard, { flex: 1 }]} variant="success">
                  <Text style={styles.swTitle}>💪 Strengths</Text>
                  {pred.strongAreas.map((a, i) => (
                    <View key={i} style={styles.swItem}>
                      <Ionicons name="checkmark-circle" size={12} color={COLORS.secondary} />
                      <Text style={styles.swItemText}>{a}</Text>
                    </View>
                  ))}
                </Card>
                <Card style={[styles.swCard, { flex: 1 }]} variant="warning">
                  <Text style={styles.swTitle}>⚠️ Weak Areas</Text>
                  {pred.weakAreas.map((a, i) => (
                    <View key={i} style={styles.swItem}>
                      <Ionicons name="alert-circle" size={12} color={COLORS.warning} />
                      <Text style={styles.swItemText}>{a}</Text>
                    </View>
                  ))}
                </Card>
              </View>

              {/* Interview Readiness Breakdown */}
              <SectionHeader title="Interview Readiness" icon="mic" />
              <Card>
                {[
                  { label: 'Technical / DSA', score: 78, color: COLORS.primary },
                  { label: 'System Design', score: 55, color: COLORS.warning },
                  { label: 'Behavioral / HR', score: 62, color: COLORS.info },
                  { label: 'Problem Solving', score: 84, color: COLORS.secondary },
                  { label: 'Communication', score: 72, color: COLORS.purple },
                ].map((item, i) => (
                  <View key={i} style={[styles.readinessItem, i > 0 && styles.readinessItemBorder]}>
                    <Text style={styles.readinessLabel}>{item.label}</Text>
                    <View style={styles.readinessRight}>
                      <View style={styles.readinessTrack}>
                        <View style={[styles.readinessFill, { width: `${item.score}%`, backgroundColor: item.color }]} />
                      </View>
                      <Text style={[styles.readinessScore, { color: item.color }]}>{item.score}</Text>
                    </View>
                  </View>
                ))}
              </Card>
            </View>
          )}

          {/* ── Company Matches ── */}
          {activeTab === 'companies' && (
            <View>
              <Card variant="primary" style={styles.companyInfoCard}>
                <Text style={styles.companyInfoText}>
                  Companies ranked by probability based on your current profile. Improving skill gaps can unlock higher-tier companies.
                </Text>
              </Card>
              {pred.companyMatches.map((match, idx) => (
                <Card key={idx} style={styles.companyCard}>
                  <View style={styles.companyRow}>
                    <View style={[styles.companyIconBox, { backgroundColor: match.tier === 'tier1' ? COLORS.primaryBg : COLORS.secondaryBg }]}>
                      <Ionicons name="business" size={22} color={match.tier === 'tier1' ? COLORS.primary : COLORS.secondary} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.companyNameRow}>
                        <Text style={styles.companyName}>{match.company}</Text>
                        <TierBadge tier={match.tier} />
                      </View>
                      <Text style={styles.companyPackage}>Expected: {match.package}</Text>
                    </View>
                    <View style={styles.probCircle}>
                      <Text style={[styles.probValue, { color: match.probability >= 70 ? COLORS.secondary : match.probability >= 50 ? COLORS.warning : COLORS.danger }]}>
                        {match.probability}%
                      </Text>
                      <Text style={styles.probLabel}>chance</Text>
                    </View>
                  </View>
                  <View style={styles.probTrack}>
                    <View style={[styles.probFill, {
                      width: `${match.probability}%`,
                      backgroundColor: match.probability >= 70 ? COLORS.secondary : match.probability >= 50 ? COLORS.warning : COLORS.danger
                    }]} />
                  </View>
                </Card>
              ))}
            </View>
          )}

          {/* ── Factors ── */}
          {activeTab === 'factors' && (
            <View>
              <SectionHeader title="Positive Factors" icon="trending-up" />
              {pred.factors.positive.map((f, i) => (
                <Card key={i} style={styles.factorCard} variant="success">
                  <View style={styles.factorRow}>
                    <View style={styles.factorIcon}>
                      <Ionicons name="arrow-up-circle" size={20} color={COLORS.secondary} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.factorTitleRow}>
                        <Text style={styles.factorTitle}>{f.factor}</Text>
                        <Text style={[styles.factorImpact, { color: COLORS.secondary }]}>{f.impact}</Text>
                      </View>
                      <Text style={styles.factorDesc}>{f.description}</Text>
                    </View>
                  </View>
                </Card>
              ))}

              <SectionHeader title="Negative Factors" icon="trending-down" style={{ marginTop: SPACING.md }} />
              {pred.factors.negative.map((f, i) => (
                <Card key={i} style={styles.factorCard} variant="danger">
                  <View style={styles.factorRow}>
                    <View style={styles.factorIcon}>
                      <Ionicons name="arrow-down-circle" size={20} color={COLORS.danger} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.factorTitleRow}>
                        <Text style={styles.factorTitle}>{f.factor}</Text>
                        <Text style={[styles.factorImpact, { color: COLORS.danger }]}>{f.impact}</Text>
                      </View>
                      <Text style={styles.factorDesc}>{f.description}</Text>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}

          {/* ── Recommendations / Action Plan ── */}
          {activeTab === 'recommendations' && (
            <View>
              <Card variant="primary" style={styles.actionBannerCard}>
                <View style={styles.actionBannerRow}>
                  <Ionicons name="rocket" size={22} color={COLORS.primary} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.actionBannerTitle}>Your Personalized Action Plan</Text>
                    <Text style={styles.actionBannerSub}>
                      Follow these steps to increase your placement probability from 78% to 90%+
                    </Text>
                  </View>
                </View>
              </Card>
              {pred.recommendations.map((rec, i) => (
                <Card key={i} style={styles.recCard}>
                  <View style={styles.recRow}>
                    <View style={styles.recNumberBox}>
                      <Text style={styles.recNumber}>{i + 1}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.recTitleRow}>
                        <Text style={styles.recArea}>{rec.area}</Text>
                        <View style={[styles.recPriority, { backgroundColor: priorityColor(rec.priority) + '18' }]}>
                          <Text style={[styles.recPriorityText, { color: priorityColor(rec.priority) }]}>
                            {rec.priority.toUpperCase()}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.recAction}>{rec.action}</Text>
                    </View>
                  </View>
                </Card>
              ))}
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
  headerSub: { fontSize: FONT_SIZES.xs, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  headerChips: { flexDirection: 'row', gap: SPACING.sm, flexWrap: 'wrap' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: BORDER_RADIUS.full },
  chipText: { fontSize: FONT_SIZES.xs, color: 'rgba(255,255,255,0.9)', fontWeight: '600' },

  tabsRow: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.md, gap: SPACING.sm, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tab: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full, backgroundColor: COLORS.gray100 },
  tabActive: { backgroundColor: COLORS.secondary },
  tabText: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textSecondary },
  tabTextActive: { color: COLORS.white },

  scroll: { paddingBottom: SPACING['3xl'] },
  content: { padding: SPACING.base },

  scoreCard: { marginBottom: SPACING.md },
  scoreCardRow: { gap: SPACING.md },
  scoreMainBlock: {},
  scoreMainValue: { fontSize: FONT_SIZES['6xl'], fontWeight: '800', color: COLORS.secondary },
  scoreMainLabel: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginBottom: SPACING.sm },
  scoreTrack: { height: 10, backgroundColor: COLORS.gray100, borderRadius: 5, overflow: 'hidden' },
  scoreFill: { height: 10, borderRadius: 5 },
  scoreMiniStats: { flexDirection: 'row', backgroundColor: COLORS.gray50, borderRadius: BORDER_RADIUS.md, overflow: 'hidden', marginTop: SPACING.md },
  scoreMiniItem: { flex: 1, alignItems: 'center', paddingVertical: SPACING.sm },
  scoreMiniVal: { fontSize: FONT_SIZES.base, fontWeight: '800' },
  scoreMiniLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, marginTop: 2 },
  scoreMiniDivider: { width: 1, backgroundColor: COLORS.border },

  swRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.lg },
  swCard: { padding: SPACING.md },
  swTitle: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.sm },
  swItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 5, marginBottom: 5 },
  swItemText: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, flex: 1, lineHeight: 16 },

  readinessItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.sm },
  readinessItemBorder: { borderTopWidth: 1, borderTopColor: COLORS.borderLight },
  readinessLabel: { fontSize: FONT_SIZES.sm, color: COLORS.textPrimary, flex: 1, fontWeight: '500' },
  readinessRight: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  readinessTrack: { width: 80, height: 6, backgroundColor: COLORS.gray100, borderRadius: 3, overflow: 'hidden' },
  readinessFill: { height: 6, borderRadius: 3 },
  readinessScore: { fontSize: FONT_SIZES.sm, fontWeight: '800', minWidth: 28, textAlign: 'right' },

  companyInfoCard: { marginBottom: SPACING.md },
  companyInfoText: { fontSize: FONT_SIZES.xs, color: COLORS.primaryDark, lineHeight: 17 },
  companyCard: { marginBottom: SPACING.sm },
  companyRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginBottom: SPACING.sm },
  companyIconBox: { width: 44, height: 44, borderRadius: BORDER_RADIUS.md, alignItems: 'center', justifyContent: 'center' },
  companyNameRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: 2 },
  companyName: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textPrimary },
  companyPackage: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary },
  probCircle: { alignItems: 'center' },
  probValue: { fontSize: FONT_SIZES.xl, fontWeight: '800' },
  probLabel: { fontSize: 9, color: COLORS.textTertiary },
  probTrack: { height: 5, backgroundColor: COLORS.gray100, borderRadius: 3, overflow: 'hidden' },
  probFill: { height: 5, borderRadius: 3 },

  factorCard: { marginBottom: SPACING.sm },
  factorRow: { flexDirection: 'row', alignItems: 'flex-start', gap: SPACING.md },
  factorIcon: { marginTop: 2 },
  factorTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  factorTitle: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textPrimary },
  factorImpact: { fontSize: FONT_SIZES.sm, fontWeight: '800' },
  factorDesc: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, lineHeight: 17 },

  actionBannerCard: { marginBottom: SPACING.md },
  actionBannerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: SPACING.md },
  actionBannerTitle: { fontSize: FONT_SIZES.base, fontWeight: '700', color: COLORS.primaryDark },
  actionBannerSub: { fontSize: FONT_SIZES.xs, color: COLORS.primaryDark, marginTop: 2, lineHeight: 17 },
  recCard: { marginBottom: SPACING.sm },
  recRow: { flexDirection: 'row', gap: SPACING.md },
  recNumberBox: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.primaryBg, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  recNumber: { fontSize: FONT_SIZES.sm, fontWeight: '800', color: COLORS.primary },
  recTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  recArea: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textPrimary, flex: 1 },
  recPriority: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: BORDER_RADIUS.full, marginLeft: SPACING.sm },
  recPriorityText: { fontSize: 9, fontWeight: '700' },
  recAction: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, lineHeight: 17 },
});