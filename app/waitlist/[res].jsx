import React from 'react'
import { useState } from 'react';
import {SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

import { useGlobalContext } from '../../context/GlobalProvider';

import { getRes, addWaitlist, getWaitListItem } from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppwrite';

import QueueItem from '../../components/QueueItem';
import InfoBox from "../../components/InfoCard";




const Bar = () => {

  const { res } = useLocalSearchParams(); // coming directly from expo-router
  const { user } = useGlobalContext();
  const {data : restaurant, isLoading, refetch} = useAppWrite(() => getRes(res));
  const [refreshing, setrefreshing] = useState(false)

  
  console.log(isLoading)
  if (!isLoading){
    console.log(restaurant)
    console.log(user)
  }

  const addtoWaitlist = async () => {
    try {

      const waitlist = await addWaitlist(20, 'available', restaurant.$id, 4, user.$id)
      setrefreshing(true);
      // re call to see if there are any new stuff
      await refetch();
      setrefreshing(false)

    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
        <View className="w-full h-60 rounded-lg flex justify-center items-center">
          <Image
              source={{ uri: restaurant.thumbnail }}
              className="w-full h-full rounded-xl mt-3 border-dashed"
              resizeMode="cover"
            />
        </View>

        <InfoBox
          title={restaurant.title}
          containerStyles="mt-5"
          titleStyles="text-lg"
        />

        <View className="mt-5 flex flex-row">
          <InfoBox
            title={restaurant?.waitlist?.length * 15}
            subtitle="Wait Time"
            titleStyles="text-xl"
            containerStyles="mr-10"
          />
          <InfoBox
            title={restaurant?.waitlist?.length}
            subtitle="Queue Size"
            titleStyles="text-xl"
          />
        </View>

        <FlatList
          className='h-80 w-full mt-4'
          data={restaurant?.waitlist}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <QueueItem waitlistId={item}/>
          )}
        >
        </FlatList>

        <TouchableOpacity 
            className="absolute bottom-0 w-full h-10 border border-secondary-100 rounded-lg flex justify-center items-center bg-secondary-100"
            onPress={() => addtoWaitlist()}
          >
            <Text className='text-white'>Join</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Bar