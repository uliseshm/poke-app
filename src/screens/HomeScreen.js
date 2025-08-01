// src/screens/HomeScreen.js
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { getPokemonList } from '../services/pokemonService';
import PokemonCard from '../components/PokemonCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFechingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const insets = useSafeAreaInsets();
  const limit = 20;

  const fetchPokemon = async () => {
    try {
      const data = await getPokemonList(limit, offset);
      setPokemonList(prevList => [...prevList, ...data]);
    } catch (error) {
      console.error("Error en el componente:", error);
    } finally {
      setLoading(false);
      setIsFechingMore(false);
    }
  }

  useEffect(() => {
    // const fetchPokemon = async () => {
    //   try {
    //     const data = await getPokemonList();
    //     setPokemonList(data);
    //   } catch (error) {
    //     console.error('Error en el componente:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchPokemon();
  }, [offset]);

  const handleLoadMore = () => {
    if (!isFetchingMore) {
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
      <View className="flex-1 px-4 pt-12">
        <Text className="text-3xl font-bold text-center mb-6">Pokedex</Text>
        <FlatList
          data={pokemonList}
          keyExtractor={(item) => item.name}
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