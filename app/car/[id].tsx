import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Share, Heart, Car as CarIcon, Phone, MessageSquare } from 'lucide-react-native';

export default function CarDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Share size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Heart size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Image Gallery */}
        <View style={styles.imageGallery}>
          <View style={styles.mainImage}>
            <CarIcon size={100} color="#ccc" />
          </View>
          <View style={styles.imageCounter}>
            <Text style={styles.counterText}>1 / 5</Text>
          </View>
        </View>

        {/* Car Info */}
        <View style={styles.infoSection}>
          <Text style={styles.carTitle}>2019 Hyundai Avante</Text>
          <Text style={styles.carPrice}>₩12,000,000</Text>
          <View style={styles.carSpecs}>
            <Text style={styles.specText}>2019 • 45,000km • Gasoline • Automatic</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            Well-maintained 2019 Hyundai Avante with full service history. 
            Single owner, non-smoking vehicle. Regular maintenance performed 
            at authorized dealer. Perfect for city driving.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresGrid}>
            <Text style={styles.featureItem}>✓ Air Conditioning</Text>
            <Text style={styles.featureItem}>✓ Bluetooth</Text>
            <Text style={styles.featureItem}>✓ Backup Camera</Text>
            <Text style={styles.featureItem}>✓ Cruise Control</Text>
            <Text style={styles.featureItem}>✓ Keyless Entry</Text>
            <Text style={styles.featureItem}>✓ Power Windows</Text>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.callButton}>
              <Phone size={18} color="#fff" />
              <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <MessageSquare size={18} color="#fff" />
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  backButton: {
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
  },
  content: {
    flex: 1,
  },
  imageGallery: {
    height: 250,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mainImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCounter: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  counterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  infoSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  carTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  carPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF9800',
    marginBottom: 12,
  },
  carSpecs: {
    marginBottom: 8,
  },
  specText: {
    fontSize: 16,
    color: '#666',
  },
  descriptionSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  featuresSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    fontSize: 14,
    color: '#4CAF50',
    width: '48%',
  },
  contactSection: {
    padding: 20,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9800',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});