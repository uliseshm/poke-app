import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const PokemonCard = ({ pokemon, onPress }) => {
    const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    return (
        // <View className="bg-white p-2 m-2 rounded-lg shadow-md flex-row items-center">
        //     <Image
        //         className="w-16 h-16 mr-4"
        //         source={{ uri:imageUrl }}
        //     />
        //     <Text className="text-xl font-bold capitalize">{pokemon.name}</Text>
        // </View>
        <TouchableOpacity onPress={onPress} className='bg-white p-4 m-2 rounded-lg shadow-md flex-row items-center'>
            <Image
                className='w-16 h-16 mr-4'
                source={{ uri: imageUrl }}
            />
            <Text className='text-xl font-bold capitalize'>{pokemon.name}</Text>
        </TouchableOpacity>
    );
};

export default PokemonCard;