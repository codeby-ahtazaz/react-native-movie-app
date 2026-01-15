import { View, Text, Platform, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../theme';
import MovieList from '../components/movieList';
import Loading from '../components/loading';

const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';
const { width, height } = Dimensions.get("window");

const PersonScreen = (item) => {
    const navigation = useNavigation();
    const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5, 6]);
    const [isFavourite, toggleFavourite] = useState(true);
const [loading, setLoading] = useState(false);

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className=" flex-1 bg-neutral-900"
        >

            <SafeAreaView className={" w-full flex-row justify-between items-center px-4" + topMargin}>
                <TouchableOpacity style={styles.background} className=" rounded-xl p-1" onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size="30" strokeWidth={2} color="white" />
                </TouchableOpacity>

                <TouchableOpacity className=" rounded-xl p-1" onPress={() => toggleFavourite(!isFavourite)}>
                    <HeartIcon size="35" strokeWidth={2} color={isFavourite ? theme.background : "white"} />
                </TouchableOpacity>

            </SafeAreaView>

{/* person details */}
{
    loading?(
        <Loading/>
    ): (
                    
            <View>
                <View className="flex-row justify-center"
                    style={{
                        shadowColor: 'gray',
                        shadowRadius: 40,
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 1
                    }}>
                    <View className=" rounded-full items-center justify-center overflow-hidden h-72 w-72 border-2 border-neutral-500">
                        <Image
                            source={require('../../assets/splash-icon.png')}
                            style={{
                                width: width * 0.74,
                                height: height * 0.43
                            }}
                            className=" bg-red-400"
                        />
                    </View>
                </View>

                <View className="mt-6">
                    <Text className=" text-3xl font-bold text-white text-center">Ahtazaz Khan</Text>
                    <Text className=" text-base text-neutral-500 text-center">Isb, Pakistan</Text>
                </View>
                <View className="mx-3 p-4 mt-6 justify-between items-center flex-row bg-neutral-700 rounded-full">
                    <View className=" border-r-2 border-r-neutral-400 px-2 items-center">
                        <Text className="text-white font-semibold">Gender</Text>
                        <Text className="text-neutral-300 text-sm">Male</Text>
                    </View>
                    <View className=" border-r-2 border-r-neutral-400 px-2 items-center">
                        <Text className="text-white font-semibold">Birthday</Text>
                        <Text className="text-neutral-300 text-sm">1976-9-12</Text>
                    </View>
                    <View className=" border-r-2 border-r-neutral-400 px-2 items-center">
                        <Text className="text-white font-semibold">Known For</Text>
                        <Text className="text-neutral-300 text-sm">Software Engineer</Text>
                    </View>
                    <View className=" px-2 items-center">
                        <Text className="text-white font-semibold">Popularity</Text>
                        <Text className="text-neutral-300 text-sm">10</Text>
                    </View>
                </View>

                <View className=" my-6 mx-4 space-y-2">
                    <Text className="text-white text-lg">Biography</Text>
                    <Text className="text-neutral-400 text-sm tracking-wide">ust one year after his Academy Award-nominated performance as Bob Dylan in A Complete Unknown, Timothée Chalamet is taking on the role of another young, brash legend. The Oscar-nominated actor stars as professional table tennis player Marty Mauser in the new sports drama Marty Supreme, in theaters December 25.

                        Marty Supreme, which is set in 1950s New York City, follows the eccentric Mauser as he pursues his dreams of ping-pong greatness by any means necessary. Unlike A Complete Unknown, however, Marty Supreme is not a biopic, but a fictional story loosely based on real-life table tennis champion Marty Reisman.

                        Blending fact with fiction, the movie is based on Reisman’s persona and was inspired by his 1974 autobiography The Money Player: The Confessions of America’s Greatest Table Tennis Champion and Hustler.

                        Here’s what you should know about Marty Reisman, the inspiration behind Marty Supreme.</Text>
                </View>

                {/*  movies  */}
                <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
            </View>
    )
}



        </ScrollView>
    )
}

export default PersonScreen