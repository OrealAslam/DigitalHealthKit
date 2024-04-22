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

const {width} = Dimensions.get('window');

const cardWidth = width - 40;
const cardRatio = cardWidth / 1312;

const colCardWidth = width / 2 - 30;
const colCardRatio = colCardWidth / 640;

const DashboardContent = (props: any) => {
  const [recentbp, setrecentbp] = useState(null);
  const [recentbs, setrecentbs] = useState(null);
  const [recentbmi, setrecentbmi] = useState(null);
  const [recentheart, setrecentheart] = useState(null);
  const [recenttemp, setrecenttemp] = useState(null);
  const [language, setlanguage] = useState({
    dashobard: {bp: '', bs: '', temperature: '', bmi: '', addNow: ''},
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
      {/* <View style={{backgroundColor: '#fff'}}>
      </View> */}
      <TouchableOpacity activeOpacity={0.9} onPress={() => props.navigate('AddBloodSugar')}>
        <ImageBackground
          style={styles.dashboardCard}
          source={require('../../../../assets/images/dashboard_icons_new/bloodsugar_new.png')}>
          <Text
            style={[
              styles.cardtitle,
              {fontSize: 23, top: '12%', left: '5%', fontWeight: '700'},
            ]}>
            {cardtitletwo}
          </Text>
          <Text style={styles.result}>
              {recentbs != null ? recentbs + '  mmol/L' : add}
            </Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.9} onPress={() => props.navigate('AddBloodPressure')}>
        <ImageBackground
          style={styles.dashboardCard}
          source={require('../../../../assets/images/dashboard_icons_new/bloodpressure_new.png')}>
          <Text
            style={[
              styles.cardtitle,
              {fontSize: 23, top: '12%', left: '5%', fontWeight: '700'},
            ]}>
            {cardtitleone}
          </Text>
          <Text style={styles.result}>
              {recentbp != null ? recentbp + '  mmHg' : add}
            </Text>
        </ImageBackground>
      </TouchableOpacity>

      <View style={styles.multipleCardContainer}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => props.navigate('BmiScreen')}>
          <ImageBackground
            style={styles.colCard}
            source={require('../../../../assets/images/dashboard_icons_new/bmi.png')}>
            <Text
            style={[
              styles.cardtitle,
              {fontSize: 18, top: '8%', left: '11%', fontWeight: '700'},
            ]}>
            {cardtitlefour}
          </Text>
            <Text style={styles.result}>
            {recentbmi != null ? recentbmi.split(' ')[0] : add}
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.9} onPress={() => props.navigate('AdTemperature')}>
          <ImageBackground
            style={styles.colCard}
            source={require('../../../../assets/images/dashboard_icons_new/temerature.png')}>
            <Text
            style={[
              styles.cardtitle,
              {fontSize: 18, top: '8%', left: '11%', fontWeight: '700'},
            ]}>{cardtitlethree}</Text>
            <Text style={styles.result}>
              {/* 30*C  */}
              {recenttemp != null ? recenttemp : 'Add Record'}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
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
  },
  nativeContainer: {
    width: width * 0.88,
    alignSelf: 'center',
    marginBottom: 10,
  },
  multipleCardContainer: {
    width: width * 0.88,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
    marginTop: 0,
  },
  colCard: {
    width: colCardWidth,
    height: 580 * colCardRatio,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 7,
    paddingLeft: 9,
  },
  dashboardCard: {
    width: cardWidth,
    height: 580 * cardRatio,
    marginBottom: 12,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  cardtitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  result: {
    color: '#fff',
    fontSize: 13,
    position: 'absolute',
    bottom: '8%',
    left: '5%',
  },
});
export default DashboardContent;