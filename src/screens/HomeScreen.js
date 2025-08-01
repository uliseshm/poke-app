// src/screens/HomeScreen.js
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { getPokemonList } from '../services/pokemonService';
import PokemonCard from '../components/PokemonCard';

export default function HomeScreen({ navigation }) { // <-- Recibimos la propiedad navigation
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonList();
        setPokemonList(data);
      } catch (error) {
        console.error('Error en el componente:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text>Cargando Pokemon...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
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
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}