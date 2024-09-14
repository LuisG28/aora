import React from 'react'
import { View, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import { getUserPost, signOut } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext(); 
  const { data: posts } = useAppWrite(()=>getUserPost(user.$id));
 
  const logout = async() => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace('/sign-in')
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        key={(item) => item.$id}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image source={icons.logout} resizeMode='contain' className="w-6 h-6"/>
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image 
                source={{ uri : user?.avatar }}
                className="h-[90%] w-[90%] rounded-lg"
                resizeMode='cover'
              />
            </View>
            <View className="mt-5 flex-row">
              <InfoBox 
                title={posts.length || 0}
                subtitle="Post"
                containerStyles='mr-10'
                titleStyle='text-xl'
              />
              <InfoBox 
                title="1.2k"
                subtitle="Followers"
                titleStyle='text-xl'
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            title="No videos found."
            subtitle="No videos found for this search query"
          />
        }
      />
    </SafeAreaView>
  )
}

export default Profile