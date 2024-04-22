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
} from 'react-native-admob-native-ads';
import {NATIVE_AD_ID} from './AdManager';

export const NativeAd100 = React.memo(() => {
  const nativeAdViewRef = useRef(NativeAdView);
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
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
          backgroundColor: '#CBEEFF',
          justifyContent: 'center',
          borderRadius: 3,
          padding: 10,
          borderWidth: 1,
          borderColor: '#C8C8C8',
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
            height: 100,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingHorizontal: 10,
          }}>
          <IconView
            style={{
              width: 60,
              height: 60,
            }}
          />
          <View
            style={{
              flexGrow: 1,
              flexShrink: 1,
              paddingHorizontal: 6,
            }}>
            <HeadlineView
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                color: '#000',
              }}
            />
            <TaglineView
              numberOfLines={2}
              style={{
                fontSize: 11,
              }}
            />
            <AdvertiserView
              style={{
                fontSize: 10,
                color: 'gray',
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
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
          </View>
        </View>
        <CallToActionView
          style={{
            minHeight: 45,
            paddingHorizontal: 12,
            justifyContent: 'center',
            alignItems: 'center',
            width: 250,
            backgroundColor: '#59B8E6',
            borderRadius:10
          }}
          allCaps
          textStyle={{
            fontSize: 13,
            flexWrap: 'wrap',
            textAlign: 'center',
            color: '#ffffff',
            
          }}
        />
      </View>
    </NativeAdView>
  );
});
