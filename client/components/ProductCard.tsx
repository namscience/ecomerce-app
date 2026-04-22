import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ProductCardProps } from '@/constants/types'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductCard({product}: ProductCardProps) {
    const {toggleWishlist, isInWishlist} = useWishlist()
    const isLiked = isInWishlist(product._id);
    return (
    <Link href={`/product/${product._id}`} asChild>
        <TouchableOpacity style={{width: '48%', marginBottom: 16, backgroundColor: 'white', borderRadius: 8, overflow: 'hidden'}}>
        
        {/* Image Container */}
        <View style={{position: 'relative', height: 224, width: '100%', backgroundColor: '#F3F4F6'}}>
            <Image source={{uri: product.images?.[0] ?? ''}} style={{width: '100%', height: '100%'}} resizeMode="cover"/>

            {/* favourite icon */}
            <TouchableOpacity 
            style={{
                position: 'absolute', 
                top: 8, 
                right: 8, 
                zIndex: 10, 
                padding: 8, 
                backgroundColor: 'white', 
                borderRadius: 9999,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2
            }} 
            onPress={(e) => {e.stopPropagation();
            toggleWishlist(product)
            }}>
            <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={20} color={isLiked ? COLORS.accent : COLORS.primary}/>
            </TouchableOpacity>

            {/* is Featured */}
            {product.isFeatured && (
            <View style={{
                position: 'absolute', 
                top: 8, 
                left: 8, 
                backgroundColor: 'black', 
                paddingHorizontal: 8, 
                paddingVertical: 4, 
                borderRadius: 4
            }}>
                <Text style={{
                color: 'white', 
                fontSize: 12, 
                fontWeight: 'bold', 
                textTransform: 'uppercase'
                }}>Featured</Text>
            </View>
            )}
        </View>
        
        {/* product info */}
        <View style={{padding: 12}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
                <Ionicons name='star' size={14} color='#FFD700'/>
                <Text style={{color: '#666666', fontSize: 12, marginLeft: 4}}>4.6</Text>
            </View>
            <Text style={{color: '#111111', fontWeight: '500', fontSize: 14, marginBottom: 4}} numberOfLines={1}>{product.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: '#111111', fontWeight: 'bold', fontSize: 16}}>${product.price.toFixed(2)}</Text>
            </View>
        </View>
        
        </TouchableOpacity>
    </Link>
    )
}