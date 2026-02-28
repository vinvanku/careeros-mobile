import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { CAREER_ROADMAP } from '../../constants/mockData';
import Card from '../../components/common/Card';
import ProgressBar from '../../components/common/ProgressBar';
import SectionHeader from '../../components/common/SectionHeader';

const GOAL_OPTIONS = [
  { key: 'placement', label: 'Campus Placement', icon: 'briefcase', color: COLORS.primary, duration: '12 months', milestones: 8 },
  { key: 'gate', label: 'GATE Exam', icon: 'school', color: COLORS.secondary, duration: '18 months', milestones: 10 },
  { key: 'gre', label: 'GRE / MS Abroad', icon: 'airplane', color: COLORS.purple, duration: '6 months', milestones: 6 },
  { key: 'cat', label: 'CAT / MBA', icon: 'bar-chart', color: COLORS.warning, duration: '12 months', milestones: 8 },
  { key: 'startup', label: 'Startup / Entrepreneur', icon: 'rocket', color: COLORS.pink, duration: '6 months', milestones: 5 },
  { key: 'research', label: 'Research / PhD', icon: 'flask', color: COLORS.info, duration: '24 months', milestones: 10 },
  { key: 'govt', label: 'Government Jobs', icon: 'shield', color: COLORS.accent, duration: '12 months', milestones: 8 },
];

