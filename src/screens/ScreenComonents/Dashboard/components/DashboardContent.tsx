import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {get_async_data} from '../../../../Helper/AppHelper';
import {lang} from '../../../../../global';
import {NativeAd150} from '../../../../Helper/NativeAd150';
import LottieView from 'lottie-react-native';
import { NATIVE_AD_ID_ONE } from '../../../../Helper/AdManager';

const {width} = Dimensions.get('window');

const cardWidth = width - 40;
const cardRatio = cardWidth / 1312;

const colCardWidth = width / 2 - 30;
const colCardRatio = colCardWidth / 632;

const DashboardContent = (props: any) => {
  const [recentbp, setrecentbp] = useState(null);
  const [recentbs, setrecentbs] = useState(null);
  const [recentbmi, setrecentbmi] = useState(null);
  const [recentheart, setrecentheart] = useState(null);
  const [recenttemp, setrecenttemp] = useState(null);
  const [language, setlanguage] = useState({
    dashobard: {bp: '', bs: '', temperature: '', bmi: '', addNow: ''},
    main: {more: ''},
  });
  const [cardtitleone, setcardtitleone] = useState('Blood Pressure');
  const [cardtitletwo, setcardtitletwo] = useState('Blood Sugar');
  const [cardtitlethree, setcardtitlethree] = useState('Temperature');
  const [cardtitlefour, setcardtitlefour] = useState('BMI Calculator');
  const [add, setadd] = useState('Add Now');

  useEffect(() => {
    (async () => {
      let bp = await get_async_data('record_bp');
      let bs = await get_async_data('record_bs');
      let bmi = await get_async_data('record_bmi');
      let heart = await get_async_data('record_heart');
      let temp = await get_async_data('record_temp');
      let lan = await lang();
      setrecentbp(bp);
      setrecentbs(bs);
      setrecentbmi(bmi);
      setrecentheart(heart);
      setrecenttemp(temp);
      setlanguage(lan);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setcardtitleone(language?.dashobard.bp);
      setcardtitletwo(language?.dashobard.bs);
      setcardtitlethree(language?.dashobard.temperature);
      setcardtitlefour(language?.dashobard.bmi);
      setadd(language?.dashobard.addNow);
    })();
  }, [language]);

  const heartScreen = async () => {
    let heartboarding = await get_async_data('heart_boarding');
    if (heartboarding != 'seen') {
      props.navigate('BoardingHeartRate1');
    } else {
      props.navigate('BoardingHeartRate2');
    }
  };

  return (
    <View style={styles.dashboardCardContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => props.navigate('SugarBridgeScreen')}>
        <ImageBackground
          style={styles.dashboardCard}
          source={require('../../../../assets/images/dashboard_icons_new/bloodsugar_new.png')}>
          <Text
            style={[styles.cardtitle, {marginLeft: 20, marginVertical: 15}]}>
            {cardtitletwo}
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.addbtn}
            onPress={() => props.navigate('AddBloodSugar')}>
            <Image
              style={styles.addbtn}
              source={require('../../../../assets/images/dashboard_icons_new/add.png')}
            />
          </TouchableOpacity>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => props.navigate('BpBridgeScreen')}>
        <ImageBackground
          style={styles.dashboardCard}
          source={require('../../../../assets/images/dashboard_icons_new/bloodpressure_new.png')}>
          <Text
            ellipsizeMode='head'
            style={[styles.cardtitle, {marginLeft: 20, marginVertical: 15}]}>
            {cardtitleone}
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.addbtn}
            onPress={() => props.navigate('AddBloodPressure')}>
            <Image
              style={styles.addbtn}
              source={require('../../../../assets/images/dashboard_icons_new/add.png')}
            />
          </TouchableOpacity>
        </ImageBackground>
      </TouchableOpacity>

      <View style={[styles.nativeContainer, {marginLeft: 10}]}>
        <NativeAd150 adId={NATIVE_AD_ID_ONE}/>
      </View>

      <View style={styles.multipleCardContainer}>
        <ImageBackground
          style={styles.colCard}
          source={require('../../../../assets/images/dashboard_icons_new/bmi.png')}>
          <Text
            style={[
              styles.cardtitle,
              {marginLeft: 20, position: 'absolute', bottom: 63, fontSize: 17},
            ]}>
            {cardtitlefour}
          </Text>

          <TouchableOpacity
            style={{position: 'absolute', top: 10, right: 20}}
            activeOpacity={0.9}
            onPress={() => props.navigate('BmiResultScreen')}>
            <Text style={[styles.cardtitle, {fontSize: 14}]}>
              {language.main.more}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigate('BmiScreen')}
            activeOpacity={0.9}
            style={{
              width: 78,
              height: 33,
              position: 'absolute',
              bottom: 15,
              left: 15,
            }}>
            <Image
              style={{width: 78, height: 33}}
              source={require('../../../../assets/images/dashboard_icons_new/add.png')}
            />
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          style={styles.colCard}
          source={require('../../../../assets/images/dashboard_icons_new/temerature.png')}>
          <LottieView
            style={{width: 64, height: 64, top: 22}}
            source={require('../../../../assets/temp_lottir.json')}
            autoPlay
            loop
          />
          <Text
            style={[
              styles.cardtitle,
              {marginLeft: 20, position: 'absolute', bottom: 63, fontSize: 17},
            ]}>
            {cardtitlethree}
          </Text>

          <TouchableOpacity
            onPress={() => props.navigate('TemperatureResultScreen')}
            style={{position: 'absolute', top: 10, right: 20}}
            activeOpacity={0.9}>
            <Text style={[styles.cardtitle, {fontSize: 14}]}>
              {language.main.more}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigate('AdTemperature')}
            activeOpacity={0.9}
            style={{
              width: 78,
              height: 33,
              position: 'absolute',
              bottom: 15,
              left: 15,
            }}>
            <Image
              style={{width: 78, height: 33}}
              source={require('../../../../assets/images/dashboard_icons_new/add.png')}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboardCardContainer: {
    width: width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 20,
  },
  nativeContainer: {
    width: width * 0.88,
    alignSelf: 'center',
  },
  multipleCardContainer: {
    width: width * 0.88,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
    marginTop: 11,
  },
  colCard: {
    width: colCardWidth,
    height: 660 * colCardRatio,
    alignItems: 'flex-start',
  },
  dashboardCard: {
    width: cardWidth,
    height: 520 * cardRatio,
    marginBottom: 12,
    // alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cardtitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  result: {
    color: '#fff',
    fontSize: 13,
    position: 'absolute',
    bottom: '8%',
    left: '5%',
  },
  addbtn: {
    width: 90,
    height: 38.77,
    marginBottom: 20,
    marginLeft: 10,
  },
});
export default DashboardContent;
