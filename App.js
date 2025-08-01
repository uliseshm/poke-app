


import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '~/screens/HomeScreen';
import PokemonDetailScreen from '~/screens/PokemonDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Pokedex' }}/>
        <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} options={{ title: 'Detalles del Pokémon' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// export default function App() {

//   const [pokemonList, setPokemonList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPokemon = async () => {
//       try {
//         const data = await getPokemonList();
//         setPokemonList(data);
//       } catch (error) {
//         console.error('Error en el componente:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPokemon();
//   }, []);

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-100">
//         <Text>Cargando Pokemon...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-gray-100">
//       <View className="flex-1 px-4 pt-12">
//         <Text className="text-3xl font-bold text-center mb-6">Pokedex</Text>
//         <FlatList
//           data={pokemonList}
//           keyExtractor={(item) => item.name}
//           renderItem={({ item }) => <PokemonCard pokemon={item} />}
//         />
//       </View>
//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );
// }
