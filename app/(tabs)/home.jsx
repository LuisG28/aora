import React, { useState } from 'react'
import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Tendring from '../../components/Tendring'
import EmptyState from '../../components/EmptyState'
import { getAllPost, getLastestPost } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider';

const Home = () => {
  const { data : posts, refetch } = useAppWrite(getAllPost);
  const { data : lastestPost } = useAppWrite(getLastestPost);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        key={(item) => item.$id}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back,
                </Text>
                <Text className="text-2xl font-semibold text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image className="w-9 h-10" resizeMode='contain' source={images.logoSmall}/>
              </View>
            </View>
            <SearchInput/>
            <View className="w-full flex-1 border-red">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Lastes vidios
              </Text>
              <Tendring 
                posts={lastestPost ?? []}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <EmptyState 
            title="No videos found." 
            subtitle="Be the first one to upload a video"
          />
        }
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  )
}

export default Home