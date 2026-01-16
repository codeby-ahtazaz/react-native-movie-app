import { View, Text, Dimensions, Image, TouchableWithoutFeedback, FlatList } from 'react-native';
import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { fallbackMoviePoster, image500 } from '../api/moviedb';

const { width, height } = Dimensions.get("window");

function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const sliderWidth = 400;
  const itemWidth = 500 * 0.7;

  const scrollX = useSharedValue(0);
  const handleClick = (item) => {
    navigation.navigate('Movie', item)
  }

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    }

  });

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending Movies</Text>

      <View >

        <Animated.FlatList
          horizontal
          data={data}
          renderItem={({ item, index }) => <MovieCard item={item} index={index} handleClick={handleClick} scrollX={scrollX} />}
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{ paddingHorizontal: 16 }}
          pagingEnabled
          onScroll={onScrollHandler}
        />

      </View>

    </View>
  );
}

export default TrendingMovies;

const MovieCard = ({ item, index, handleClick, scrollX }) => {

  const inputRange = [
    (index - 1) * width,
    index * width,
    (index + 1) * width,
  ];


  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        inputRange,
        [0.5, 1, 0.5],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            inputRange,
            [-width * 0.35, 0, width * 0.35],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            inputRange,
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ]
    }
  });


  return (
    <Animated.View style={[{ width: width }, rnAnimatedStyle]} className="items-center justify-center">
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <Image
          source={{ uri: image500(item.poster_path) || fallbackMoviePoster }}
          style={{
            width: width * 0.6,
            height: height * 0.4
          }}
          className="rounded-3xl bg-red-400"
        />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};
