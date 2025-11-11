import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Search, X, Clock, TrendingUp } from 'lucide-react-native';

const recentSearches = [
  'Hongdae',
  'Gangnam Station',
  'Sinchon',
  'Itaewon',
  'Myeongdong'
];

const popularSearches = [
  'Gangnam Station Studio',
  'Hongdae One Room',
  'Sinchon Officetel',
  'Itaewon Two Room',
  'Seoul Nat\'l Univ Studio',
  'Konkuk Univ One Room',
  'Myeongdong Officetel',
  'Yeouido Studio'
];

export default function HouseSearchScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [recentSearchList, setRecentSearchList] = useState(recentSearches);

  const handleBackPress = () => {
    router.back();
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Add to recent searches if not already there
      const updatedRecent = [query, ...recentSearchList.filter(item => item !== query)].slice(0, 5);
      setRecentSearchList(updatedRecent);
      
      // Navigate to results or perform search
      console.log('Searching for:', query);
      router.back(); // For now, just go back
    }
  };

  const removeRecentSearch = (searchToRemove: string) => {
    setRecentSearchList(recentSearchList.filter(item => item !== searchToRemove));
  };

  const clearAllRecentSearches = () => {
    setRecentSearchList([]);
  };

  const renderRecentSearchItem = ({ item }: { item: string }) => (
    <View style={styles.searchItem}>
      <TouchableOpacity 
        style={styles.searchItemContent}
        onPress={() => handleSearch(item)}
      >
        <Clock size={16} color="#999" />
        <Text style={styles.searchItemText}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => removeRecentSearch(item)}
      >
        <X size={16} color="#999" />
      </TouchableOpacity>
    </View>
  );

  const renderPopularSearchItem = ({ item }: { item: string }) => (
    <TouchableOpacity 
      style={styles.searchItem}
      onPress={() => handleSearch(item)}
    >
      <View style={styles.searchItemContent}>
        <TrendingUp size={16} color="#FF6B6B" />
        <Text style={styles.searchItemText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Search Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Search size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search location, station, or school"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => handleSearch(searchText)}
            autoFocus={true}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <X size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Recent Searches */}
        {recentSearchList.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <TouchableOpacity onPress={clearAllRecentSearches}>
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={recentSearchList}
              renderItem={renderRecentSearchItem}
              keyExtractor={(item, index) => `recent-${index}`}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Popular Searches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Searches</Text>
          </View>
          <FlatList
            data={popularSearches}
            renderItem={renderPopularSearchItem}
            keyExtractor={(item, index) => `popular-${index}`}
            scrollEnabled={false}
          />
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  clearAllText: {
    fontSize: 14,
    color: '#999',
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  searchItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchItemText: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    padding: 4,
  },
});