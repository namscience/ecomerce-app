import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from "../../components/Header";
import { BANNERS, dummyProducts } from '@/assets/assets';
import { useRouter } from 'expo-router';
import { CATEGORIES } from '@/constants';
import CategoryItem from '@/components/CategoryItem';
import { Product } from '@/constants/types';
import ProductCard from '@/components/ProductCard';

const { width } = Dimensions.get("window")

export default function Home() {
  const router = useRouter();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const categories = [{id: 'all', name: 'All', icon: "grid"}, ...CATEGORIES]

  const fetchProducts = async () => {
    setProducts(dummyProducts);
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <SafeAreaView style={{flex: 1}} edges={["top"]}>
      <Header title='Forever' showMenu showCart showLogo />

      <ScrollView style={{flex: 1, paddingHorizontal: 16}} showsVerticalScrollIndicator={false}>
        {/* Banner Slider */}
        <View className = 'mb-6'>


        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false} 
          style={{width: '100%', height: 192, borderRadius: 12}} 
          scrollEventThrottle={16}
          onScroll={(e) => {
            const slide = Math.ceil(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
            if(slide !== activeBannerIndex) {
              setActiveBannerIndex(slide);
            }
          }}
        >
          {BANNERS.map((banner, index) => (
            <View key={index} style={{position: 'relative', width: width - 32, height: 192, backgroundColor: '#E5E7EB', overflow: 'hidden'}}>
              <Image source={{uri: banner.image}} style={{width: '100%', height: '100%'}} resizeMode='cover' />

              <View style={{position: 'absolute', bottom: 16, left: 16, zIndex: 10}}>
                <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>{banner.title}</Text>
                <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>{banner.subtitle}</Text>
                <TouchableOpacity style={{marginTop: 8, backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 9999, alignSelf: 'flex-start'}}>
                  <Text style={{color: '#111111', fontSize: 12, fontWeight: 'bold'}}>Get Now</Text>
                </TouchableOpacity>
              </View>
              <View style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)'}} />
            </View>
          ))}
        </ScrollView>
        
        {/* Pagination Dots */}
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 12}}>
          {BANNERS.map((_, index) => (
            <View 
              key={index} 
              style={{
                height: 8, 
                borderRadius: 9999, 
                width: index === activeBannerIndex ? 24 : 8, 
                backgroundColor: index === activeBannerIndex ? '#111111' : '#D1D5DB', 
                marginHorizontal: 4
              }} 
            />
          ))}
        </View>
        </View>
        
        {/* Categories */}
        <View style={{marginBottom: 24}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#111111'}}>Categories</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat: any) => (
              <CategoryItem 
              key={cat.id} 
              item={cat} 
              isSelected={false} 
              onPress={() => router.push({pathname: "/shop", params: {category: cat.id === 'all' ? '' : cat.name}})}/>
            ))}
          </ScrollView>
        </View>
        {/* Popular Products */}
        <View style={{marginBottom: 32}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#111111'}}>Popular</Text>
            <TouchableOpacity onPress={() => router.push('/shop')}>
              <Text style={{color: '#666666', fontSize: 14}}>See All</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#111111" />
          ) : (
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </View>
          )}
        </View>
        {/* Newsletter CTA */}
        <View style={{
          backgroundColor: '#F3F4F6', 
          padding: 24, 
          borderRadius: 16, 
          marginBottom: 80, 
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 24, 
            fontWeight: 'bold', 
            color: '#111111', 
            marginBottom: 8, 
            textAlign: 'center'
          }}>Join the Revolution</Text>
          <Text style={{
            color: '#666666', 
            textAlign: 'center', 
            marginBottom: 16
          }}>Subscribe to our newsletter and get 10% off on your first purchase.</Text>
          <TouchableOpacity style={{
            backgroundColor: '#111111', 
            width: '80%', 
            paddingVertical: 12, 
            borderRadius: 9999, 
            alignItems: 'center'
          }}>
            <Text style={{
              color: 'white', 
              fontWeight: '500', 
              fontSize: 16
            }}>Subscribe Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )


}