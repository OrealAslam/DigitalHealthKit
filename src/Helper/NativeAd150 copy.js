import React, {useRef, useState, useEffect} from 'react';
import {Text, View, Dimensions} from 'react-native';
import NativeAdView, {
  AdvertiserView,
  CallToActionView,
  HeadlineView,
  IconView,
  StarRatingView,
  StoreView,
  TaglineView,
  AdBadge,
  PriceView,
  ImageView,
} from 'react-native-admob-native-ads';
import {NATIVE_AD_ID} from './AdManager';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const {width} = Dimensions.get('window');

export const NativeAd150 = React.memo(() => {
  const nativeAdViewRef = useRef(NativeAdView);
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    // const adLoadedListener = nativeAdViewRef.current?._onAdLoaded( () => {
    //   setVisible(true);
    // });

    setTimeout(() => {
      setvisible(true);
    }, 2000);

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
      onAdFailedToLoad={e => console.log('ad load error', e)}
      adChoicesPlacement="topRight"
      mediaAspectRatio="any"
      enableTestMode={true}
      videoOptions={{
        customControlsRequested: true,
      }}>
      <View
        style={{
          width: width,
          alignItems: 'center',
          backgroundColor: '#b0c0e8',
          justifyContent: 'center',
          borderRadius: 6,
          padding: 10,
          borderWidth: 1,
          borderColor: '#b0c0e8',
        }}>
        <AdBadge
          style={{
            width: 15,
            height: 15,
            borderTopLeftRadius: 6,
          }}
          textStyle={{
            fontSize: 9,
            color: 'green',
          }}
        />
        <HeadlineView
          style={{
            fontWeight: 'bold',
            fontSize: 13,
          }}
        />

        <TaglineView
          style={{
            fontWeight: 'bold',
            fontSize: 12,
            
          }}
        />

        <AdvertiserView
          style={{
            fontWeight: 'bold',
            fontSize: 10,
          }}
        />
        <PriceView
          style={{
            fontWeight: 'bold',
            fontSize: 10,
          }}
        />
        <StoreView
          style={{
            fontWeight: 'bold',
            fontSize: 10,
          }}
        />
        <StarRatingView />

        <ImageView
          style={{
            width: '100%',
            alignSelf: 'center',
            height: 70,
            resizeMode: 'contain',
          }}
        />

        <IconView
          style={{
            width: 60,
            height: 60,
          }}
        />

        <CallToActionView
          style={{
            width: 200,
            height: 45,
            paddingHorizontal: 12,
            backgroundColor: 'purple',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 5,
            elevation: 10,
          }}
          textStyle={{color: 'white', fontSize: 14}}
        />
      </View>
    </NativeAdView>
  );
});
