// src/screens/PokemonDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { getPokemonDetail } from '~/services/pokemonService';

export default function PokemonDetailScreen({ route }) {
  const { pokemonName } = route.params;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        console.log("Fetching details for:", pokemonName);
        const details = await getPokemonDetail(pokemonName);
        setPokemon(details)
        console.log("Respuesta de la API:", details);
      } catch (error) {
        console.error("Error al consultar los detalles del pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  if (loading || !pokemon) {
    return (
      <View className='flex-1 justify-center items-center bg-gray-100'>
        <ActivityIndicator size="large" color="#0000FF"/>
      </View>
    );
  }

  const imageUrl = pokemon?.sprites?.front_default;

  return (
    <View className="flex-1 items-center p-4 bg-gray-100">
      <View className='bg-white p-6 rounded-lg shadow-md items-center w-full max-w-sm'>
        <Text className='text-3xl font-bold capitalize mb-4'>{pokemon.name}</Text>

        <View className="w-40 h-40 relative">
         
          {imageUrl && (
            <Image
              className="w-full h-full"
              source={{ uri: imageUrl }}
              style={{ width: 160, height: 160 }} 
            />
          )}
        </View>

        <View className='mt-4 flex-row justify-center space-x-2'>
          {pokemon.types.map((typeInfo, index) => (
            <View key={index} className='bg-blue-500 rounded-full px-4 py-1'>
              <Text className='text-white font-bold capitalize'>{typeInfo.type.name}</Text>
            </View>
          ))}
        </View>
        <View className='mt-6 w-full space-y-2'>
          <Text className='text-lg'>
            <Text className='font-bold'>Altura:</Text> {pokemon.height / 10} m
          </Text>
          <Text className='text-lg'>
            <Text className='font-bold'>Peso:</Text> {pokemon.weight / 10} kg
          </Text>
        </View>
      </View>
    </View>
  );
}
