import React, {useRef, useState, useEffect} from 'react';
import {Text, View} from 'react-native';
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

export const NativeAd150 = React.memo(() => {
  const nativeAdViewRef = useRef(NativeAdView);
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
      }}
      adChoicesPlacement="topRight"
      mediaAspectRatio="any"
      videoOptions={{
        customControlsRequested: true,
      }}>
      <View
        style={{
          width: '100%',
          height: 'auto',
          padding: 10,
          paddingBottom: 0,
          backgroundColor: '#b0c0e8',
          alignItems: 'center',
          alignSelf: 'center',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '95%',
          }}>
          <View style={{width: '48%'}}>
            <ShimmerPlaceholder
              style={{width: '100%', height: 73}}
              visible={visible}
              shimmerColors={['#E1E5FF', '#D3D2FE', '#e6e6fe']}>
              <ImageView
                style={{
                  width: '88%',
                  alignSelf: 'center',
                  // width: 141.26,
                  height: 73,
                  resizeMode: 'contain',
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
              style={{width: '100%',marginBottom: 10}}
              shimmerColors={['#E1E5FF', '#D3D2FE', '#e6e6fe']}>
              <HeadlineView
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: '#000',
                  width: '100%',
                  height: 'auto',
                }}
              />
            </ShimmerPlaceholder>

            <ShimmerPlaceholder
              visible={visible}
              style={{width: '100%'}}
              shimmerColors={['#E1E5FF', '#D3D2FE', '#e6e6fe']}>
              <TaglineView
                numberOfLines={2}
                style={{
                  fontSize: 10,
                  width: '100%',
                  color: '#404040',
                }}
              />
            </ShimmerPlaceholder>
          </View>
        </View>

        
        <View style={{width: '100%'}}>
          <ShimmerPlaceholder
            style={{
              width: '100%',
              minHeight: 45,
              marginTop: 10,
              borderRadius: 10,
              marginBottom: 15,
            }}
            visible={visible}
            shimmerColors={['#E1E5FF', '#D3D2FE', '#e6e6fe']}>
            <CallToActionView
              style={{
                minHeight: 45,
                paddingHorizontal: 12,
                justifyContent: 'center',
                alignItems: 'center',
                width: 275,
                backgroundColor: '#700FD0', // #5F45FE rest of the Application
                borderRadius: 16,
              }}
              allCaps
              textStyle={{
                fontSize: 16,
                flexWrap: 'wrap',
                textAlign: 'center',
                color: '#fff',
              }}
            />
          </ShimmerPlaceholder>
        </View>

        {visible == false ? null : (
          <View
            style={{
              width: 16,
              height: 16,
              position: 'absolute',
              left: 0,
              top: 0,
              backgroundColor: '#3980FF',
              borderTopLeftRadius: 10,
            }}>
            <Text style={{color: '#fff', fontSize: 10,textAlign: 'center', verticalAlign: 'middle'}}>Ad</Text>
          </View>
        )}
      </View>
    </NativeAdView>
  );
});
