import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MessageCircle, Heart, User, Home, Car, Camera } from 'lucide-react-native';

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
  },
  {
    id: '2',
    price: '1.2M',
    maintenanceFee: '80k',
    location: 'Gangnam-gu • 5min to Gangnam Stn',
    details: '1Room • 25m² • 2nd floor',
    isLiked: true,
  },
  {
    id: '3',
    price: '650k',
    maintenanceFee: '45k',
    location: 'Yongsan-gu • 3min to Itaewon Stn',
    details: 'Studio • 22m² • 4th floor',
    isLiked: false,
  },
];

export default function HomeScreen() {
  const router = useRouter();

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
            <User size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

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

      {/* Popular Properties */}
      <View style={styles.popularSection}>
        <Text style={styles.popularTitle}>Popular Properties</Text>
        <View style={styles.popularList}>
          {popularProperties.map((property) => (
            <TouchableOpacity
              key={property.id}
              style={styles.propertyCard}
              onPress={() => handlePropertyPress(property.id)}
            >
              <View style={styles.imageContainer}>
                <View style={styles.placeholderImage}>
                  <Camera size={30} color="#ccc" />
                </View>
                <TouchableOpacity style={styles.heartButton}>
                  <Heart
                    size={16}
                    color={property.isLiked ? "#F44336" : "#666"}
                    fill={property.isLiked ? "#F44336" : "none"}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.propertyPrice}>Monthly Rent ₩{property.price}</Text>
                <Text style={styles.maintenanceFee}>₩{property.maintenanceFee}</Text>
                <Text style={styles.propertyLocation}>{property.location}</Text>
                <Text style={styles.propertyDetails}>{property.details}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 16,
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
});