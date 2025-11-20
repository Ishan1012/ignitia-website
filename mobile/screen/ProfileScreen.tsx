import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

interface ProfileScreenProps extends React.ComponentProps<typeof View> {
  style?: ViewStyle;
}

const ProfileScreen = (props: ProfileScreenProps) => {
  const { logout, userSession } = useAuth();

  useEffect(() => {
    if (!userSession) {
      router.replace("/login");
    }
  }, [userSession]);

  if (!userSession) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#F59E0B" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }



  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error("An error occured. Error: " + error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, props.style]}>
        <Text style={styles.header}>User Profile</Text>

        <View style={styles.profileSection}>
          <Ionicons
            name="person-circle-outline"
            size={120}
            color="#F59E0B"
            style={styles.avatar}
          />

          <Text style={styles.userName}>{userSession.name}</Text>
          <Text style={styles.userEmail}>{userSession.email}</Text>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#1F2937" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    alignItems: 'center',
  },
  header: {
    marginVertical: 12,
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '600',
    color: '#FEF9C3',
    textDecorationColor: 'rgba(253,243,185, 0.5)',
    textDecorationStyle: 'solid',
    shadowColor: '#FDE047',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  avatar: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#FEF3C7',
    opacity: 0.8,
  },
  logoutButton: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#F59E0B',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 40,
  },
  logoutButtonText: {
    color: '#1F2937',
    fontSize: 18,
    fontWeight: '600',
  },
});