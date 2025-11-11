import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Bell, Heart, User, Search, Mic, Car as CarIcon } from 'lucide-react-native';

// Mock car data
const mockCars = [
  {
    id: '1',
    title: '2019 Hyundai Avante',
    price: '12,000,000',
    year: '2019',
    mileage: '45,000km',
    fuel: 'Gasoline',
    location: 'Seoul, Gangnam-gu',
    isLiked: false,
    condition: 'Excellent',
  },
  {
    id: '2',
    title: '2020 Kia Morning',
    price: '8,500,000',
    year: '2020',
    mileage: '32,000km',
    fuel: 'Gasoline',
    location: 'Seoul, Mapo-gu',
    isLiked: true,
    condition: 'Very Good',
  },
  {
    id: '3',
    title: '2018 BMW 3 Series',
    price: '28,000,000',
    year: '2018',
    mileage: '67,000km',
    fuel: 'Gasoline',
    location: 'Seoul, Seocho-gu',
    isLiked: false,
    condition: 'Good',
  },
  {
    id: '4',
    title: '2021 Tesla Model 3',
    price: '45,000,000',
    year: '2021',
    mileage: '23,000km',
    fuel: 'Electric',
    location: 'Seoul, Songpa-gu',
    isLiked: false,
    condition: 'Excellent',
  },
  {
    id: '5',
    title: '2017 Genesis G80',
    price: '22,000,000',
    year: '2017',
    mileage: '78,000km',
    fuel: 'Gasoline',
    location: 'Seoul, Jung-gu',
    isLiked: true,
    condition: 'Good',
  },
];

const quickFilters = ['🚗 Sedan', '🚙 SUV', '⚡ Electric', '💰 Under 10M', '⚙️ More'];

export default function CarScreen() {
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

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleCarPress = (carId: string) => {
    router.push(`/car/${carId}`);
  };

  const handleSearchPress = () => {
    router.push('/car/search');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <ChevronLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Car</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={handleNotificationsPress}>
            <Bell size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleSavedPress}>
            <Heart size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleProfilePress}>
            <User size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchBar} onPress={handleSearchPress}>
          <Search size={20} color="#999" />
          <Text style={styles.searchPlaceholder}>Search car model, brand...</Text>
          <Mic size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Quick Filters */}
      <View style={styles.controlsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {quickFilters.map((filter, index) => (
            <TouchableOpacity key={index} style={styles.filterChip}>
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Car List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Section: Available Cars */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Cars</Text>
            <Text style={styles.resultsCount}>{mockCars.length} results</Text>
          </View>
          
          {mockCars.map((car) => (
            <TouchableOpacity 
              key={car.id} 
              style={styles.carCard}
              onPress={() => handleCarPress(car.id)}
            >
              <View style={styles.imageContainer}>
                <View style={styles.placeholderImage}>
                  <CarIcon size={60} color="#ccc" />
                </View>
                <TouchableOpacity style={styles.heartButton}>
                  <Heart
                    size={20}
                    color={car.isLiked ? "#F44336" : "#666"}
                    fill={car.isLiked ? "#F44336" : "none"}
                  />
                </TouchableOpacity>
                <View style={styles.conditionBadge}>
                  <Text style={styles.conditionText}>{car.condition}</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.carTitle} numberOfLines={1}>
                  {car.title}
                </Text>
                <Text style={styles.carPrice}>₩{car.price}</Text>
                <View style={styles.carDetails}>
                  <Text style={styles.detailText}>{car.year} • {car.mileage} • {car.fuel}</Text>
                </View>
                <Text style={styles.carLocation} numberOfLines={1}>
                  📍 {car.location}
                </Text>
                <Text style={styles.postedTime}>Posted 3 hours ago</Text>
              </View>
            </TouchableOpacity>
          ))}
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#999',
  },
  controlsContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filtersScroll: {
    paddingVertical: 8,
    paddingLeft: 16,
  },
  filterChip: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
  },
  carCard: {
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
    width: 140,
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 6,
    borderRadius: 16,
  },
  conditionBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  conditionText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  carTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  carPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF9800',
    marginBottom: 6,
  },
  carDetails: {
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  carLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  postedTime: {
    fontSize: 12,
    color: '#999',
  },
});