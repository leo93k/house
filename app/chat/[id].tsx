import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Send, Camera, Phone } from 'lucide-react-native';

// Mock chat data
const getChatData = (id: string) => {
  const chats = {
    '1': {
      id: '1',
      propertyTitle: 'Hongdae Studio Apartment',
      ownerName: 'John Kim',
      isOnline: true,
      messages: [
        { id: '1', text: 'Hello! I am interested in your property.', sender: 'me', timestamp: '10:30 AM' },
        { id: '2', text: 'Hi! Thank you for your interest. What would you like to know?', sender: 'owner', timestamp: '10:32 AM' },
        { id: '3', text: 'Is it still available?', sender: 'me', timestamp: '10:35 AM' },
        { id: '4', text: 'Yes, it is! Would you like to schedule a viewing?', sender: 'owner', timestamp: '10:36 AM' },
      ],
    },
    '2': {
      id: '2',
      propertyTitle: 'Gangnam 1Room',
      ownerName: 'Sarah Lee',
      isOnline: false,
      messages: [
        { id: '1', text: 'Hi, I saw your listing and I am very interested.', sender: 'me', timestamp: 'Yesterday 2:00 PM' },
        { id: '2', text: 'Great! The property is available from next month.', sender: 'owner', timestamp: 'Yesterday 2:15 PM' },
        { id: '3', text: 'Thank you for the info', sender: 'me', timestamp: 'Yesterday 2:20 PM' },
      ],
    },
    '3': {
      id: '3',
      propertyTitle: 'Itaewon Studio',
      ownerName: 'Mike Johnson',
      isOnline: true,
      messages: [
        { id: '1', text: 'Hello, is this property pet-friendly?', sender: 'me', timestamp: '2 days ago' },
        { id: '2', text: 'Yes, small pets are allowed!', sender: 'owner', timestamp: '2 days ago' },
        { id: '3', text: 'When can I visit?', sender: 'me', timestamp: '2 days ago' },
      ],
    },
  };

  return chats[id as keyof typeof chats] || chats['1'];
};

export default function ChatDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const chatData = getChatData(id as string);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(chatData.messages);

  const handleBackPress = () => {
    router.back();
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: String(messages.length + 1),
        text: message.trim(),
        sender: 'me',
        timestamp: 'Just now',
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleCallPress = () => {
    console.log('Call owner');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <ChevronLeft size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle} numberOfLines={1}>{chatData.propertyTitle}</Text>
            <View style={styles.ownerStatus}>
              <Text style={styles.ownerName}>{chatData.ownerName}</Text>
              {chatData.isOnline && (
                <View style={styles.onlineDot} />
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.callButton} onPress={handleCallPress}>
          <Phone size={20} color="#2196F3" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.sender === 'me' ? styles.myMessage : styles.ownerMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.sender === 'me' ? styles.myMessageText : styles.ownerMessageText,
                ]}
              >
                {msg.text}
              </Text>
              <Text
                style={[
                  styles.messageTime,
                  msg.sender === 'me' ? styles.myMessageTime : styles.ownerMessageTime,
                ]}
              >
                {msg.timestamp}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Camera size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send size={20} color={message.trim() ? '#fff' : '#999'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    justifyContent: 'space-between',
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
    flex: 1,
    gap: 8,
  },
  backButton: {
    padding: 4,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  ownerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ownerName: {
    fontSize: 14,
    color: '#666',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  callButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2196F3',
    borderBottomRightRadius: 4,
  },
  ownerMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#fff',
  },
  ownerMessageText: {
    color: '#333',
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
  },
  myMessageTime: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'right',
  },
  ownerMessageTime: {
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 8,
  },
  attachButton: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    color: '#333',
    textAlignVertical: 'center',
    lineHeight: 20,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
});
