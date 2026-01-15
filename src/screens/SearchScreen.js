import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';

const { width, height } = Dimensions.get("window");
const movieName = "Children.only expected to receive a single"

const SearchScreen = () => {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <SafeAreaView className=" flex-1 bg-neutral-800">
            <View className="flex-row mx-4 mb-3 items-center justify-between border border-neutral-500 rounded-full ">
                <TextInput
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide" />
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="rounded-full p-3 m-1 bg-neutral-500">
                    <XMarkIcon size="20" strokeWidth={2} color={"white"} />
                </TouchableOpacity>
            </View>


            {/* results */}

            {
                loading ? (
                    <Loading />
                ) :

                    results.length > 0 ? (
                        <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            className=" space-y-3">
                            <Text className=" text-white font-semibold ml-1"> Results: ({results.length})</Text>
                            <View className=" flex-row flex-wrap justify-between mt-3">
                                {
                                    results.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={() => navigation.push('Movie', item)}
                                            >
                                                <View className="space-y-2 mb-4">
                                                    <Image
                                                        className="rounded-3xl bg-red-400"
                                                        source={require('../../assets/splash-icon.png')}
                                                        style={{
                                                            width: width * 0.44,
                                                            height: height * 0.3
                                                        }}
                                                    />
                                                    <Text className=" text-neutral-400 ml-1">
                                                        {
                                                            movieName.length > 22 ? movieName.slice(0, 22) + '...' : movieName
                                                        }
                                                    </Text>
                                                </View>

                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View className="flex-1 justify-center items-center ">
                            <Image
                                className="h-96 w-96"
                                source={require('../../assets/splash-icon.png')}
                            // style={{
                            //     width: width * 0.44,
                            //     height: height * 0.3
                            // }}
                            />
                        </View>
                    )

            }



        </SafeAreaView>
    )
}

export default SearchScreen