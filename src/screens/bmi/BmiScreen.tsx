import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,BackHandler
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LoadingAnimation from '../../components/LoadingAnimation';
import BMIPicker from './components/BMIPicker';
import { Banner, INTERSITIAL_AD_ID_OLD } from '../../Helper/AdManager';
import {add_bmi_report, get_async_data, set_async_data} from '../../Helper/AppHelper';
import moment from 'moment';
import analytics from '@react-native-firebase/analytics';
import { lang } from '../../../global';
import DisplayAd from '../../components/DisplayAd';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width / 2 - 30;
const RATIO = ITEM_WIDTH / 592;

const itemWidth = width - 80;
const ratio = itemWidth / 1140;

const BmiScreen = ({navigation}: {navigation: any}) => {
  const [card, setcard] = useState('male');
  const [weight, setweight] = useState(70);
  const [height, setheight] = useState(172);
  const [loader, setloader] = useState(false);
  const [pressurelevel, setpressurelevel] = useState('Normal');
  const [chartPercentage, setchartPercentage] = useState(35);
  const [bmi, setbmi] = useState(23.66);
  const [closeloader, setcloseloader] = useState(false);
  const [language, setlanguage] = useState({
    dashobard: {bmi: ''},
    main: {
      male: '',
      female: '',
      weight: '',
      height: '',
      calculatebmi: '',
    },
  });
  const [langstr, setlangstr] = useState({
    dashobard: {bmi: ''},
    main: {
      male: '',
      female: '',
      weight: '',
      height: '',
      calculatebmi: '',
    },
  });

  const calculateBMI = (weight: any, height: any) => {
    // Convert height to meters
    let heightInMeters = height / 100; // 0.66
    // Calculate BMI
    let bmi = weight / (heightInMeters * heightInMeters);
    setbmi(bmi);
    movePointer(bmi);
    return bmi;
  };

  const movePointer = (number: any) => {
    if (number <= 16.4) {
      // Low BMI
      setchartPercentage(8);
      setpressurelevel('Severely underweight');
    }
    if (number >= 16.5 && number <= 18.4) {
      // Low BMI
      setchartPercentage(22);
      setpressurelevel('Underweight');
    }
    if (number >= 18.5 && number <= 24.9) {
      // Normal BMI
      setchartPercentage(35);
      setpressurelevel('Normal');
    }
    if (number >= 25.0 && number <= 29.9) {
      // Normal BMI
      setchartPercentage(48);
      setpressurelevel('OverWeight');
    }
    if (number >= 30.0 && number <= 34.9) {
      // Normal BMI
      setchartPercentage(62);
      setpressurelevel('Obese class 1');
    }
    if (number >= 35.0 && number <= 39.9) {
      // Normal BMI
      setchartPercentage(76);
      setpressurelevel('Obese class 2');
    }
  };

  useEffect(() => {
    calculateBMI(weight, height);
  }, [weight, height]);

  const saveBmiRecord = async () => {
    setloader(true);
    let userID = await get_async_data('user_id');
    let data = {
      user_id: userID,
      report_type: 'bmi',
      sugar_concentration: '',
      sugar_check: '',
      note: '',
      status: pressurelevel,
      bmi: bmi.toFixed(3),
      datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    await add_bmi_report(data);
    await set_async_data('record_bmi', bmi.toFixed(2) + ' '+pressurelevel);
    setloader(false);
    navigation.navigate('BmiResultScreen');
  };

  const backAction = () => {
    navigation.navigate('HomeScreen');
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  useEffect(() => {
    (async () => {
      try {
        await analytics().logEvent('add_bmi_screen');
        let lan = await lang();
        setlanguage(lan);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    setlangstr(language);
  }, [language]);

  const navigateToHome = () => {
    navigation.navigate('AdLoading', {
      nextScreen: 'HomeScreen',
      tab: 'home',
    });
  };
  const _continue = async () => {
    setcloseloader(false);
    navigation.navigate('HomeScreen', {tab: 'home'});
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.header}>
          <View style={styles.col}>
            <TouchableOpacity
              style={{paddingHorizontal: 20,paddingVertical: 25}}
              onPress={()=>setcloseloader(true)}
              accessibilityLabel="Back">
              <Image
                style={{width: 14, height: 14}}
                source={require('../../assets/images/dashboard_icons/navigate_back_new.png')}
              />
            </TouchableOpacity>
            <Text style={styles.heading}>{langstr.dashobard.bmi}</Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => setcard('male')}>
            <ImageBackground
              source={
                card == 'male'
                  ? require('../../assets/images/dashboard_icons/maleselected.png')
                  : require('../../assets/images/dashboard_icons/maleunselected.png')
              }
              style={styles.card}
            >
              <Text style={[styles.cardText, card == 'male' ? {color: '#fff'}:{color: '#2E2E2E'}]}>{langstr.main.male}</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setcard('female')}>
            <ImageBackground
              source={
                card == 'female'
                  ? require('../../assets/images/dashboard_icons/femaleselected.png')
                  : require('../../assets/images/dashboard_icons/femaleunselected.png')
              }
              style={styles.card}
            >
              <Text style={[styles.cardText, card == 'female' ? {color: '#fff'}:{color: '#2E2E2E'}]}>{langstr.main.female}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <BMIPicker setweight={setweight} setheight={setheight} langstr={langstr} />

        <View style={{marginVertical: 30}}>
          <Text style={styles.pressurelevel}>{pressurelevel}</Text>
          <Image
            style={styles.scale}
            source={require('../../assets/images/bmichart.png')}
          />
          <Image
            style={[styles.pointerIndicator, {left: `${chartPercentage}%`}]}
            source={require('../../assets/images/polygon.png')}
          />
        </View>

        <TouchableOpacity onPress={saveBmiRecord} style={styles.btn}>
          <Text style={styles.btnText}>{langstr.main.calculatebmi}</Text>
        </TouchableOpacity>
      </View>
      <Banner />
      {loader && <LoadingAnimation iconType={'tick'} />}
      {closeloader && (<DisplayAd _continue={_continue} adId={INTERSITIAL_AD_ID_OLD}/>)}
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign: 'middle',
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: '#2E2E2E',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    width: width * 0.88,
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: '10%',
    marginTop: '4%',
  },
  card: {
    width: ITEM_WIDTH,
    height: 492 * RATIO,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10
  },
  cardText: {
    fontSize: 14,
    fontWeight: '400'
  },
  btn: {
    width: width * 0.88,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#5F45FE',
    alignSelf: 'center',
    borderRadius: 6,
    marginTop: 'auto'
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  pressurelevel: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    color: '#5F5F5F',
    marginBottom: 15,
  },
  scale: {
    alignSelf: 'center',
    width: itemWidth,
    height: 68 * ratio,
  },
  pointerIndicator: {
    width: 17,
    height: 14,
    marginLeft: 23,
    position: 'relative',
    top: 7,
  },
});

export default BmiScreen;
