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
import { ChevronLeft, Share, Heart, Car as CarIcon, Gauge, Calendar, Fuel, Settings, MapPin, MessageCircle, Shield, Wrench, Bluetooth, Camera, Wind, Navigation } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Mock car detail data
const getCarDetails = (id: string) => {
  const cars = {
    '1': {
      id: '1',
      title: '2019 Hyundai Avante',
      price: '12,000,000',
      year: '2019',
      mileage: '45,000km',
      fuel: 'Gasoline',
      transmission: 'Automatic',
      color: 'White',
      location: 'Seoul, Gangnam-gu',
      address: '123-45 Gangnam-daero, Gangnam-gu, Seoul',
      description: 'Well-maintained 2019 Hyundai Avante with full service history. Single owner, non-smoking vehicle. Regular maintenance performed at authorized dealer. Perfect for city driving.',
      options: ['Air Conditioning', 'Bluetooth', 'Backup Camera', 'Cruise Control', 'Navigation', 'Sunroof'],
      images: ['placeholder1', 'placeholder2', 'placeholder3', 'placeholder4', 'placeholder5'],
      sellerName: 'John Kim',
      sellerRating: 4.8,
      isLiked: false,
      condition: 'Excellent',
      accidents: 0,
      insurance: 'Full Coverage',
    },
    '2': {
      id: '2',
      title: '2020 Kia Morning',
      price: '8,500,000',
      year: '2020',
      mileage: '32,000km',
      fuel: 'Gasoline',
      transmission: 'Automatic',
      color: 'Silver',
      location: 'Seoul, Mapo-gu',
      address: '567-89 Mapo-daero, Mapo-gu, Seoul',
      description: 'Compact and fuel-efficient Kia Morning. Perfect for urban commuting. Low mileage and excellent condition.',
      options: ['Air Conditioning', 'Bluetooth', 'Power Windows', 'Central Locking'],
      images: ['placeholder1', 'placeholder2', 'placeholder3'],
      sellerName: 'Sarah Lee',
      sellerRating: 4.9,
      isLiked: true,
      condition: 'Very Good',
      accidents: 0,
      insurance: 'Full Coverage',
    },
    '3': {
      id: '3',
      title: '2018 BMW 3 Series',
      price: '28,000,000',
      year: '2018',
      mileage: '67,000km',
      fuel: 'Gasoline',
      transmission: 'Automatic',
      color: 'Black',
      location: 'Seoul, Seocho-gu',
      address: '321-67 Seocho-daero, Seocho-gu, Seoul',
      description: 'Luxury BMW 3 Series with premium features. Excellent driving experience with powerful engine and smooth handling.',
      options: ['Air Conditioning', 'Bluetooth', 'Backup Camera', 'Navigation', 'Leather Seats', 'Sunroof', 'Heated Seats'],
      images: ['placeholder1', 'placeholder2', 'placeholder3', 'placeholder4'],
      sellerName: 'Mike Park',
      sellerRating: 4.7,
      isLiked: false,
      condition: 'Good',
      accidents: 1,
      insurance: 'Full Coverage',
    },
  };

  return cars[id as keyof typeof cars] || cars['1'];
};

export default function CarDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const car = getCarDetails(id as string);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(car.isLiked);

  const handleBackPress = () => {
    router.back();
  };

  const handleSharePress = () => {
    console.log('Share car');
  };

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };

  const handleContactPress = () => {
    router.push('/chat');
  };

  const handleCallPress = () => {
    console.log('Call seller');
  };

  const getOptionIcon = (option: string) => {
    switch (option) {
      case 'Air Conditioning': return <Wind size={24} color="#666" />;
      case 'Bluetooth': return <Bluetooth size={24} color="#666" />;
      case 'Backup Camera': return <Camera size={24} color="#666" />;
      case 'Cruise Control': return <Gauge size={24} color="#666" />;
      case 'Navigation': return <Navigation size={24} color="#666" />;
      case 'Sunroof': return <CarIcon size={24} color="#666" />;
      case 'Leather Seats': return <CarIcon size={24} color="#666" />;
      case 'Heated Seats': return <CarIcon size={24} color="#666" />;
      default: return <Settings size={24} color="#666" />;
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
        {car.images.map((image, index) => (
          <View key={index} style={styles.imageSlide}>
            <View style={styles.placeholderImage}>
              <CarIcon size={80} color="#ccc" />
              <Text style={styles.photoText}>Photo {index + 1}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Image indicators */}
      <View style={styles.imageIndicators}>
        {car.images.map((_, index) => (
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
          {currentImageIndex + 1} / {car.images.length}
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

        {/* Car Info */}
        <View style={styles.carInfo}>
          <Text style={styles.price}>₩{car.price}</Text>
          <Text style={styles.title}>{car.title}</Text>
          <Text style={styles.specs}>{car.year} • {car.mileage} • {car.fuel} • {car.transmission}</Text>
          <Text style={styles.location}>{car.location}</Text>
          <Text style={styles.address}>{car.address}</Text>
        </View>

        {/* Vehicle Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Details</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Year</Text>
              <Text style={styles.detailValue}>{car.year}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mileage</Text>
              <Text style={styles.detailValue}>{car.mileage}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Fuel Type</Text>
              <Text style={styles.detailValue}>{car.fuel}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transmission</Text>
              <Text style={styles.detailValue}>{car.transmission}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Color</Text>
              <Text style={styles.detailValue}>{car.color}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Condition</Text>
              <Text style={styles.detailValue}>{car.condition}</Text>
            </View>
          </View>
        </View>

        {/* Safety Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Information</Text>
          <View style={styles.safetyContainer}>
            <View style={styles.safetyItem}>
              <Shield size={20} color="#4CAF50" />
              <Text style={styles.safetyText}>Accidents: {car.accidents === 0 ? 'None' : `${car.accidents} reported`}</Text>
            </View>
            <View style={styles.safetyItem}>
              <Wrench size={20} color="#2196F3" />
              <Text style={styles.safetyText}>Insurance: {car.insurance}</Text>
            </View>
          </View>
        </View>

        {/* Options with Icons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features & Options</Text>
          <View style={styles.optionsGrid}>
            {car.options.map((option, index) => (
              <View key={index} style={styles.optionItem}>
                {getOptionIcon(option)}
                <Text style={styles.optionText}>{option}</Text>
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
              <Text style={styles.mapAddress}>{car.address}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{car.description}</Text>
        </View>

        {/* Seller Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seller Information</Text>
          <View style={styles.sellerInfo}>
            <View style={styles.sellerAvatar}>
              <Text style={styles.avatarText}>{car.sellerName.charAt(0)}</Text>
            </View>
            <View style={styles.sellerDetails}>
              <Text style={styles.sellerName}>{car.sellerName}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.star}>★</Text>
                <Text style={styles.rating}>{car.sellerRating}</Text>
                <Text style={styles.ratingText}>(18 reviews)</Text>
              </View>
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
    gap: 8,
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
  carInfo: {
    padding: 20,
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  specs: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  location: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  address: {
    fontSize: 13,
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
  detailsContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  safetyContainer: {
    gap: 12,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  safetyText: {
    fontSize: 14,
    color: '#333',
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
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sellerAvatar: {
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
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
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
