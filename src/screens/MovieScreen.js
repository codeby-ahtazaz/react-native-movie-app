import { View, Text, ScrollView, Image, Dimensions, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';


const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';

const { width, height } = Dimensions.get("window");

const MovieScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(true);
  const [cast, setCast] = useState([1, 2, 3, 4, 5, 6]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5, 6]);
  const [loading, setLoading] = useState(false);

  const movieName = "Children.only expected to receive a single"

  useEffect(() => {
    // call  movie detail api
  }, [item]);
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className=" flex-1 bg-neutral-900"
    >

      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView className={" absolute z-20 w-full flex-row justify-between items-center px-4" + topMargin}>
          <TouchableOpacity style={styles.background} className=" rounded-xl p-1" onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className=" rounded-xl p-1" onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon size="35" strokeWidth={2} color={isFavourite ? theme.background : "white"} />
          </TouchableOpacity>

        </SafeAreaView>

        {
          loading ? (
            <Loading />
          ) : (
            <View>
              <Image
                source={require('../../assets/splash-icon.png')}
                style={{
                  width: width,
                  height: height * 0.55
                }}
              />
              <LinearGradient
                colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                style={{ width, height: height * 0.40, position: 'absolute', bottom: 0 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
            </View>
          )
        }


      </View>

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white font-bold text-3xl tracking-wider text-center">{movieName}</Text>
        {/* status, release, runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released - 2020 - 180 min
        </Text>
        {/* genres */}
        <Text className="text-neutral-400 font-semibold text-base  text-center">
          Action - Thrill - Comedy
        </Text>
        {/* description */}
        <Text className="text-neutral-400 tracking-wide mx-4">
          A readonly array of colors that represent stops in the gradient. At least two colors are required (for a single-color background, use the style.backgroundColor prop on a View component).
          For TypeScript to know the provided array has 2 or more values, it should be provided "inline", A readonly array of colors that represent stops in the gradient. At least two colors are required (for a single-color background, use the style.backgroundColor prop on a View component).
          For TypeScript to know the provided array has 2 or more values, it should be provided "inline" oA readonly array of colors that represent stops in the gradient. At least two colors are required (for a single-color background, use the style.backgroundColor prop on a View component).
          For TypeScript to know the provided array has 2 or more values, it should be provided "inline" o
        </Text>
      </View>

      {/* Cast */}
      <Cast navigation={navigation} cast={cast} />

      {/* similar movies  */}
      <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />

    </ScrollView>

  )
}

export default MovieScreen