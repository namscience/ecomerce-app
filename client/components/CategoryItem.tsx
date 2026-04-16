import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CategoryItemProps } from '@/constants/types'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'

export default function CategoryItem({item, isSelected, onPress}: CategoryItemProps) {
  return (
    <TouchableOpacity style={{marginRight: 16, alignItems: 'center'}} onPress={onPress}>
        <View style={{
        width: 56, 
        height: 56, 
        borderRadius: 9999, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: 8,
        backgroundColor: isSelected ? '#111111' : '#F5F5F5'
        }}>
        <Ionicons name={item.icon as any} size={24} color={isSelected ? "#FFF" : COLORS.primary}/>
        </View>
        <Text style={{
        fontSize: 12, 
        fontWeight: '500',
        color: isSelected ? '#111111' : '#666666'
        }}>{item.name}</Text>
    </TouchableOpacity>
  )
}