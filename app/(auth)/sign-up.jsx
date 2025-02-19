import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormFiel from '../../components/FormFiel'
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    username : '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async() => {
    if(!form.username || !form.email || !form.password) {
      return Alert.alert('Error','Please fill in all the fields')
    }
    setIsSubmitting(true)
    try {
      const result = await createUser(form.email, form.password, form.username)
      setUser(result)
      setIsLogged(true)
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error',error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 py-6">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign Up to Aora</Text>
          <FormFiel
            tittle="Username"
            value={form.username}
            handleChangeText={(e) => setForm({
              ...form,
              username: e,
            })}
            otherStyles="mt-7"
          />
          <FormFiel
            tittle="Email"
            value={form.email}
            handleChangeText={(e) => setForm({
              ...form,
              email: e,
            })}
            otherStyles="mt-7"
            ketboardType="email-address"
          />
          <FormFiel
            tittle="Password"
            value={form.password}
            handleChangeText={(e) => setForm({
              ...form,
              password: e,
            })}
            otherStyles="mt-7"
          />
          <CustomButton
            tittle={'Sig up'}
            handlePres={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp