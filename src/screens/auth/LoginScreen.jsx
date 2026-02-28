import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Invalid email format';
    if (!password.trim()) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Main');
    }, 1200);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Main');
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Header Gradient */}
          <LinearGradient colors={['#6366F1', '#8B5CF6', '#A78BFA']} style={styles.headerGradient}>
            <View style={styles.logoBox}>
              <Ionicons name="briefcase" size={36} color={COLORS.white} />
            </View>
            <Text style={styles.appName}>CareerOS</Text>
            <Text style={styles.tagline}>Your AI-Powered Career Intelligence Platform</Text>
          </LinearGradient>

          {/* Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.welcomeText}>Welcome Back 👋</Text>
            <Text style={styles.welcomeSub}>Sign in to continue your career journey</Text>

            {/* Email Input */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>University Email</Text>
              <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                <Ionicons name="mail-outline" size={18} color={COLORS.textTertiary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="arjun@university.edu"
                  placeholderTextColor={COLORS.textTertiary}
                  value={email}
                  onChangeText={(t) => { setEmail(t); setErrors(prev => ({ ...prev, email: null })); }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Password Input */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                <Ionicons name="lock-closed-outline" size={18} color={COLORS.textTertiary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.textTertiary}
                  value={password}
                  onChangeText={(t) => { setPassword(t); setErrors(prev => ({ ...prev, password: null })); }}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                  <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={18} color={COLORS.textTertiary} />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
              style={[styles.signInBtn, loading && styles.signInBtnDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.signInGradient}>
                {loading ? (
                  <Text style={styles.signInText}>Signing in...</Text>
                ) : (
                  <>
                    <Text style={styles.signInText}>Sign In</Text>
                    <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Demo Login */}
            <TouchableOpacity style={styles.demoBtn} onPress={handleDemoLogin} activeOpacity={0.8}>
              <Ionicons name="flash" size={16} color={COLORS.primary} />
              <Text style={styles.demoBtnText}>Demo Login (Student View)</Text>
            </TouchableOpacity>

            {/* Register Link */}
            <View style={styles.registerRow}>
              <Text style={styles.registerText}>New to CareerOS? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Info Cards */}
          <View style={styles.infoRow}>
            {[
              { icon: 'analytics', label: 'AI Predictions', color: COLORS.primary },
              { icon: 'map', label: 'Career Roadmap', color: COLORS.secondary },
              { icon: 'people', label: 'Mentorship', color: COLORS.purple },
            ].map((item) => (
              <View key={item.label} style={styles.infoCard}>
                <View style={[styles.infoIcon, { backgroundColor: item.color + '18' }]}>
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </View>
                <Text style={styles.infoLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flexGrow: 1 },
  headerGradient: {
    paddingTop: SPACING['2xl'],
    paddingBottom: SPACING['3xl'],
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  appName: {
    fontSize: FONT_SIZES['4xl'],
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: FONT_SIZES.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.base,
    marginTop: -SPACING.xl,
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING.xl,
    ...SHADOWS.xl,
  },
  welcomeText: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  welcomeSub: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  fieldGroup: { marginBottom: SPACING.base },
  fieldLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.gray50,
    paddingHorizontal: SPACING.md,
    height: 50,
  },
  inputError: { borderColor: COLORS.danger },
  inputIcon: { marginRight: SPACING.sm },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    height: '100%',
  },
  eyeBtn: { padding: 4 },
  errorText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.danger,
    marginTop: 4,
    marginLeft: 2,
  },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: SPACING.lg, marginTop: -SPACING.xs },
  forgotText: { fontSize: FONT_SIZES.sm, color: COLORS.primary, fontWeight: '600' },
  signInBtn: { borderRadius: BORDER_RADIUS.md, overflow: 'hidden', marginBottom: SPACING.base },
  signInBtnDisabled: { opacity: 0.75 },
  signInGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  signInText: { fontSize: FONT_SIZES.lg, fontWeight: '700', color: COLORS.white },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginVertical: SPACING.base,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { fontSize: FONT_SIZES.sm, color: COLORS.textTertiary },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.primaryLight,
    backgroundColor: COLORS.primaryBg,
    marginBottom: SPACING.lg,
  },
  demoBtnText: { fontSize: FONT_SIZES.base, color: COLORS.primary, fontWeight: '600' },
  registerRow: { flexDirection: 'row', justifyContent: 'center' },
  registerText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  registerLink: { fontSize: FONT_SIZES.sm, color: COLORS.primary, fontWeight: '700' },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xl,
    gap: SPACING.sm,
  },
  infoCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  infoLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
  },
});