import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ tittle, handlePres, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
        onPress={handlePres}
        activeOpacity={0.7}
        className={`bg-secondary rounded-lg min-h-[62px] justify-center items-center 
            ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
    >
        <Text 
            className={`text-primary font-psemibold text-lg ${textStyles}`}
        >
            {tittle}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton