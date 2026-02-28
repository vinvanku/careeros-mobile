import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import {
  STUDENT_PROFILE, SKILLS, PROJECTS, CERTIFICATIONS, INTERNSHIPS,
} from '../../constants/mockData';
import Card from '../../components/common/Card';
import { ProficiencyBadge, StatusBadge } from '../../components/common/Badge';
import SectionHeader from '../../components/common/SectionHeader';

export default function ProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('overview');
  const profile = STUDENT_PROFILE;

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'skills', label: 'Skills' },
    { key: 'projects', label: 'Projects' },
    { key: 'certs', label: 'Certs' },
    { key: 'internships', label: 'Internships' },
  ];

  const goalLabels = {
    placement: 'Campus Placement', gate: 'GATE', gre: 'GRE',
    cat: 'CAT', startup: 'Startup', research: 'Research', govt: 'Govt Job',
  };

  const categorySkills = (cat) => SKILLS.filter(s => s.category === cat);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.headerGrad}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarText}>
                {profile.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </Text>
            </View>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileId}>{profile.auId}</Text>
            <View style={styles.profileTagRow}>
              <View style={styles.profileTag}>
                <Ionicons name="school" size={11} color="rgba(255,255,255,0.85)" />
                <Text style={styles.profileTagText}>{profile.department}</Text>
              </View>
              <View style={styles.profileTag}>
                <Ionicons name="calendar" size={11} color="rgba(255,255,255,0.85)" />
                <Text style={styles.profileTagText}>Batch {profile.batchYear}</Text>
              </View>
            </View>
            <View style={styles.statsRow}>
              {[
                { label: 'CGPA', value: profile.cgpa.toFixed(1) },
                { label: 'Semester', value: `${profile.currentSemester}th` },
                { label: 'Goal', value: goalLabels[profile.careerGoal] },
              ].map((s, i) => (
                <View key={i} style={[styles.statItem, i < 2 && styles.statBorder]}>
                  <Text style={styles.statValue}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>

        {/* Social Links */}
        <View style={styles.socialRow}>
          <TouchableOpacity
            style={styles.socialBtn}
            onPress={() => Linking.openURL(profile.linkedinUrl)}
          >
            <Ionicons name="logo-linkedin" size={18} color="#0077B5" />
            <Text style={[styles.socialText, { color: '#0077B5' }]}>LinkedIn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialBtn}
            onPress={() => Linking.openURL(profile.githubUrl)}
          >
            <Ionicons name="logo-github" size={18} color={COLORS.textPrimary} />
            <Text style={styles.socialText}>GitHub</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Ionicons name="create-outline" size={18} color={COLORS.primary} />
            <Text style={[styles.socialText, { color: COLORS.primary }]}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Bio */}
        {profile.bio && (
          <View style={styles.bioPad}>
            <Text style={styles.bioText}>{profile.bio}</Text>
          </View>
        )}

        {/* Tabs */}
        <ScrollView
          horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.content}>

          {/* ── Overview Tab ── */}
          {activeTab === 'overview' && (
            <View>
              <Card style={styles.infoCard}>
                {[
                  { icon: 'mail', label: 'Email', value: `arjun.sharma@university.edu` },
                  { icon: 'call', label: 'Phone', value: profile.phone },
                  { icon: 'location', label: 'City', value: profile.city },
                  { icon: 'book', label: 'Department', value: profile.department },
                  { icon: 'calendar', label: 'Batch Year', value: profile.batchYear.toString() },
                  { icon: 'flag', label: 'Career Goal', value: goalLabels[profile.careerGoal] },
                ].map((item, i) => (
                  <View key={i} style={[styles.infoRow, i > 0 && styles.infoRowBorder]}>
                    <View style={styles.infoIcon}>
                      <Ionicons name={item.icon} size={16} color={COLORS.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.infoLabel}>{item.label}</Text>
                      <Text style={styles.infoValue}>{item.value}</Text>
                    </View>
                  </View>
                ))}
              </Card>

              {/* Quick Stats */}
              <View style={styles.quickStatsGrid}>
                {[
                  { label: 'Skills', value: SKILLS.length, icon: 'code-slash', color: COLORS.primary },
                  { label: 'Projects', value: PROJECTS.length, icon: 'construct', color: COLORS.secondary },
                  { label: 'Certifications', value: CERTIFICATIONS.length, icon: 'ribbon', color: COLORS.warning },
                  { label: 'Internships', value: INTERNSHIPS.length, icon: 'briefcase', color: COLORS.purple },
                ].map(s => (
                  <View key={s.label} style={[styles.quickStatBox, { borderLeftColor: s.color }]}>
                    <Text style={[styles.quickStatNum, { color: s.color }]}>{s.value}</Text>
                    <Text style={styles.quickStatLbl}>{s.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* ── Skills Tab ── */}
          {activeTab === 'skills' && (
            <View>
              {['technical', 'domain', 'soft'].map(cat => (
                <View key={cat} style={{ marginBottom: SPACING.base }}>
                  <Text style={styles.catTitle}>
                    {cat === 'technical' ? '⚙️ Technical' : cat === 'domain' ? '🎯 Domain' : '💬 Soft'} Skills
                  </Text>
                  <View style={styles.skillsWrap}>
                    {categorySkills(cat).map(skill => (
                      <View key={skill.id} style={styles.skillChip}>
                        <View style={styles.skillChipLeft}>
                          {skill.verified && (
                            <Ionicons name="checkmark-circle" size={12} color={COLORS.secondary} />
                          )}
                          <Text style={styles.skillName}>{skill.name}</Text>
                        </View>
                        <ProficiencyBadge level={skill.proficiency} />
                      </View>
                    ))}
                  </View>
                </View>
              ))}
              <TouchableOpacity style={styles.addBtn}>
                <Ionicons name="add-circle-outline" size={18} color={COLORS.primary} />
                <Text style={styles.addBtnText}>Add New Skill</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ── Projects Tab ── */}
          {activeTab === 'projects' && (
            <View>
              {PROJECTS.map(proj => (
                <Card key={proj.id} style={styles.projCard}>
                  <View style={styles.projHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.projTitle}>{proj.title}</Text>
                      <StatusBadge status={proj.status} style={{ marginTop: 4 }} />
                    </View>
                    {proj.githubLink && (
                      <TouchableOpacity
                        style={styles.githubBtn}
                        onPress={() => Linking.openURL(proj.githubLink)}
                      >
                        <Ionicons name="logo-github" size={20} color={COLORS.textPrimary} />
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text style={styles.projDesc}>{proj.description}</Text>
                  <View style={styles.techWrap}>
                    {proj.technologies.map(t => (
                      <View key={t} style={styles.techChip}>
                        <Text style={styles.techText}>{t}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.projMeta}>
                    <Ionicons name="calendar-outline" size={12} color={COLORS.textTertiary} />
                    <Text style={styles.projMetaText}>
                      {proj.startDate} {proj.endDate ? `→ ${proj.endDate}` : '→ Present'}
                    </Text>
                    {proj.isTeamProject && (
                      <>
                        <Ionicons name="people-outline" size={12} color={COLORS.textTertiary} />
                        <Text style={styles.projMetaText}>Team Project</Text>
                      </>
                    )}
                  </View>
                </Card>
              ))}
              <TouchableOpacity style={styles.addBtn}>
                <Ionicons name="add-circle-outline" size={18} color={COLORS.primary} />
                <Text style={styles.addBtnText}>Add Project</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ── Certifications Tab ── */}
          {activeTab === 'certs' && (
            <View>
              {CERTIFICATIONS.map(cert => (
                <Card key={cert.id} style={styles.certCard}>
                  <View style={styles.certHeader}>
                    <View style={[styles.certIcon, { backgroundColor: COLORS.warningBg }]}>
                      <Ionicons name="ribbon" size={22} color={COLORS.warning} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.certName}>{cert.name}</Text>
                      <Text style={styles.certOrg}>{cert.organization}</Text>
                    </View>
                    {cert.verified && (
                      <Ionicons name="checkmark-circle" size={20} color={COLORS.secondary} />
                    )}
                  </View>
                  <View style={styles.certMeta}>
                    <Text style={styles.certDate}>Issued: {cert.issueDate}</Text>
                    {cert.expiryDate && (
                      <Text style={styles.certDate}>Expires: {cert.expiryDate}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.viewCredBtn}
                    onPress={() => Linking.openURL(cert.credentialUrl)}
                  >
                    <Ionicons name="open-outline" size={14} color={COLORS.primary} />
                    <Text style={styles.viewCredText}>View Credential</Text>
                  </TouchableOpacity>
                </Card>
              ))}
              <TouchableOpacity style={styles.addBtn}>
                <Ionicons name="add-circle-outline" size={18} color={COLORS.primary} />
                <Text style={styles.addBtnText}>Add Certification</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ── Internships Tab ── */}
          {activeTab === 'internships' && (
            <View>
              {INTERNSHIPS.map(intern => (
                <Card key={intern.id} style={styles.internCard}>
                  <View style={styles.internHeader}>
                    <View style={[styles.internIcon, { backgroundColor: COLORS.purpleBg }]}>
                      <Ionicons name="briefcase" size={20} color={COLORS.purple} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.internRole}>{intern.role}</Text>
                      <Text style={styles.internCompany}>{intern.companyName}</Text>
                    </View>
                    <View style={styles.stipendBadge}>
                      <Text style={styles.stipendText}>₹{(intern.stipend / 1000).toFixed(0)}K/mo</Text>
                    </View>
                  </View>
                  <Text style={styles.internDesc}>{intern.description}</Text>
                  <View style={styles.internMeta}>
                    <Ionicons name="time-outline" size={12} color={COLORS.textTertiary} />
                    <Text style={styles.internMetaText}>{intern.durationMonths} months</Text>
                    <Ionicons name="calendar-outline" size={12} color={COLORS.textTertiary} />
                    <Text style={styles.internMetaText}>{intern.startDate} → {intern.endDate}</Text>
                  </View>
                  <View style={styles.techWrap}>
                    {intern.skillsUsed.map(s => (
                      <View key={s} style={styles.techChip}>
                        <Text style={styles.techText}>{s}</Text>
                      </View>
                    ))}
                  </View>
                </Card>
              ))}
              <TouchableOpacity style={styles.addBtn}>
                <Ionicons name="add-circle-outline" size={18} color={COLORS.primary} />
                <Text style={styles.addBtnText}>Add Internship</Text>
              </TouchableOpacity>
            </View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  headerGrad: { paddingBottom: SPACING['2xl'], paddingHorizontal: SPACING.base },
  backBtn: { marginTop: SPACING.sm, marginBottom: SPACING.base, width: 36 },
  headerContent: { alignItems: 'center' },
  avatarLarge: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)',
    marginBottom: SPACING.sm,
  },
  avatarText: { fontSize: FONT_SIZES['3xl'], fontWeight: '800', color: COLORS.white },
  profileName: { fontSize: FONT_SIZES['2xl'], fontWeight: '800', color: COLORS.white },
  profileId: { fontSize: FONT_SIZES.sm, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  profileTagRow: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.sm },
  profileTag: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: BORDER_RADIUS.full },
  profileTagText: { fontSize: FONT_SIZES.xs, color: 'rgba(255,255,255,0.85)' },
  statsRow: { flexDirection: 'row', marginTop: SPACING.lg, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: BORDER_RADIUS.lg, overflow: 'hidden' },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: SPACING.md },
  statBorder: { borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.2)' },
  statValue: { fontSize: FONT_SIZES.lg, fontWeight: '800', color: COLORS.white },
  statLabel: { fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 2 },

  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: SPACING.base, paddingVertical: SPACING.md, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  socialBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm },
  socialText: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textPrimary },

  bioPad: { padding: SPACING.base, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  bioText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, lineHeight: 20 },

  tabsRow: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.md, gap: SPACING.sm, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tab: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full, backgroundColor: COLORS.gray100 },
  tabActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textSecondary },
  tabTextActive: { color: COLORS.white },

  content: { padding: SPACING.base },

  infoCard: { marginBottom: SPACING.base },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, paddingVertical: SPACING.sm },
  infoRowBorder: { borderTopWidth: 1, borderTopColor: COLORS.borderLight },
  infoIcon: { width: 32, height: 32, borderRadius: BORDER_RADIUS.sm, backgroundColor: COLORS.primaryBg, alignItems: 'center', justifyContent: 'center' },
  infoLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, fontWeight: '500' },
  infoValue: { fontSize: FONT_SIZES.sm, color: COLORS.textPrimary, fontWeight: '600', marginTop: 1 },

  quickStatsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  quickStatBox: { flex: 1, minWidth: '45%', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, borderLeftWidth: 3, ...SHADOWS.sm },
  quickStatNum: { fontSize: FONT_SIZES['3xl'], fontWeight: '800' },
  quickStatLbl: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, fontWeight: '500', marginTop: 2 },

  catTitle: { fontSize: FONT_SIZES.base, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.sm },
  skillsWrap: { gap: SPACING.sm },
  skillChip: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.surface, padding: SPACING.md, borderRadius: BORDER_RADIUS.md, ...SHADOWS.sm },
  skillChipLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  skillName: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textPrimary },

  projCard: { marginBottom: SPACING.md },
  projHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: SPACING.sm },
  projTitle: { fontSize: FONT_SIZES.base, fontWeight: '700', color: COLORS.textPrimary },
  githubBtn: { width: 36, height: 36, borderRadius: BORDER_RADIUS.sm, backgroundColor: COLORS.gray100, alignItems: 'center', justifyContent: 'center' },
  projDesc: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, lineHeight: 19, marginBottom: SPACING.sm },
  techWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: SPACING.sm },
  techChip: { backgroundColor: COLORS.primaryBg, paddingHorizontal: 8, paddingVertical: 3, borderRadius: BORDER_RADIUS.full },
  techText: { fontSize: FONT_SIZES.xs, color: COLORS.primaryDark, fontWeight: '600' },
  projMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  projMetaText: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary },

  certCard: { marginBottom: SPACING.md },
  certHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginBottom: SPACING.sm },
  certIcon: { width: 44, height: 44, borderRadius: BORDER_RADIUS.md, alignItems: 'center', justifyContent: 'center' },
  certName: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textPrimary },
  certOrg: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, marginTop: 2 },
  certMeta: { flexDirection: 'row', gap: SPACING.base, marginBottom: SPACING.sm },
  certDate: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary },
  viewCredBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewCredText: { fontSize: FONT_SIZES.xs, color: COLORS.primary, fontWeight: '600' },

  internCard: { marginBottom: SPACING.md },
  internHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginBottom: SPACING.sm },
  internIcon: { width: 44, height: 44, borderRadius: BORDER_RADIUS.md, alignItems: 'center', justifyContent: 'center' },
  internRole: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textPrimary },
  internCompany: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, marginTop: 2 },
  stipendBadge: { backgroundColor: COLORS.secondaryBg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: BORDER_RADIUS.full },
  stipendText: { fontSize: FONT_SIZES.xs, color: COLORS.secondaryDark, fontWeight: '700' },
  internDesc: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, lineHeight: 19, marginBottom: SPACING.sm },
  internMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: SPACING.sm },
  internMetaText: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary },

  addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.md, borderWidth: 1.5, borderColor: COLORS.primaryLight, borderStyle: 'dashed', marginTop: SPACING.sm },
  addBtnText: { fontSize: FONT_SIZES.sm, color: COLORS.primary, fontWeight: '600' },
});