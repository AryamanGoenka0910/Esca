import { useState } from "react";
import { router } from "expo-router";
import { View, Image, FlatList, TouchableOpacity, Text, SafeAreaView} from "react-native";

import InfoBox from "../../components/InfoCard";

import { icons } from "../../constants";

import useAppwrite from "../../lib/useAppwrite";
import { signOut } from "../../lib/appwrite";

import { useGlobalContext } from "../../context/GlobalProvider";
import ProfileWaitlist from "../../components/ProfileWaitlist";


const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [activeTab, setActiveTab] = useState('Active');
  
  console.log(user)

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center mt-4 mb-12 px-4">
        <TouchableOpacity
          onPress={logout}
          className="flex w-full items-start mb-10"
        >
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </TouchableOpacity>

        <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
          <Image
            source={{ uri: user?.avatar }}
            className="w-[90%] h-[90%] rounded-lg"
            resizeMode="cover"
          />
        </View>

        <InfoBox
          title={user?.username}
          containerStyles="mt-2"
          titleStyles="text-lg"
        />

        <View className="mt-2 flex flex-row">
          <InfoBox
            title={0}
            subtitle="Posts"
            titleStyles="text-xl"
            containerStyles="mr-10"
          />
          <InfoBox
            title="1.2k"
            subtitle="Followers"
            titleStyles="text-xl"
          />
        </View>
        

        <View className="mt-5 w-full flex justify-center items-center flex-row border border-secondary-100">
          <TouchableOpacity 
            className={`flex-1 items-center p-2 ${activeTab === 'Active' ? 'bg-secondary-100' : ''}`}
            onPress={() => setActiveTab('Active')}  
          >
            <Text
              className={activeTab === 'Active' ? 'text-black' : 'text-white'}
            >
              Active
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className={`flex-1 items-center p-2 ${activeTab === 'Inactive' ? 'bg-secondary-100' : ''}`}
            onPress={() => setActiveTab('Inactive')}  
          >
            <Text
              className={activeTab === 'Inactive' ? 'text-black' : 'text-white'}
            >
              Bookmarks
            </Text>
          </TouchableOpacity>
        </View>
        {(activeTab === 'Active')? 
          <ProfileWaitlist waitlistId={user.waitlist}/>
        :
          <>
          </>
        }
      </View>
    </SafeAreaView>
  );
};

export default Profile;