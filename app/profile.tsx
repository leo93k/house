import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Settings, User, Heart, Eye, MessageSquare, HelpCircle, Shield, LogOut, ChevronRight, Bell, CheckCircle, Search, Home, Globe, Lock, Smartphone, Phone, Star, FileText, Hand, Info } from 'lucide-react-native';

// Mock user data
const userData = {
  name: 'John Smith',
  email: 'john.smith@email.com',
  memberSince: 'Oct 2024',
  profileImage: null,
  isVerified: false,
};

// Icon mapping for dynamic rendering
const iconMap = {
  'heart.fill': Heart,
  'eye.fill': Eye,
  'message.fill': MessageSquare,
  'questionmark.circle': HelpCircle,
  'gear': Settings,
  'shield': Shield,
  'arrow.right.square': LogOut,
};

const activityData = {
  favorites: 12,
  savedSearches: 5,
  recentViews: 8,
  myPosts: 0,
};

export default function ProfileScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const handleNotificationsPress = () => {
    router.push('/notifications');
  };

  const handleSavedPress = () => {
    router.push('/saved');
  };

  const handleEditProfile = () => {
    router.push('/myprofile');
  };

  const handleSignOut = () => {
    console.log('Sign out pressed');
  };

  const renderActivityCard = (
    IconComponent: any, 
    title: string, 
    count: number, 
    onPress: () => void
  ) => (
    <TouchableOpacity style={styles.activityCard} onPress={onPress}>
      <View style={styles.activityIconContainer}>
        <IconComponent size={24} color="#2196F3" />
      </View>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activityCount}>{count}</Text>
    </TouchableOpacity>
  );

  const renderMenuSection = (title: string, items: Array<{
    IconComponent: any;
    label: string;
    onPress: () => void;
    showBadge?: boolean;
  }>) => (
    <View style={styles.menuSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, index) => (
        <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
          <View style={styles.menuLeft}>
            <View style={styles.menuIconContainer}>
              <item.IconComponent size={20} color="#666" />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </View>
          <View style={styles.menuRight}>
            {item.showBadge && <View style={styles.badge} />}
            <ChevronRight size={20} color="#999" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <ChevronLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Setting</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileRow}>
            <View style={styles.profileInfo}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <User size={40} color="#666" fill="#666" />
                </View>
                {userData.isVerified && (
                  <View style={styles.verifiedBadge}>
                    <CheckCircle size={12} color="#fff" />
                  </View>
                )}
              </View>

              <View style={styles.userInfo}>
                <Text style={styles.userName}>{userData.name}</Text>
                <Text style={styles.userEmail}>{userData.email}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* My Favorites Menu */}
        <View style={[styles.menuSection, { borderBottomWidth: 0, paddingVertical: 0 }]}>
          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }]} onPress={() => router.push('/saved')}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <Heart size={20} color="#666" />
              </View>
              <Text style={styles.menuLabel}>My Favorites</Text>
            </View>
            <View style={styles.menuRight}>
              <Text style={styles.menuCount}>{activityData.favorites}</Text>
              <ChevronRight size={20} color="#999" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Settings Menu */}
        <View style={[styles.menuSection, { borderBottomWidth: 0, paddingVertical: 0 }]}>
          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }]} onPress={() => console.log('Language')}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <Globe size={20} color="#666" />
              </View>
              <Text style={styles.menuLabel}>Language</Text>
            </View>
            <View style={styles.menuRight}>
              <ChevronRight size={20} color="#999" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Help & Support Menu */}
        <View style={[styles.menuSection, { borderBottomWidth: 0, paddingVertical: 0 }]}>
          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }]} onPress={() => console.log('Contact support')}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <Phone size={20} color="#666" />
              </View>
              <Text style={styles.menuLabel}>Contact Support</Text>
            </View>
            <View style={styles.menuRight}>
              <ChevronRight size={20} color="#999" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Legal Menu */}
        <View style={[styles.menuSection, { borderBottomWidth: 0, paddingVertical: 0 }]}>
          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }]} onPress={() => console.log('Terms')}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <FileText size={20} color="#666" />
              </View>
              <Text style={styles.menuLabel}>Terms of Service</Text>
            </View>
            <View style={styles.menuRight}>
              <ChevronRight size={20} color="#999" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  memberSince: {
    fontSize: 14,
    color: '#999',
  },
  editButton: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
  },
  activitySection: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  activityCard: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  activityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  activityCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menuSection: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 16,
    color: '#333',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F44336',
  },
  signOutButton: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f44336',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f44336',
  },
  versionInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#999',
  },
});