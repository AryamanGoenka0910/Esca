import React from 'react'
import { View, TouchableOpacity, Text} from "react-native";
import { getWaitListItem } from '../lib/appwrite';


const ProfileWaitlist = ({waitlistId}) => {

    //const {data : restaurant, isLoading, refetch} = useAppWrite(() => getWaitListItem());
    console.log(waitlistId)

    return (
        <View className="mt-5 w-full h-44 rounded flex justify-center items-center bg-slate-200">
            <View className="flex flex-col justify-between h-full p-4">

                <Text className="text-xl font-bold mb-2">Restaurant</Text>
                <Text className="text-lg mb-4"> Party Size: {waitlistId.size}</Text>

                <View className="flex flex-row justify-between w-full">
                    
                    <TouchableOpacity
                    className="flex-1 bg-green-500 py-2 rounded-lg mr-2"
                    
                    >
                    <Text className="text-white text-center">List to Marketplace</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                    className="flex-1 bg-red-500 py-2 rounded-lg ml-2"
                    
                    >
                    <Text className="text-white text-center">Delete</Text>
                    </TouchableOpacity>
            
                </View>
            </View>
        </View>
    )
}

export default ProfileWaitlist