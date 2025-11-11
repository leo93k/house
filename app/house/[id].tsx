import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Share, Heart } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Mock property detail data
const getPropertyDetails = (id: string) => {
  const properties = {
    '1': {
      id: '1',
      title: 'Modern Studio in Hongdae',
      price: '800k',
      deposit: '5M',
      location: 'Mapo-gu • 2min to Hongik Univ.',
      address: '123-45 Hongdae-ro, Mapo-gu, Seoul',
      details: 'Studio • 20m² • 3rd floor',
      description: 'A modern studio apartment in the heart of Hongdae. Perfect for students and young professionals. Walking distance to Hongik University and numerous cafes, restaurants, and nightlife.',
      amenities: ['WiFi', 'Air Conditioning', 'Refrigerator', 'Washing Machine', 'Microwave'],
      images: ['placeholder1', 'placeholder2', 'placeholder3'],
      ownerName: 'John Kim',
      ownerRating: 4.8,
      isLiked: false,
      availableFrom: '2024-12-01',
      contractType: 'Monthly',
    },
    '2': {
      id: '2',
      title: 'Cozy 1Room Near Gangnam',
      price: '1.2M',
      deposit: '10M',
      location: 'Gangnam-gu • 5min to Gangnam Stn',
      address: '567-89 Gangnam-daero, Gangnam-gu, Seoul',
      details: '1Room • 25m² • 2nd floor',
      description: 'Spacious 1-room apartment near Gangnam Station. Great for professionals working in the Gangnam area. Close to shopping and dining.',
      amenities: ['WiFi', 'Air Conditioning', 'Refrigerator', 'Washing Machine', 'Balcony'],
      images: ['placeholder1', 'placeholder2', 'placeholder3'],
      ownerName: 'Sarah Lee',
      ownerRating: 4.9,
      isLiked: true,
      availableFrom: '2024-11-15',
      contractType: 'Monthly',
    },
    '3': {
      id: '3',
      title: 'Bright Studio in Itaewon',
      price: '650k',
      deposit: '3M',
      location: 'Yongsan-gu • 3min to Itaewon Stn',
      address: '321-67 Itaewon-ro, Yongsan-gu, Seoul',
      details: 'Studio • 22m² • 4th floor',
      description: 'Bright and airy studio in international Itaewon district. Perfect for foreigners with easy access to international restaurants and shops.',
      amenities: ['WiFi', 'Air Conditioning', 'Refrigerator', 'Washing Machine'],
      images: ['placeholder1', 'placeholder2', 'placeholder3'],
      ownerName: 'Mike Johnson',
      ownerRating: 4.7,
      isLiked: false,
      availableFrom: '2024-11-20',
      contractType: 'Monthly',
    },
  };
  
  return properties[id as keyof typeof properties] || properties['1'];
};

export default function PropertyDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const property = getPropertyDetails(id as string);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(property.isLiked);

  const handleBackPress = () => {
    router.back();
  };

  const handleSharePress = () => {
    console.log('Share property');
  };

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };

  const handleContactPress = () => {
    router.push('/chat/1'); // Navigate to chat with owner
  };

  const handleCallPress = () => {
    console.log('Call owner');
  };

  const renderImageGallery = () => (
    <View style={styles.imageContainer}>
      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentImageIndex(index);
        }}
      >
        {property.images.map((image, index) => (
          <View key={index} style={styles.imageSlide}>
            <View style={styles.placeholderImage}>
              {/* Placeholder for photo */}
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoText}>Photo {index + 1}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      
      {/* Image indicators */}
      <View style={styles.imageIndicators}>
        {property.images.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.indicator, 
              index === currentImageIndex && styles.activeIndicator
            ]} 
          />
        ))}
      </View>
      
      {/* Image counter */}
      <View style={styles.imageCounter}>
        <Text style={styles.counterText}>
          {currentImageIndex + 1} / {property.images.length}
        </Text>
      </View>
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
          <Text style={styles.headerTitle}>Property Details</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={handleSharePress}>
            <Share size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleLikePress}>
            <Heart
              size={24}
              color={isLiked ? "#F44336" : "#333"}
              fill={isLiked ? "#F44336" : "none"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        {renderImageGallery()}

        {/* Property Info */}
        <View style={styles.propertyInfo}>
          <View style={styles.priceSection}>
            <Text style={styles.price}>₩{property.price}/month</Text>
            <Text style={styles.deposit}>Deposit: ₩{property.deposit}</Text>
          </View>
          
          <Text style={styles.title}>{property.title}</Text>
          <Text style={styles.details}>{property.details}</Text>
          <Text style={styles.location}>{property.location}</Text>
          <Text style={styles.address}>{property.address}</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{property.description}</Text>
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {property.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Owner Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Owner</Text>
          <View style={styles.ownerInfo}>
            <View style={styles.ownerAvatar}>
              <Text style={styles.avatarText}>{property.ownerName.charAt(0)}</Text>
            </View>
            <View style={styles.ownerDetails}>
              <Text style={styles.ownerName}>{property.ownerName}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.star}>★</Text>
                <Text style={styles.rating}>{property.ownerRating}</Text>
                <Text style={styles.ratingText}>(24 reviews)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Availability */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.availabilityInfo}>
            <View style={styles.availabilityItem}>
              <Text style={styles.availabilityLabel}>Available from:</Text>
              <Text style={styles.availabilityValue}>{property.availableFrom}</Text>
            </View>
            <View style={styles.availabilityItem}>
              <Text style={styles.availabilityLabel}>Contract type:</Text>
              <Text style={styles.availabilityValue}>{property.contractType}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.callButton} onPress={handleCallPress}>
          <Text style={styles.callButtonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton} onPress={handleContactPress}>
          <Text style={styles.contactButtonText}>Contact Owner</Text>
        </TouchableOpacity>
      </View>
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
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  imageSlide: {
    width: width,
    height: 300,
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  activeIndicator: {
    backgroundColor: '#fff',
  },
  imageCounter: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  counterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  propertyInfo: {
    padding: 20,
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
  },
  priceSection: {
    marginBottom: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  deposit: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#999',
  },
  section: {
    padding: 20,
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
    gap: 8,
  },
  checkmark: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  amenityText: {
    fontSize: 14,
    color: '#333',
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ownerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  ownerDetails: {
    flex: 1,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  star: {
    fontSize: 14,
    color: '#FFD700',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  availabilityInfo: {
    gap: 8,
  },
  availabilityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availabilityLabel: {
    fontSize: 16,
    color: '#666',
  },
  availabilityValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bottomPadding: {
    height: 80,
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 12,
  },
  callButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  contactButton: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 12,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});