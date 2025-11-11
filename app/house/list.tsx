import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Bell, Heart, User, Search, Mic, Camera, X } from 'lucide-react-native';

// Mock property data
const mockProperties = [
  {
    id: '1',
    title: 'Modern Studio in Hongdae',
    price: '800k',
    location: 'Mapo-gu • 2min to Hongik Univ.',
    details: 'Studio • 20m² • 3rd floor',
    isLiked: false,
  },
  {
    id: '2',
    title: 'Cozy 1Room Near Gangnam',
    price: '1.2M',
    location: 'Gangnam-gu • 5min to Gangnam Stn',
    details: '1Room • 25m² • 2nd floor',
    isLiked: true,
  },
  {
    id: '3',
    title: 'Bright Studio in Itaewon',
    price: '650k',
    location: 'Yongsan-gu • 3min to Itaewon Stn',
    details: 'Studio • 22m² • 4th floor',
    isLiked: false,
  },
  {
    id: '4',
    title: 'Spacious 1Room in Myeongdong',
    price: '950k',
    location: 'Jung-gu • 1min to Myeongdong Stn',
    details: '1Room • 28m² • 5th floor',
    isLiked: false,
  },
  {
    id: '5',
    title: 'Modern Studio in Sinchon',
    price: '750k',
    location: 'Seodaemun-gu • 3min to Sinchon Stn',
    details: 'Studio • 18m² • 2nd floor',
    isLiked: true,
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

export default function HouseListScreen() {
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

  const renderPropertyItem = ({ item }: { item: typeof mockProperties[0] }) => (
    <TouchableOpacity 
      style={styles.propertyCard}
      onPress={() => handlePropertyPress(item.id)}
    >
      <View style={styles.imageContainer}>
        <View style={styles.placeholderImage}>
          <Camera size={30} color="#ccc" />
        </View>
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>₩{item.price}/month</Text>
        </View>
        <TouchableOpacity style={styles.heartButton}>
          <Heart
            size={16}
            color={item.isLiked ? "#F44336" : "#666"}
            fill={item.isLiked ? "#F44336" : "none"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <Text style={styles.propertyLocation}>{item.location}</Text>
        <Text style={styles.propertyDetails}>{item.details}</Text>
        <Text style={styles.postedTime}>Posted 2 hours ago</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>

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

      {/* Property List */}
      <FlatList
        data={mockProperties}
        renderItem={renderPropertyItem}
        keyExtractor={(item) => item.id}
        style={styles.propertyList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Filter Modal */}
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
  propertyList: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    padding: 16,
    gap: 16,
  },
  propertyCard: {
    flexDirection: 'row',
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
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
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
  filterOverlay: {
    position: 'absolute',
    top: 175,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
  filterSheet: {
    backgroundColor: '#fff',
    height: 450,
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