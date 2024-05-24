import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {set_async_data} from '../Helper/AppHelper';
// import {NativeAd150} from '../Helper/NativeAd150';
import analytics from '@react-native-firebase/analytics';
const {width} = Dimensions.get('screen');
import {lang as language} from '../../global';
import {translation} from '../../locales/translation';
import { LANGUAGE_NATIVE_AD_ID } from '../Helper/AdManager';

const LanguageScreen = ({navigation}: {navigation: any}) => {
  const [selectedLang, setselectedLang] = useState('');
  const [langobj, setlangobj] = useState({});

  useEffect(() => {
    (async () => {
      await analytics().logEvent('language_screen');
      let l = await language();
      setselectedLang(l);
      await set_async_data('line_chart_bp_ad', 'unseen');
      await set_async_data('pie_chart_bp_ad', 'unseen');

      await set_async_data('line_chart_bs_ad', 'unseen');
      await set_async_data('pie_chart_bs_ad', 'unseen');

      await set_async_data('line_chart_bmi_ad', 'unseen');
      await set_async_data('pie_chart_bmi_ad', 'unseen');

      await set_async_data('line_chart_temp_ad', 'unseen');
      await set_async_data('pie_chart_temp_ad', 'unseen');
    })();
  }, []);

  useEffect(() => {
    if (Object.keys(translation).includes(selectedLang)) {
      const selectedTranslation = translation[selectedLang];
      setlangobj(selectedTranslation);
    }
  }, [selectedLang]);

  const navigate = async () => {
    if (selectedLang == '' || selectedLang == undefined) {
      ToastAndroid.showWithGravity(
        'Select a Language',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      await set_async_data('selected_lang', selectedLang);
      navigation.navigate('BoardingScreen1', {lang: langobj});
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.header}>
        <Text style={styles.heading}>English</Text>
        <TouchableOpacity style={{padding: 8}} onPress={navigate}>
          <Image
            style={{width: 18, height: 14}}
            source={require('../assets/images/tick.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.languageContainer}>
        <TouchableOpacity
          onPress={() => setselectedLang('en')}
          activeOpacity={0.9}
          style={[
            styles.languageBox,
            selectedLang == 'en'
              ? {backgroundColor: '#725DF2'}
              : {backgroundColor: '#EBEBEC'},
          ]}>
          <Text
            style={[
              styles.language,
              selectedLang == 'en' ? {color: '#fff'} : {color: '#000'},
            ]}>
            English
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.languageBox,
            selectedLang == 'gr'
              ? {backgroundColor: '#725DF2'}
              : {backgroundColor: '#EBEBEC'},
          ]}
          onPress={() => setselectedLang('gr')}
          activeOpacity={0.9}>
          <Text
            style={[
              styles.language,
              selectedLang == 'gr' ? {color: '#fff'} : {color: '#000'},
            ]}>
            Germen
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setselectedLang('es')}
          activeOpacity={0.9}
          style={[
            styles.languageBox,
            selectedLang == 'es'
              ? {backgroundColor: '#725DF2'}
              : {backgroundColor: '#EBEBEC'},
          ]}>
          <Text
            style={[
              styles.language,
              selectedLang == 'es' ? {color: '#fff'} : {color: '#000'},
            ]}>
            Spanish
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setselectedLang('fr')}
          activeOpacity={0.9}
          style={[
            styles.languageBox,
            selectedLang == 'fr'
              ? {backgroundColor: '#725DF2'}
              : {backgroundColor: '#EBEBEC'},
          ]}>
          <Text
            style={[
              styles.language,
              selectedLang == 'fr' ? {color: '#fff'} : {color: '#000'},
            ]}>
            French
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setselectedLang('tr')}
          activeOpacity={0.9}
          style={[
            styles.languageBox,
            selectedLang == 'tr'
              ? {backgroundColor: '#725DF2'}
              : {backgroundColor: '#EBEBEC'},
          ]}>
          <Text
            style={[
              styles.language,
              selectedLang == 'tr' ? {color: '#fff'} : {color: '#000'},
            ]}>
            Turkish
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setselectedLang('it')}
          activeOpacity={0.9}
          style={[
            styles.languageBox,
            selectedLang == 'it'
              ? {backgroundColor: '#725DF2'}
              : {backgroundColor: '#EBEBEC'},
          ]}>
          <Text
            style={[
              styles.language,
              selectedLang == 'it' ? {color: '#fff'} : {color: '#000'},
            ]}>
            Italy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setselectedLang('ru')}
          activeOpacity={0.9}
          style={[
            styles.languageBox,
            selectedLang == 'ru'
              ? {backgroundColor: '#725DF2'}
              : {backgroundColor: '#EBEBEC'},
          ]}>
          <Text
            style={[
              styles.language,
              selectedLang == 'ru' ? {color: '#fff'} : {color: '#000'},
            ]}>
            Russian
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setselectedLang('jp')}
          activeOpacity={0.9}
          style={[
            styles.languageBox,
            selectedLang == 'jp'
              ? {backgroundColor: '#725DF2'}
              : {backgroundColor: '#EBEBEC'},
          ]}>
          <Text
            style={[
              styles.language,
              selectedLang == 'jp' ? {color: '#fff'} : {color: '#000'},
            ]}>
            Japanese
          </Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.bannerAd}>
        <NativeAd150 adId={LANGUAGE_NATIVE_AD_ID}/>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign: 'middle',
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  heading: {
    color: '#2E2E2E',
    fontSize: 20,
    fontWeight: '700',
  },
  languageContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    height: undefined,
  },
  languageBox: {
    width: (width - 40) / 2,
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
  },
  language: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  bannerAd: {
    width: width * 0.88,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 70,
  },
});
export default LanguageScreen;
