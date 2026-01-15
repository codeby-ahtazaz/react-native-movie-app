import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity, } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const Cast = ({ cast, navigation }) => {

    const handleClick = (item) => {
        navigation.navigate('Person', item)
    }
    const personName = "Ahtazaz Khan"
    const charcaterName = "John Wick"

    return (
        <View className="my-6">
            <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    cast.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleClick(item)}>
                                <View className=" mr-4 items-center">
                                    <View className=" overflow-hidden rounded-full h-20 w-20 justify-center items-center border-2 border-neutral-500">
                                        <Image
                                            source={require('../../assets/splash-icon.png')}
                                            className="rounded-2xl h-24 w-20 bg-red-400"
                                        />
                                    </View>

                                    <Text className="text-white text-xs mt-1">
                                        {
                                            charcaterName.length > 10 ? charcaterName.slice(0, 10) + '...' : charcaterName
                                        }
                                    </Text>
                                    <Text className="text-neutral-300 text-xs mt-1">
                                        {
                                            personName.length > 10 ? personName.slice(0, 10) + '...' : personName
                                        }
                                    </Text>
                                </View>

                            </TouchableOpacity>
                        );
                    })
                }

            </ScrollView>
        </View>
    )
}

export default Cast