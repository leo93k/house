import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Bell, Heart, User, Search, Mic, Map, MapPin, X } from 'lucide-react-native';

// Mock property data with coordinates
const mockProperties = [
  {
    id: '1',
    title: 'Modern Studio in Hongdae',
    price: '800k',
    location: 'Mapo-gu • 2min to Hongik Univ.',
    details: 'Studio • 20m² • 3rd floor',
    isLiked: false,
    lat: 37.5563,
    lng: 126.9236,
  },
  {
    id: '2',
    title: 'Cozy 1Room Near Gangnam',
    price: '1.2M',
    location: 'Gangnam-gu • 5min to Gangnam Stn',
    details: '1Room • 25m² • 2nd floor',
    isLiked: true,
    lat: 37.4979,
    lng: 127.0276,
  },
  {
    id: '3',
    title: 'Bright Studio in Itaewon',
    price: '650k',
    location: 'Yongsan-gu • 3min to Itaewon Stn',
    details: 'Studio • 22m² • 4th floor',
    isLiked: false,
    lat: 37.5344,
    lng: 126.9944,
  },
  {
    id: '4',
    title: 'Spacious 1Room in Myeongdong',
    price: '950k',
    location: 'Jung-gu • 1min to Myeongdong Stn',
    details: '1Room • 28m² • 5th floor',
    isLiked: false,
    lat: 37.5636,
    lng: 126.9834,
  },
  {
    id: '5',
    title: 'Modern Studio in Sinchon',
    price: '750k',
    location: 'Seodaemun-gu • 3min to Sinchon Stn',
    details: 'Studio • 18m² • 2nd floor',
    isLiked: true,
    lat: 37.5558,
    lng: 126.9364,
  },
];

const quickFilters = ['지역 • Seoul', 'Transaction Type', 'Price', 'Structure/Area'];
const currentRegion = 'Seoul';

const filterOptions = {
  region: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Ulsan'],
  transactionType: ['Rent', 'Sale', 'Monthly Rent'],
  price: ['Under 500k', '500k-1M', '1M-2M', '2M-5M', 'Over 5M'],
  structure: ['Studio', '1Room', '2Room', '3Room+', 'Officetel']
};

