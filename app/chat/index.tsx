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
import { Search, ChevronRight, Camera, MessageCircle, ChevronLeft, Heart, User } from 'lucide-react-native';

// Mock chat data
const chatRooms = [
  {
    id: '1',
    propertyTitle: 'Hongdae Studio Apartment',
    ownerName: 'John Kim',
    lastMessage: 'Is it still available?',
    timestamp: '2 hours ago',
    unreadCount: 2,
    propertyImage: 'placeholder',
    isOnline: true,
  },
  {
    id: '2',
    propertyTitle: 'Gangnam 1Room',
    ownerName: 'Sarah Lee',
    lastMessage: 'Thank you for the info',
    timestamp: 'Yesterday',
    unreadCount: 0,
    propertyImage: 'placeholder',
    isOnline: false,
  },
  {
    id: '3',
    propertyTitle: 'Itaewon Studio',
    ownerName: 'Mike Johnson',
    lastMessage: 'When can I visit?',
    timestamp: '2 days ago',
    unreadCount: 0,
    propertyImage: 'placeholder',
    isOnline: true,
  },
];

export default function ChatScreen() {
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

  const handleChatPress = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  const renderChatItem = (chat: typeof chatRooms[0]) => (
    <TouchableOpacity
      key={chat.id}
      style={styles.chatItem}
      onPress={() => handleChatPress(chat.id)}
    >
      {/* Property Image */}
      <View style={styles.chatImageContainer}>
        <View style={styles.placeholderImage}>
          <Camera size={30} color="#ccc" />
        </View>
        {chat.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      {/* Chat Content */}
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.propertyTitle} numberOfLines={1}>
            {chat.propertyTitle}
          </Text>
          <Text style={styles.timestamp}>{chat.timestamp}</Text>
        </View>

        <Text style={styles.ownerName} numberOfLines={1}>
          {chat.ownerName}
        </Text>

        <Text style={styles.lastMessage} numberOfLines={1}>
          {chat.lastMessage}
        </Text>
      </View>

      {/* Unread Badge */}
      {chat.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{chat.unreadCount}</Text>
        </View>
      )}

      {/* Chevron */}
      <ChevronRight size={16} color="#ccc" />
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MessageCircle size={80} color="#ddd" />
      <Text style={styles.emptyTitle}>No conversations yet</Text>
      <Text style={styles.emptySubtitle}>
        Start browsing to find properties and connect with owners
      </Text>
      <TouchableOpacity style={styles.browseButton}>
        <Text style={styles.browseButtonText}>Browse Properties</Text>
      </TouchableOpacity>
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
          <Text style={styles.headerTitle}>Messages</Text>
        </View>
      </View>

      {/* Chat List or Empty State */}
      {chatRooms.length > 0 ? (
        <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
          {/* Active Conversations Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Conversations</Text>
            {chatRooms.filter(chat => chat.unreadCount > 0 || chat.timestamp.includes('hour')).map(renderChatItem)}
          </View>

          {/* Recent Conversations Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent</Text>
            {chatRooms.filter(chat => chat.unreadCount === 0 && !chat.timestamp.includes('hour')).map(renderChatItem)}
          </View>
        </ScrollView>
      ) : (
        renderEmptyState()
      )}
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
  },
  searchButton: {
    padding: 4,
  },
  chatList: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f8f8',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    gap: 12,
  },
  chatImageContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  propertyTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  ownerName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  lastMessage: {
    fontSize: 14,
    color: '#888',
  },
  unreadBadge: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
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
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});