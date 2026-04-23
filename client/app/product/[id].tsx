import { View, Text, ActivityIndicator, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Product } from '@/constants/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { dummyProducts } from '@/assets/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window')

// Colors from Tailwind config
const COLORS = {
    primary: "#111111",
    secondary: "#666666",
    background: "#FFFFFF",
    surface: "#F5F5F5",
    accent: "#FF4C3B",
    border: "#EEEEEE",
}

export default function ProductDetails() {

    const { id } = useLocalSearchParams();
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const { addToCart, cartItems, itemCount } = useCart()
    const { toggleWishlist, isInWishlist } = useWishlist()

    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    const fetchProduct = async () => {
        const found: any = dummyProducts.find((product) => product._id === id);
        setProduct(found ?? null);
        setLoading(false)
    }

    useEffect(() => {
        fetchProduct()
    }, [id])

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color={COLORS.primary} />
            </SafeAreaView>
        )
    }

    if (!product) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: COLORS.primary }}>Product not found</Text>
            </SafeAreaView>
        )
    }

    const isLiked = isInWishlist(product._id)

    const HandleAddToCart = () => {
        if (!selectedSize) {
            Toast.show({
                type: 'info',
                text1: 'No Size Selected',
                text2: 'Please select a size'
            })
            return;
        }
        addToCart(product, selectedSize || "")
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Image Carousel */}
                <View style={{ position: 'relative', height: 450, backgroundColor: COLORS.surface, marginBottom: 24 }}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onScroll={(e) => {
                            const slide = Math.ceil(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width)
                            setActiveImageIndex(slide)
                        }}>
                        {product.images?.map((img, index) => (
                            <Image
                                key={index}
                                source={{ uri: img }}
                                style={{ width: width, height: 450 }}
                                resizeMode='cover'
                            />
                        ))}
                    </ScrollView>

                    {/* Pagination Dots */}
                    <View style={{ position: 'absolute', bottom: 16, flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                        {product.images?.map((_, index) => (
                            <View
                                key={index}
                                style={{
                                    height: 8,
                                    borderRadius: 4,
                                    width: index === activeImageIndex ? 24 : 8,
                                    backgroundColor: index === activeImageIndex ? COLORS.primary : '#d1d5db',
                                    marginHorizontal: 3
                                }}
                            />
                        ))}
                    </View>

                    {/* Header Actions */}
                    <View style={{
                        position: 'absolute',
                        top: 48,
                        left: 16,
                        right: 16,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        zIndex: 10
                    }}>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: 'rgba(255,255,255,0.8)',
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => toggleWishlist(product)}
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: 'rgba(255,255,255,0.8)',
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Ionicons
                                name={isLiked ? 'heart' : 'heart-outline'}
                                size={24}
                                color={isLiked ? COLORS.accent : COLORS.primary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Product info */}
                <View style={{ paddingHorizontal: 20 }}>
                    {/* Title & Rating */}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 8
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: COLORS.primary,
                            flex: 1,
                            marginRight: 16
                        }}>
                            {product.name}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name='star' size={14} color='#FFD700' />
                            <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 4, color: COLORS.primary }}>4.6</Text>
                            <Text style={{ fontSize: 12, color: COLORS.secondary, marginLeft: 4 }}>(85)</Text>
                        </View>
                    </View>

                    {/* Price */}
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: COLORS.primary,
                        marginBottom: 24
                    }}>
                        ${product.price.toFixed(2)}
                    </Text>

                    {/* Size */}
                    {product.sizes && product.sizes.length > 0 && (
                        <>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: COLORS.primary,
                                marginBottom: 12
                            }}>
                                Size
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                gap: 12,
                                marginBottom: 24,
                                flexWrap: 'wrap'
                            }}>
                                {product.sizes.map((size) => (
                                    <TouchableOpacity
                                        key={size}
                                        onPress={() => setSelectedSize(size)}
                                        style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 24,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            backgroundColor: selectedSize === size ? COLORS.primary : COLORS.background,
                                            borderColor: selectedSize === size ? COLORS.primary : COLORS.border
                                        }}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: '500',
                                            color: selectedSize === size ? COLORS.background : COLORS.primary
                                        }}>
                                            {size}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    )}
                    
                    {/* Description */}
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: COLORS.primary,
                        marginBottom: 8
                    }}>
                        Description
                    </Text>
                    <Text style={{
                        color: COLORS.secondary,
                        lineHeight: 24,
                        marginBottom: 24
                    }}>
                        {product.description}
                    </Text>
                </View>
            </ScrollView>
            
            {/* Footer */}
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 16,
                backgroundColor: COLORS.background,
                borderTopWidth: 1,
                borderTopColor: COLORS.border,
                flexDirection: 'row'
            }}>
                <TouchableOpacity 
                    onPress={HandleAddToCart} 
                    style={{
                        width: '80%',
                        backgroundColor: COLORS.primary,
                        paddingVertical: 16,
                        borderRadius: 9999,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                    <Ionicons name="bag-outline" size={20} color="white" />
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                        marginLeft: 8
                    }}>
                        Add To Cart
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => router.push("/(tabs)/cart")} 
                    style={{
                        width: '20%',
                        paddingVertical: 12,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                    <Ionicons name="cart-outline" size={24} color={COLORS.primary} />
                    {itemCount > 0 && (
                        <View style={{
                            position: 'absolute',
                            top: 8,
                            right: 16,
                            width: 16,
                            height: 16,
                            zIndex: 10,
                            backgroundColor: COLORS.primary,
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 9
                            }}>
                                {itemCount}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}