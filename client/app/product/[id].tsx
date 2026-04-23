import { View, Text, ActivityIndicator, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Product } from '@/constants/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { dummyProducts } from '@/assets/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const {width} = Dimensions.get('window')

export default function ProductDetails() {

    const {id} = useLocalSearchParams();
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const {addToCart, cartItems} = useCart()
    const {toggleWishlist, isInWishlist} = useWishlist()

    const [selectedSize, setSelectedSize] = useState<string |null>(null)
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const fetchProduct = async () => {
        setProduct(dummyProducts.find((product) => product._id === id) as any); setLoading(false)
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size = 'large' color = {COLORS.primary}/>
            </SafeAreaView>
        )
    }
    if (!product) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text> Product not found </Text>
            </SafeAreaView>
        )
    }

    const isLiked = isInWishlist(product._id)

  return (
    <View className = 'flex-1 bg-white'>
      <ScrollView contentContainerStyle = {{paddingBottom: 100}}>
        {/* Image Carousel */}
        <View className = 'relative h-[450]px bg-gray-100 mb-6'>
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}>
                {product.images?.map((img, index)=>(
                    <Image key = {index}
                    source = {{uri: img}}
                    style = {{width: width, height: 450}} resizeMode='cover'/>
                ))}
            </ScrollView>
        </View>
      </ScrollView>

      {/* Header Actions */}
      <View className = 'absolute top-12 left-4 right-4 flex-row justify-between items-center z-10'>
        <TouchableOpacity onPress={()=>router.back()}
        className = 'w-10 h-10 bg-white/80 rounded-full items-center justify-center'>
            <Ionicons name = "arrow-back" size = {24} color={COLORS.primary}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}