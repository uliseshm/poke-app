const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit = 20, offset = 0) => {
    try {
        const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de Pokemon.');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error al obtener ls lista de Pokemon:', error);
        throw error;
    }
};

export const getPokemonDetail = async (pokemonName) => {
    try {
        const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error(`No se pudo obtener los detalles del Pokémon ${pokemonName}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al obtener los detalles del Pokémon ${pokemonName}:`, error);
        throw error;
    }
};