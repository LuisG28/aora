import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormFiel'

const Create = () => {
  const [form, setForm] = useState({
    name: '',
    video: null,
    thumbnail: null,
    prompt: null, 
  });
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="my-6 px-4">
        <Text className="text-2xl text-white font-psemibold">
          Upload video
        </Text>
        <FormField 
          tittle={'Video Title'}
          value={form.name}
          handleChangeText={(e)=>setForm({...form, name : e})}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create