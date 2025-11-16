import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { Camera, Check, ChevronLeft, Heart, MessageCircle, RefreshCw, X } from 'lucide-react-native';
import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Mock property data
const mockProperties = [
  {
    id: '1',
    title: 'Modern Studio in Hongdae',
    price: '800k',
    maintenanceFee: '50k',
    location: 'Mapo-gu • 2min to Hongik Univ.',
    details: 'Studio • 20m² • 3rd floor',
    isLiked: false,
  },
  {
    id: '2',
    title: 'Cozy 1Room Near Gangnam',
    price: '1.2M',
    maintenanceFee: '80k',
    location: 'Gangnam-gu • 5min to Gangnam Stn',
    details: '1Room • 25m² • 2nd floor',
    isLiked: true,
  },
  {
    id: '3',
    title: 'Bright Studio in Itaewon',
    price: '650k',
    maintenanceFee: '45k',
    location: 'Yongsan-gu • 3min to Itaewon Stn',
    details: 'Studio • 22m² • 4th floor',
    isLiked: false,
  },
  {
    id: '4',
    title: 'Spacious 1Room in Myeongdong',
    price: '950k',
    maintenanceFee: '70k',
    location: 'Jung-gu • 1min to Myeongdong Stn',
    details: '1Room • 28m² • 5th floor',
    isLiked: false,
  },
  {
    id: '5',
    title: 'Modern Studio in Sinchon',
    price: '750k',
    maintenanceFee: '55k',
    location: 'Seodaemun-gu • 3min to Sinchon Stn',
    details: 'Studio • 18m² • 2nd floor',
    isLiked: true,
  },
];

const currentRegion = 'Pyeongchang';

const filterOptions = {
  region: ['All Pyeongchang', '평창읍', '미탄면', '방림면', '대화면', '봉평면', '용평면', '진부면', '대관령면'],
  transactionType: ['All', 'Full Deposit', 'Monthly Rent', 'Sale'],
  area: ['All', 'Under 33㎡', '33-62㎡', '66-95㎡', '99-128㎡', '132-161㎡', 'Over 132㎡']
};

