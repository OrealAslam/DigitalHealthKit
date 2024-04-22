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
      style={{
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'transparent',
      }}
      adChoicesPlacement="topRight"
      mediaAspectRatio="any"
      videoOptions={{
        customControlsRequested: true,
      }}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          backgroundColor: '#b0c0e8',
          justifyContent: 'center',
          borderRadius: 6,
          padding: 10,
          borderWidth: 1,
          borderColor: '#b0c0e8',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexGrow: 1,
              flexShrink: 1,
              paddingHorizontal: 6,
            }}>
            <ShimmerPlaceholder
              visible={visible}
              style={{width: '60%', height: 20, marginBottom: 10}}
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
                numberOfLines={4}
                style={{
                  fontSize: 11,
                  lineHeight: 11
                }}
              />
            </ShimmerPlaceholder>

            <AdvertiserView
              style={{
                fontSize: 10,
                color: 'gray',
              }}
            />

            <ShimmerPlaceholder
              visible={visible}
              style={{width: '100%', height: 25, marginTop: 10}}
              shimmerColors={['#E1E5FF', '#D3D2FE', '#e6e6fe']}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <StoreView
                  style={{
                    fontSize: 12,
                  }}
                />
                <StarRatingView
                  style={{
                    width: 65,
                    marginLeft: 10,
                  }}
                />
              </View>
            </ShimmerPlaceholder>
          </View>
        </View>
        <ShimmerPlaceholder
          visible={visible}
          shimmerColors={['#E1E5FF', '#D3D2FE', '#e6e6fe']}>
          <IconView
            style={{
              width: 90,
              height: 80,
            }}
          />
        </ShimmerPlaceholder>

        {visible == false ? null : (
          <View
            style={{
              width: 18,
              height: 18,
              position: 'absolute',
              left: 0,
              top: 0,
              backgroundColor: '#0a6888',
              borderBottomRightRadius: 10,
            }}>
            <Text style={{color: '#fff', fontSize: 12}}>Ad</Text>
          </View>
        )}

        <ShimmerPlaceholder
          style={{
            width: '100%',
            minHeight: 45,
            marginTop: 10,
            borderRadius: 50,
            marginBottom: 20,
          }}
          visible={visible}
          shimmerColors={['#E1E5FF', '#D3D2FE', '#e6e6fe']}>
          <CallToActionView
            style={{
              minHeight: 45,
              paddingHorizontal: 12,
              justifyContent: 'center',
              alignItems: 'center',
              width: 250,
              backgroundColor: '#725EEA', // #5F45FE rest of the Application
              borderRadius: 20,
            }}
            allCaps
            textStyle={{
              fontSize: 14,
              flexWrap: 'wrap',
              textAlign: 'center',
              color: '#fff',
            }}
          />
        </ShimmerPlaceholder>
      </View>
    </NativeAdView>
  );
});
