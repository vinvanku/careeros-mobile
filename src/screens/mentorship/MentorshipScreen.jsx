import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { MENTORS, MY_MENTORS } from '../../constants/mockData';
import Card from '../../components/common/Card';
import SectionHeader from '../../components/common/SectionHeader';

export default function MentorshipScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('find');
  const [requestedIds, setRequestedIds] = useState([]);

  const handleRequest = (id) => {
    setRequestedIds(prev => [...prev, id]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#EC4899', '#8B5CF6']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mentorship & Guidance</Text>
        <Text style={styles.headerSub}>Connect with industry experts & senior alumni</Text>
        <View style={styles.headerStats}>
          <View style={styles.hStat}>
            <Text style={styles.hStatVal}>{MY_MENTORS.length}</Text>
            <Text style={styles.hStatLabel}>Active Mentors</Text>
          </View>
          <View style={styles.hStatDivider} />
          <View style={styles.hStat}>
            <Text style={styles.hStatVal}>{MY_MENTORS[0]?.totalSessions || 0}</Text>
            <Text style={styles.hStatLabel}>Sessions Done</Text>
          </View>
          <View style={styles.hStatDivider} />
          <View style={styles.hStat}>
            <Text style={styles.hStatVal}>{MENTORS.length}+</Text>
            <Text style={styles.hStatLabel}>Mentors Available</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
        {[
          { key: 'find', label: '🔍 Find Mentor' },
          { key: 'my', label: '👥 My Mentors' },
          { key: 'sessions', label: '📅 Sessions' },
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

          {/* ── Find Mentor ── */}
          {activeTab === 'find' && (
            <View>
              <Card variant="primary" style={styles.matchInfoCard}>
                <View style={styles.matchInfoRow}>
                  <Ionicons name="sparkles" size={16} color={COLORS.primary} />
                  <Text style={styles.matchInfoText}>
                    AI-matched mentors based on your <Text style={{ fontWeight: '700' }}>Campus Placement</Text> goal, skills, and domain overlap.
                  </Text>
                </View>
              </Card>

              {MENTORS.map(mentor => (
                <Card key={mentor.id} style={styles.mentorCard}>
                  {/* Match Score Badge */}
                  <View style={styles.matchBadge}>
                    <Text style={styles.matchBadgeText}>{mentor.matchScore}% Match</Text>
                  </View>

                  <View style={styles.mentorTop}>
                    <View style={styles.mentorAvatar}>
                      <Text style={styles.mentorAvatarText}>
                        {mentor.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.mentorName}>{mentor.name}</Text>
                      <Text style={styles.mentorTitle}>{mentor.title}</Text>
                      <View style={styles.companyRow}>
                        <Ionicons name="business-outline" size={12} color={COLORS.textTertiary} />
                        <Text style={styles.mentorCompany}>{mentor.company}</Text>
                      </View>
                    </View>
                    <View style={styles.ratingBlock}>
                      <View style={styles.ratingRow}>
                        <Ionicons name="star" size={12} color={COLORS.warning} />
                        <Text style={styles.ratingValue}>{mentor.rating}</Text>
                      </View>
                      <Text style={styles.ratingCount}>{mentor.reviewCount} reviews</Text>
                    </View>
                  </View>

                  {/* Bio */}
                  <Text style={styles.mentorBio} numberOfLines={2}>{mentor.bio}</Text>

                  {/* Expertise Tags */}
                  <View style={styles.expertiseWrap}>
                    {mentor.expertise.slice(0, 3).map(exp => (
                      <View key={exp} style={styles.expTag}>
                        <Text style={styles.expTagText}>{exp}</Text>
                      </View>
                    ))}
                    {mentor.expertise.length > 3 && (
                      <Text style={styles.moreExp}>+{mentor.expertise.length - 3}</Text>
                    )}
                  </View>

                  {/* Stats Row */}
                  <View style={styles.mentorStatsRow}>
                    <View style={styles.mentorStat}>
                      <Ionicons name="briefcase-outline" size={12} color={COLORS.textTertiary} />
                      <Text style={styles.mentorStatText}>{mentor.experience} yrs exp</Text>
                    </View>
                    <View style={styles.mentorStat}>
                      <Ionicons name="people-outline" size={12} color={COLORS.textTertiary} />
                      <Text style={styles.mentorStatText}>{mentor.menteeCount}/{mentor.maxMentees} slots</Text>
                    </View>
                    <View style={[styles.availBadge, { backgroundColor: mentor.available ? COLORS.secondaryBg : COLORS.gray100 }]}>
                      <View style={[styles.availDot, { backgroundColor: mentor.available ? COLORS.secondary : COLORS.gray400 }]} />
                      <Text style={[styles.availText, { color: mentor.available ? COLORS.secondaryDark : COLORS.gray400 }]}>
                        {mentor.available ? 'Available' : 'Full'}
                      </Text>
                    </View>
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.viewProfileBtn}>
                      <Text style={styles.viewProfileText}>View Profile</Text>
                    </TouchableOpacity>
                    {mentor.available ? (
                      <TouchableOpacity
                        style={[styles.requestBtn, requestedIds.includes(mentor.id) && styles.requestBtnDone]}
                        onPress={() => handleRequest(mentor.id)}
                        disabled={requestedIds.includes(mentor.id)}
                      >
                        <Ionicons
                          name={requestedIds.includes(mentor.id) ? 'checkmark-circle' : 'send'}
                          size={14}
                          color={COLORS.white}
                        />
                        <Text style={styles.requestBtnText}>
                          {requestedIds.includes(mentor.id) ? 'Requested' : 'Request'}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.fullBtn}>
                        <Text style={styles.fullBtnText}>Slots Full</Text>
                      </View>
                    )}
                  </View>
                </Card>
              ))}
            </View>
          )}

          {/* ── My Mentors ── */}
          {activeTab === 'my' && (
            <View>
              {MY_MENTORS.length > 0 ? (
                MY_MENTORS.map(rel => (
                  <Card key={rel.relationId} style={styles.myMentorCard}>
                    <View style={styles.myMentorTop}>
                      <View style={styles.mentorAvatar}>
                        <Text style={styles.mentorAvatarText}>
                          {rel.mentor.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.mentorName}>{rel.mentor.name}</Text>
                        <Text style={styles.mentorTitle}>{rel.mentor.title} @ {rel.mentor.company}</Text>
                        <View style={[styles.availBadge, { backgroundColor: COLORS.secondaryBg, marginTop: 4, alignSelf: 'flex-start' }]}>
                          <View style={[styles.availDot, { backgroundColor: COLORS.secondary }]} />
                          <Text style={[styles.availText, { color: COLORS.secondaryDark }]}>Active</Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.relMetaRow}>
                      {[
                        { icon: 'calendar', label: 'Started', value: rel.startedAt },
                        { icon: 'checkmark-done', label: 'Sessions', value: rel.totalSessions },
                        { icon: 'star', label: 'Rating', value: `${rel.mentor.rating} ⭐` },
                      ].map((m, i) => (
                        <View key={i} style={styles.relMetaItem}>
                          <Ionicons name={m.icon} size={12} color={COLORS.primary} />
                          <View>
                            <Text style={styles.relMetaLabel}>{m.label}</Text>
                            <Text style={styles.relMetaValue}>{m.value}</Text>
                          </View>
                        </View>
                      ))}
                    </View>

                    {rel.nextSession && (
                      <View style={styles.nextSessionBox}>
                        <Ionicons name="videocam" size={14} color={COLORS.primary} />
                        <Text style={styles.nextSessionText}>
                          Next session: {new Date(rel.nextSession).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </Text>
                      </View>
                    )}

                    <View style={styles.myMentorActions}>
                      <TouchableOpacity style={styles.scheduleBtn}>
                        <Ionicons name="calendar-outline" size={14} color={COLORS.primary} />
                        <Text style={styles.scheduleBtnText}>Schedule Session</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.messageBtn}>
                        <Ionicons name="chatbubble-outline" size={14} color={COLORS.white} />
                        <Text style={styles.messageBtnText}>Message</Text>
                      </TouchableOpacity>
                    </View>
                  </Card>
                ))
              ) : (
                <Card style={styles.emptyCard}>
                  <Ionicons name="people-outline" size={48} color={COLORS.gray300} />
                  <Text style={styles.emptyTitle}>No Active Mentors Yet</Text>
                  <Text style={styles.emptyDesc}>Find and connect with mentors to get personalized guidance for your career goals.</Text>
                  <TouchableOpacity style={styles.findMentorBtn} onPress={() => setActiveTab('find')}>
                    <Text style={styles.findMentorBtnText}>Find a Mentor</Text>
                  </TouchableOpacity>
                </Card>
              )}
            </View>
          )}

          {/* ── Sessions ── */}
          {activeTab === 'sessions' && (
            <View>
              <Card variant="primary" style={styles.sessionInfoCard}>
                <View style={styles.sessionInfoRow}>
                  <Ionicons name="calendar" size={16} color={COLORS.primary} />
                  <Text style={styles.sessionInfoText}>
                    You have 1 upcoming session. Sessions help track your mentorship progress.
                  </Text>
                </View>
              </Card>

              {[
                { date: 'Dec 10, 2024', time: '3:00 PM', mentor: 'Dr. Priya Reddy', type: 'Video Call', topic: 'ML Project Review & Deployment Strategy', status: 'upcoming' },
                { date: 'Nov 26, 2024', time: '4:00 PM', mentor: 'Dr. Priya Reddy', type: 'Video Call', topic: 'Portfolio Review & Resume Feedback', status: 'completed' },
                { date: 'Nov 12, 2024', time: '3:30 PM', mentor: 'Dr. Priya Reddy', type: 'Video Call', topic: 'Career Goal Alignment & Roadmap Planning', status: 'completed' },
              ].map((session, idx) => (
                <Card key={idx} style={styles.sessionCard}>
                  <View style={styles.sessionTop}>
                    <View style={[styles.sessionStatus, {
                      backgroundColor: session.status === 'upcoming' ? COLORS.primaryBg : COLORS.gray100
                    }]}>
                      <Text style={[styles.sessionStatusText, {
                        color: session.status === 'upcoming' ? COLORS.primary : COLORS.textTertiary
                      }]}>
                        {session.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                      </Text>
                    </View>
                    <View style={styles.sessionDateRow}>
                      <Ionicons name="calendar-outline" size={12} color={COLORS.textTertiary} />
                      <Text style={styles.sessionDate}>{session.date} • {session.time}</Text>
                    </View>
                  </View>
                  <Text style={styles.sessionTopic}>{session.topic}</Text>
                  <View style={styles.sessionMeta}>
                    <View style={styles.sessionMetaItem}>
                      <Ionicons name="person-outline" size={12} color={COLORS.textTertiary} />
                      <Text style={styles.sessionMetaText}>{session.mentor}</Text>
                    </View>
                    <View style={styles.sessionMetaItem}>
                      <Ionicons name="videocam-outline" size={12} color={COLORS.textTertiary} />
                      <Text style={styles.sessionMetaText}>{session.type}</Text>
                    </View>
                  </View>
                  {session.status === 'upcoming' && (
                    <TouchableOpacity style={styles.joinBtn}>
                      <Ionicons name="videocam" size={14} color={COLORS.white} />
                      <Text style={styles.joinBtnText}>Join Session</Text>
                    </TouchableOpacity>
                  )}
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
  headerSub: { fontSize: FONT_SIZES.xs, color: 'rgba(255,255,255,0.75)', marginTop: 2, marginBottom: SPACING.md },
  headerStats: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: BORDER_RADIUS.lg, overflow: 'hidden' },
  hStat: { flex: 1, alignItems: 'center', paddingVertical: SPACING.md },
  hStatVal: { fontSize: FONT_SIZES.xl, fontWeight: '800', color: COLORS.white },
  hStatLabel: { fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  hStatDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },

  tabsRow: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.md, gap: SPACING.sm, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tab: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full, backgroundColor: COLORS.gray100 },
  tabActive: { backgroundColor: COLORS.pink },
  tabText: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textSecondary },
  tabTextActive: { color: COLORS.white },

  scroll: { paddingBottom: SPACING['3xl'] },
  content: { padding: SPACING.base },

  matchInfoCard: { marginBottom: SPACING.md },
  matchInfoRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  matchInfoText: { fontSize: FONT_SIZES.xs, color: COLORS.primaryDark, flex: 1, lineHeight: 17 },

  mentorCard: { marginBottom: SPACING.md, position: 'relative' },
  matchBadge: { position: 'absolute', top: SPACING.md, right: SPACING.md, backgroundColor: COLORS.purpleBg, paddingHorizontal: 8, paddingVertical: 3, borderRadius: BORDER_RADIUS.full, zIndex: 1 },
  matchBadgeText: { fontSize: FONT_SIZES.xs, color: COLORS.purpleDark, fontWeight: '700' },
  mentorTop: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.sm },
  mentorAvatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: COLORS.primaryBg, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: COLORS.primaryLight },
  mentorAvatarText: { fontSize: FONT_SIZES.base, fontWeight: '800', color: COLORS.primary },
  mentorName: { fontSize: FONT_SIZES.base, fontWeight: '700', color: COLORS.textPrimary },
  mentorTitle: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, marginTop: 1 },
  companyRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  mentorCompany: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary },
  ratingBlock: { alignItems: 'center' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  ratingValue: { fontSize: FONT_SIZES.base, fontWeight: '800', color: COLORS.textPrimary },
  ratingCount: { fontSize: 9, color: COLORS.textTertiary, marginTop: 1 },
  mentorBio: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, lineHeight: 17, marginBottom: SPACING.sm },
  expertiseWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: SPACING.sm },
  expTag: { backgroundColor: COLORS.purpleBg, paddingHorizontal: 8, paddingVertical: 3, borderRadius: BORDER_RADIUS.full },
  expTagText: { fontSize: 10, color: COLORS.purpleDark, fontWeight: '600' },
  moreExp: { fontSize: 10, color: COLORS.textTertiary, paddingVertical: 3 },
  mentorStatsRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginBottom: SPACING.md, paddingTop: SPACING.sm, borderTopWidth: 1, borderTopColor: COLORS.borderLight },
  mentorStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  mentorStatText: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary },
  availBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: BORDER_RADIUS.full, marginLeft: 'auto' },
  availDot: { width: 6, height: 6, borderRadius: 3 },
  availText: { fontSize: FONT_SIZES.xs, fontWeight: '600' },
  actionRow: { flexDirection: 'row', gap: SPACING.sm },
  viewProfileBtn: { flex: 1, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.md, borderWidth: 1.5, borderColor: COLORS.primaryLight, alignItems: 'center' },
  viewProfileText: { fontSize: FONT_SIZES.sm, color: COLORS.primary, fontWeight: '600' },
  requestBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.pink },
  requestBtnDone: { backgroundColor: COLORS.secondary },
  requestBtnText: { fontSize: FONT_SIZES.sm, color: COLORS.white, fontWeight: '700' },
  fullBtn: { flex: 1, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.gray100, alignItems: 'center' },
  fullBtnText: { fontSize: FONT_SIZES.sm, color: COLORS.textTertiary, fontWeight: '600' },

  myMentorCard: { marginBottom: SPACING.md },
  myMentorTop: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.md },
  relMetaRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.md, backgroundColor: COLORS.gray50, borderRadius: BORDER_RADIUS.md, padding: SPACING.sm },
  relMetaItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 5 },
  relMetaLabel: { fontSize: 9, color: COLORS.textTertiary },
  relMetaValue: { fontSize: FONT_SIZES.xs, fontWeight: '700', color: COLORS.textPrimary },
  nextSessionBox: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, backgroundColor: COLORS.primaryBg, padding: SPACING.sm, borderRadius: BORDER_RADIUS.sm, marginBottom: SPACING.md },
  nextSessionText: { fontSize: FONT_SIZES.xs, color: COLORS.primaryDark, fontWeight: '500' },
  myMentorActions: { flexDirection: 'row', gap: SPACING.sm },
  scheduleBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.md, borderWidth: 1.5, borderColor: COLORS.primaryLight },
  scheduleBtnText: { fontSize: FONT_SIZES.sm, color: COLORS.primary, fontWeight: '600' },
  messageBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.primary },
  messageBtnText: { fontSize: FONT_SIZES.sm, color: COLORS.white, fontWeight: '700' },

  emptyCard: { alignItems: 'center', paddingVertical: SPACING['2xl'] },
  emptyTitle: { fontSize: FONT_SIZES.lg, fontWeight: '700', color: COLORS.textPrimary, marginTop: SPACING.md },
  emptyDesc: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 20, marginTop: SPACING.sm, marginHorizontal: SPACING.md },
  findMentorBtn: { marginTop: SPACING.lg, backgroundColor: COLORS.pink, paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.md },
  findMentorBtnText: { fontSize: FONT_SIZES.base, color: COLORS.white, fontWeight: '700' },

  sessionInfoCard: { marginBottom: SPACING.md },
  sessionInfoRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  sessionInfoText: { fontSize: FONT_SIZES.xs, color: COLORS.primaryDark, flex: 1 },
  sessionCard: { marginBottom: SPACING.sm },
  sessionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  sessionStatus: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: BORDER_RADIUS.full },
  sessionStatusText: { fontSize: FONT_SIZES.xs, fontWeight: '700' },
  sessionDateRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sessionDate: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary },
  sessionTopic: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textPrimary, marginBottom: SPACING.sm },
  sessionMeta: { flexDirection: 'row', gap: SPACING.base, marginBottom: SPACING.sm },
  sessionMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sessionMetaText: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary },
  joinBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, backgroundColor: COLORS.primary, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.md },
  joinBtnText: { fontSize: FONT_SIZES.sm, color: COLORS.white, fontWeight: '700' },
});