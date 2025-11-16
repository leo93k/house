import { useRouter } from 'expo-router';
import { ArrowDown, Bell, Camera, Check, ChevronLeft, Heart, X, Eye, ChevronDown } from 'lucide-react-native';
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
    maintenanceFee: '50k',
    location: 'Mapo-gu • 2min to Hongik Univ.',
    details: 'Studio • 20m² • 3rd floor',
    savedDate: '2 days ago',
    status: 'available',
    priceChanged: false,
    viewCount: 1250,
    likeCount: 89,
  },
  {
    id: '2',
    title: 'Cozy 1Room Near Gangnam',
    price: '550k',
    maintenanceFee: '60k',
    originalPrice: '600k',
    location: 'Gangnam-gu • 5min to Gangnam Stn',
    details: '1Room • 25m² • 2nd floor',
    savedDate: '1 week ago',
    status: 'available',
    priceChanged: true,
    viewCount: 980,
    likeCount: 124,
  },
  {
    id: '3',
    title: 'Bright Studio in Itaewon',
    price: '650k',
    maintenanceFee: '45k',
    location: 'Yongsan-gu • 3min to Itaewon Stn',
    details: 'Studio • 22m² • 4th floor',
    savedDate: '1 week ago',
    status: 'rented',
    priceChanged: false,
    viewCount: 1120,
    likeCount: 95,
  },
];

export default function SavedScreen() {
  const router = useRouter();
  const [showAvailableOnly, setShowAvailableOnly] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const filterOptions = ['All', 'House', 'Car'];

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
        <TouchableOpacity
          style={styles.filterDropdown}
          onPress={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          <Text style={styles.filterText}>{selectedFilter}</Text>
          <ChevronDown size={16} color="#666" />
        </TouchableOpacity>
      </View>
      {isDropdownVisible && (
        <View style={styles.dropdownMenu}>
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.dropdownItem,
                selectedFilter === option && styles.dropdownItemSelected
              ]}
              onPress={() => {
                setSelectedFilter(option);
                setIsDropdownVisible(false);
              }}
            >
              <Text style={[
                styles.dropdownItemText,
                selectedFilter === option && styles.dropdownItemTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Saved Properties List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {filteredProperties.map((property) => (
            <TouchableOpacity key={property.id} style={styles.propertyCard}>
              <View style={styles.imageContainer}>
                <View style={styles.placeholderImage}>
                  <Camera size={30} color="#ccc" />
                </View>

                {/* Heart Button */}
                <TouchableOpacity style={styles.heartButton}>
                  <Heart size={16} color="#F44336" fill="#F44336" />
                </TouchableOpacity>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.propertyPrice}>Monthly Rent ₩{property.price}</Text>
                <Text style={styles.maintenanceFee}>₩{property.maintenanceFee}</Text>
                <Text style={styles.propertyLocation} numberOfLines={1}>
                  {property.location}
                </Text>
                <Text style={[
                  styles.propertyDetails,
                  property.status === 'rented' && styles.rentedText
                ]} numberOfLines={1}>
                  {property.details}
                </Text>
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Eye size={12} color="#999" />
                    <Text style={styles.statText}>{property.viewCount}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Heart size={12} color="#999" />
                    <Text style={styles.statText}>{property.likeCount}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 130,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
    minWidth: 100,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownItemSelected: {
    backgroundColor: '#e3f2fd',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownItemTextSelected: {
    color: '#2196F3',
    fontWeight: '600',
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
    justifyContent: 'center',
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  maintenanceFee: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  propertyLocation: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  propertyDetails: {
    fontSize: 13,
    color: '#666',
  },
  rentedText: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
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