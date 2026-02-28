import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { JOB_MARKET_DATA } from '../../constants/mockData';
import Card from '../../components/common/Card';
import SectionHeader from '../../components/common/SectionHeader';

export default function MarketScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('trending');
  const market = JOB_MARKET_DATA;

  const trendIcon = (trend) => trend === 'up' ? 'trending-up' : trend === 'down' ? 'trending-down' : 'remove';
  const trendColor = (trend) => trend === 'up' ? COLORS.secondary : trend === 'down' ? COLORS.danger : COLORS.textTertiary;

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#F59E0B', '#EF4444']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Market Intelligence</Text>
        <Text style={styles.headerSub}>Real-time skill demand & salary insights</Text>
        <View style={styles.headerChips}>
          <View style={styles.headerChip}>
            <Ionicons name="time-outline" size={11} color="rgba(255,255,255,0.85)" />
            <Text style={styles.headerChipText}>Updated: Dec 2024</Text>
          </View>
          <View style={styles.headerChip}>
            <Ionicons name="location-outline" size={11} color="rgba(255,255,255,0.85)" />
            <Text style={styles.headerChipText}>India Tech Market</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
        {[
          { key: 'trending', label: '🔥 Trending Skills' },
          { key: 'salary', label: '💰 Salary Benchmarks' },
          { key: 'insights', label: '💡 Market Insights' },
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

          {/* ── Trending Skills ── */}
          {activeTab === 'trending' && (
            <View>
              <Card variant="warning" style={styles.alertCard}>
                <View style={styles.alertRow}>
                  <Ionicons name="flash" size={16} color={COLORS.warning} />
                  <Text style={styles.alertText}>
                    Generative AI & LLM Engineering are the fastest growing skills (+130-145%). Your Python & ML skills are highly relevant!
                  </Text>
                </View>
              </Card>

              {/* Header Row */}
              <View style={styles.tableHeader}>
                <Text style={[styles.thCell, { flex: 0.5 }]}>#</Text>
                <Text style={[styles.thCell, { flex: 2 }]}>Skill</Text>
                <Text style={styles.thCell}>Demand</Text>
                <Text style={styles.thCell}>Growth</Text>
                <Text style={styles.thCell}>Avg Salary</Text>
              </View>

              {market.trendingSkills.map((item) => (
                <Card key={item.rank} style={styles.skillRow} padding="sm">
                  <View style={styles.skillRowInner}>
                    <View style={[styles.rankBadge, { flex: 0.5 }]}>
                      <Text style={[styles.rankNum, { color: item.rank <= 3 ? COLORS.warning : COLORS.textTertiary }]}>
                        {item.rank <= 3 ? ['🥇', '🥈', '🥉'][item.rank - 1] : item.rank}
                      </Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text style={styles.skillName}>{item.skill}</Text>
                      <View style={styles.demandBar}>
                        <View style={[styles.demandFill, {
                          width: `${item.demandScore}%`,
                          backgroundColor: item.demandScore >= 90 ? COLORS.danger : item.demandScore >= 80 ? COLORS.warning : COLORS.primary,
                        }]} />
                      </View>
                    </View>
                    <Text style={[styles.tdCell, { color: item.demandScore >= 90 ? COLORS.danger : COLORS.primary }]}>
                      {item.demandScore}
                    </Text>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <View style={styles.growthChip}>
                        <Ionicons name={trendIcon(item.trend)} size={10} color={trendColor(item.trend)} />
                        <Text style={[styles.growthText, { color: trendColor(item.trend) }]}>{item.growth}</Text>
                      </View>
                    </View>
                    <Text style={styles.salaryCell}>{item.avgSalary}</Text>
                  </View>
                </Card>
              ))}
            </View>
          )}

          {/* ── Salary Benchmarks ── */}
          {activeTab === 'salary' && (
            <View>
              <Card variant="primary" style={styles.salaryInfoCard}>
                <Text style={styles.salaryInfoText}>
                  Salary ranges for freshers (0-2 years experience) across company tiers. Data sourced from placement records and job portals.
                </Text>
              </Card>

              <View style={styles.tierLegend}>
                {[
                  { tier: 'Tier 1', desc: 'FAANG, Unicorns', color: COLORS.primary },
                  { tier: 'Tier 2', desc: 'MNCs, Mid-caps', color: COLORS.secondary },
                  { tier: 'Tier 3', desc: 'Startups, SMEs', color: COLORS.warning },
                ].map(t => (
                  <View key={t.tier} style={[styles.tierItem, { borderLeftColor: t.color }]}>
                    <Text style={[styles.tierLabel, { color: t.color }]}>{t.tier}</Text>
                    <Text style={styles.tierDesc}>{t.desc}</Text>
                  </View>
                ))}
              </View>

              {market.salaryBenchmarks.map((bench, idx) => (
                <Card key={idx} style={styles.benchCard}>
                  <Text style={styles.benchRole}>{bench.role}</Text>
                  <View style={styles.benchBars}>
                    {[
                      { label: 'T1', value: bench.tier1, color: COLORS.primary },
                      { label: 'T2', value: bench.tier2, color: COLORS.secondary },
                      { label: 'T3', value: bench.tier3, color: COLORS.warning },
                    ].map(b => (
                      <View key={b.label} style={styles.benchBarItem}>
                        <Text style={[styles.benchTierLabel, { color: b.color }]}>{b.label}</Text>
                        <Text style={[styles.benchSalary, { color: b.color }]}>{b.value}</Text>
                      </View>
                    ))}
                  </View>
                </Card>
              ))}
            </View>
          )}

          {/* ── Market Insights ── */}
          {activeTab === 'insights' && (
            <View>
              {[
                {
                  icon: 'trending-up', color: COLORS.secondary,
                  title: 'AI/ML Surge',
                  desc: 'Generative AI roles have grown 145% in 6 months. Students with Python + ML knowledge have 3x more interview calls.',
                  tag: 'Hot Trend',
                },
                {
                  icon: 'cloud', color: COLORS.info,
                  title: 'Cloud Skills Critical',
                  desc: 'AWS & GCP certifications now appear in 68% of job listings. Cloud roles grew 35% YoY with premium salaries.',
                  tag: 'Growing',
                },
                {
                  icon: 'shield', color: COLORS.danger,
                  title: 'Cybersecurity Shortage',
                  desc: 'India faces a 3M+ cybersecurity talent gap. Security engineers command 40% premium over general SWE roles.',
                  tag: 'Opportunity',
                },
                {
                  icon: 'code-slash', color: COLORS.primary,
                  title: 'Full Stack Still King',
                  desc: 'Full stack developers continue to dominate hiring volume. React + Node.js combo appears in 45% of frontend listings.',
                  tag: 'Stable',
                },
                {
                  icon: 'analytics', color: COLORS.purple,
                  title: 'Data Engineering Boom',
                  desc: 'Data engineers earn 20% more than data scientists. SQL + Python + Spark is the winning combo for 2024-25.',
                  tag: 'Rising',
                },
                {
                  icon: 'warning', color: COLORS.warning,
                  title: 'Automation Risk Alert',
                  desc: 'Manual testing, basic data entry, and repetitive coding tasks are seeing 30% decline in hiring. Upskill proactively.',
                  tag: 'Warning',
                },
              ].map((insight, i) => (
                <Card key={i} style={styles.insightCard}>
                  <View style={styles.insightRow}>
                    <View style={[styles.insightIcon, { backgroundColor: insight.color + '18' }]}>
                      <Ionicons name={insight.icon} size={20} color={insight.color} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.insightTitleRow}>
                        <Text style={styles.insightTitle}>{insight.title}</Text>
                        <View style={[styles.insightTag, { backgroundColor: insight.color + '18' }]}>
                          <Text style={[styles.insightTagText, { color: insight.color }]}>{insight.tag}</Text>
                        </View>
                      </View>
                      <Text style={styles.insightDesc}>{insight.desc}</Text>
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
  headerTitle: { fontSize: FONT_SIZES['2xl'], fontWeight: '800', color: COLORS.white },
  headerSub: { fontSize: FONT_SIZES.xs, color: 'rgba(255,255,255,0.8)', marginTop: 2, marginBottom: SPACING.sm },
  headerChips: { flexDirection: 'row', gap: SPACING.sm },
  headerChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: BORDER_RADIUS.full },
  headerChipText: { fontSize: FONT_SIZES.xs, color: 'rgba(255,255,255,0.9)', fontWeight: '600' },

  tabsRow: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.md, gap: SPACING.sm, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tab: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full, backgroundColor: COLORS.gray100 },
  tabActive: { backgroundColor: COLORS.warning },
  tabText: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textSecondary },
  tabTextActive: { color: COLORS.white },

  scroll: { paddingBottom: SPACING['3xl'] },
  content: { padding: SPACING.base },

  alertCard: { marginBottom: SPACING.md },
  alertRow: { flexDirection: 'row', alignItems: 'flex-start', gap: SPACING.sm },
  alertText: { fontSize: FONT_SIZES.xs, color: COLORS.warningDark, flex: 1, lineHeight: 17 },

  tableHeader: { flexDirection: 'row', paddingHorizontal: SPACING.sm, paddingVertical: SPACING.sm, marginBottom: 4 },
  thCell: { flex: 1, fontSize: FONT_SIZES.xs, fontWeight: '700', color: COLORS.textTertiary, textAlign: 'center' },

  skillRow: { marginBottom: 4, overflow: 'hidden' },
  skillRowInner: { flexDirection: 'row', alignItems: 'center' },
  rankBadge: { alignItems: 'center' },
  rankNum: { fontSize: FONT_SIZES.base, fontWeight: '700' },
  skillName: { fontSize: FONT_SIZES.xs, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 3 },
  demandBar: { height: 4, backgroundColor: COLORS.gray100, borderRadius: 2, overflow: 'hidden' },
  demandFill: { height: 4, borderRadius: 2 },
  tdCell: { flex: 1, fontSize: FONT_SIZES.sm, fontWeight: '800', textAlign: 'center' },
  growthChip: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  growthText: { fontSize: 9, fontWeight: '700' },
  salaryCell: { flex: 1, fontSize: 9, color: COLORS.textSecondary, fontWeight: '600', textAlign: 'center' },

  salaryInfoCard: { marginBottom: SPACING.md },
  salaryInfoText: { fontSize: FONT_SIZES.xs, color: COLORS.primaryDark, lineHeight: 17 },
  tierLegend: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.md },
  tierItem: { flex: 1, borderLeftWidth: 3, paddingLeft: SPACING.sm },
  tierLabel: { fontSize: FONT_SIZES.sm, fontWeight: '800' },
  tierDesc: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, marginTop: 1 },
  benchCard: { marginBottom: SPACING.sm },
  benchRole: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.sm },
  benchBars: { flexDirection: 'row', gap: SPACING.base },
  benchBarItem: { flex: 1, alignItems: 'center', backgroundColor: COLORS.gray50, padding: SPACING.sm, borderRadius: BORDER_RADIUS.sm },
  benchTierLabel: { fontSize: FONT_SIZES.xs, fontWeight: '700', marginBottom: 2 },
  benchSalary: { fontSize: FONT_SIZES.xs, fontWeight: '600', textAlign: 'center' },

  insightCard: { marginBottom: SPACING.sm },
  insightRow: { flexDirection: 'row', gap: SPACING.md },
  insightIcon: { width: 44, height: 44, borderRadius: BORDER_RADIUS.md, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  insightTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  insightTitle: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textPrimary, flex: 1 },
  insightTag: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: BORDER_RADIUS.full, marginLeft: SPACING.sm },
  insightTagText: { fontSize: 9, fontWeight: '700' },
  insightDesc: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, lineHeight: 17 },
});