import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { ACADEMIC_RECORDS, STUDENT_PROFILE } from '../../constants/mockData';
import Card from '../../components/common/Card';
import SectionHeader from '../../components/common/SectionHeader';

export default function AcademicsScreen({ navigation }) {
  const [expandedSem, setExpandedSem] = useState(null);
  const [activeView, setActiveView] = useState('records'); // records | trends

  const profile = STUDENT_PROFILE;
  const records = ACADEMIC_RECORDS;

  // Risk score calculation
  const latestSem = records[records.length - 1];
  const prevSem = records[records.length - 2];
  const gpaTrend = latestSem.gpa - prevSem.gpa;
  const avgAttendance = records.flatMap(r => r.subjects).reduce((a, s) => a + s.attendance, 0) /
    records.flatMap(r => r.subjects).length;

  const riskScore = Math.min(100,
    (avgAttendance < 75 ? (75 - avgAttendance) * 2 : 0) +
    (gpaTrend < 0 ? Math.abs(gpaTrend) * 10 : 0)
  );

  const getGradeColor = (grade) => {
    if (grade === 'A+') return COLORS.secondary;
    if (grade === 'A') return COLORS.primary;
    if (grade === 'B+') return COLORS.info;
    if (grade === 'B') return COLORS.warning;
    return COLORS.danger;
  };

  const maxGpa = Math.max(...records.map(r => r.gpa));
  const minGpa = Math.min(...records.map(r => r.gpa));

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <LinearGradient colors={['#3B82F6', '#6366F1']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Academic Intelligence</Text>
        <View style={styles.headerStats}>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatVal}>{profile.cgpa.toFixed(2)}</Text>
            <Text style={styles.headerStatLabel}>CGPA</Text>
          </View>
          <View style={styles.headerStatDivider} />
          <View style={styles.headerStat}>
            <Text style={styles.headerStatVal}>{records.length}</Text>
            <Text style={styles.headerStatLabel}>Semesters</Text>
          </View>
          <View style={styles.headerStatDivider} />
          <View style={styles.headerStat}>
            <Text style={styles.headerStatVal}>{avgAttendance.toFixed(0)}%</Text>
            <Text style={styles.headerStatLabel}>Avg Attendance</Text>
          </View>
          <View style={styles.headerStatDivider} />
          <View style={styles.headerStat}>
            <Text style={[styles.headerStatVal, { color: riskScore < 20 ? '#86EFAC' : '#FCA5A5' }]}>
              {riskScore < 20 ? 'Low' : riskScore < 50 ? 'Med' : 'High'}
            </Text>
            <Text style={styles.headerStatLabel}>Risk</Text>
          </View>
        </View>
      </LinearGradient>

      {/* View Toggle */}
      <View style={styles.toggleRow}>
        {[{ key: 'records', label: '📋 Semester Records' }, { key: 'trends', label: '📈 Performance Trends' }].map(v => (
          <TouchableOpacity
            key={v.key}
            style={[styles.toggleBtn, activeView === v.key && styles.toggleBtnActive]}
            onPress={() => setActiveView(v.key)}
          >
            <Text style={[styles.toggleText, activeView === v.key && styles.toggleTextActive]}>
              {v.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {activeView === 'records' && (
          <View style={styles.content}>

            {/* Risk Alert */}
            {riskScore >= 20 && (
              <Card variant="warning" style={styles.riskAlert}>
                <View style={styles.riskRow}>
                  <Ionicons name="warning" size={20} color={COLORS.warning} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.riskTitle}>Academic Risk Detected</Text>
                    <Text style={styles.riskMsg}>
                      {gpaTrend < 0 ? `GPA dropped by ${Math.abs(gpaTrend).toFixed(1)} from last semester. ` : ''}
                      {avgAttendance < 75 ? `Average attendance ${avgAttendance.toFixed(0)}% is below 75% threshold.` : ''}
                    </Text>
                  </View>
                </View>
              </Card>
            )}

            {/* Semester Cards */}
            {[...records].reverse().map((sem) => (
              <View key={sem.semester} style={styles.semCard}>
                <TouchableOpacity
                  style={styles.semHeader}
                  onPress={() => setExpandedSem(expandedSem === sem.semester ? null : sem.semester)}
                >
                  <View style={styles.semLeft}>
                    <View style={[styles.semBadge, {
                      backgroundColor: sem.gpa >= 8.5 ? COLORS.secondaryBg : sem.gpa >= 7.5 ? COLORS.primaryBg : COLORS.warningBg
                    }]}>
                      <Text style={[styles.semBadgeText, {
                        color: sem.gpa >= 8.5 ? COLORS.secondaryDark : sem.gpa >= 7.5 ? COLORS.primaryDark : COLORS.warningDark
                      }]}>Sem {sem.semester}</Text>
                    </View>
                    <View>
                      <Text style={styles.semGpa}>GPA: {sem.gpa.toFixed(1)}</Text>
                      <Text style={styles.semSubCount}>{sem.subjects.length} subjects</Text>
                    </View>
                  </View>
                  <View style={styles.semRight}>
                    {/* Mini GPA bar */}
                    <View style={styles.miniBarTrack}>
                      <View style={[styles.miniBarFill, {
                        width: `${((sem.gpa - 6) / 4) * 100}%`,
                        backgroundColor: sem.gpa >= 8.5 ? COLORS.secondary : sem.gpa >= 7.5 ? COLORS.primary : COLORS.warning,
                      }]} />
                    </View>
                    <Ionicons
                      name={expandedSem === sem.semester ? 'chevron-up' : 'chevron-down'}
                      size={16}
                      color={COLORS.textTertiary}
                    />
                  </View>
                </TouchableOpacity>

                {expandedSem === sem.semester && (
                  <View style={styles.subjectsTable}>
                    <View style={styles.tableHeader}>
                      <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Subject</Text>
                      <Text style={styles.tableHeaderCell}>Marks</Text>
                      <Text style={styles.tableHeaderCell}>Grade</Text>
                      <Text style={styles.tableHeaderCell}>Attend.</Text>
                    </View>
                    {sem.subjects.map((subj, idx) => (
                      <View key={subj.code} style={[styles.tableRow, idx % 2 === 0 && styles.tableRowAlt]}>
                        <View style={{ flex: 2 }}>
                          <Text style={styles.subjectName} numberOfLines={1}>{subj.name}</Text>
                          <Text style={styles.subjectCode}>{subj.code}</Text>
                        </View>
                        <Text style={styles.tableCell}>{subj.marks}/{subj.maxMarks}</Text>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                          <Text style={[styles.gradeChip, { color: getGradeColor(subj.grade) }]}>
                            {subj.grade}
                          </Text>
                        </View>
                        <Text style={[styles.tableCell, { color: subj.attendance < 75 ? COLORS.danger : COLORS.secondary }]}>
                          {subj.attendance}%
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {activeView === 'trends' && (
          <View style={styles.content}>

            {/* GPA Trend Chart (Custom SVG-free bar chart) */}
            <Card style={styles.trendCard}>
              <Text style={styles.trendTitle}>📊 Semester GPA Progression</Text>
              <View style={styles.barChart}>
                {records.map((sem, idx) => {
                  const barH = ((sem.gpa - 6) / 4) * 100;
                  const isLatest = idx === records.length - 1;
                  const barColor = sem.gpa >= 8.5 ? COLORS.secondary : sem.gpa >= 7.5 ? COLORS.primary : COLORS.warning;
                  return (
                    <View key={sem.semester} style={styles.barItem}>
                      <Text style={styles.barValue}>{sem.gpa.toFixed(1)}</Text>
                      <View style={styles.barTrack}>
                        <View style={[styles.barFill, {
                          height: `${Math.max(barH, 8)}%`,
                          backgroundColor: barColor,
                          opacity: isLatest ? 1 : 0.7,
                        }]} />
                      </View>
                      <Text style={styles.barLabel}>S{sem.semester}</Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.trendLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.secondary }]} />
                  <Text style={styles.legendText}>Excellent (≥8.5)</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.primary }]} />
                  <Text style={styles.legendText}>Good (≥7.5)</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.warning }]} />
                  <Text style={styles.legendText}>Average (&lt;7.5)</Text>
                </View>
              </View>
            </Card>

            {/* GPA Summary Stats */}
            <View style={styles.statsGrid}>
              {[
                { label: 'Current CGPA', value: profile.cgpa.toFixed(2), color: COLORS.primary, icon: 'school' },
                { label: 'Best Semester', value: maxGpa.toFixed(1), color: COLORS.secondary, icon: 'trophy' },
                { label: 'Lowest Semester', value: minGpa.toFixed(1), color: COLORS.warning, icon: 'trending-down' },
                { label: 'Trend', value: gpaTrend >= 0 ? `+${gpaTrend.toFixed(1)}` : gpaTrend.toFixed(1), color: gpaTrend >= 0 ? COLORS.secondary : COLORS.danger, icon: gpaTrend >= 0 ? 'trending-up' : 'trending-down' },
              ].map(stat => (
                <View key={stat.label} style={styles.statBox}>
                  <View style={[styles.statIcon, { backgroundColor: stat.color + '18' }]}>
                    <Ionicons name={stat.icon} size={18} color={stat.color} />
                  </View>
                  <Text style={[styles.statVal, { color: stat.color }]}>{stat.value}</Text>
                  <Text style={styles.statLbl}>{stat.label}</Text>
                </View>
              ))}
            </View>

            {/* Subject Strength Analysis */}
            <SectionHeader title="Subject Strength Analysis" icon="analytics" />
            <Card>
              <Text style={styles.analysisSub}>Top performing subjects across all semesters</Text>
              {records.flatMap(r => r.subjects)
                .sort((a, b) => b.marks - a.marks)
                .slice(0, 5)
                .map((subj, idx) => (
                  <View key={idx} style={styles.topSubjRow}>
                    <View style={[styles.rankCircle, { backgroundColor: idx === 0 ? COLORS.warningBg : COLORS.gray100 }]}>
                      <Text style={[styles.rankText, { color: idx === 0 ? COLORS.warning : COLORS.textTertiary }]}>#{idx + 1}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.topSubjName}>{subj.name}</Text>
                      <View style={styles.miniTrack}>
                        <View style={[styles.miniFill, { width: `${subj.marks}%`, backgroundColor: getGradeColor(subj.grade) }]} />
                      </View>
                    </View>
                    <Text style={[styles.topSubjMark, { color: getGradeColor(subj.grade) }]}>{subj.marks}%</Text>
                  </View>
                ))}
            </Card>

            {/* Attendance Overview */}
            <SectionHeader title="Attendance Overview" icon="calendar" style={{ marginTop: SPACING.base }} />
            <Card>
              {records.flatMap(r => r.subjects)
                .filter(s => s.attendance < 80)
                .slice(0, 5)
                .length > 0 ? (
                records.flatMap(r => r.subjects)
                  .filter(s => s.attendance < 80)
                  .slice(0, 5)
                  .map((subj, idx) => (
                    <View key={idx} style={[styles.attendRow, idx > 0 && styles.attendRowBorder]}>
                      <Ionicons name="warning-outline" size={14} color={COLORS.warning} />
                      <Text style={styles.attendSubj}>{subj.name}</Text>
                      <Text style={[styles.attendPct, { color: subj.attendance < 75 ? COLORS.danger : COLORS.warning }]}>
                        {subj.attendance}%
                      </Text>
                    </View>
                  ))
              ) : (
                <View style={styles.allGoodRow}>
                  <Ionicons name="checkmark-circle" size={24} color={COLORS.secondary} />
                  <Text style={styles.allGoodText}>Excellent attendance across all subjects!</Text>
                </View>
              )}
            </Card>

          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.base, paddingTop: SPACING.sm, paddingBottom: SPACING.xl },
  backBtn: { marginBottom: SPACING.sm },
  headerTitle: { fontSize: FONT_SIZES['2xl'], fontWeight: '800', color: COLORS.white, marginBottom: SPACING.md },
  headerStats: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: BORDER_RADIUS.lg, overflow: 'hidden' },
  headerStat: { flex: 1, alignItems: 'center', paddingVertical: SPACING.md },
  headerStatVal: { fontSize: FONT_SIZES.lg, fontWeight: '800', color: COLORS.white },
  headerStatLabel: { fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  headerStatDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },

  toggleRow: { flexDirection: 'row', padding: SPACING.base, gap: SPACING.sm, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  toggleBtn: { flex: 1, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.gray100, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: COLORS.primary },
  toggleText: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textSecondary },
  toggleTextActive: { color: COLORS.white },

  scroll: { paddingBottom: SPACING['3xl'] },
  content: { padding: SPACING.base },

  riskAlert: { marginBottom: SPACING.md },
  riskRow: { flexDirection: 'row', gap: SPACING.md, alignItems: 'flex-start' },
  riskTitle: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.warningDark },
  riskMsg: { fontSize: FONT_SIZES.xs, color: COLORS.warningDark, marginTop: 2, lineHeight: 17 },

  semCard: { backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, marginBottom: SPACING.sm, ...SHADOWS.md, overflow: 'hidden' },
  semHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: SPACING.base },
  semLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  semBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: BORDER_RADIUS.full },
  semBadgeText: { fontSize: FONT_SIZES.sm, fontWeight: '700' },
  semGpa: { fontSize: FONT_SIZES.base, fontWeight: '700', color: COLORS.textPrimary },
  semSubCount: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, marginTop: 1 },
  semRight: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  miniBarTrack: { width: 60, height: 6, backgroundColor: COLORS.gray100, borderRadius: 3, overflow: 'hidden' },
  miniBarFill: { height: 6, borderRadius: 3 },

  subjectsTable: { borderTopWidth: 1, borderTopColor: COLORS.borderLight },
  tableHeader: { flexDirection: 'row', paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, backgroundColor: COLORS.gray50 },
  tableHeaderCell: { flex: 1, fontSize: FONT_SIZES.xs, fontWeight: '700', color: COLORS.textSecondary, textAlign: 'center' },
  tableRow: { flexDirection: 'row', paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, alignItems: 'center' },
  tableRowAlt: { backgroundColor: COLORS.gray50 },
  subjectName: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textPrimary },
  subjectCode: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, marginTop: 1 },
  tableCell: { flex: 1, fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center' },
  gradeChip: { fontSize: FONT_SIZES.sm, fontWeight: '800' },

  // Trends
  trendCard: { marginBottom: SPACING.base },
  trendTitle: { fontSize: FONT_SIZES.base, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.base },
  barChart: { flexDirection: 'row', alignItems: 'flex-end', height: 140, gap: SPACING.sm, marginBottom: SPACING.md },
  barItem: { flex: 1, alignItems: 'center', gap: 4 },
  barValue: { fontSize: FONT_SIZES.xs, fontWeight: '700', color: COLORS.textSecondary },
  barTrack: { flex: 1, width: '80%', backgroundColor: COLORS.gray100, borderRadius: 4, justifyContent: 'flex-end', overflow: 'hidden' },
  barFill: { width: '100%', borderRadius: 4 },
  barLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, fontWeight: '600' },
  trendLegend: { flexDirection: 'row', gap: SPACING.md, flexWrap: 'wrap' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.base },
  statBox: { flex: 1, minWidth: '45%', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, alignItems: 'center', ...SHADOWS.sm },
  statIcon: { width: 36, height: 36, borderRadius: BORDER_RADIUS.sm, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.sm },
  statVal: { fontSize: FONT_SIZES['2xl'], fontWeight: '800' },
  statLbl: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, marginTop: 2, textAlign: 'center' },

  analysisSub: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, marginBottom: SPACING.md },
  topSubjRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginBottom: SPACING.sm },
  rankCircle: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  rankText: { fontSize: FONT_SIZES.xs, fontWeight: '700' },
  topSubjName: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 4 },
  miniTrack: { height: 4, backgroundColor: COLORS.gray100, borderRadius: 2, overflow: 'hidden' },
  miniFill: { height: 4, borderRadius: 2 },
  topSubjMark: { fontSize: FONT_SIZES.sm, fontWeight: '800', minWidth: 36, textAlign: 'right' },

  attendRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, paddingVertical: SPACING.sm },
  attendRowBorder: { borderTopWidth: 1, borderTopColor: COLORS.borderLight },
  attendSubj: { flex: 1, fontSize: FONT_SIZES.sm, color: COLORS.textPrimary, fontWeight: '500' },
  attendPct: { fontSize: FONT_SIZES.sm, fontWeight: '700' },
  allGoodRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, paddingVertical: SPACING.sm },
  allGoodText: { fontSize: FONT_SIZES.sm, color: COLORS.secondary, fontWeight: '600' },
});