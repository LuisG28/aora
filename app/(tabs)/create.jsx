import { Text, ScrollView, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormFiel'
import { Video, ResizeMode } from 'expo-av'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'

const Create = () => {
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: null, 
  });

  const submit = () => {

  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="my-6 px-4">
        <Text className="text-2xl text-white font-psemibold">
          Upload video
        </Text>
        <FormField 
          tittle="Video Title"
          placeholder={'Give your video a catch title...'}
          value={form.title}
          handleChangeText={(e)=>setForm({...form, title : e})}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity >
            {
              form.video ? (
                <Video 
                  source={{ uri: form.video.uri }}
                  className="w-full h-64 rounded-xl"
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping
                />
              ) : (
                <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                  <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                    <Image source={icons.upload} resizeMode='contain' className="w-1/2 h-1/2"/>
                  </View>
                </View>
              )
            }
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2 ">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity >
            {
              form.thumbnail ? (
                <Image
                  source={{ uri : form.thumbnail.uri }}
                  resizeMode='cover'
                  className="w-full h-64 rounded-2xl"
                />
              ) : (
                <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-100 space-x-2 flex-row">
                  <Image source={icons.upload} resizeMode='contain' className="w-5 h-5"/>
                  <Text className="text-sm text-gray-100 font-pmedium">
                    Choose a file
                  </Text>
                </View>
              )
            }
          </TouchableOpacity>
        </View>
        <FormField 
          tittle="AI Prompt"
          placeholder={'The prompt you used to create this video'}
          value={form.prompt}
          handleChangeText={(e)=>setForm({...form, prompt : e})}
          otherStyles="mt-7"
        />
        <CustomButton
          tittle="Submit & Publish"
          handlePres={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create