export default function RoadmapScreen({ navigation }) {
  const [showGoalSelector, setShowGoalSelector] = useState(false);
  const roadmap = CAREER_ROADMAP;

  const statusConfig = {
    completed:   { icon: 'checkmark-circle', color: COLORS.secondary, bg: COLORS.secondaryBg, label: 'Done' },
    in_progress: { icon: 'time', color: COLORS.primary, bg: COLORS.primaryBg, label: 'In Progress' },
    pending:     { icon: 'ellipse-outline', color: COLORS.gray300, bg: COLORS.gray50, label: 'Pending' },
  };

  const goalLabel = GOAL_OPTIONS.find(g => g.key === roadmap.goalType)?.label || 'Career';
  const goalColor = GOAL_OPTIONS.find(g => g.key === roadmap.goalType)?.color || COLORS.primary;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <LinearGradient colors={[goalColor, goalColor + 'CC']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Career Roadmap</Text>
            <Text style={styles.headerGoal}>{goalLabel}</Text>
          </View>
          <TouchableOpacity
            style={styles.changeGoalBtn}
            onPress={() => setShowGoalSelector(!showGoalSelector)}
          >
            <Ionicons name="swap-horizontal" size={14} color={COLORS.white} />
            <Text style={styles.changeGoalText}>Change Goal</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressSection}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressLabel}>Overall Progress</Text>
            <Text style={styles.progressValue}>{roadmap.progressPercentage}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${roadmap.progressPercentage}%` }]} />
          </View>
          <View style={styles.progressMeta}>
            <Text style={styles.progressMetaText}>
              {roadmap.milestones.filter(m => m.status === 'completed').length} of {roadmap.milestones.length} milestones completed
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Goal Selector */}
      {showGoalSelector && (
        <View style={styles.goalSelector}>
          <Text style={styles.goalSelectorTitle}>Select Career Goal</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.goalScrollRow}>
            {GOAL_OPTIONS.map(goal => (
              <TouchableOpacity
                key={goal.key}
                style={[styles.goalCard, roadmap.goalType === goal.key && styles.goalCardActive, { borderColor: goal.color }]}
                onPress={() => setShowGoalSelector(false)}
              >
                <View style={[styles.goalIconBox, { backgroundColor: goal.color + '18' }]}>
                  <Ionicons name={goal.icon} size={20} color={goal.color} />
                </View>
                <Text style={[styles.goalCardLabel, { color: goal.color }]}>{goal.label}</Text>
                <Text style={styles.goalCardMeta}>{goal.duration} • {goal.milestones} milestones</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.content}>

          {/* Milestone Timeline */}
          <SectionHeader title="Milestone Timeline" icon="map" />
          <View style={styles.timeline}>
            {roadmap.milestones.map((milestone, idx) => {
              const cfg = statusConfig[milestone.status];
              const isLast = idx === roadmap.milestones.length - 1;
              return (
                <View key={milestone.id} style={styles.timelineItem}>
                  {/* Connector line */}
                  {!isLast && (
                    <View style={[styles.connector, {
                      backgroundColor: milestone.status === 'completed' ? COLORS.secondary : COLORS.gray200,
                    }]} />
                  )}
                  {/* Node */}
                  <View style={[styles.node, { backgroundColor: cfg.bg, borderColor: cfg.color }]}>
                    <Ionicons name={cfg.icon} size={18} color={cfg.color} />
                  </View>
                  {/* Content */}
                  <View style={styles.milestoneContent}>
                    <Card style={[styles.milestoneCard, milestone.status === 'in_progress' && styles.milestoneCardActive]}>
                      <View style={styles.milestoneTop}>
                        <View style={{ flex: 1 }}>
                          <View style={styles.milestoneTitleRow}>
                            <Text style={styles.milestoneNumber}>#{milestone.order}</Text>
                            <Text style={[styles.milestoneCfgLabel, { color: cfg.color }]}>{cfg.label}</Text>
                          </View>
                          <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                        </View>
                        <View style={[styles.durationBadge]}>
                          <Ionicons name="time-outline" size={10} color={COLORS.textTertiary} />
                          <Text style={styles.durationText}>{milestone.durationWeeks}w</Text>
                        </View>
                      </View>

                      {/* Skills */}
                      <View style={styles.skillsWrap}>
                        {milestone.skills.slice(0, 4).map(skill => (
                          <View key={skill} style={[styles.skillTag, {
                            backgroundColor: milestone.status === 'completed' ? COLORS.secondaryBg : COLORS.primaryBg
                          }]}>
                            <Text style={[styles.skillTagText, {
                              color: milestone.status === 'completed' ? COLORS.secondaryDark : COLORS.primaryDark
                            }]}>{skill}</Text>
                          </View>
                        ))}
                        {milestone.skills.length > 4 && (
                          <Text style={styles.moreSkills}>+{milestone.skills.length - 4}</Text>
                        )}
                      </View>

                      {/* Assessment */}
                      <View style={styles.assessmentRow}>
                        <Ionicons name="checkmark-done-outline" size={13} color={COLORS.textTertiary} />
                        <Text style={styles.assessmentText}>{milestone.assessment}</Text>
                      </View>

                      {/* Action Buttons for in_progress/pending */}
                      {milestone.status === 'in_progress' && (
                        <TouchableOpacity style={styles.markDoneBtn}>
                          <Ionicons name="checkmark-circle" size={14} color={COLORS.white} />
                          <Text style={styles.markDoneText}>Mark as Complete</Text>
                        </TouchableOpacity>
                      )}
                      {milestone.status === 'pending' && idx === roadmap.currentMilestoneIndex && (
                        <TouchableOpacity style={[styles.markDoneBtn, { backgroundColor: COLORS.primaryBg }]}>
                          <Ionicons name="play-circle" size={14} color={COLORS.primary} />
                          <Text style={[styles.markDoneText, { color: COLORS.primary }]}>Start Milestone</Text>
                        </TouchableOpacity>
                      )}
                    </Card>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Tips Card */}
          <Card variant="primary" style={styles.tipsCard}>
            <View style={styles.tipsRow}>
              <Ionicons name="bulb" size={20} color={COLORS.primary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.tipsTitle}>AI Recommendation</Text>
                <Text style={styles.tipsText}>
                  You're 62% through your placement roadmap! Focus on completing the ML Projects milestone this week. Then move to Mock Interview Practice to significantly boost your prediction score.
                </Text>
              </View>
            </View>
          </Card>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.base, paddingTop: SPACING.sm, paddingBottom: SPACING.xl },
  backBtn: { marginBottom: SPACING.sm },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: SPACING.md },
  headerTitle: { fontSize: FONT_SIZES.lg, color: 'rgba(255,255,255,0.85)', fontWeight: '600' },
  headerGoal: { fontSize: FONT_SIZES['2xl'], fontWeight: '800', color: COLORS.white },
  changeGoalBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: SPACING.sm, paddingVertical: 6, borderRadius: BORDER_RADIUS.full, marginTop: 4 },
  changeGoalText: { fontSize: FONT_SIZES.xs, color: COLORS.white, fontWeight: '600' },
  progressSection: {},
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: FONT_SIZES.sm, color: 'rgba(255,255,255,0.8)' },
  progressValue: { fontSize: FONT_SIZES.sm, color: COLORS.white, fontWeight: '800' },
  progressTrack: { height: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: 10, backgroundColor: COLORS.white, borderRadius: 5 },
  progressMeta: { marginTop: 6 },
  progressMetaText: { fontSize: FONT_SIZES.xs, color: 'rgba(255,255,255,0.7)' },

  goalSelector: { backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border, paddingVertical: SPACING.md },
  goalSelectorTitle: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textPrimary, paddingHorizontal: SPACING.base, marginBottom: SPACING.sm },
  goalScrollRow: { paddingHorizontal: SPACING.base, gap: SPACING.sm },
  goalCard: { width: 130, padding: SPACING.md, borderRadius: BORDER_RADIUS.lg, borderWidth: 1.5, borderColor: COLORS.border, backgroundColor: COLORS.surface, alignItems: 'center' },
  goalCardActive: { backgroundColor: COLORS.primaryBg },
  goalIconBox: { width: 40, height: 40, borderRadius: BORDER_RADIUS.md, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.xs },
  goalCardLabel: { fontSize: FONT_SIZES.xs, fontWeight: '700', textAlign: 'center', marginBottom: 2 },
  goalCardMeta: { fontSize: 9, color: COLORS.textTertiary, textAlign: 'center' },

  scroll: { paddingBottom: SPACING['3xl'] },
  content: { padding: SPACING.base },

  timeline: { position: 'relative' },
  timelineItem: { flexDirection: 'row', marginBottom: SPACING.md },
  connector: { position: 'absolute', left: 17, top: 36, width: 2, bottom: -SPACING.md, zIndex: 0 },
  node: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, alignItems: 'center', justifyContent: 'center', zIndex: 1, marginRight: SPACING.md, flexShrink: 0 },

  milestoneContent: { flex: 1 },
  milestoneCard: { flex: 1 },
  milestoneCardActive: { borderWidth: 2, borderColor: COLORS.primary },
  milestoneTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: SPACING.sm },
  milestoneTitleRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: 2 },
  milestoneNumber: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, fontWeight: '600', backgroundColor: COLORS.gray100, paddingHorizontal: 6, paddingVertical: 1, borderRadius: BORDER_RADIUS.full },
  milestoneCfgLabel: { fontSize: FONT_SIZES.xs, fontWeight: '700' },
  milestoneTitle: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textPrimary },
  durationBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: COLORS.gray100, paddingHorizontal: 6, paddingVertical: 3, borderRadius: BORDER_RADIUS.full, marginLeft: SPACING.sm },
  durationText: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, fontWeight: '600' },

  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: SPACING.sm },
  skillTag: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: BORDER_RADIUS.full },
  skillTagText: { fontSize: 10, fontWeight: '600' },
  moreSkills: { fontSize: 10, color: COLORS.textTertiary, fontWeight: '600', paddingVertical: 2 },

  assessmentRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 5, marginBottom: SPACING.sm },
  assessmentText: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, flex: 1, lineHeight: 16 },

  markDoneBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: COLORS.secondary, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.md, marginTop: 2 },
  markDoneText: { fontSize: FONT_SIZES.sm, color: COLORS.white, fontWeight: '700' },

  tipsCard: { marginTop: SPACING.sm },
  tipsRow: { flexDirection: 'row', gap: SPACING.md, alignItems: 'flex-start' },
  tipsTitle: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.primaryDark, marginBottom: 2 },
  tipsText: { fontSize: FONT_SIZES.xs, color: COLORS.primaryDark, lineHeight: 17, flex: 1 },
});