import React from 'react'
import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router'
import { View, Text, SafeAreaView, FlatList, Image, Alert} from 'react-native'
import { searchPosts } from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppwrite';

import { images } from '../../constants';
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState';
import ResCard from '../../components/ResCard';
import Loader from '../../components/Loader';


const Search = ({ initialQuery }) => {
  const { query } = useLocalSearchParams(); // coming directly from expo-router
  const {data : postings, isLoading, refetch} = useAppWrite(() => searchPosts(query)); //using custom hook (passing in the entire callback function as a param 3:20)

  useEffect(() => {
    refetch()
  }, [query])



  return (
    <SafeAreaView className="bg-primary h-full">
      {isLoading ? <Loader isLoading={isLoading}/> :
        <FlatList 
          data={postings}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <ResCard res={item}/>
          )}

          ListHeaderComponent={() => (
            <View className="my-6 px-4">
              <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
              <Text className="text-2xl font-psemibold text-white">{query}</Text>

              <View className='mt-6 mb-8'>
                <SearchInput 
                  initialQuery={query}
                />
              </View>
            </View> 
          )}

          ListEmptyComponent={() => (
            <EmptyState 
              title="No Videos Found"
              subtitle="No vidoes found for this search query"
            />
          )}
        />
      }
    </SafeAreaView>
  )
}

export default Search 