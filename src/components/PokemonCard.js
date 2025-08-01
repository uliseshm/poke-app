import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const PokemonCard = ({ pokemon, onPress }) => {
    const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    return (
        <TouchableOpacity onPress={onPress} style={ styles.pokemonCard }>
            <Image
                className='w-16 h-16 mr-4'
                source={{ uri: imageUrl }}
                style={{ width: 60, height: 60 }}
            />
            <Text style={styles.namePokemon}>{pokemon.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  pokemonCard: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // Sombra para Android
    flexDirection: 'row',
    alignItems: 'center',
  },
  namePokemon: {
    fontSize: 16,
    textTransform: 'capitalize',
    marginStart: 4,
  }
});

export default PokemonCard;