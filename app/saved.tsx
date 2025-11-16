import { useRouter } from 'expo-router';
import { ArrowDown, Bell, Camera, Check, ChevronLeft, Heart, X } from 'lucide-react-native';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Mock saved properties data
const savedProperties = [
  {
    id: '1',
    title: 'Modern Studio in Hongdae',
    price: '800k',
    location: 'Mapo-gu • 2min to Hongik Univ.',
    details: 'Studio • 20m² • Available',
    savedDate: '2 days ago',
    status: 'available',
    priceChanged: false,
  },
  {
    id: '2',
    title: 'Cozy 1Room Near Gangnam',
    price: '550k',
    originalPrice: '600k',
    location: 'Gangnam-gu • 5min to Gangnam Stn',
    details: '1Room • 25m² • Available',
    savedDate: '1 week ago',
    status: 'available',
    priceChanged: true,
  },
  {
    id: '3',
    title: 'Bright Studio in Itaewon',
    price: '650k',
    location: 'Yongsan-gu • 3min to Itaewon Stn',
    details: 'Studio • 22m² • Rented',
    savedDate: '1 week ago',
    status: 'rented',
    priceChanged: false,
  },
];

export default function SavedScreen() {
  const router = useRouter();
  const [showAvailableOnly, setShowAvailableOnly] = useState(true);

  const filteredProperties = showAvailableOnly
    ? savedProperties.filter(p => p.status === 'available')
    : savedProperties;

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <ChevronLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Favorites</Text>
        </View>
      </View>

      {/* Filter Toggle */}
      <View style={styles.filterToggleContainer}>
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setShowAvailableOnly(!showAvailableOnly)}
        >
          <View style={[
            styles.checkbox,
            showAvailableOnly && styles.checkboxChecked
          ]}>
            {showAvailableOnly && <Check size={14} color="#fff" />}
          </View>
          <Text style={styles.filterToggleLabel}>Show Available Only</Text>
        </TouchableOpacity>
      </View>

      {/* Saved Properties List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredProperties.map((property) => (
          <TouchableOpacity key={property.id} style={styles.propertyCard}>
            <View style={styles.imageContainer}>
              <View style={styles.placeholderImage}>
                <Camera size={60} color="#ccc" />
              </View>
              
              {/* Price Badge */}
              <View style={styles.priceBadge}>
                <Text style={styles.priceText}>
                  ₩{property.price}/month
                </Text>
              </View>
              
              {/* Status Indicators */}
              {property.priceChanged && (
                <View style={styles.priceDropBadge}>
                  <ArrowDown size={12} color="#fff" />
                </View>
              )}
              
              {property.status === 'rented' && (
                <View style={styles.statusBadge}>
                  <X size={12} color="#fff" />
                </View>
              )}
              
              {property.status === 'available' && (
                <View style={styles.notificationBadge}>
                  <Bell size={12} color="#fff" fill="#fff" />
                </View>
              )}
              
              {/* Heart Button */}
              <TouchableOpacity style={styles.heartButton}>
                <Heart size={20} color="#F44336" fill="#F44336" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.cardContent}>
              <Text style={styles.propertyTitle} numberOfLines={1}>
                {property.title}
              </Text>
              <Text style={styles.propertyLocation} numberOfLines={1}>
                {property.location}
              </Text>
              <Text style={[
                styles.propertyDetails, 
                property.status === 'rented' && styles.rentedText
              ]} numberOfLines={1}>
                {property.details}
              </Text>
              
              {/* Price Change Info */}
              {property.priceChanged && (
                <Text style={styles.priceChangeText}>
                  Price dropped from ₩{property.originalPrice}
                </Text>
              )}
              
              <Text style={styles.savedTime}>
                Saved {property.savedDate}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Empty State (when no saved items) */}
      {filteredProperties.length === 0 && (
        <View style={styles.emptyState}>
          <Heart size={80} color="#ddd" />
          <Text style={styles.emptyTitle}>No saved properties yet</Text>
          <Text style={styles.emptySubtitle}>
            Start exploring to save your favorite properties
          </Text>
          <TouchableOpacity style={styles.browseButton}>
            <Text style={styles.browseButtonText}>Browse Properties</Text>
          </TouchableOpacity>
        </View>
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
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  filterToggleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterToggleLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  propertyCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priceText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  priceDropBadge: {
    position: 'absolute',
    top: 8,
    right: 32,
    backgroundColor: '#4CAF50',
    padding: 4,
    borderRadius: 12,
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    right: 32,
    backgroundColor: '#F44336',
    padding: 4,
    borderRadius: 12,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 32,
    backgroundColor: '#FF9800',
    padding: 4,
    borderRadius: 12,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 6,
    borderRadius: 16,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  propertyDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  rentedText: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  priceChangeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 4,
  },
  savedTime: {
    fontSize: 12,
    color: '#999',
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