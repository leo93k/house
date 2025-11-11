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
import { ChevronLeft, Heart, ArrowDown, Home, MessageCircle, User, BellOff } from 'lucide-react-native';

// Mock notifications data
const notifications = [
  {
    id: '1',
    type: 'price_drop',
    title: 'Price Drop Alert',
    message: 'Gangnam Studio price dropped from ₩600k to ₩550k',
    timestamp: '2 hours ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'new_property',
    title: 'New Property Match',
    message: 'New studio in Hongdae matches your search criteria',
    timestamp: '1 day ago',
    isRead: true,
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message',
    message: 'John Kim replied to your inquiry about Itaewon Studio',
    timestamp: '2 days ago',
    isRead: true,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const handleSavedPress = () => {
    router.push('/saved');
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'price_drop':
        return ArrowDown;
      case 'new_property':
        return Home;
      case 'message':
        return MessageCircle;
      default:
        return Heart;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'price_drop':
        return '#4CAF50';
      case 'new_property':
        return '#2196F3';
      case 'message':
        return '#FF9800';
      default:
        return '#666';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <ChevronLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationItem,
                !notification.isRead && styles.unreadNotification
              ]}
            >
              <View style={[
                styles.iconContainer,
                { backgroundColor: `${getNotificationColor(notification.type)}20` }
              ]}>
                {(() => {
                  const IconComponent = getNotificationIcon(notification.type);
                  return <IconComponent 
                    size={24} 
                    color={getNotificationColor(notification.type)} 
                  />;
                })()}
              </View>
              
              <View style={styles.notificationContent}>
                <Text style={[
                  styles.notificationTitle,
                  !notification.isRead && styles.unreadTitle
                ]}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationMessage} numberOfLines={2}>
                  {notification.message}
                </Text>
                <Text style={styles.timestamp}>
                  {notification.timestamp}
                </Text>
              </View>
              
              {!notification.isRead && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <BellOff size={80} color="#ddd" />
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptySubtitle}>
              We'll notify you about price drops, new matches, and messages
            </Text>
          </View>
        )}
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  unreadNotification: {
    backgroundColor: '#f8f9fa',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: '600',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
    marginLeft: 8,
    marginTop: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});