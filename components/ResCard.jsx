import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity} from 'react-native'

import { icons } from "../constants";
import { Redirect, router } from 'expo-router';

const ResCard = ({res: {$id, title, thumbnail}}) => {
  return (
    <View className='flex-col items-center px-4 mb-14'>
        <View className='flex-row gap-3'>
            <View className="flex justify-center items-center flex-row flex-1">
                <View className="flex justify-center flex-1">
                    <Text
                    className="font-psemibold text-base text-white"
                    numberOfLines={1}
                    >
                    {title}
                    </Text>
                </View>
            </View>
            <TouchableOpacity className="pt-2">
                <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
          onPressIn={() => {router.push({pathname:`/waitlist/${$id}`})}}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3 border-dashed"
            resizeMode="cover"
          />
        </TouchableOpacity>
        

    </View>
  )
}

export default ResCard