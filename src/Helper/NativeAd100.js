import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  DeviceEventEmitter,
  Platform,
  Text,
  View,
} from 'react-native';
import NativeAdView, {
  AdvertiserView,
  CallToActionView,
  HeadlineView,
  IconView,
  StarRatingView,
  StoreView,
  TaglineView,
  ImageView,
} from 'react-native-admob-native-ads';
import {NATIVE_AD_ID} from './AdManager';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export const NativeAd100 = React.memo(() => {
  const nativeAdViewRef = useRef(NativeAdView);
  const [loaded, setLoaded] = useState(false);
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    // const adLoadedListener = nativeAdViewRef.current?._onAdLoaded( () => {
    //   setVisible(true);
    // });

    setTimeout(() => {
      setvisible(true);
    }, 3000);

    // Clean up event listener when component unmounts
    // return () => {
    //   adLoadedListener();
    // };
  }, []);
  useEffect(() => {
    // Load the native ad
    nativeAdViewRef.current?.loadAd();
  }, []);

  return (
    <NativeAdView
      ref={nativeAdViewRef}
      adUnitID={NATIVE_AD_ID}
      style={{
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'transparent',
      }}
      onNativeAdLoaded={(load)=>{setvisible(true);}}
      adChoicesPlacement="topRight"
      onAdOpened={(e)=>console.log('open console ', e)}
      mediaAspectRatio="any"
      onAdFailedToLoad={e => {
        console.log('ad load error', e);
      }}
      videoOptions={{
        customControlsRequested: true,
      }}>
      <View
        style={{
          width: '97%',
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: '#b0c0e8',
          alignItems: 'center',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            paddingTop: 10,
          }}>
          <View
            style={{
              width: '48%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ShimmerPlaceholder
              style={{width: '100%', height: 73}}
              visible={visible}
              shimmerColors={['#E1E5FF', '#D3D2FE', '#e6e6fe']}>
              <ImageView
                style={{
                  width: '77%',
                  height: 63,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </ShimmerPlaceholder>
          </View>

          <View
            style={{
              width: '48%',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ShimmerPlaceholder
              visible={visible}
              style={{width: '100%', marginBottom: 10}}
              shimmerColors={['#E1E5FF', '#D3D2FE', '#e6e6fe']}>
              <TaglineView
                numberOfLines={2}
                style={{
                  fontSize: 11,
                  width: '100%',
                  color: '#404040',
                }}
              />
            </ShimmerPlaceholder>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'flex-start'}}>
              <IconView style={{width: 33, height: 33, borderRadius: 20}} />
              <ShimmerPlaceholder
                style={{
                  width: '100%',
                  minHeight: 40,
                  borderRadius: 10,
                }}
                visible={visible}
                shimmerColors={['#E1E5FF', '#D3D2FE', '#e6e6fe']}>
                <CallToActionView
                  style={{
                    minHeight: 26,
                    paddingHorizontal: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 94.63,
                    backgroundColor: '#7A3BB8',
                    borderRadius: 23,
                  }}
                  allCaps
                  textStyle={{
                    fontSize: 10.51,
                    flexWrap: 'wrap',
                    textAlign: 'center',
                    textTransform: 'capitalize',
                    color: '#fff',
                  }}
                />
              </ShimmerPlaceholder>
            </View>
          </View>
        </View>

        {visible == false ? null : (
          <View
            style={{
              width: 18,
              height: 18,
              position: 'absolute',
              left: 0,
              top: 0,
              backgroundColor: '#3980FF',
              borderTopLeftRadius: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 10,
                textAlign: 'center',
                verticalAlign: 'middle',
              }}>
              Ad
            </Text>
          </View>
        )}
      </View>
    </NativeAdView>
  );
});