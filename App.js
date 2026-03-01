import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, SHADOWS } from './src/constants/theme';

// ─── Error Boundary for Web Debugging ─────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('CareerOS Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, backgroundColor: '#FEF2F2' }}>
          <Text style={{ fontSize: 24, fontWeight: '800', color: '#EF4444', marginBottom: 12 }}>Something went wrong</Text>
          <Text style={{ fontSize: 14, color: '#374151', textAlign: 'center', marginBottom: 8 }}>
            {this.state.error?.toString()}
          </Text>
          <Text style={{ fontSize: 11, color: '#6B7280', textAlign: 'center' }}>
            {this.state.errorInfo?.componentStack?.slice(0, 500)}
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

// Auth Screens
import LoginScreen from './src/screens/auth/LoginScreen';

// Main Screens
import HomeScreen from './src/screens/home/HomeScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import AcademicsScreen from './src/screens/academics/AcademicsScreen';
import SkillsScreen from './src/screens/skills/SkillsScreen';
import RoadmapScreen from './src/screens/roadmap/RoadmapScreen';
import PredictionScreen from './src/screens/prediction/PredictionScreen';
import MarketScreen from './src/screens/market/MarketScreen';
import MentorshipScreen from './src/screens/mentorship/MentorshipScreen';
import WellnessScreen from './src/screens/wellness/WellnessScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ─── Notifications Screen (inline) ───────────────────────────────────────────
import { SafeAreaView } from 'react-native-safe-area-context';
import { NOTIFICATIONS } from './src/constants/mockData';
import Card from './src/components/common/Card';

function NotificationsScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={notifStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={notifStyles.title}>Notifications</Text>
        <View style={{ width: 22 }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: SPACING.base, paddingBottom: 40 }}>
        {NOTIFICATIONS.map(notif => (
          <Card key={notif.id} style={notifStyles.card} padding="base">
            <View style={notifStyles.row}>
              <View style={[notifStyles.icon, { backgroundColor: notif.read ? COLORS.gray100 : COLORS.primaryBg }]}>
                <Ionicons name={notif.icon} size={18} color={notif.read ? COLORS.textTertiary : COLORS.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <Text style={[notifStyles.notifTitle, !notif.read && { color: COLORS.primaryDark }]}>{notif.title}</Text>
                  {!notif.read && <View style={notifStyles.dot} />}
                </View>
                <Text style={notifStyles.msg}>{notif.message}</Text>
                <Text style={notifStyles.time}>{notif.time}</Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const notifStyles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: SPACING.base, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  title: { fontSize: FONT_SIZES.xl, fontWeight: '800', color: COLORS.textPrimary },
  card: { marginBottom: SPACING.sm },
  row: { flexDirection: 'row', gap: SPACING.md },
  icon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  notifTitle: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textPrimary, flex: 1 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary },
  msg: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, lineHeight: 17 },
  time: { fontSize: FONT_SIZES.xs, color: COLORS.textTertiary, marginTop: 4 },
});

