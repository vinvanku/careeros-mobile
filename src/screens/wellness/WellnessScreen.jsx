import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { WELLNESS_DATA } from '../../constants/mockData';
import Card from '../../components/common/Card';
import SectionHeader from '../../components/common/SectionHeader';

export default function WellnessScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const wellness = WELLNESS_DATA;

  const burnoutColors = {
    low: { color: COLORS.secondary, bg: COLORS.secondaryBg, label: 'Low Risk 🌟' },
    medium: { color: COLORS.warning, bg: COLORS.warningBg, label: 'Medium Risk ⚠️' },
    high: { color: COLORS.danger, bg: COLORS.dangerBg, label: 'High Risk 🚨' },
  };
  const burnout = burnoutColors[wellness.burnoutRisk];

  const encouragements = [
    "You're on an 8-day streak! 🔥 Keep the momentum going!",
    "90+ minutes of daily learning puts you in the top 15% of your batch!",
    "Consistent effort beats talent. You're building something great.",
    "Every session counts. Your future self will thank you. 💪",
  ];

  const handleLogActivity = () => {
    setShowLogModal(false);
    setSelectedActivity(null);
    setDuration('');
    setNotes('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#14B8A6', '#6366F1']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Performance & Wellness</Text>
            <Text style={styles.headerSub}>Track consistency, prevent burnout</Text>
          </View>
          <TouchableOpacity style={styles.logBtn} onPress={() => setShowLogModal(true)}>
            <Ionicons name="add-circle" size={16} color={COLORS.white} />
            <Text style={styles.logBtnText}>Log Activity</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerMetrics}>
          <View style={styles.hMetric}>
            <Text style={styles.hMetricVal}>🔥 {wellness.currentStreak}</Text>
            <Text style={styles.hMetricLabel}>Day Streak</Text>
          </View>
          <View style={styles.hMetricDivider} />
          <View style={styles.hMetric}>
            <Text style={styles.hMetricVal}>{wellness.consistencyScore}</Text>
            <Text style={styles.hMetricLabel}>Consistency</Text>
          </View>
          <View style={styles.hMetricDivider} />
          <View style={styles.hMetric}>
            <Text style={styles.hMetricVal}>{wellness.activeDaysThisMonth}/{wellness.totalDaysThisMonth}</Text>
            <Text style={styles.hMetricLabel}>Active Days</Text>
          </View>
          <View style={styles.hMetricDivider} />
          <View style={styles.hMetric}>
            <Text style={styles.hMetricVal}>{wellness.avgDailyMinutes}m</Text>
            <Text style={styles.hMetricLabel}>Avg/Day</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
        {[
          { key: 'dashboard', label: '📊 Dashboard' },
          { key: 'activities', label: '📋 Activities' },
          { key: 'insights', label: '💡 Insights' },
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

          {/* ── Dashboard ── */}
          {activeTab === 'dashboard' && (
            <View>
              {/* Encouragement Banner */}
              <Card variant="success" style={styles.encourageCard}>
                <View style={styles.encourageRow}>
                  <Text style={styles.encourageEmoji}>💬</Text>
                  <Text style={styles.encourageText}>{encouragements[0]}</Text>
                </View>
              </Card>

              {/* Burnout Risk */}
              <Card style={[styles.burnoutCard, { borderLeftColor: burnout.color }]}>
                <View style={styles.burnoutRow}>
                  <View style={[styles.burnoutIcon, { backgroundColor: burnout.bg }]}>
                    <Ionicons name="heart-circle" size={24} color={burnout.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.burnoutTitle}>Burnout Risk Level</Text>
                    <Text style={[styles.burnoutStatus, { color: burnout.color }]}>{burnout.label}</Text>
                    <Text style={styles.burnoutDesc}>
                      {wellness.burnoutRisk === 'low'
                        ? 'Great consistency! Activity levels are healthy and sustainable.'
                        : wellness.burnoutRisk === 'medium'
                        ? 'Activity has dipped recently. Consider reviewing your schedule.'
                        : 'Significant activity drop detected. Take a short break and reset.'}
                    </Text>
                  </View>
                </View>
              </Card>

              {/* Weekly Activity Chart */}
              <SectionHeader title="This Week's Activity" icon="bar-chart" />
              <Card style={styles.weeklyCard}>
                <View style={styles.weeklyChart}>
                  {wellness.weeklyActivity.map(day => {
                    const maxM = 180;
                    const barH = Math.max((day.minutes / maxM) * 90, 5);
                    const isGood = day.minutes >= 60;
                    return (
                      <View key={day.day} style={styles.weeklyBarCol}>
                        <Text style={styles.weeklyMinutes}>{day.minutes > 0 ? `${day.minutes}m` : ''}</Text>
                        <View style={styles.weeklyBarTrack}>
                          <View style={[styles.weeklyBarFill, {
                            height: barH,
                            backgroundColor: isGood ? COLORS.primary : COLORS.gray200,
                          }]} />
                        </View>
                        <Text style={[styles.weeklyDayLabel, { color: isGood ? COLORS.textPrimary : COLORS.textTertiary }]}>
                          {day.day.slice(0, 3)}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <View style={styles.weeklyLegend}>
                  <View style={styles.legendDot} />
                  <Text style={styles.legendText}>Active (≥60 min)</Text>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.gray200 }]} />
                  <Text style={styles.legendText}>Light (&lt;60 min)</Text>
                </View>
              </Card>

              {/* Streak Info */}
              <SectionHeader title="Streak Progress" icon="flame" />
              <Card style={styles.streakCard}>
                <View style={styles.streakRow}>
                  <View style={styles.streakItem}>
                    <Text style={styles.streakNum}>🔥 {wellness.currentStreak}</Text>
                    <Text style={styles.streakLabel}>Current Streak</Text>
                  </View>
                  <View style={styles.streakDivider} />
                  <View style={styles.streakItem}>
                    <Text style={styles.streakNum}>⭐ {wellness.longestStreak}</Text>
                    <Text style={styles.streakLabel}>Best Streak</Text>
                  </View>
                </View>
                {/* Streak milestones */}
                <View style={styles.milestonesRow}>
                  {[7, 14, 21, 30].map(m => (
                    <View key={m} style={[styles.milestoneChip, {
                      backgroundColor: wellness.currentStreak >= m ? COLORS.primaryBg : COLORS.gray50,
                      borderColor: wellness.currentStreak >= m ? COLORS.primaryLight : COLORS.border,
                    }]}>
                      {wellness.currentStreak >= m
                        ? <Ionicons name="checkmark-circle" size={14} color={COLORS.primary} />
                        : <Ionicons name="lock-closed-outline" size={12} color={COLORS.gray300} />
                      }
                      <Text style={[styles.milestoneText, { color: wellness.currentStreak >= m ? COLORS.primaryDark : COLORS.gray400 }]}>
                        {m}d
                      </Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.streakNext}>
                  {wellness.currentStreak < 14
                    ? `${14 - wellness.currentStreak} more days to unlock the 14-day badge! 🏅`
                    : `Amazing! You've unlocked the ${wellness.currentStreak >= 30 ? '30' : '21'}-day badge! 🏆`}
                </Text>
              </Card>
            </View>
          )}

          {/* ── Activities ── */}
          {activeTab === 'activities' && (
            <View>
              <TouchableOpacity style={styles.logActivityBtn} onPress={() => setShowLogModal(true)}>
                <Ionicons name="add-circle-outline" size={18} color={COLORS.primary} />
                <Text style={styles.logActivityBtnText}>Log Today's Activity</Text>
              </TouchableOpacity>

              <SectionHeader title="Recent Activities" icon="time" />
              {wellness.recentActivities.map(act => {
                const typeInfo = wellness.activityTypes.find(t => t.id === act.type) || wellness.activityTypes[7];
                return (
                  <Card key={act.id} style={styles.actCard}>
                    <View style={styles.actRow}>
                      <View style={[styles.actIcon, { backgroundColor: typeInfo.color + '18' }]}>
                        <Ionicons name={typeInfo.icon} size={18} color={typeInfo.color} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <View style={styles.actTitleRow}>
                          <Text style={styles.actLabel}>{act.label}</Text>
                          <View style={styles.actDurationBadge}>
                            <Ionicons name="time-outline" size={10} color={COLORS.primary} />
                            <Text style={styles.actDuration}>{act.duration}m</Text>
                          </View>
                        </View>
                        <Text style={styles.actNotes}>{act.notes}</Text>
                        <Text style={styles.actDate}>{act.date}</Text>
                      </View>
                    </View>
                  </Card>
                );
              })}

              {/* Activity Types */}
              <SectionHeader title="Log New Activity" icon="create" style={{ marginTop: SPACING.base }} />
              <View style={styles.actTypesGrid}>
                {wellness.activityTypes.map(type => (
                  <TouchableOpacity
                    key={type.id}
                    style={[styles.actTypeCard, { borderColor: type.color + '44' }]}
                    onPress={() => { setSelectedActivity(type); setShowLogModal(true); }}
                  >
                    <View style={[styles.actTypeIcon, { backgroundColor: type.color + '18' }]}>
                      <Ionicons name={type.icon} size={20} color={type.color} />
                    </View>
                    <Text style={styles.actTypeLabel}>{type.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* ── Insights ── */}
          {activeTab === 'insights' && (
            <View>
              {/* Productivity Report */}
              <Card style={styles.reportCard}>
                <Text style={styles.reportTitle}>📈 Weekly Productivity Report</Text>
                <View style={styles.reportGrid}>
                  {[
                    { label: 'Total Study Time', value: `${wellness.weeklyActivity.reduce((a, d) => a + d.minutes, 0)} min`, icon: 'time', color: COLORS.primary },
                    { label: 'Active Days', value: `${wellness.weeklyActivity.filter(d => d.minutes >= 30).length}/7`, icon: 'calendar', color: COLORS.secondary },
                    { label: 'Best Day', value: 'Saturday', icon: 'trophy', color: COLORS.warning },
                    { label: 'Avg/Active Day', value: `${Math.round(wellness.weeklyActivity.reduce((a,d)=>a+d.minutes,0)/wellness.weeklyActivity.filter(d=>d.minutes>0).length)}m`, icon: 'analytics', color: COLORS.purple },
                  ].map((item, i) => (
                    <View key={i} style={styles.reportItem}>
                      <View style={[styles.reportIcon, { backgroundColor: item.color + '18' }]}>
                        <Ionicons name={item.icon} size={16} color={item.color} />
                      </View>
                      <Text style={[styles.reportValue, { color: item.color }]}>{item.value}</Text>
                      <Text style={styles.reportLabel}>{item.label}</Text>
                    </View>
                  ))}
                </View>
              </Card>

              {/* AI Insights */}
              {[
                {
                  icon: 'bulb', color: COLORS.primary,
                  title: 'Peak Productivity Days',
                  desc: 'You study most on Saturdays (180min) and Thursdays (150min). Consider scheduling your hardest tasks on these days for maximum output.',
                },
                {
                  icon: 'trending-up', color: COLORS.secondary,
                  title: 'Consistency Improvement',
                  desc: 'Your 8-day streak is your second longest! You typically drop off on Sundays. Adding even 20 minutes on Sundays would boost your consistency score by 8 points.',
                },
                {
                  icon: 'heart', color: COLORS.danger,
                  title: 'Wellness Tip',
                  desc: 'You\'ve been averaging 95 min/day. Studies show 90-120 min of focused study with breaks is optimal. You\'re in the perfect zone!',
                },
                {
                  icon: 'flash', color: COLORS.warning,
                  title: 'Upcoming Milestone',
                  desc: 'Just 6 more days of activity to reach your longest streak record of 21 days. You\'re in the final stretch!',
                },
              ].map((insight, i) => (
                <Card key={i} style={styles.insightCard}>
                  <View style={styles.insightRow}>
                    <View style={[styles.insightIcon, { backgroundColor: insight.color + '18' }]}>
                      <Ionicons name={insight.icon} size={18} color={insight.color} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.insightTitle}>{insight.title}</Text>
                      <Text style={styles.insightDesc}>{insight.desc}</Text>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Log Activity Modal */}
      <Modal visible={showLogModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Log Activity</Text>
              <TouchableOpacity onPress={() => setShowLogModal(false)}>
                <Ionicons name="close-circle" size={24} color={COLORS.textTertiary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>Activity Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.actTypeScroll}>
              <View style={styles.actTypeScrollRow}>
                {wellness.activityTypes.map(type => (
                  <TouchableOpacity
                    key={type.id}
                    style={[styles.actTypeChip, selectedActivity?.id === type.id && { backgroundColor: type.color, borderColor: type.color }]}
                    onPress={() => setSelectedActivity(type)}
                  >
                    <Ionicons name={type.icon} size={14} color={selectedActivity?.id === type.id ? COLORS.white : type.color} />
                    <Text style={[styles.actTypeChipText, selectedActivity?.id === type.id && { color: COLORS.white }]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <Text style={styles.modalLabel}>Duration (minutes)</Text>
            <TextInput
              style={styles.modalInput}
              value={duration}
              onChangeText={setDuration}
              placeholder="e.g. 90"
              keyboardType="numeric"
              placeholderTextColor={COLORS.textTertiary}
            />

            <Text style={styles.modalLabel}>Notes (optional)</Text>
            <TextInput
              style={[styles.modalInput, styles.modalTextArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="What did you work on today?"
              placeholderTextColor={COLORS.textTertiary}
              multiline
              numberOfLines={3}
            />

            <TouchableOpacity
              style={[styles.logSubmitBtn, (!selectedActivity || !duration) && styles.logSubmitBtnDisabled]}
              onPress={handleLogActivity}
              disabled={!selectedActivity || !duration}
            >
              <Ionicons name="checkmark-circle" size={16} color={COLORS.white} />
              <Text style={styles.logSubmitText}>Log Activity</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.base, paddingTop: SPACING.sm, paddingBottom: SPACING.xl },
  backBtn: { marginBottom: SPACING.sm },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: SPACING.md },
  headerTitle: { fontSize: FONT_SIZES['2xl'], fontWeight: '800', color: COLORS.white },
  headerSub: { fontSize: FONT_SIZES.xs, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  logBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: SPACING.sm, paddingVertical: 6, borderRadius: BORDER_RADIUS.full },
  logBtnText: { fontSize: FONT_SIZES.xs, color: COLORS.white, fontWeight: '600' },
  headerMetrics: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: BORDER_RADIUS.lg, overflow: 'hidden' },
  hMetric: { flex: 1, alignItems: 'center', paddingVertical: SPACING.md },
  hMetricVal: { fontSize: FONT_SIZES.base, fontWeight: '800', color: COLORS.white },
  hMetricLabel: { fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  hMetricDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },

  tabsRow: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.md, gap: SPACING.sm, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tab: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full, backgroundColor: COLORS.gray100 },
  tabActive: { backgroundColor: '#14B8A6' },
  tabText: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textSecondary },
  tabTextActive: { color: COLORS.white },

  scroll: { paddingBottom: SPACING['3xl'] },
  content: { padding: SPACING.base },

  encourageCard: { marginBottom: SPACING.md },
  encourageRow: { flexDirection: 'row', gap: SPACING.sm, alignItems: 'flex-start' },
  encourageEmoji: { fontSize: 20 },
  encourageText: { fontSize: FONT_SIZES.sm, color: COLORS.secondaryDark, lineHeight: 20, flex: 1, fontWeight: '500' },

  burnoutCard: { marginBottom: SPACING.lg, backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, padding: SPACING.base, borderLeftWidth: 4, ...SHADOWS.md },
  burnoutRow: { flexDirection: 'row', gap: SPACING.md, alignItems: 'flex-start' },
  burnoutIcon: { width: 44, height: 44, borderRadius: BORDER_RADIUS.md, alignItems: 'center', justifyContent: 'center' },
  burnoutTitle: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, fontWeight: '500' },
  burnoutStatus: { fontSize: FONT_SIZES.lg, fontWeight: '800', marginTop: 2 },
  burnoutDesc: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, lineHeight: 17, marginTop: 3 },

  weeklyCard: { marginBottom: SPACING.lg },
  weeklyChart: { flexDirection: 'row', alignItems: 'flex-end', height: 120, gap: SPACING.xs, marginBottom: SPACING.sm },
  weeklyBarCol: { flex: 1, alignItems: 'center', gap: 4 },
  weeklyMinutes: { fontSize: 8, color: COLORS.textTertiary, fontWeight: '600', height: 12 },
  weeklyBarTrack: { flex: 1, width: '70%', backgroundColor: COLORS.gray100, borderRadius: 4, justifyContent: 'flex-end', overflow: 'hidden' },
  weeklyBarFill: { width: '100%', borderRadius: 4 },
  weeklyDayLabel: { fontSize: FONT_SIZES.xs, fontWeight: '600' },
  weeklyLegend: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, justifyContent: 'center' },
  legendDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary },
  legendText: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary },

  streakCard: { marginBottom: SPACING.lg },
  streakRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md },
  streakItem: { flex: 1, alignItems: 'center' },
  streakNum: { fontSize: FONT_SIZES['2xl'], fontWeight: '800', color: COLORS.textPrimary },
  streakLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, marginTop: 2 },
  streakDivider: { width: 1, height: 40, backgroundColor: COLORS.border },
  milestonesRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.sm },
  milestoneChip: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.md, borderWidth: 1 },
  milestoneText: { fontSize: FONT_SIZES.xs, fontWeight: '700' },
  streakNext: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 17 },

  logActivityBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, backgroundColor: COLORS.primaryBg, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.md, borderWidth: 1.5, borderColor: COLORS.primaryLight, marginBottom: SPACING.base },
  logActivityBtnText: { fontSize: FONT_SIZES.base, color: COLORS.primary, fontWeight: '600' },

  actCard: { marginBottom: SPACING.sm },
  actRow: { flexDirection: 'row', gap: SPACING.md },
  actIcon: { width: 42, height: 42, borderRadius: BORDER_RADIUS.md, alignItems: 'center', justifyContent: 'center' },
  actTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  actLabel: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textPrimary },
  actDurationBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: COLORS.primaryBg, paddingHorizontal: 6, paddingVertical: 2, borderRadius: BORDER_RADIUS.full },
  actDuration: { fontSize: FONT_SIZES.xs, color: COLORS.primary, fontWeight: '700' },
  actNotes: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, lineHeight: 16, marginBottom: 2 },
  actDate: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary },

  actTypesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  actTypeCard: { width: '47%', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, alignItems: 'center', borderWidth: 1, ...SHADOWS.sm },
  actTypeIcon: { width: 40, height: 40, borderRadius: BORDER_RADIUS.md, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.sm },
  actTypeLabel: { fontSize: FONT_SIZES.xs, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center' },

  reportCard: { marginBottom: SPACING.md },
  reportTitle: { fontSize: FONT_SIZES.base, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.md },
  reportGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  reportItem: { width: '47%', backgroundColor: COLORS.gray50, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, alignItems: 'center' },
  reportIcon: { width: 32, height: 32, borderRadius: BORDER_RADIUS.sm, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.sm },
  reportValue: { fontSize: FONT_SIZES.lg, fontWeight: '800' },
  reportLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, textAlign: 'center', marginTop: 2 },

  insightCard: { marginBottom: SPACING.sm },
  insightRow: { flexDirection: 'row', gap: SPACING.md },
  insightIcon: { width: 40, height: 40, borderRadius: BORDER_RADIUS.md, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  insightTitle: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 2 },
  insightDesc: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, lineHeight: 17 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: COLORS.surface, borderTopLeftRadius: BORDER_RADIUS['2xl'], borderTopRightRadius: BORDER_RADIUS['2xl'], padding: SPACING.xl, paddingBottom: SPACING['3xl'] },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg },
  modalTitle: { fontSize: FONT_SIZES.xl, fontWeight: '800', color: COLORS.textPrimary },
  modalLabel: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textPrimary, marginBottom: SPACING.sm, marginTop: SPACING.md },
  actTypeScroll: { marginBottom: SPACING.sm },
  actTypeScrollRow: { flexDirection: 'row', gap: SPACING.sm, paddingBottom: SPACING.sm },
  actTypeChip: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full, borderWidth: 1.5, borderColor: COLORS.border, backgroundColor: COLORS.surface },
  actTypeChipText: { fontSize: FONT_SIZES.xs, fontWeight: '600', color: COLORS.textSecondary },
  modalInput: { borderWidth: 1.5, borderColor: COLORS.border, borderRadius: BORDER_RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, fontSize: FONT_SIZES.base, color: COLORS.textPrimary, backgroundColor: COLORS.gray50 },
  modalTextArea: { height: 80, textAlignVertical: 'top' },
  logSubmitBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, backgroundColor: COLORS.primary, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.md, marginTop: SPACING.lg },
  logSubmitBtnDisabled: { opacity: 0.5 },
  logSubmitText: { fontSize: FONT_SIZES.base, color: COLORS.white, fontWeight: '700' },
});
