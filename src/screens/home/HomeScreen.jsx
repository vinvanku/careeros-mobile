import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import {
  STUDENT_PROFILE, PLACEMENT_PREDICTION, CAREER_ROADMAP,
  SKILL_SCORES, WELLNESS_DATA, NOTIFICATIONS,
} from '../../constants/mockData';
import Card from '../../components/common/Card';
import { MiniGauge } from '../../components/common/ScoreGauge';
import ProgressBar from '../../components/common/ProgressBar';
import SectionHeader from '../../components/common/SectionHeader';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [unreadCount] = useState(NOTIFICATIONS.filter(n => !n.read).length);
  const profile = STUDENT_PROFILE;
  const prediction = PLACEMENT_PREDICTION;
  const roadmap = CAREER_ROADMAP;
  const wellness = WELLNESS_DATA;
  const skills = SKILL_SCORES;

  const currentMilestone = roadmap.milestones.find(m => m.status === 'in_progress');
  const nextMilestone = roadmap.milestones.find(m => m.status === 'pending');

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const goalLabels = {
    placement: 'Campus Placement',
    gate: 'GATE Exam',
    gre: 'GRE',
    cat: 'CAT',
    startup: 'Startup',
    research: 'Research',
    govt: 'Government Job',
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Header ── */}
        <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>{getGreeting()} 👋</Text>
              <Text style={styles.userName}>{profile.name.split(' ')[0]}</Text>
              <Text style={styles.subInfo}>{profile.auId} • Sem {profile.currentSemester}</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.notifBtn}
                onPress={() => navigation.navigate('Notifications')}
              >
                <Ionicons name="notifications-outline" size={22} color={COLORS.white} />
                {unreadCount > 0 && (
                  <View style={styles.notifBadge}>
                    <Text style={styles.notifBadgeText}>{unreadCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.avatarBtn}
                onPress={() => navigation.navigate('Profile')}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {profile.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Goal Badge */}
          <View style={styles.goalBadge}>
            <Ionicons name="flag" size={12} color="rgba(255,255,255,0.9)" />
            <Text style={styles.goalBadgeText}>Goal: {goalLabels[profile.careerGoal]}</Text>
          </View>
        </LinearGradient>

        {/* ── Quick Stats Row ── */}
        <View style={styles.statsRow}>
          {[
            { label: 'CGPA', value: profile.cgpa.toFixed(1), icon: 'school', color: COLORS.primary },
            { label: 'Skill Score', value: skills.industryReadinessScore, icon: 'code-slash', color: COLORS.purple },
            { label: 'Prediction', value: `${prediction.predictionScore}%`, icon: 'analytics', color: COLORS.secondary },
            { label: 'Streak', value: `${wellness.currentStreak}d`, icon: 'flame', color: COLORS.warning },
          ].map(stat => (
            <TouchableOpacity key={stat.label} style={styles.quickStatCard} activeOpacity={0.85}>
              <View style={[styles.quickStatIcon, { backgroundColor: stat.color + '18' }]}>
                <Ionicons name={stat.icon} size={16} color={stat.color} />
              </View>
              <Text style={[styles.quickStatValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.quickStatLabel}>{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.content}>

          {/* ── Placement Prediction Card ── */}
          <Card style={styles.predCard} padding="none">
            <LinearGradient colors={['#EEF2FF', '#F5F3FF']} style={styles.predGradient}>
              <View style={styles.predTop}>
                <View style={styles.predLeft}>
                  <Text style={styles.predTitle}>Placement Probability</Text>
                  <Text style={styles.predSubtitle}>Based on AI analysis of your profile</Text>
                  <View style={styles.predMeta}>
                    <View style={[styles.predChip, { backgroundColor: COLORS.secondaryBg }]}>
                      <Text style={[styles.predChipText, { color: COLORS.secondaryDark }]}>
                        {prediction.predictedSalaryBand}
                      </Text>
                    </View>
                    <View style={[styles.predChip, { backgroundColor: COLORS.primaryBg }]}>
                      <Text style={[styles.predChipText, { color: COLORS.primaryDark }]}>
                        Tier 2 Expected
                      </Text>
                    </View>
                  </View>
                </View>
                <MiniGauge score={prediction.predictionScore} size={80} />
              </View>
              <TouchableOpacity
                style={styles.predViewBtn}
                onPress={() => navigation.navigate('Prediction')}
              >
                <Text style={styles.predViewText}>View Full Analysis</Text>
                <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
              </TouchableOpacity>
            </LinearGradient>
          </Card>

          {/* ── Career Roadmap Progress ── */}
          <SectionHeader
            title="Career Roadmap"
            icon="map"
            actionLabel="View All"
            onAction={() => navigation.navigate('Roadmap')}
          />
          <Card style={styles.roadmapCard}>
            <View style={styles.roadmapHeader}>
              <Text style={styles.roadmapGoal}>{goalLabels[roadmap.goalType]} Path</Text>
              <Text style={styles.roadmapProgress}>{roadmap.progressPercentage}% Complete</Text>
            </View>
            <ProgressBar
              value={roadmap.progressPercentage}
              color={COLORS.primary}
              height={10}
              showValue={false}
              style={{ marginBottom: SPACING.md }}
            />
            <View style={styles.milestoneRow}>
              <View style={styles.milestoneCompleted}>
                <Ionicons name="checkmark-circle" size={16} color={COLORS.secondary} />
                <Text style={styles.milestoneCount}>
                  {roadmap.milestones.filter(m => m.status === 'completed').length} done
                </Text>
              </View>
              <View style={styles.milestonePending}>
                <Ionicons name="time-outline" size={16} color={COLORS.textTertiary} />
                <Text style={styles.milestonePendingText}>
                  {roadmap.milestones.filter(m => m.status === 'pending').length} remaining
                </Text>
              </View>
            </View>
            {currentMilestone && (
              <View style={styles.currentMilestone}>
                <View style={styles.currentMilestoneDot} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.currentMilestoneLabel}>In Progress</Text>
                  <Text style={styles.currentMilestoneTitle}>{currentMilestone.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={COLORS.textTertiary} />
              </View>
            )}
          </Card>

          {/* ── Skill Domains ── */}
          <SectionHeader
            title="Skill Intelligence"
            icon="code-slash"
            actionLabel="Details"
            onAction={() => navigation.navigate('Skills')}
          />
          <Card style={styles.skillCard}>
            <View style={styles.skillTop}>
              <View>
                <Text style={styles.skillScore}>{skills.industryReadinessScore}</Text>
                <Text style={styles.skillScoreLabel}>Industry Readiness Score</Text>
                <Text style={styles.skillRank}>
                  Rank #{skills.batchRank} of {skills.batchSize} • Top {100 - skills.percentile + 1}%
                </Text>
              </View>
              <View style={styles.domainBadge}>
                <Text style={styles.domainBadgeLabel}>Primary Domain</Text>
                <Text style={styles.domainBadgeValue}>{skills.primaryDomain}</Text>
              </View>
            </View>
            <View style={styles.domainBars}>
              {[
                { label: 'Core CS', score: skills.domainScores.core, color: COLORS.primary },
                { label: 'Web Dev', score: skills.domainScores.webDev, color: COLORS.secondary },
                { label: 'AI/ML', score: skills.domainScores.aiMl, color: COLORS.purple },
                { label: 'DevOps', score: skills.domainScores.devOps, color: COLORS.warning },
              ].map(d => (
                <View key={d.label} style={styles.domainBarItem}>
                  <View style={styles.domainBarLabelRow}>
                    <Text style={styles.domainBarLabel}>{d.label}</Text>
                    <Text style={[styles.domainBarValue, { color: d.color }]}>{d.score}</Text>
                  </View>
                  <View style={styles.domainBarTrack}>
                    <View style={[styles.domainBarFill, { width: `${d.score}%`, backgroundColor: d.color }]} />
                  </View>
                </View>
              ))}
            </View>
          </Card>

          {/* ── Wellness Streak ── */}
          <SectionHeader
            title="Performance & Wellness"
            icon="heart"
            actionLabel="Log Activity"
            onAction={() => navigation.navigate('Wellness')}
          />
          <Card style={styles.wellnessCard}>
            <View style={styles.wellnessRow}>
              <View style={styles.streakBlock}>
                <Text style={styles.streakNumber}>🔥 {wellness.currentStreak}</Text>
                <Text style={styles.streakLabel}>Day Streak</Text>
              </View>
              <View style={styles.wellnessDivider} />
              <View style={styles.streakBlock}>
                <Text style={styles.streakNumber}>{wellness.consistencyScore}</Text>
                <Text style={styles.streakLabel}>Consistency Score</Text>
              </View>
              <View style={styles.wellnessDivider} />
              <View style={styles.streakBlock}>
                <Text style={styles.streakNumber}>{wellness.avgDailyMinutes}m</Text>
                <Text style={styles.streakLabel}>Avg Daily</Text>
              </View>
            </View>
            {/* Weekly Mini Bars */}
            <View style={styles.weeklyBars}>
              {wellness.weeklyActivity.map(day => {
                const maxMins = 180;
                const barH = Math.max((day.minutes / maxMins) * 52, 4);
                return (
                  <View key={day.day} style={styles.weeklyBarItem}>
                    <View style={[styles.weeklyBarFill, { height: barH, backgroundColor: day.minutes > 60 ? COLORS.primary : COLORS.gray200 }]} />
                    <Text style={styles.weeklyBarDay}>{day.day[0]}</Text>
                  </View>
                );
              })}
            </View>
          </Card>

          {/* ── Quick Actions ── */}
          <SectionHeader title="Quick Actions" icon="flash" />
          <View style={styles.actionsGrid}>
            {[
              { label: 'Academic\nRecords', icon: 'bar-chart', color: COLORS.primary, screen: 'Academics' },
              { label: 'Find\nMentor', icon: 'people', color: COLORS.secondary, screen: 'Mentorship' },
              { label: 'Job Market\nInsights', icon: 'trending-up', color: COLORS.warning, screen: 'Market' },
              { label: 'My\nProfile', icon: 'person', color: COLORS.purple, screen: 'Profile' },
            ].map(action => (
              <TouchableOpacity
                key={action.label}
                style={styles.actionCard}
                onPress={() => navigation.navigate(action.screen)}
                activeOpacity={0.85}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '18' }]}>
                  <Ionicons name={action.icon} size={22} color={action.color} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ── Recent Notifications ── */}
          <SectionHeader
            title="Recent Alerts"
            icon="notifications"
            actionLabel="All"
            onAction={() => navigation.navigate('Notifications')}
            style={{ marginTop: SPACING.sm }}
          />
          {NOTIFICATIONS.slice(0, 3).map(notif => (
            <Card key={notif.id} style={styles.notifCard} padding="base">
              <View style={styles.notifRow}>
                <View style={[styles.notifIcon, {
                  backgroundColor: notif.read ? COLORS.gray100 : COLORS.primaryBg,
                }]}>
                  <Ionicons
                    name={notif.icon}
                    size={16}
                    color={notif.read ? COLORS.textTertiary : COLORS.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.notifTitleRow}>
                    <Text style={[styles.notifTitle, !notif.read && styles.notifTitleUnread]}>
                      {notif.title}
                    </Text>
                    {!notif.read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.notifMessage} numberOfLines={2}>{notif.message}</Text>
                  <Text style={styles.notifTime}>{notif.time}</Text>
                </View>
              </View>
            </Card>
          ))}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingBottom: SPACING['3xl'] },
  header: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.base,
    paddingBottom: SPACING['2xl'],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: { fontSize: FONT_SIZES.sm, color: 'rgba(255,255,255,0.8)', fontWeight: '500' },
  userName: { fontSize: FONT_SIZES['4xl'], fontWeight: '800', color: COLORS.white, marginTop: 2 },
  subInfo: { fontSize: FONT_SIZES.xs, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginTop: 4 },
  notifBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  notifBadge: { position: 'absolute', top: -2, right: -2, width: 16, height: 16, borderRadius: 8, backgroundColor: COLORS.danger, alignItems: 'center', justifyContent: 'center' },
  notifBadgeText: { fontSize: 9, fontWeight: '800', color: COLORS.white },
  avatarBtn: {},
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
  avatarText: { fontSize: FONT_SIZES.sm, fontWeight: '800', color: COLORS.white },
  goalBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: SPACING.md, alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: SPACING.md, paddingVertical: 5, borderRadius: BORDER_RADIUS.full },
  goalBadgeText: { fontSize: FONT_SIZES.xs, color: 'rgba(255,255,255,0.9)', fontWeight: '600' },

  statsRow: { flexDirection: 'row', paddingHorizontal: SPACING.base, marginTop: -SPACING.base, gap: SPACING.sm, marginBottom: SPACING.base },
  quickStatCard: { flex: 1, backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, padding: SPACING.sm, alignItems: 'center', ...SHADOWS.md },
  quickStatIcon: { width: 30, height: 30, borderRadius: BORDER_RADIUS.sm, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  quickStatValue: { fontSize: FONT_SIZES.md, fontWeight: '800' },
  quickStatLabel: { fontSize: 9, color: COLORS.textTertiary, fontWeight: '500', textAlign: 'center' },

  content: { paddingHorizontal: SPACING.base },

  // Prediction Card
  predCard: { marginBottom: SPACING.lg },
  predGradient: { padding: SPACING.base, borderRadius: BORDER_RADIUS.lg },
  predTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.md },
  predLeft: { flex: 1, marginRight: SPACING.md },
  predTitle: { fontSize: FONT_SIZES.lg, fontWeight: '700', color: COLORS.textPrimary },
  predSubtitle: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, marginTop: 2, marginBottom: SPACING.sm },
  predMeta: { flexDirection: 'row', gap: SPACING.sm, flexWrap: 'wrap' },
  predChip: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: BORDER_RADIUS.full },
  predChipText: { fontSize: FONT_SIZES.xs, fontWeight: '600' },
  predViewBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: SPACING.sm, backgroundColor: COLORS.primaryBg, borderRadius: BORDER_RADIUS.md, borderWidth: 1, borderColor: COLORS.primaryLight },
  predViewText: { fontSize: FONT_SIZES.sm, color: COLORS.primary, fontWeight: '600' },

  // Roadmap
  roadmapCard: { marginBottom: SPACING.lg },
  roadmapHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  roadmapGoal: { fontSize: FONT_SIZES.base, fontWeight: '700', color: COLORS.textPrimary },
  roadmapProgress: { fontSize: FONT_SIZES.sm, color: COLORS.primary, fontWeight: '700' },
  milestoneRow: { flexDirection: 'row', gap: SPACING.base, marginBottom: SPACING.md },
  milestoneCompleted: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  milestoneCount: { fontSize: FONT_SIZES.sm, color: COLORS.secondary, fontWeight: '600' },
  milestonePending: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  milestonePendingText: { fontSize: FONT_SIZES.sm, color: COLORS.textTertiary },
  currentMilestone: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, backgroundColor: COLORS.primaryBg, padding: SPACING.md, borderRadius: BORDER_RADIUS.md },
  currentMilestoneDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary },
  currentMilestoneLabel: { fontSize: FONT_SIZES.xs, color: COLORS.primary, fontWeight: '600' },
  currentMilestoneTitle: { fontSize: FONT_SIZES.sm, color: COLORS.textPrimary, fontWeight: '600', marginTop: 1 },

  // Skills
  skillCard: { marginBottom: SPACING.lg },
  skillTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.md },
  skillScore: { fontSize: FONT_SIZES['4xl'], fontWeight: '800', color: COLORS.primary },
  skillScoreLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, fontWeight: '500', marginTop: 2 },
  skillRank: { fontSize: FONT_SIZES.xs, color: COLORS.secondary, fontWeight: '600', marginTop: 4 },
  domainBadge: { backgroundColor: COLORS.primaryBg, padding: SPACING.sm, borderRadius: BORDER_RADIUS.md, alignItems: 'center' },
  domainBadgeLabel: { fontSize: 9, color: COLORS.textTertiary, fontWeight: '600' },
  domainBadgeValue: { fontSize: FONT_SIZES.xs, color: COLORS.primaryDark, fontWeight: '700', marginTop: 2 },
  domainBars: { gap: SPACING.sm },
  domainBarItem: {},
  domainBarLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  domainBarLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary },
  domainBarValue: { fontSize: FONT_SIZES.xs, fontWeight: '700' },
  domainBarTrack: { height: 6, backgroundColor: COLORS.gray100, borderRadius: 3, overflow: 'hidden' },
  domainBarFill: { height: 6, borderRadius: 3 },

  // Wellness
  wellnessCard: { marginBottom: SPACING.lg },
  wellnessRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.base },
  streakBlock: { flex: 1, alignItems: 'center' },
  streakNumber: { fontSize: FONT_SIZES.xl, fontWeight: '800', color: COLORS.textPrimary },
  streakLabel: { fontSize: 9, color: COLORS.textTertiary, fontWeight: '500', marginTop: 2 },
  wellnessDivider: { width: 1, height: 36, backgroundColor: COLORS.border },
  weeklyBars: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 70 },
  weeklyBarItem: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 4 },
  weeklyBarFill: { width: 10, borderRadius: 5 },
  weeklyBarDay: { fontSize: 9, color: COLORS.textTertiary, fontWeight: '600' },

  // Actions
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.lg },
  actionCard: { width: (width - SPACING.base * 2 - SPACING.sm) / 2, backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, padding: SPACING.base, alignItems: 'center', ...SHADOWS.md },
  actionIcon: { width: 48, height: 48, borderRadius: BORDER_RADIUS.md, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.sm },
  actionLabel: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center' },

  // Notif cards
  notifCard: { marginBottom: SPACING.sm },
  notifRow: { flexDirection: 'row', gap: SPACING.md },
  notifIcon: { width: 36, height: 36, borderRadius: BORDER_RADIUS.md, alignItems: 'center', justifyContent: 'center' },
  notifTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  notifTitle: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textPrimary, flex: 1 },
  notifTitleUnread: { color: COLORS.primaryDark },
  unreadDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.primary },
  notifMessage: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, lineHeight: 17 },
  notifTime: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, marginTop: 4 },
});