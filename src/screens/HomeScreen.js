import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';
import TrendingMovies from '../components/trendingMovies';
import { useState } from 'react';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';


const ios = Platform.OS == 'ios';

function HomeScreen() {
  const navigation = useNavigation();

  const [trending, setTrending] = useState([0, 1, 2, 3, 4, 5]);
  const [upcoming, setUpcoming] = useState([0, 1, 2, 3, 4, 5]);
  const [topRated, setTopRated] = useState([0, 1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);

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
            <TrendingMovies data={trending} />

            {/* upcoming movies  */}
            <MovieList title="Upcoming" data={upcoming} />

            {/* upcoming movies  */}
            <MovieList title="Top Rated" data={topRated} />
          </ScrollView>
        )
      }


    </View>
  )
}

export default HomeScreen