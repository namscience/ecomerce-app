import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { dummyUser } from '@/assets/assets'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, PROFILE_MENU } from '@/constants'

export default function Profile() {

  const {user} = {user: dummyUser}
  const router = useRouter()

  const handleLogout = async () => (
    router.replace("/sign-in")
  )
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <Header title='Profile' />

      <ScrollView className="flex-1" style={{ paddingHorizontal: 16 }} contentContainerStyle={!user ? {flex: 1, justifyContent: "center", alignItems: "center"} : {paddingTop: 16}}>
        {!user ? (
          // Guest User Screen
          <View className='items-center w-full'>
            <View className='w-24 h-24 rounded-full bg-gray-200 items-center justify-center' style={{ marginBottom: 24 }}>
              <Ionicons name="person" size={40} color={COLORS.secondary} />
            </View>
            <Text className="text-primary font-bold text-xl" style={{ marginBottom: 8 }}> Guest User </Text>
            <Text className="text-secondary text-base text-center w-3/4" style={{ marginBottom: 32, paddingHorizontal: 16 }}> Log in to view your profile, orders, and addresses. </Text>
            <TouchableOpacity onPress={()=>router.push('/sign-in')} className='bg-primary w-3/5 rounded-full items-center shadow-lg' style={{ paddingVertical: 12 }}>
              <Text className="text-white font-bold text-lg"> Login / Signup </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Profile Info */}
            <View className="items-center" style={{ marginBottom: 32 }}>
                <View style={{ marginBottom: 12 }}>
                  <Image source={{uri: user.imageUrl}} className='size-20 border-2 border-white shadow-sm rounded-full'/> 
                </View>                
                <Text className="text-xl font-bold text-primary"> {user.firstName + " " + user.lastName }</Text>
                <Text className="text-secondary text-sm"> {user.emailAddresses[0].emailAddress}</Text>

              {/* Admin Panel Button if user is admin */}
              {user.publicMetadata?.role === "admin" && (
                <TouchableOpacity onPress={()=> router.push('/admin')} className='bg-primary rounded-full' style={{ marginTop: 16, paddingHorizontal: 24, paddingVertical: 8 }}>
                    <Text className='text-white font-bold'> Admin Panel </Text>
                </TouchableOpacity>
              )}
              </View>

              {/* Menu */}
              <View className='bg-white rounded-xl border border-gray-100/75' style={{ padding: 8, marginBottom: 16 }}>
                {PROFILE_MENU.map((item, index)=>(
                  <TouchableOpacity key={item.id}
                  className = {`flex-row items-center p-4 ${index !== PROFILE_MENU.length -1 ? "border-b border-gray-100" : " "}`}
                  onPress = {()=> router.push(item.route as any)}>
                    <View className = 'w-10 h-10 bg-surface rounded-full items-center justify-center mr-4'>
                      <Ionicons name={item.icon as any} size={20} color={COLORS.primary} />
                    </View>
                    <Text className = 'flex-1 text-primary font-medium'>
                      {item.title}
                    </Text>
                    <Ionicons name = "chevron-forward" size = {20} color = {COLORS.secondary} />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Logout Button */}
              <TouchableOpacity className = 'flex-row items-center justify-center p-4' onPress = {handleLogout}>
                <Text className = "text-red-500 font-bold ml-2"> Log Out</Text>
              </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}