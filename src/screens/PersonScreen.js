import { View, Text, Platform, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../theme';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackPersonImage, fetchPersonDetail, fetchPersonMovies, image185 } from '../api/moviedb';

const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';
const { width, height } = Dimensions.get("window");

const PersonScreen = () => {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [personMovies, setPersonMovies] = useState([]);
    const [isFavourite, toggleFavourite] = useState(true);
    const [person, setPerson] = useState({});
    const [loading, setLoading] = useState(false);

    const getPersonDetail = async (id) => {
        const data = await fetchPersonDetail(id);
        if (data) setPerson(data)
        setLoading(false)
    }

    const getPersonMovies = async (id) => {
        const data = await fetchPersonMovies(id);
        if (data) setPersonMovies(data.cast)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true);
        getPersonDetail(item.id)
        getPersonMovies(item.id)
    }, [item]);

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
                loading ? (
                    <Loading />
                ) : (

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
                                source={{ uri: image185(person?.profile_path) || fallbackPersonImage }}
                                    
                                    style={{
                                        width: width * 0.74,
                                        height: height * 0.43
                                    }}
                                    className=" bg-red-400"
                                />
                            </View>
                        </View>

                        <View className="mt-6">
                            <Text className=" text-3xl font-bold text-white text-center">{person.name}</Text>
                            <Text className=" text-base text-neutral-500 text-center">{person.place_of_birth}</Text>
                        </View>
                        <View className="mx-3 p-4 mt-6 justify-between items-center flex-row bg-neutral-700 rounded-full">
                            <View className=" border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Gender</Text>
                                <Text className="text-neutral-300 text-sm">Male</Text>
                            </View>
                            <View className=" border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Birthday</Text>
                                <Text className="text-neutral-300 text-sm">{person.birthday}</Text>
                            </View>
                            <View className=" border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Known For</Text>
                                <Text className="text-neutral-300 text-sm">{person.known_for_department}</Text>
                            </View>
                            <View className=" px-2 items-center">
                                <Text className="text-white font-semibold">Popularity</Text>
                                <Text className="text-neutral-300 text-sm">{person.popularity}</Text>
                            </View>
                        </View>

                        <View className=" my-6 mx-4 space-y-2">
                            <Text className="text-white text-lg">Biography</Text>
                            <Text className="text-neutral-400 text-sm tracking-wide">
                                { person.biography }
                                </Text>
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