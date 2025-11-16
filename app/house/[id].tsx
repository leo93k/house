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
import { ChevronLeft, Share, Heart, Wifi, Wind, Refrigerator, WashingMachine, Microwave, Tv, Sofa, Bed, ShoppingBag, Hospital, School, Coffee, Train, Bus, MapPin, MessageCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Mock property detail data
const getPropertyDetails = (id: string) => {
  const properties = {
    '1': {
      id: '1',
      title: 'Modern Studio in Hongdae',
      price: '800k',
      maintenanceFee: '50k',
      maintenanceFeeDetails: ['Water', 'Internet', 'TV', 'Cleaning'],
      deposit: '5M',
      location: 'Mapo-gu • 2min to Hongik Univ.',
      address: '123-45 Hongdae-ro, Mapo-gu, Seoul',
      details: 'Studio • 20m² • 3rd floor',
      description: 'A modern studio apartment in the heart of Hongdae. Perfect for students and young professionals. Walking distance to Hongik University and numerous cafes, restaurants, and nightlife.',
      options: ['WiFi', 'Air Conditioning', 'Refrigerator', 'Washing Machine', 'Microwave', 'TV', 'Bed'],
      nearbyFacilities: ['Convenience Store 50m', 'Pharmacy 100m', 'Cafe 30m', 'Restaurant 20m'],
      nearbyStations: ['Hongik Univ. Station (Line 2) - 2min walk', 'Sangsu Station (Line 6) - 8min walk'],
      transportation: ['Bus 7011, 7013A at Hongik Univ. Station', 'Airport Bus 6002'],
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
      maintenanceFee: '80k',
      maintenanceFeeDetails: ['Water', 'Internet', 'Gas', 'Security'],
      deposit: '10M',
      location: 'Gangnam-gu • 5min to Gangnam Stn',
      address: '567-89 Gangnam-daero, Gangnam-gu, Seoul',
      details: '1Room • 25m² • 2nd floor',
      description: 'Spacious 1-room apartment near Gangnam Station. Great for professionals working in the Gangnam area. Close to shopping and dining.',
      options: ['WiFi', 'Air Conditioning', 'Refrigerator', 'Washing Machine', 'TV', 'Sofa', 'Bed'],
      nearbyFacilities: ['Shopping Mall 200m', 'Hospital 500m', 'Gym 100m', 'Bank 150m'],
      nearbyStations: ['Gangnam Station (Line 2) - 5min walk', 'Sinnonhyeon Station (Line 9) - 10min walk'],
      transportation: ['Bus 140, 144, 145 at Gangnam Station', 'Express Bus Terminal nearby'],
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
      maintenanceFee: '45k',
      maintenanceFeeDetails: ['Water', 'Internet', 'Elevator'],
      deposit: '3M',
      location: 'Yongsan-gu • 3min to Itaewon Stn',
      address: '321-67 Itaewon-ro, Yongsan-gu, Seoul',
      details: 'Studio • 22m² • 4th floor',
      description: 'Bright and airy studio in international Itaewon district. Perfect for foreigners with easy access to international restaurants and shops.',
      options: ['WiFi', 'Air Conditioning', 'Refrigerator', 'Washing Machine', 'Microwave'],
      nearbyFacilities: ['International Grocery 100m', 'Clinic 200m', 'Park 300m', 'Library 400m'],
      nearbyStations: ['Itaewon Station (Line 6) - 3min walk', 'Noksapyeong Station (Line 6) - 7min walk'],
      transportation: ['Bus 400, 405 at Itaewon Station', 'Direct to Seoul Station'],
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
    router.push('/chat'); // Navigate to chat
  };

  const handleCallPress = () => {
    console.log('Call owner');
  };

  const getOptionIcon = (option: string) => {
    switch (option) {
      case 'WiFi': return <Wifi size={24} color="#666" />;
      case 'Air Conditioning': return <Wind size={24} color="#666" />;
      case 'Refrigerator': return <Refrigerator size={24} color="#666" />;
      case 'Washing Machine': return <WashingMachine size={24} color="#666" />;
      case 'Microwave': return <Microwave size={24} color="#666" />;
      case 'TV': return <Tv size={24} color="#666" />;
      case 'Sofa': return <Sofa size={24} color="#666" />;
      case 'Bed': return <Bed size={24} color="#666" />;
      default: return <Wifi size={24} color="#666" />;
    }
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
            <Text style={styles.price}>Monthly Rent ₩{property.price}</Text>
            <Text style={styles.maintenanceFee}>₩{property.maintenanceFee}</Text>
          </View>

          <Text style={styles.location}>{property.location}</Text>
          <Text style={styles.details}>{property.details}</Text>
          <Text style={styles.address}>{property.address}</Text>
          <Text style={styles.deposit}>Deposit: ₩{property.deposit}</Text>
        </View>

        {/* Management Fee Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Management Fee</Text>
          <View style={styles.managementFeeContainer}>
            <Text style={styles.managementFeeAmount}>₩{property.maintenanceFee}/month</Text>
            <View style={styles.managementFeeDetails}>
              <Text style={styles.managementFeeLabel}>Includes:</Text>
              <Text style={styles.managementFeeItems}>
                {property.maintenanceFeeDetails.join(' • ')}
              </Text>
            </View>
          </View>
        </View>

        {/* Options with Icons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Options</Text>
          <View style={styles.optionsGrid}>
            {property.options.map((option, index) => (
              <View key={index} style={styles.optionItem}>
                {getOptionIcon(option)}
                <Text style={styles.optionText}>{option}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Nearby Facilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Facilities</Text>
          <View style={styles.facilitiesList}>
            {property.nearbyFacilities.map((facility, index) => (
              <View key={index} style={styles.facilityItem}>
                <ShoppingBag size={16} color="#666" />
                <Text style={styles.facilityText}>{facility}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Nearby Stations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Stations</Text>
          <View style={styles.stationsList}>
            {property.nearbyStations.map((station, index) => (
              <View key={index} style={styles.stationItem}>
                <Train size={16} color="#2196F3" />
                <Text style={styles.stationText}>{station}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Transportation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transportation</Text>
          <View style={styles.transportList}>
            {property.transportation.map((transport, index) => (
              <View key={index} style={styles.transportItem}>
                <Bus size={16} color="#4CAF50" />
                <Text style={styles.transportText}>{transport}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Location Map */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <MapPin size={32} color="#2196F3" />
              <Text style={styles.mapText}>Map View</Text>
              <Text style={styles.mapAddress}>{property.address}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{property.description}</Text>
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
          <MessageCircle size={20} color="#fff" />
          <Text style={styles.contactButtonText}>Chat Inquiry</Text>
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
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  maintenanceFee: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  location: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  details: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  address: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  deposit: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
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
  managementFeeContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
  },
  managementFeeAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  managementFeeDetails: {
    gap: 4,
  },
  managementFeeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  managementFeeItems: {
    fontSize: 14,
    color: '#999',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  optionItem: {
    alignItems: 'center',
    width: '22%',
    gap: 8,
  },
  optionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  facilitiesList: {
    gap: 12,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  facilityText: {
    fontSize: 14,
    color: '#333',
  },
  stationsList: {
    gap: 12,
  },
  stationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stationText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  transportList: {
    gap: 12,
  },
  transportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transportText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#e8f4f8',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  mapText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
  },
  mapAddress: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
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
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  callButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
  },
  contactButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});