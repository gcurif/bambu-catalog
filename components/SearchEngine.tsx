import { FilterSchemaItem } from '@/model/schema';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Searchbar, TextInput } from 'react-native-paper';

import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';




export interface SearchEngineProps {
  schema: FilterSchemaItem[];
  onSearch?: (searchTerm: string, filters: Record<string, string>) => void;
  onClear?: () => void;
}

export const SearchEngine: React.FC<SearchEngineProps> = ({
  schema = [],
  onSearch,
  onClear,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilters({});
    onClear?.();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Searchbar
          placeholder="Buscar..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          mode='bar'
          icon='search'
          style={styles.searchBar}
        />
      {schema.map((item, index) => (
        <View key={index} style={styles.filterContainer}>
          {item.type === 'text' || item.type === 'number' ? (
            <TextInput
              label={item.name}
              keyboardType={item.type === 'number' ? 'numeric' : 'default'}
              value={filters[item.name] || ''}
              onChangeText={(value) => handleFilterChange(item.name, value)}
              mode="outlined"
            />
          ) : item.type === 'option' ? (
            <View >
              <Picker
                style={styles.picker}
                selectedValue={filters[item.name] || ''}
                onValueChange={(value: string) => handleFilterChange(item.name, value)}>
                <Picker.Item label="Seleccione..." value="" />
                {item.options?.map((opt, i) => (
                  <Picker.Item key={i} label={opt} value={opt} />
                ))}
              </Picker>
            </View>
          ) : null}
        </View>
      ))}

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.circleButton, styles.searchBtn]}
          onPress={() => onSearch?.(searchTerm, filters)}>
          <FontAwesome name="search" size={24} />
          <Text>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton} onPress={handleClear}>
          <FontAwesome name="trash" size={24} />
          <Text>Limpiar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchBar: {
    marginBottom: 16,
    borderRadius: 12,
  },
  picker: {
    height: 48
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
  icon: {
    marginHorizontal: 8,
  },
  filterContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  circleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    color: '#fff',
  },
  searchBtn: {
    backgroundColor: 'green',
  }
});
