import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { Car as CarIcon, Check, ChevronLeft, Eye, Heart, MessageCircle, RefreshCw, Search, X } from 'lucide-react-native';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
    viewCount: 1250,
    likeCount: 89,
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
    viewCount: 980,
    likeCount: 124,
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
    viewCount: 2340,
    likeCount: 156,
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
    viewCount: 3120,
    likeCount: 245,
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
    viewCount: 1560,
    likeCount: 98,
  },
];

const filterOptions = {
  manufacturer: ['All', 'Hyundai', 'Kia', 'Genesis', 'Chevrolet', 'Renault', 'BMW', 'Mercedes', 'Audi', 'Tesla'],
  fuel: ['All', 'Gasoline', 'Diesel', 'LPG', 'Hybrid', 'Electric'],
  color: ['All', 'White', 'Black', 'Silver', 'Gray', 'Blue', 'Red', 'Other'],
  region: ['All', 'Seoul', 'Gyeonggi', 'Incheon', 'Busan', 'Daegu', 'Daejeon', 'Gwangju'],
};

export default function CarScreen() {
  const router = useRouter();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedFilterType, setSelectedFilterType] = useState('');
  const [cars, setCars] = useState(mockCars);

  // Filter states
  const [selectedManufacturer, setSelectedManufacturer] = useState('All');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');

  // Applied filter states
  const [appliedManufacturer, setAppliedManufacturer] = useState('Manufacturer');
  const [appliedPriceYear, setAppliedPriceYear] = useState('Price • Year');
  const [appliedMileageFuel, setAppliedMileageFuel] = useState('Mileage • Fuel');
  const [appliedOptions, setAppliedOptions] = useState('Options');

  // Price range (in millions)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  // Year range
  const [yearRange, setYearRange] = useState<[number, number]>([2010, 2024]);
  // Mileage range (in 10k km)
  const [mileageRange, setMileageRange] = useState<[number, number]>([0, 20]);

  // Options selection
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const availableOptions = ['Backup Camera', 'Hi-Pass', 'Auto A/C', 'Bluetooth', 'Navigation', 'Sunroof', 'Leather Seats', 'Heated Seats'];

  const currentQuickFilters = [appliedManufacturer, appliedPriceYear, appliedMileageFuel, appliedOptions];

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  const handleCarPress = (carId: string) => {
    router.push(`/car/${carId}`);
  };

  const handleLikePress = (carId: string) => {
    setCars(prevCars =>
      prevCars.map(car =>
        car.id === carId
          ? { ...car, isLiked: !car.isLiked }
          : car
      )
    );
  };

  const handleFilterPress = (filterIndex: number) => {
    switch (filterIndex) {
      case 0:
        setSelectedFilterType('manufacturer');
        break;
      case 1:
        setSelectedFilterType('priceYear');
        break;
      case 2:
        setSelectedFilterType('mileageFuel');
        break;
      case 3:
        setSelectedFilterType('options');
        break;
    }
    setIsFilterModalVisible(true);
  };

  const closeModal = () => {
    setIsFilterModalVisible(false);
    setSelectedFilterType('');
  };

  const handleApplyFilter = () => {
    if (selectedFilterType === 'manufacturer') {
      setAppliedManufacturer(selectedManufacturer === 'All' ? 'Manufacturer' : selectedManufacturer);
    } else if (selectedFilterType === 'priceYear') {
      const priceLabel = `₩${priceRange[0]}M-${priceRange[1]}M • ${yearRange[0]}-${yearRange[1]}`;
      setAppliedPriceYear(priceLabel);
    } else if (selectedFilterType === 'mileageFuel') {
      const fuelLabel = selectedFuel === 'All' ? '' : selectedFuel;
      const mileageLabel = `${mileageRange[0] * 10}k-${mileageRange[1] * 10}k km`;
      setAppliedMileageFuel(fuelLabel ? `${mileageLabel} • ${fuelLabel}` : mileageLabel);
    } else if (selectedFilterType === 'options') {
      setAppliedOptions(selectedOptions.length > 0 ? `Options (${selectedOptions.length})` : 'Options');
    }
    closeModal();
  };

  const handleResetFilters = () => {
    setAppliedManufacturer('Manufacturer');
    setAppliedPriceYear('Price • Year');
    setAppliedMileageFuel('Mileage • Fuel');
    setAppliedOptions('Options');
    setSelectedManufacturer('All');
    setSelectedFuel('All');
    setSelectedColor('All');
    setSelectedRegion('All');
    setPriceRange([0, 100]);
    setYearRange([2010, 2024]);
    setMileageRange([0, 20]);
    setSelectedOptions([]);
  };

  const toggleOption = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const formatPrice = (value: number) => {
    if (value === 0) return 'Min';
    if (value >= 100) return 'Max';
    return `₩${value}M`;
  };

  const formatMileage = (value: number) => {
    if (value === 0) return 'Min';
    if (value >= 20) return 'Max';
    return `${value * 10}k km`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <ChevronLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Car ({cars.length})</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/chat')}>
            <MessageCircle size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/car/search')}>
          <Search size={20} color="#999" />
          <Text style={styles.searchPlaceholder}>Search car...</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Filters */}
      <View style={styles.controlsContainer}>
        <View style={styles.filtersRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
            {currentQuickFilters.map((filter, index) => (
              <TouchableOpacity
                key={index}
                style={styles.filterChip}
                onPress={() => handleFilterPress(index)}
              >
                <Text style={styles.filterText}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.resetButton} onPress={handleResetFilters}>
            <RefreshCw size={18} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Car List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          {cars.map((car) => (
            <TouchableOpacity
              key={car.id}
              style={styles.carCard}
              onPress={() => handleCarPress(car.id)}
            >
              <View style={styles.imageContainer}>
                <View style={styles.placeholderImage}>
                  <CarIcon size={30} color="#ccc" />
                </View>
                <TouchableOpacity
                  style={styles.heartButton}
                  onPress={() => handleLikePress(car.id)}
                >
                  <Heart
                    size={16}
                    color={car.isLiked ? "#F44336" : "#666"}
                    fill={car.isLiked ? "#F44336" : "none"}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.carPrice}>₩{car.price}</Text>
                <Text style={styles.carTitle} numberOfLines={1}>
                  {car.title}
                </Text>
                <Text style={styles.carDetails}>{car.year} • {car.mileage} • {car.fuel}</Text>
                <Text style={styles.carLocation} numberOfLines={1}>
                  {car.location}
                </Text>
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Eye size={12} color="#999" />
                    <Text style={styles.statText}>{car.viewCount}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Heart size={12} color="#999" />
                    <Text style={styles.statText}>{car.likeCount}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Filter Modal */}
      {isFilterModalVisible && (
        <View style={styles.filterOverlay}>
          <View style={styles.filterSheet}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>
                {selectedFilterType === 'manufacturer' && 'Manufacturer'}
                {selectedFilterType === 'priceYear' && 'Price • Year'}
                {selectedFilterType === 'mileageFuel' && 'Mileage • Fuel'}
                {selectedFilterType === 'options' && 'Options'}
              </Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.filterContent}>
              {selectedFilterType === 'manufacturer' && (
                <View style={styles.optionsList}>
                  {filterOptions.manufacturer.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.optionButton,
                        selectedManufacturer === option && styles.optionButtonActive
                      ]}
                      onPress={() => setSelectedManufacturer(option)}
                    >
                      <Text style={[
                        styles.optionButtonText,
                        selectedManufacturer === option && styles.optionButtonTextActive
                      ]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {selectedFilterType === 'priceYear' && (
                <View style={styles.sliderSection}>
                  <View style={styles.sliderGroup}>
                    <Text style={styles.sliderLabel}>Price Range</Text>
                    <Text style={styles.sliderValue}>
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </Text>
                    <View style={styles.sliderContainer}>
                      <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={100}
                        step={5}
                        value={priceRange[0]}
                        onValueChange={(value) => setPriceRange([value, priceRange[1]])}
                        minimumTrackTintColor="#2196F3"
                        maximumTrackTintColor="#ddd"
                        thumbTintColor="#2196F3"
                      />
                      <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={100}
                        step={5}
                        value={priceRange[1]}
                        onValueChange={(value) => setPriceRange([priceRange[0], value])}
                        minimumTrackTintColor="#2196F3"
                        maximumTrackTintColor="#ddd"
                        thumbTintColor="#2196F3"
                      />
                    </View>
                  </View>

                  <View style={styles.sliderGroup}>
                    <Text style={styles.sliderLabel}>Year</Text>
                    <Text style={styles.sliderValue}>
                      {yearRange[0]} - {yearRange[1]}
                    </Text>
                    <View style={styles.sliderContainer}>
                      <Slider
                        style={styles.slider}
                        minimumValue={2010}
                        maximumValue={2024}
                        step={1}
                        value={yearRange[0]}
                        onValueChange={(value) => setYearRange([value, yearRange[1]])}
                        minimumTrackTintColor="#2196F3"
                        maximumTrackTintColor="#ddd"
                        thumbTintColor="#2196F3"
                      />
                      <Slider
                        style={styles.slider}
                        minimumValue={2010}
                        maximumValue={2024}
                        step={1}
                        value={yearRange[1]}
                        onValueChange={(value) => setYearRange([yearRange[0], value])}
                        minimumTrackTintColor="#2196F3"
                        maximumTrackTintColor="#ddd"
                        thumbTintColor="#2196F3"
                      />
                    </View>
                  </View>
                </View>
              )}

              {selectedFilterType === 'mileageFuel' && (
                <View style={styles.sliderSection}>
                  <View style={styles.sliderGroup}>
                    <Text style={styles.sliderLabel}>Mileage</Text>
                    <Text style={styles.sliderValue}>
                      {formatMileage(mileageRange[0])} - {formatMileage(mileageRange[1])}
                    </Text>
                    <View style={styles.sliderContainer}>
                      <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={20}
                        step={1}
                        value={mileageRange[0]}
                        onValueChange={(value) => setMileageRange([value, mileageRange[1]])}
                        minimumTrackTintColor="#2196F3"
                        maximumTrackTintColor="#ddd"
                        thumbTintColor="#2196F3"
                      />
                      <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={20}
                        step={1}
                        value={mileageRange[1]}
                        onValueChange={(value) => setMileageRange([mileageRange[0], value])}
                        minimumTrackTintColor="#2196F3"
                        maximumTrackTintColor="#ddd"
                        thumbTintColor="#2196F3"
                      />
                    </View>
                  </View>

                  <Text style={styles.sliderLabel}>Fuel Type</Text>
                  <View style={styles.optionsList}>
                    {filterOptions.fuel.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          styles.optionButton,
                          selectedFuel === option && styles.optionButtonActive
                        ]}
                        onPress={() => setSelectedFuel(option)}
                      >
                        <Text style={[
                          styles.optionButtonText,
                          selectedFuel === option && styles.optionButtonTextActive
                        ]}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {selectedFilterType === 'options' && (
                <View style={styles.optionsGrid}>
                  {availableOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.optionCheckbox,
                        selectedOptions.includes(option) && styles.optionCheckboxActive
                      ]}
                      onPress={() => toggleOption(option)}
                    >
                      <View style={[
                        styles.checkbox,
                        selectedOptions.includes(option) && styles.checkboxChecked
                      ]}>
                        {selectedOptions.includes(option) && <Check size={14} color="#fff" />}
                      </View>
                      <Text style={styles.optionCheckboxText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </ScrollView>

            {/* Bottom Action Buttons */}
            <View style={styles.filterActions}>
              <TouchableOpacity style={styles.filterResetButton} onPress={handleResetFilters}>
                <Text style={styles.filterResetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilter}>
                <Text style={styles.applyButtonText}>Apply</Text>
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
    paddingTop: 12,
    paddingBottom: 8,
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
    paddingVertical: 8,
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filtersScroll: {
    flex: 1,
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
  resetButton: {
    padding: 10,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    gap: 16,
  },
  carCard: {
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
  carPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  carTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  carDetails: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  carLocation: {
    fontSize: 13,
    color: '#666',
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
  filterOverlay: {
    position: 'absolute',
    top: 182,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
  filterSheet: {
    backgroundColor: '#fff',
    height: '80%',
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
  filterContent: {
    padding: 20,
  },
  optionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  optionButtonActive: {
    backgroundColor: '#f0f8ff',
    borderColor: '#2196F3',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  optionButtonTextActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
  sliderSection: {
    gap: 24,
  },
  sliderGroup: {
    gap: 8,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sliderValue: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
    textAlign: 'center',
  },
  sliderContainer: {
    gap: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  optionsGrid: {
    gap: 12,
  },
  optionCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  optionCheckboxActive: {
    opacity: 1,
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
  optionCheckboxText: {
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
  filterResetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  filterResetButtonText: {
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
