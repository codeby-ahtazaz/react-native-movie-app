import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';
import TrendingMovies from '../components/trendingMovies';
import { useState } from 'react';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';


const ios = Platform.OS == 'ios';

function HomeScreen() {
  const navigation = useNavigation();

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, [])

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log('got trending movies--->', data)
    if (data && data.results) setTrending(data.results)
    setLoading(false)
  }

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    // console.log('got upcoming movies--->', data)
    if (data && data.results) setUpcoming(data.results)
    setLoading(false)
  }

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    // console.log('got top rated movies--->', data)
    if (data && data.results) setTopRated(data.results)
    setLoading(false)
  }

  return (
    <View className="flex-1 bg-neutral-800">
      {/* Search bar View */}

      <SafeAreaView className="mb-3">
        <StatusBar style='light' />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className=" text-white font-bold text-3xl">
            <Text style={styles.text}>M</Text>
            ovies</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>


      {
        loading ? (
          <Loading />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 0 }}
          >
            {/* Trending movies carousel */}
            {trending.length > 0 && <TrendingMovies data={trending} />}


            {/* upcoming movies  */}
            {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} />}


            {/* top-rated movies  */}
            {topRated.length > 0 && <MovieList title="Top Rated" data={topRated} />}

          </ScrollView>
        )
      }


    </View>
  )
}

export default HomeScreen