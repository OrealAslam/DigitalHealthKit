import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {lang} from '../../global';
import {useIsFocused} from '@react-navigation/native';
const {width} = Dimensions.get('window');

const cardWidth = width - 50;
const cardRatio = cardWidth / 1256;

const btnWidth = width - 50;
const btnRatio = btnWidth / 1256;

const Recomandations = (props: any) => {
  const isFocused = useIsFocused();
  const [language, setlanguage] = useState({
    dashobard: {recommended: ''},
    recommended: {heartDisease: '', BloodGlucose: '', heartDiseaseTypes: ''},
    main: {more: ''},
  });
  const [str, setstr] = useState({
    dashobard: {recommended: ''},
    recommended: {heartDisease: '', BloodGlucose: '', heartDiseaseTypes: ''},
    main: {more: ''},
  });

  const myFunction = (screen: any) => {
    try{ 
      if (screen != '') {
        props.navigateScreen(screen, 'health');
      } else {
        props.setselectedmenu('health');
      }
    } catch(e) {
      return ;
    }
  };

  useEffect(() => {
    (async () => {
      let lan = await lang();
      setlanguage(lan);
    })();
  }, [isFocused]);

  useEffect(() => {
    setstr(language);
  }, [language]);

  return (
    <>
      <View style={styles.header}>
        <Image
          style={styles.icon}
          source={require('../assets/icons/recomandations.png')}
        />
        <Text style={styles.title}>{str.dashobard.recommended}</Text>
      </View>

      <View style={styles.articleContainer}>
        <TouchableOpacity onPress={() => myFunction(props.putScreen)}>
          <ImageBackground
            style={styles.articleCard}
            source={require('../assets/images/article_images/heartdisease.png')}>
            <Text style={[styles.title, {maxWidth: '60%'}]}>
              {str.recommended.heartDisease}
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => myFunction(props.putScreen)}>
          <ImageBackground
            style={styles.articleCard}
            source={require('../assets/images/article_images/bloodglucose.png')}>
            <Text style={[styles.title, {maxWidth: '60%'}]}>
            {str.recommended.BloodGlucose}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => myFunction(props.putScreen)}>
          <ImageBackground
            style={styles.articleCard}
            source={require('../assets/images/article_images/heart_disease_type.png')}>
            <Text style={[styles.title, {maxWidth: '60%'}]}>
            {str.recommended.heartDiseaseTypes}
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => myFunction(props.putScreen)}
          style={{
            alignSelf: 'center',
            width: btnWidth,
            height: 176 * btnRatio,
            backgroundColor: '#5F45FE',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
          }}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
            {str.main.more}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderTopLeftRadius: 9,
    borderTopEndRadius: 9,
  },
  icon: {
    width: 17,
    height: 22.35,
    marginLeft: 5,
  },
  title: {
    color: '#2E2E2E',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
    marginVertical: 15,
  },
  articleContainer: {
    width: width,
    flexDirection: 'column',
    paddingBottom: 30
  },
  articleCard: {
    width: cardWidth,
    height: 288 * cardRatio,
    alignSelf: 'center',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Recomandations;