// ─── Custom Tab Bar ───────────────────────────────────────────────────────────
function CustomTabBar({ state, descriptors, navigation }) {
  const tabs = [
    { name: 'Home', icon: 'home-outline', activeIcon: 'home', label: 'Home' },
    { name: 'Academics', icon: 'bar-chart-outline', activeIcon: 'bar-chart', label: 'Academic' },
    { name: 'Skills', icon: 'code-slash-outline', activeIcon: 'code-slash', label: 'Skills' },
    { name: 'Roadmap', icon: 'map-outline', activeIcon: 'map', label: 'Roadmap' },
    { name: 'More', icon: 'grid-outline', activeIcon: 'grid', label: 'More' },
  ];

  return (
    <View style={tabStyles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tab = tabs[index];

        return (
          <TouchableOpacity
            key={route.key}
            style={tabStyles.tabItem}
            onPress={() => {
              if (!isFocused) navigation.navigate(route.name);
            }}
            activeOpacity={0.7}
          >
            {isFocused && <View style={tabStyles.activeIndicator} />}
            <View style={[tabStyles.iconWrap, isFocused && tabStyles.iconWrapActive]}>
              <Ionicons
                name={isFocused ? tab.activeIcon : tab.icon}
                size={22}
                color={isFocused ? COLORS.white : COLORS.textTertiary}
              />
            </View>
            <Text style={[tabStyles.label, isFocused && tabStyles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const tabStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingBottom: 20,
    paddingTop: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    ...SHADOWS.lg,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 4,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -8,
    width: 24,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  iconWrap: {
    width: 40,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: COLORS.primary,
  },
  label: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    fontWeight: '500',
    marginTop: 2,
  },
  labelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});

// ─── More Tab Screen ──────────────────────────────────────────────────────────
function MoreScreen({ navigation }) {
  const menuItems = [
    { label: 'My Profile', icon: 'person', color: COLORS.primary, screen: 'Profile' },
    { label: 'Placement Prediction', icon: 'analytics', color: COLORS.secondary, screen: 'Prediction' },
    { label: 'Job Market Hub', icon: 'trending-up', color: COLORS.warning, screen: 'Market' },
    { label: 'Mentorship', icon: 'people', color: COLORS.pink, screen: 'Mentorship' },
    { label: 'Wellness & Tracking', icon: 'heart', color: '#14B8A6', screen: 'Wellness' },
    { label: 'Notifications', icon: 'notifications', color: COLORS.purple, screen: 'Notifications' },
  ];

  return (
    <SafeAreaView style={moreStyles.safe}>
      <View style={moreStyles.header}>
        <Text style={moreStyles.headerTitle}>CareerOS</Text>
        <Text style={moreStyles.headerSub}>All Modules</Text>
      </View>
      <ScrollView contentContainerStyle={moreStyles.scroll}>
        <View style={moreStyles.grid}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.label}
              style={moreStyles.card}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.85}
            >
              <View style={[moreStyles.icon, { backgroundColor: item.color + '18' }]}>
                <Ionicons name={item.icon} size={28} color={item.color} />
              </View>
              <Text style={moreStyles.cardLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={moreStyles.infoCard}>
          <View style={moreStyles.infoLogo}>
            <Ionicons name="briefcase" size={24} color={COLORS.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={moreStyles.infoTitle}>CareerOS v1.0</Text>
            <Text style={moreStyles.infoSub}>AI-Powered Career Intelligence Platform</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const moreStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SPACING.base, paddingTop: SPACING.lg, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerTitle: { fontSize: FONT_SIZES['3xl'], fontWeight: '800', color: COLORS.primary },
  headerSub: { fontSize: FONT_SIZES.sm, color: COLORS.textTertiary, marginTop: 2 },
  scroll: { padding: SPACING.base, paddingBottom: 40 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.lg },
  card: { width: '47%', backgroundColor: COLORS.surface, borderRadius: 14, padding: SPACING.base, alignItems: 'center', ...SHADOWS.md },
  icon: { width: 56, height: 56, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.sm },
  cardLabel: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center' },
  infoCard: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, backgroundColor: COLORS.surface, padding: SPACING.base, borderRadius: 14, ...SHADOWS.sm },
  infoLogo: { width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  infoTitle: { fontSize: FONT_SIZES.base, fontWeight: '700', color: COLORS.textPrimary },
  infoSub: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, marginTop: 2 },
});

// ─── Main Tab Navigator ───────────────────────────────────────────────────────
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Academics" component={AcademicsScreen} />
      <Tab.Screen name="Skills" component={SkillsScreen} />
      <Tab.Screen name="Roadmap" component={RoadmapScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Main" component={MainTabs} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Prediction" component={PredictionScreen} />
              <Stack.Screen name="Market" component={MarketScreen} />
              <Stack.Screen name="Mentorship" component={MentorshipScreen} />
              <Stack.Screen name="Wellness" component={WellnessScreen} />
              <Stack.Screen name="Notifications" component={NotificationsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
