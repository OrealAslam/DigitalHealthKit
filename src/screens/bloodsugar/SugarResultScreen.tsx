import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  BackHandler,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Recomandations from '../../components/Recomandations';
import {NativeAd150} from '../../Helper/NativeAd150';
import LineChartAdComponent from './components/LineChartAdComponent';
import PieChartAdComponent from './components/PieChartAdComponent';
import {REPORT_TYPES, get_report, set_async_data} from '../../Helper/AppHelper';
import analytics from '@react-native-firebase/analytics';
import {lang} from '../../../global';
import {REWARED_AD_ID, INTERSITIAL_AD_ID, NATIVE_AD_ID_ONE, NATIVE_AD_ID_TWO} from '../../Helper/AdManager';
import DisplayRewardedAd from '../../components/DisplayRewardedAd';
import DisplayAd from '../../components/DisplayAd';

const {width} = Dimensions.get('window');
const itemWidth = width - 80;
const ratio = itemWidth / 1140;

const SugarResultScreen = ({navigation}: {navigation: any}) => {
  const [chartPercentage, setchartPercentage] = useState(72);
  const [pressurelevel, setpressurelevel] = useState('Normal');
  const [data, setdata] = useState(['', '']);
  const [loader, setloader] = useState(false);
  const [back, setback] = useState(false);
  const [language, setlanguage] = useState({
    dashobard: {bs: '', bsrestitle: '', recommended: ''},
    main: {add: '', unlock: ''},
    tracker: {
      bsChartText: '',
      bsCharAddtText: '',
    },
    article: {articledata: {}},
  });
  const [langstr, setlangstr] = useState({
    dashobard: {bs: '', bsrestitle: '', recommended: ''},
    main: {add: '', unlock: ''},
    tracker: {
      bsChartText: '',
      bsCharAddtText: '',
    },
    article: {articledata: {}},
  });

  const adjustBar = (value: any, unit: any) => {
    let numericValue = parseInt(value);
    if (unit == 'mg/dl') {
      if (numericValue < 50) {
        setpressurelevel('Low'); //'11%'
        setchartPercentage(12);
      }
      if (numericValue >= 50 && numericValue <= 115) {
        setpressurelevel('Normal'); //36%
        setchartPercentage(32);
      }
      if (numericValue > 115 && numericValue <= 180) {
        setpressurelevel('Pre-Diabetes'); //61%
        setchartPercentage(52);
      }
      if (numericValue > 180) {
        console.log('this called');
        setpressurelevel('High'); //85%
        setchartPercentage(72);
      }
    } else {
      if (numericValue < 2.6) {
        setpressurelevel('Low'); //11%
        setchartPercentage(12);
      }

      if (numericValue >= 2.6 && numericValue <= 6.3) {
        setpressurelevel('Normal'); //36%
        setchartPercentage(32);
      }
      if (numericValue >= 6.4 && numericValue <= 10) {
        setpressurelevel('Pre-Diabetes'); //61%
        setchartPercentage(52);
      }
      if (numericValue > 10) {
        setpressurelevel('High'); //85%
        setchartPercentage(72);
      }
    }
  };

  useEffect(() => {
    adjustBar(data[0], data[1]);
  }, [data]);

  useEffect(() => {
    (async () => {
      try {
        await analytics().logEvent('bs_result_screen');
        let lan = await lang();
        setlanguage(lan);
        let response = await get_report(REPORT_TYPES.sugar);
        if (response) {
          if (response.length > 0) {
            let latest = response[0].sugar_concentration;
            let unit = response[0].note;
            setdata([latest, unit]);
          }
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    setlangstr(language);
  }, [language]);

  const backAction = () => {
    navigation.navigate('HomeScreen', {tab: 'tracker'});
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName, {
      tab: 'insight',
    });
  };

  const showAd = async (type: any) => {
    setloader(true);
    if (type == 'line') {
      await set_async_data('line_chart_bs_ad', 'seen');
    } else {
      await set_async_data('pie_chart_bs_ad', 'seen');
    }
  };

  const _continue = async () => {
    setloader(false);
    if (back == true) {
      setback(false);
      navigation.navigate('HomeScreen', {tab: 'home'});
    } else {
      navigation.navigate('SugarResultScreen');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => setback(true)}
            // onPress={() => navigation.navigate('HomeScreen', {tab: 'tracker'})}
            style={{paddingHorizontal: 5}}
            accessibilityLabel="Back">
            <Image
              style={{width: 14, height: 14}}
              source={require('../../assets/images/dashboard_icons/navigate_back_new.png')}
            />
          </TouchableOpacity>

          <Text style={styles.heading}>{langstr.dashobard.bs}</Text>
        </View>

        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          decelerationRate={'fast'}>
          <View style={styles.colouredBg}>
            <TouchableOpacity
              style={styles.ibutton}
              onPress={() =>
                Linking.openURL('https://medlineplus.gov/vitalsigns.html')
              }>
              <Image
                style={{width: 25, height: 20}}
                source={require('../../assets/images/ibutton.png')}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{langstr.dashobard.bsrestitle}</Text>
            <View style={{marginVertical: 25}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: 18,
                  color: '#5F5F5F',
                  marginBottom: 15,
                }}>
                {pressurelevel}
              </Text>
              <Image
                style={{
                  alignSelf: 'center',
                  width: itemWidth,
                  height: 68 * ratio,
                }}
                source={require('../../assets/images/sugarbarchart.png')}
              />
              <Image
                style={{
                  width: 17,
                  height: 14,
                  marginLeft: 23,
                  position: 'relative',
                  top: 7,
                  left: `${chartPercentage}%`,
                }}
                source={require('../../assets/icons/pointer.png')}
              />
            </View>
          </View>

          <LineChartAdComponent
            navigation={navigation}
            langstr={langstr}
            showAd={showAd}
            loader={loader}
          />
          <View style={styles.NativeAd}>
            <NativeAd150 adId={NATIVE_AD_ID_ONE}/>
          </View>
          <PieChartAdComponent
            navigation={navigation}
            langstr={langstr}
            showAd={showAd}
            loader={loader}
          />
          <View style={styles.NativeAd}>
            <NativeAd150 adId={NATIVE_AD_ID_TWO}/>
          </View>
          <View style={styles.recomandation}>
            <Recomandations
              putScreen={'HomeScreen'}
              navigateScreen={navigateScreen}
            />
          </View>
        </ScrollView>
      </View>
      {loader && (
        <DisplayRewardedAd _continue={_continue} adId={REWARED_AD_ID} />
      )}

      {back && (<DisplayAd _continue={_continue} adId={INTERSITIAL_AD_ID}/>)}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  heading: {
    color: '#2E2E2E',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    marginLeft: 15,
  },
  colouredBg: {
    width: width * 0.87,
    alignSelf: 'center',
    backgroundColor: '#F4F5F6',
    borderRadius: 12,
    paddingTop: 10,
    marginBottom: 15,
  },
  title: {
    alignSelf: 'center',
    color: '#2E2E2E',
    fontSize: 14,
  },
  NativeAd: {
    width: width * 0.86,
    height: undefined,
    alignSelf: 'center',
    marginVertical: 15,
  },
  recomandation: {
    width: width,
    marginBottom: 15,
  },
  ibutton: {
    alignSelf: 'flex-end',
    top: -9,
  },
});
export default SugarResultScreen;
