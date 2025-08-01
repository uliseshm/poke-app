// src/screens/PokemonDetailScreen.js
import React from 'react';
import { View, Text } from 'react-native';

export default function PokemonDetailScreen({ route }) {
  const { pokemonName } = route.params;

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-xl">Detalles de {pokemonName}</Text>
    </View>
  );
}