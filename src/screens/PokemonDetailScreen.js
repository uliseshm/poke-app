// src/screens/PokemonDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { getPokemonDetail } from '~/services/pokemonService';

const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  grass: '#7AC74C',
  electric: '#F7D02C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

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
    <View className="flex-1 items-center p-4 justify-center" style={styles.mainBackground}>
      <View className='bg-white shadow-md items-center w-full max-w-sm' style={styles.card}>
        <Text className='text-3xl font-bold mb-4' style={{ fontSize: 30, paddingBottom: 5, textTransform: 'capitalize' }}>{pokemon.name}</Text>

        <View className="w-40 h-40 relative">
         
          {imageUrl && (
            <Image
              className="w-full h-full"
              source={{ uri: imageUrl }}
              style={{ width: 260, height: 260 }} 
            />
          )}
        </View>

        <View className='mt-4 flex-row justify-center space-x-2'>
          {pokemon.types.map((typeInfo, index) => (
            <View key={index} style={{ backgroundColor: typeColors[typeInfo.type.name], paddingVertical: 3, borderRadius:5, paddingHorizontal: 5  }}>
              <Text style={styles.typeText}>{typeInfo.type.name}</Text>
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
          <Text className="text-xl font-bold mt-6 mb-2">Imagenes</Text>
          {/* <View className="flex-row flex-wrap">
            {pokemon.abilities.map((abilityInfo, index) => (
              <Text key={index} className="text-lg capitalize">
                {abilityInfo.ability.name}
                {index < pokemon.abilities.length - 1 ? ', ' : ''}
              </Text>
            ))}
          </View> */}

          <View className="mt-6 flex-row justify-center space-x-4 " style={{ flexDirection: 'row' }}>
            {pokemon.sprites.front_default && (
              <Image
                source={{ uri: pokemon.sprites.back_default }}
                className="w-20 h-20"
                style={{ width: 60, height: 60 }}
              />
            )}
            {pokemon.sprites.front_shiny && (
              <Image
                source={{ uri: pokemon.sprites.front_shiny }}
                className="w-20 h-20"
                style={{ width: 60, height: 60 }}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBackground: {
    backgroundColor: 'rgba(42, 117, 187, 0.9)'
  },
  card: {
    backgroundColor: '#F1F1F1',
    borderColor: '#FFCB05', 
    borderWidth:2, 
    shadowOffset: { width: 2, height: 5 }, 
    shadowColor: '#EEEEEE', 
    shadowOpacity: 0.2, 
    shadowRadius: 1, 
    borderRadius: 8, 
    padding: 3, 
    paddingVertical: 18,
  },
  typeText: {
    color: '#EEE'
  }
})
