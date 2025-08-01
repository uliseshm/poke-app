// src/screens/HomeScreen.js
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import { getPokemonList } from '../services/pokemonService';
import PokemonCard from '../components/PokemonCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function HomeScreen({ navigation }) {
  const [allPokemonList, setAllPokemonList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFechingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const limit = 20;
  const insets = useSafeAreaInsets();

  const fetchPokemon = async () => {
    try {
      const data = await getPokemonList(limit, offset);
      setAllPokemonList(prevList => [...prevList, ...data]);
      setPokemonList(prevList => [...prevList, ...data]);
    } catch (error) {
      console.error("Error en el componente:", error);
    } finally {
      setLoading(false);
      setIsFechingMore(false);
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = allPokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPokemonList(filtered);
    } else {
      setPokemonList(allPokemonList);
    }
  }, [searchTerm, allPokemonList]);

  const handleLoadMore = () => {
    if (!isFetchingMore && searchTerm.length === 0) {
      setIsFechingMore(true);
      setOffset(prevOffset => prevOffset + limit)
    }
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0000FF" />
      </View>
    );
  }
  
  return (
    <View className="flex-1 bg-gray-100" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View className="flex-1 px-4 pt-4">
        <Text className="text-3xl font-bold text-center mb-6">Pokedex</Text>
        <TextInput 
          style={styles.searchInput}
          placeholder='Busca un Pokémon...'
          placeholderTextColor="#9ca3af"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <FlatList
          data={pokemonList}
          keyExtractor={(item) => {
            const pokemonId = item.url.split('/').slice(-2, -1)[0]
            return pokemonId;
          }}
          renderItem={({ item }) => (
            <PokemonCard 
                pokemon={item}
                onPress={() => navigation.navigate('PokemonDetail', { pokemonName: item.name })}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => isFetchingMore && <ActivityIndicator size="large" color="#0000FF" />}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    height: 48,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#d1d5db', // color gris 300
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Sombra para Android
  },
});