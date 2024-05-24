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
  AdBadge
} from 'react-native-admob-native-ads';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export const NativeAd150 = React.memo((props) => {
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
      adUnitID={props.adId}
      style={{
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}
      adChoicesPlacement="topRight"
      mediaAspectRatio="any"
      onAdFailedToLoad={async (e)=> {
        console.log('ad load error', e);
        await analytics().logEvent('native_ad_impression');
      }}
      onAdImpression={(e)=>{
        console.log('Native Ad Impression created');
      }}
      videoOptions={{
        customControlsRequested: true,
      }}>
      <View
        style={{
          width: '100%',
          height: 'auto',
          padding: 10,
          paddingBottom: 0,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          alignSelf: 'center',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          borderRadius: 16,
        }}>
        <AdBadge
          style={{
            width: 18,
            height: 18,
            borderWidth: 0,
            borderTopLeftRadius: 6,
            backgroundColor: '#7A3BB8'
          }}
          textStyle={{
            fontSize: 10,
            color: 'green',
            color: '#fff',
            alignSelf: 'center'
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '98%',
          }}>
          <View style={{width: '48%', paddingTop: 10}}>
            <ShimmerPlaceholder
              style={{width: '100%', height: 73}}
              visible={visible}
              shimmerColors={['#E1E5FF', '#D3D2FE', '#e6e6fe']}>
              <ImageView
                style={{
                  width: '88%',
                  alignSelf: 'center',
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

            <ShimmerPlaceholder
              visible={visible}
              style={{width: '100%'}}
              shimmerColors={['#E1E5FF', '#D3D2FE', '#e6e6fe']}>
              <IconView style={{width: 22, height: 22, borderRadius: 15}} />
            </ShimmerPlaceholder>
          </View>
        </View>

        <View style={{width: '100%'}}>
          <ShimmerPlaceholder
            style={{
              width: '100%',
              minHeight: 45,
              marginTop: 15,
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
                width: 246,
                backgroundColor: '#7A3BB8',
                borderRadius: 23,
              }}
              allCaps
              textStyle={{
                fontSize: 19,
                flexWrap: 'wrap',
                textAlign: 'center',
                textTransform: 'capitalize',
                color: '#fff',
              }}
            />
          </ShimmerPlaceholder>
        </View>
      </View>
    </NativeAdView>
  );
});
