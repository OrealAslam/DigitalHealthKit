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
  AdBadge,
} from 'react-native-admob-native-ads';

export const NativeAd150 = React.memo(props => {
  const nativeAdViewRef = useRef(NativeAdView);
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
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
        backgroundColor: 'transparent',
      }}
      adChoicesPlacement="topRight"
      mediaAspectRatio="any"
      onAdFailedToLoad={(e)=>console.log('Native Ad error', e)}
      videoOptions={{
        customControlsRequested: true,
      }}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          backgroundColor: '#D3D2FF',
          justifyContent: 'center',
          borderRadius: 13,
          padding: 10,
          borderWidth: 0,
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
          </View>
        </View>
        <IconView
          style={{
            width: 60,
            height: 60,
            margin: 5,
          }}
        />
        <AdBadge
          style={{
            backgroundColor: '#3980FF',
            width: 19,
            height: 19,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomRightRadius: 9,
            borderWidth: 0
          }}
          textStyle={{color: '#fff'}}
        />
        <CallToActionView
          style={{
            minHeight: 45,
            paddingHorizontal: 12,
            justifyContent: 'center',
            alignItems: 'center',
            width: 250,
            backgroundColor: '#7A3BB8',
            borderRadius: 10,
          }}
          allCaps
          textStyle={{
            fontSize: 14,
            flexWrap: 'wrap',
            textAlign: 'center',
            color: '#ffffff',
          }}
        />
      </View>
    </NativeAdView>
  );
});
