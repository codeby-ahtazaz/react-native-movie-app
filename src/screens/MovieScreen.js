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
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';


const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';

const { width, height } = Dimensions.get("window");

const MovieScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(true);
  const [cast, setCast] = useState([]);
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMovieDetail = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data)
    setLoading(false)
  }

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data) setCast(data.cast)
    setLoading(false)
  }

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data) setSimilarMovies(data.results)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true);
    getMovieDetail(item.id)
    getMovieCredits(item.id)
    getSimilarMovies(item.id)
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
                source={{ uri: image500(item.poster_path) || fallbackMoviePoster }}
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
        <Text className="text-white font-bold text-3xl tracking-wider text-center">{item?.title}</Text>
        {/* status, release, runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          {movie?.status} - {movie?.release_date?.split('-')[0]} - {movie?.runtime} min
        </Text>

        {/* genres */}
        <View className=" justify-center flex-row mx-4 space-x-2 mb-2">
          {
            movie?.genres?.map((item, index) => {
              let showDot = index + 1 != movie.genres.length;

              return (
                <Text key={index} className="text-neutral-400 font-semibold text-base  text-center">
                  {item?.name} {showDot ? "-" : null}
                </Text>
              )
            })
          }
        </View>


        {/* description */}
        <Text className="text-neutral-400 tracking-wide mx-4">
          {movie?.overview}
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