export default function HouseScreen() {
  const router = useRouter();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedFilterType, setSelectedFilterType] = useState('');

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

  const handlePropertyPress = (propertyId: string) => {
    router.push(`/house/${propertyId}`);
  };

  const handleSearchPress = () => {
    router.push('/house/search');
  };

  const handleFilterPress = (filterType: string) => {
    if (filterType.includes('지역')) {
      setSelectedFilterType('region');
    } else if (filterType === 'Transaction Type') {
      setSelectedFilterType('transactionType');
    } else if (filterType === 'Price') {
      setSelectedFilterType('price');
    } else if (filterType === 'Structure/Area') {
      setSelectedFilterType('structure');
    }
    setIsFilterModalVisible(true);
  };

  const closeModal = () => {
    setIsFilterModalVisible(false);
    setSelectedFilterType('');
  };

  const getFilterOptions = () => {
    switch (selectedFilterType) {
      case 'region':
        return filterOptions.region;
      case 'transactionType':
        return filterOptions.transactionType;
      case 'price':
        return filterOptions.price;
      case 'structure':
        return filterOptions.structure;
      default:
        return [];
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
          <Text style={styles.headerTitle}>House</Text>
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
          <Text style={styles.searchPlaceholder}>Search location or station...</Text>
          <Mic size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Quick Filters */}
      <View style={styles.controlsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {quickFilters.map((filter, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.filterChip}
              onPress={() => handleFilterPress(filter)}
            >
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
      </View>

      {/* Content - Always Map View */}
      <View style={styles.mapContainer}>
          {/* Mock Map View */}
          <View style={styles.mockMap}>
            <Text style={styles.mapLabel}>Seoul Map</Text>
            {mockProperties.map((property) => (
              <TouchableOpacity
                key={property.id}
                style={[
                  styles.mapPin,
                  {
                    left: `${((property.lng - 126.8) / 0.4) * 100}%`,
                    top: `${((37.6 - property.lat) / 0.15) * 100}%`,
                  }
                ]}
                onPress={() => handlePropertyPress(property.id)}
              >
                <View style={styles.pinIcon}>
                  <Text style={styles.pinPrice}>₩{property.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      {/* Content - Always Map View */}
      <View style={styles.mapContainer}>
          {/* Mock Map View */}
          <View style={styles.mockMap}>
            <Text style={styles.mapLabel}>Seoul Map</Text>
            {mockProperties.map((property) => (
              <TouchableOpacity
                key={property.id}
                style={[
                  styles.mapPin,
                  {
                    left: `${((property.lng - 126.8) / 0.4) * 100}%`,
                    top: `${((37.6 - property.lat) / 0.15) * 100}%`,
                  }
                ]}
                onPress={() => handlePropertyPress(property.id)}
              >
                <View style={styles.pinIcon}>
                  <Text style={styles.pinPrice}>₩{property.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* View All Properties Button */}
          <View style={styles.viewAllContainer}>
            <TouchableOpacity style={styles.viewAllButton} onPress={() => router.push('/house/list')}>
              <Text style={styles.viewAllText}>{currentRegion} 매물 전체보기({mockProperties.length}개)</Text>
            </TouchableOpacity>
          </View>
        </View>

      {/* Filter Modal positioned after Quick Filters */}
      {isFilterModalVisible && (
        <View style={styles.filterOverlay}>
          <View style={styles.filterSheet}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>
                {selectedFilterType === 'region' && '지역 선택'}
                {selectedFilterType === 'transactionType' && 'Transaction Type'}
                {selectedFilterType === 'price' && 'Price Range'}
                {selectedFilterType === 'structure' && 'Structure/Area'}
              </Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.filterOptionsList}>
              {getFilterOptions().map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.filterOptionItem}
                  onPress={() => {
                    // Handle option selection here
                    closeModal();
                  }}
                >
                  <Text style={styles.filterOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            {/* Bottom Action Buttons */}
            <View style={styles.filterActions}>
              <TouchableOpacity style={styles.resetButton}>
                <Text style={styles.resetButtonText}>초기화</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={closeModal}>
                <Text style={styles.applyButtonText}>적용하기</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  filtersContainer: {
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
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  horizontalCard: {
    width: 160,
    marginLeft: 16,
  },
  horizontalImageContainer: {
    position: 'relative',
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
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
  horizontalCardContent: {
    paddingHorizontal: 4,
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
  postedTime: {
    fontSize: 12,
    color: '#999',
  },
  // Map View Styles
  mapContainer: {
    flex: 1,
  },
  mockMap: {
    flex: 1,
    backgroundColor: '#e8f4f8',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapLabel: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2196F3',
    opacity: 0.3,
  },
  mapPin: {
    position: 'absolute',
    zIndex: 10,
  },
  pinIcon: {
    backgroundColor: '#2196F3',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  pinPrice: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    maxHeight: 200,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  mapPropertyCard: {
    width: 180,
    marginLeft: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapCardImage: {
    height: 100,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapCardHeart: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 4,
    borderRadius: 12,
  },
  mapCardContent: {
    padding: 12,
  },
  mapCardPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
    marginBottom: 4,
  },
  mapCardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  mapCardLocation: {
    fontSize: 12,
    color: '#666',
  },
  viewAllContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  viewAllButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  viewAllText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  filterOverlay: {
    position: 'absolute',
    top: 175, // Start from below the filter controls
    left: 0,
    right: 0,
    bottom: 0, // Extend to bottom for full dimmed coverage
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
  filterSheet: {
    backgroundColor: '#fff',
    height: 450, // Increased height for the sheet
    paddingTop: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  filterOptionsList: {
    paddingHorizontal: 20,
  },
  filterOptionItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#333',
  },
  filterActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});