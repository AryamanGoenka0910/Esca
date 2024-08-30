import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { useGlobalContext } from '../context/GlobalProvider';


import useAppWrite from '../lib/useAppwrite';
import { getWaitListItem } from '../lib/appwrite';

const QueueItem = ({waitlistId}) => {

    const { user } = useGlobalContext();
    const {data : waitlist, isLoading, refetch} = useAppWrite(() => getWaitListItem(waitlistId));

    return (
        <View className={`mt-1 w-full h-16 border border-secondary-100 rounded-lg flex justify-center items-center ${(user?.$id === waitlist?.users?.$id) ? 'bg-red-600':' bg-secondary-100'}`}>
            <View className='flex-row gap-3'>
                <View className='justify-center items-center'>
                    <Text>Table for {waitlist.size}</Text>
                </View>

                <View>
                    <TouchableOpacity className={`${(waitlist.status === 'available') ? 'bg-primary':'bg-gray-600'} w-20 h-10 rounded-lg justify-center items-center`}>
                        <Text className='text-white'>Purchase</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default QueueItem