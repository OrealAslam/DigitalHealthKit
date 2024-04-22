import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {addUser, get_async_data, set_async_data} from '../Helper/AppHelper';

const {width, height} = Dimensions.get('screen');
const btnWidth = width - 60;
const btnRatio = btnWidth / 1016;

const IMG_WIDTH = width;
const IMG_RATIO = IMG_WIDTH / 1440;

const DesclaimerScreen = ({navigation}: {navigation: any}) => {
  const route = useRoute();
  const [loader, setloader] = useState(false);

  const newUser = async () => {
    let uID = await get_async_data('user_id');
    if (uID == null) {
      let userID = await addUser();
      console.log('USER CREATED', userID);
      await set_async_data('user_id', userID);
      await set_async_data('user_creates', 'new');
    }
  };

  const createUser = async () => {
    setloader(true);
    await newUser();
    await set_async_data('on_board', 'onboard');
    navigation.navigate('MainRoute');
  };

  return (
    <SafeAreaView>
      <ImageBackground
        style={styles.img}
        source={require('../assets/icons/disclaimers.png')}>
        <View style={styles.desclaimerContainer}>
          <Text
            style={[styles.heading, {marginBottom: 10, paddingVertical: 0}]}>
            {route.params?.lang.setting.disclaimer}
          </Text>
          <Text style={styles.disclaimerText}>
            {route.params?.lang.boarding.boarding2subtitle}
          </Text>
        {loader == true ? (
          <ActivityIndicator
            size={'large'}
            color={'#f4e1e1'}
            style={{alignSelf: 'center', top: 15}}
          />
        ) : (
          <TouchableOpacity onPress={createUser} style={styles.btn}>
            <Text style={styles.text}>
              {route.params?.lang.boarding.letsgo}
            </Text>
          </TouchableOpacity>
        )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: '#2E2E2E',
    fontSize: 26,
    fontWeight: '700',
    fontStyle: 'normal',
  },
  img: {
    width: IMG_WIDTH,
    height: 3200 * IMG_RATIO,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  desclaimerContainer: {
    width: width,
    height: height * 0.35,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // backgroundColor: 'yellow',
    position: 'absolute',
    bottom: '10%'
  },
  disclaimerText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    color: '#868686',
    textAlign: 'center',
    maxWidth: '90%'
  },
  btn: {
    width: btnWidth,
    height: 191 * btnRatio,
    backgroundColor: '#5F45FE',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'relative',
    top: '12%',
    borderRadius: 40,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
});
export default DesclaimerScreen;