export default function HouseListScreen() {
  const router = useRouter();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedFilterType, setSelectedFilterType] = useState('');
  const [properties, setProperties] = useState(mockProperties);

  // Temporary selection states (during modal editing)
  const [selectedTransactionType, setSelectedTransactionType] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All Pyeongchang');
  const [selectedArea, setSelectedArea] = useState('All');
  const [selectedParkingOnly, setSelectedParkingOnly] = useState(false);

  // Applied filter values (shown in chips)
  const [appliedRegion, setAppliedRegion] = useState('All Pyeongchang');
  const [appliedTransactionType, setAppliedTransactionType] = useState('Transaction Type • Price');
  const [appliedArea, setAppliedArea] = useState('Area');
  const [appliedParkingOnly, setAppliedParkingOnly] = useState(false);

  // Price range states
  const [depositRange, setDepositRange] = useState<[number, number]>([0, 500]);
  const [monthlyRentRange, setMonthlyRentRange] = useState<[number, number]>([0, 3]);
  const [salePriceRange, setSalePriceRange] = useState<[number, number]>([0, 1000]);

  const formatPrice = (value: number, maxValue: number, unit: string = 'M') => {
    if (value === 0) return 'Min';
    if (value >= maxValue) return 'Max';
    return `₩${value}${unit}`;
  };

  // Dynamic quick filters based on applied values
  const currentQuickFilters = [appliedRegion, appliedTransactionType, appliedArea];

  const handleBackPress = () => {
    router.back();
  };

  const handlePropertyPress = (propertyId: string) => {
    router.push(`/house/${propertyId}`);
  };

  const handleLikePress = (propertyId: string) => {
    setProperties(prevProperties =>
      prevProperties.map(property =>
        property.id === propertyId
          ? { ...property, isLiked: !property.isLiked }
          : property
      )
    );
  };

  const handleFilterPress = (filterIndex: number) => {
    switch (filterIndex) {
      case 0:
        setSelectedFilterType('region');
        setSelectedRegion(appliedRegion);
        break;
      case 1:
        setSelectedFilterType('transactionType');
        setSelectedTransactionType(appliedTransactionType);
        break;
      case 2:
        setSelectedFilterType('area');
        setSelectedArea(appliedArea === 'Area' ? 'All' : appliedArea);
        setSelectedParkingOnly(appliedParkingOnly);
        break;
    }
    setIsFilterModalVisible(true);
  };

  const closeModal = () => {
    setIsFilterModalVisible(false);
    setSelectedFilterType('');
  };

  const handleApplyFilter = () => {
    if (selectedFilterType === 'transactionType') {
      setAppliedTransactionType(selectedTransactionType);
    } else if (selectedFilterType === 'region') {
      setAppliedRegion(selectedRegion);
    } else if (selectedFilterType === 'area') {
      const areaLabel = selectedArea === 'All' ? 'Area' : selectedArea;
      setAppliedArea(selectedParkingOnly ? `${areaLabel} • Parking` : areaLabel);
      setAppliedParkingOnly(selectedParkingOnly);
    }
    closeModal();
  };

  const getFilterOptions = () => {
    switch (selectedFilterType) {
      case 'region':
        return filterOptions.region;
      case 'transactionType':
        return filterOptions.transactionType;
      case 'area':
        return filterOptions.area;
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
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => handleLikePress(item.id)}
        >
          <Heart
            size={16}
            color={item.isLiked ? "#F44336" : "#666"}
            fill={item.isLiked ? "#F44336" : "none"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.propertyPrice}>Monthly Rent ₩{item.price}</Text>
        <Text style={styles.maintenanceFee}>₩{item.maintenanceFee}</Text>
        <Text style={styles.propertyLocation}>{item.location}</Text>
        <Text style={styles.propertyDetails}>{item.details}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <ChevronLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{currentRegion} ({properties.length})</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/chat')}>
            <MessageCircle size={24} color="#333" />
          </TouchableOpacity>
        </View>
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
          <TouchableOpacity style={styles.refreshButton}>
            <RefreshCw size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Property List */}
      <FlatList
        data={properties}
        renderItem={renderPropertyItem}
        keyExtractor={(item) => item.id}
        style={styles.propertyList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        extraData={properties}
      />

      {/* Filter Modal */}
      {isFilterModalVisible && (
        <View style={styles.filterOverlay}>
          <View style={styles.filterSheet}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>
                {selectedFilterType === 'region' && 'Select Region'}
                {selectedFilterType === 'transactionType' && 'Transaction Type • Price'}
                {selectedFilterType === 'area' && 'Area'}
              </Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>
            {selectedFilterType === 'transactionType' ? (
              <ScrollView style={styles.filterContent}>
                {/* Transaction Type Buttons */}
                <View style={styles.transactionTypeSection}>
                  <Text style={styles.sectionLabel}>Transaction Type</Text>
                  <View style={styles.transactionTypeButtons}>
                    {['All', 'Full Deposit', 'Monthly Rent', 'Sale'].map((type) => (
                      <TouchableOpacity
                        key={type}
                        style={[
                          styles.transactionTypeButton,
                          selectedTransactionType === type && styles.transactionTypeButtonActive
                        ]}
                        onPress={() => setSelectedTransactionType(type)}
                      >
                        <Text style={[
                          styles.transactionTypeButtonText,
                          selectedTransactionType === type && styles.transactionTypeButtonTextActive
                        ]}>
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Deposit Section */}
                {(selectedTransactionType === 'All' || selectedTransactionType === 'Full Deposit' || selectedTransactionType === 'Monthly Rent') && (
                  <View style={styles.priceSection}>
                    <Text style={styles.sectionLabel}>Deposit</Text>
                    <View style={styles.priceRangeDisplay}>
                      <Text style={styles.priceRangeText}>
                        {formatPrice(depositRange[0], 500)} - {formatPrice(depositRange[1], 500)}
                      </Text>
                    </View>
                    <View style={styles.sliderContainer}>
                      <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={500}
                        step={10}
                        value={depositRange[1]}
                        onValueChange={(value) => setDepositRange([depositRange[0], value])}
                        minimumTrackTintColor="#2196F3"
                        maximumTrackTintColor="#ddd"
                        thumbTintColor="#2196F3"
                      />
                    </View>
                    <View style={styles.priceLabels}>
                      <Text style={styles.priceLabelText}>Min</Text>
                      <Text style={styles.priceLabelText}>₩250M</Text>
                      <Text style={styles.priceLabelText}>Max</Text>
                    </View>
                  </View>
                )}

                {/* Monthly Rent Section */}
                {(selectedTransactionType === 'All' || selectedTransactionType === 'Monthly Rent') && (
                  <View style={styles.priceSection}>
                    <Text style={styles.sectionLabel}>Monthly Rent</Text>
                    <View style={styles.priceRangeDisplay}>
                      <Text style={styles.priceRangeText}>
                        {formatPrice(monthlyRentRange[0], 3)} - {formatPrice(monthlyRentRange[1], 3)}
                      </Text>
                    </View>
                    <View style={styles.sliderContainer}>
                      <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={3}
                        step={0.1}
                        value={monthlyRentRange[1]}
                        onValueChange={(value) => setMonthlyRentRange([monthlyRentRange[0], value])}
                        minimumTrackTintColor="#2196F3"
                        maximumTrackTintColor="#ddd"
                        thumbTintColor="#2196F3"
                      />
                    </View>
                    <View style={styles.priceLabels}>
                      <Text style={styles.priceLabelText}>Min</Text>
                      <Text style={styles.priceLabelText}>₩1.5M</Text>
                      <Text style={styles.priceLabelText}>Max</Text>
                    </View>
                  </View>
                )}

                {/* Sale Price Section */}
                {(selectedTransactionType === 'All' || selectedTransactionType === 'Sale') && (
                  <View style={styles.priceSection}>
                    <Text style={styles.sectionLabel}>Sale Price</Text>
                    <View style={styles.priceRangeDisplay}>
                      <Text style={styles.priceRangeText}>
                        {formatPrice(salePriceRange[0], 1000)} - {formatPrice(salePriceRange[1], 1000)}
                      </Text>
                    </View>
                    <View style={styles.sliderContainer}>
                      <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={1000}
                        step={50}
                        value={salePriceRange[1]}
                        onValueChange={(value) => setSalePriceRange([salePriceRange[0], value])}
                        minimumTrackTintColor="#2196F3"
                        maximumTrackTintColor="#ddd"
                        thumbTintColor="#2196F3"
                      />
                    </View>
                    <View style={styles.priceLabels}>
                      <Text style={styles.priceLabelText}>Min</Text>
                      <Text style={styles.priceLabelText}>₩500M</Text>
                      <Text style={styles.priceLabelText}>Max</Text>
                    </View>
                  </View>
                )}
              </ScrollView>
            ) : selectedFilterType === 'area' ? (
              <ScrollView style={styles.filterContent}>
                {/* Area Size Section */}
                <View style={styles.areaSizeSection}>
                  <Text style={styles.sectionLabel}>Exclusive Area</Text>
                  <View style={styles.areaOptionsContainer}>
                    {filterOptions.area.map((option, index) => {
                      const isSelected = option === selectedArea;
                      return (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.areaOptionButton,
                            isSelected && styles.areaOptionButtonActive
                          ]}
                          onPress={() => setSelectedArea(option)}
                        >
                          <Text style={[
                            styles.areaOptionButtonText,
                            isSelected && styles.areaOptionButtonTextActive
                          ]}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Parking Toggle Section */}
                <View style={styles.parkingSection}>
                  <TouchableOpacity
                    style={styles.parkingToggleRow}
                    onPress={() => setSelectedParkingOnly(!selectedParkingOnly)}
                  >
                    <View style={[
                      styles.checkbox,
                      selectedParkingOnly && styles.checkboxChecked
                    ]}>
                      {selectedParkingOnly && <Check size={14} color="#fff" />}
                    </View>
                    <Text style={styles.checkboxLabel}>Parking Available Only</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            ) : (
              <ScrollView style={styles.filterOptionsList}>
                {getFilterOptions().map((option, index) => {
                  const isSelected = selectedFilterType === 'region' && option === selectedRegion;

                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.filterOptionItem,
                        isSelected && styles.filterOptionItemSelected
                      ]}
                      onPress={() => {
                        if (selectedFilterType === 'region') {
                          setSelectedRegion(option);
                        }
                      }}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        isSelected && styles.filterOptionTextSelected
                      ]}>
                        {option}
                      </Text>
                      {isSelected && (
                        <Check size={20} color="#2196F3" />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}

            {/* Bottom Action Buttons */}
            <View style={styles.filterActions}>
              <TouchableOpacity style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Reset</Text>
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
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filtersScroll: {
    flex: 1,
    paddingVertical: 8,
    paddingLeft: 16,
  },
  refreshButton: {
    padding: 12,
    marginRight: 8,
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
  filterOverlay: {
    position: 'absolute',
    top: 114,
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
  filterOptionsList: {
    paddingHorizontal: 0,
  },
  filterOptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  filterOptionItemSelected: {
    backgroundColor: '#f0f8ff',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#333',
  },
  filterOptionTextSelected: {
    color: '#2196F3',
    fontWeight: '600',
  },
  filterContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  transactionTypeSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  transactionTypeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  transactionTypeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  transactionTypeButtonActive: {
    borderColor: '#2196F3',
    backgroundColor: '#f0f8ff',
  },
  transactionTypeButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  transactionTypeButtonTextActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
  priceSection: {
    marginBottom: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  priceRangeDisplay: {
    alignItems: 'center',
    marginVertical: 16,
  },
  priceRangeText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 12,
    textAlign: 'center',
  },
  sliderContainer: {
    marginVertical: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 8,
  },
  priceLabelText: {
    fontSize: 12,
    color: '#999',
  },
  areaSizeSection: {
    marginBottom: 24,
  },
  areaOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  areaOptionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  areaOptionButtonActive: {
    borderColor: '#2196F3',
    backgroundColor: '#f0f8ff',
  },
  areaOptionButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  areaOptionButtonTextActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
  parkingSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  parkingToggleRow: {
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
  checkboxLabel: {
    fontSize: 16,
    fontWeight: '500',
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