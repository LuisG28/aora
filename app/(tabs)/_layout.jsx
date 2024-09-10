import { View, Text, Image } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'
import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="items-center justify-center">
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className="w-6 h-6"
            />
            <Text 
                className={`${focused ? 'font-semibold' : 'font-pregular'}`}
                style={{ color : color }}
            >
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
       <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FFA001',
                tabBarInactiveTintColor : '#CDCDE0',
                tabBarStyle : {
                    backgroundColor: '#161622',
                    borderTopWidth : 1,
                    borderTopColor : '#232533',
                    height: 84
                }
            }}
        >
            <Tabs.Screen
                name='home'
                options={{
                    tittle: 'Home',
                    headerShown : false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.home}
                            color={color}
                            name="Home"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='bookMark'
                options={{
                    tittle: 'bookMark',
                    headerShown : false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.bookmark}
                            color={color}
                            name="bookMark"
                            focused={focused}
                        />
                    )
                }}
            />
             <Tabs.Screen
                name='create'
                options={{
                    tittle: 'Create',
                    headerShown : false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.plus}
                            color={color}
                            name="Create"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    tittle: 'Profile',
                    headerShown : false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.profile}
                            color={color}
                            name="Profile"
                            focused={focused}
                        />
                    )
                }}
            />
       </Tabs>
    </>
  )
}

export default TabsLayout