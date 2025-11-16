import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MessageCircle, Heart, Settings, Home, Car, Camera, Eye, ChevronDown } from 'lucide-react-native';

const categories = [
  {
    id: 'house',
    title: 'House',
    subtitle: 'Find your perfect home',
    icon: Home,
    color: '#2196F3',
    backgroundColor: '#E3F2FD',
    route: '/house',
  },
  {
    id: 'car',
    title: 'Car',
    subtitle: 'Buy & sell cars',
    icon: Car,
    color: '#FF9800',
    backgroundColor: '#FFF3E0',
    route: '/car',
  },
];

const popularProperties = [
  {
    id: '1',
    price: '800k',
    maintenanceFee: '50k',
    location: 'Mapo-gu • 2min to Hongik Univ.',
    details: 'Studio • 20m² • 3rd floor',
    isLiked: false,
    viewCount: 1250,
    likeCount: 89,
  },
  {
    id: '2',
    price: '1.2M',
    maintenanceFee: '80k',
    location: 'Gangnam-gu • 5min to Gangnam Stn',
    details: '1Room • 25m² • 2nd floor',
    isLiked: true,
    viewCount: 980,
    likeCount: 124,
  },
  {
    id: '3',
    price: '650k',
    maintenanceFee: '45k',
    location: 'Yongsan-gu • 3min to Itaewon Stn',
    details: 'Studio • 22m² • 4th floor',
    isLiked: false,
    viewCount: 1120,
    likeCount: 95,
  },
  {
    id: '4',
    price: '950k',
    maintenanceFee: '70k',
    location: 'Jung-gu • 1min to Myeongdong Stn',
    details: '1Room • 28m² • 5th floor',
    isLiked: false,
    viewCount: 2100,
    likeCount: 156,
  },
  {
    id: '5',
    price: '750k',
    maintenanceFee: '55k',
    location: 'Seodaemun-gu • 3min to Sinchon Stn',
    details: 'Studio • 18m² • 2nd floor',
    isLiked: true,
    viewCount: 890,
    likeCount: 67,
  },
  {
    id: '6',
    price: '1.5M',
    maintenanceFee: '100k',
    location: 'Songpa-gu • 2min to Jamsil Stn',
    details: '2Room • 45m² • 10th floor',
    isLiked: false,
    viewCount: 1800,
    likeCount: 142,
  },
  {
    id: '7',
    price: '550k',
    maintenanceFee: '40k',
    location: 'Gwanak-gu • 5min to Seoul Nat\'l Univ.',
    details: 'Studio • 16m² • 3rd floor',
    isLiked: false,
    viewCount: 750,
    likeCount: 58,
  },
  {
    id: '8',
    price: '1.1M',
    maintenanceFee: '85k',
    location: 'Seocho-gu • 3min to Express Bus Terminal',
    details: '1Room • 30m² • 7th floor',
    isLiked: true,
    viewCount: 1650,
    likeCount: 135,
  },
].sort((a, b) => (b.viewCount + b.likeCount * 10) - (a.viewCount + a.likeCount * 10));

export default function HomeScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [properties, setProperties] = useState(popularProperties);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filterOptions = ['All', 'House', 'Car'];

  const handleCategoryPress = (category: typeof categories[0]) => {
    router.push(category.route as any);
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleSavedPress = () => {
    router.push('/saved');
  };

  const handleChatPress = () => {
    router.push('/chat');
  };

  const handlePropertyPress = (propertyId: string) => {
    router.push(`/house/${propertyId}`);
  };

  const loadMoreProperties = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    // Simulate loading more data
    setTimeout(() => {
      const newProperties = properties.map((prop, index) => ({
        ...prop,
        id: `${parseInt(prop.id) + properties.length}`,
        viewCount: prop.viewCount - Math.floor(Math.random() * 100),
        likeCount: prop.likeCount - Math.floor(Math.random() * 10),
      }));
      setProperties([...properties, ...newProperties]);
      setIsLoadingMore(false);
    }, 500);
  };

  const renderPropertyItem = ({ item }: { item: typeof popularProperties[0] }) => (
    <TouchableOpacity
      style={styles.propertyCard}
      onPress={() => handlePropertyPress(item.id)}
    >
      <View style={styles.imageContainer}>
        <View style={styles.placeholderImage}>
          <Camera size={30} color="#ccc" />
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
        <Text style={styles.propertyPrice}>Monthly Rent ₩{item.price}</Text>
        <Text style={styles.maintenanceFee}>₩{item.maintenanceFee}</Text>
        <Text style={styles.propertyLocation}>{item.location}</Text>
        <Text style={styles.propertyDetails}>{item.details}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Eye size={12} color="#999" />
            <Text style={styles.statText}>{item.viewCount}</Text>
          </View>
          <View style={styles.statItem}>
            <Heart size={12} color="#999" />
            <Text style={styles.statText}>{item.likeCount}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logo}>House</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={handleChatPress}>
            <MessageCircle size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleSavedPress}>
            <Heart size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleProfilePress}>
            <Settings size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Find the sale you want.</Text>

          <View style={styles.categoriesRow}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category)}
              >
                <View style={styles.categoryContent}>
                  <View style={[
                    styles.categoryIconContainer,
                    { backgroundColor: category.backgroundColor }
                  ]}>
                    <category.icon
                      size={32}
                      color={category.color}
                    />
                  </View>

                  <View style={styles.categoryTextContainer}>
                    <Text style={styles.categoryTitle}>
                      {category.title}
                    </Text>
                    <Text style={styles.categorySubtitle}>
                      {category.subtitle}
                    </Text>
                  </View>

                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sticky Header */}
        <View style={styles.stickyHeader}>
          <View style={styles.popularHeader}>
            <Text style={styles.popularTitle}>Popular Properties</Text>
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
        </View>

        {/* Popular Properties List */}
        <View style={styles.popularSection}>
          {properties.map((item, index) => (
            <TouchableOpacity
              key={`${item.id}-${index}`}
              style={styles.propertyCard}
              onPress={() => handlePropertyPress(item.id)}
            >
              <View style={styles.imageContainer}>
                <View style={styles.placeholderImage}>
                  <Camera size={30} color="#ccc" />
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
                <Text style={styles.propertyPrice}>Monthly Rent ₩{item.price}</Text>
                <Text style={styles.maintenanceFee}>₩{item.maintenanceFee}</Text>
                <Text style={styles.propertyLocation}>{item.location}</Text>
                <Text style={styles.propertyDetails}>{item.details}</Text>
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Eye size={12} color="#999" />
                    <Text style={styles.statText}>{item.viewCount}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Heart size={12} color="#999" />
                    <Text style={styles.statText}>{item.likeCount}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          {isLoadingMore && (
            <View style={styles.loadingMore}>
              <Text style={styles.loadingText}>Loading more...</Text>
            </View>
          )}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  welcomeSection: {
    padding: 24,
    backgroundColor: '#f8f9fa',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  categoriesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  categoriesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  categoryCardDisabled: {
    backgroundColor: '#f8f8f8',
    opacity: 0.7,
  },
  categoryContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 170,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTextContainer: {
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryTitleDisabled: {
    color: '#999',
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  categorySubtitleDisabled: {
    color: '#aaa',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#999',
  },
  categoryDescriptionDisabled: {
    color: '#ccc',
  },
  categoryArrow: {
    padding: 4,
  },
  comingSoonBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  comingSoonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  popularSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  stickyHeader: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    position: 'relative',
    zIndex: 100,
  },
  popularHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f5f5f5',
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
    top: 40,
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
  popularList: {
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
  loadingMore: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
  },
});