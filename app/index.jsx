import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {

  const {loading, isLogged} = useGlobalContext();

  console.log("is loading: " + loading)
  console.log("is logged in: " + isLogged)

  if(!loading && isLogged){
    console.log(isLogged)

    return(
      <Redirect href="/home" />
    )
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className='w-full flex justify-center items-center min-h-[85vh] px-4'>
          
          <Image 
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode='contain'
          />

          <Image 
            source={images.cards}
            className="max-w--[380px] h-[300px]"
            resizeMode='contain'
          />  

          <View className='relative mt-5'>
            <Text className="text-3xl text-white font-bold text-center">
              Say Bye to Waitlists with{' '}
              <Text className="text-secondary-200">Esca</Text>
            </Text>
          </View>

          <CustomButton
              title="Continue with Email"
              handlePress={() => router.push('/sign-in')}
              containerStyles="w-full mt-10"
            >
          </CustomButton>

        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}
 