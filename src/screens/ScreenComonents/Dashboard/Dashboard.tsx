import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DashboardContent from './components/DashboardContent';
import Recomandations from '../../../components/Recomandations';
import {useIsFocused} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
const {width, height} = Dimensions.get('screen');
import {lang} from '../../../../global';

const Dashboard = (props: any) => {
  const isFocused = useIsFocused();
  const [selectedmenu, setselectedmenu] = useState('home');
  const [language, setlanguage] = useState({main: {homeTitle: ''}});
  const [langstr, setlangstr] = useState({main: {homeTitle: ''}});

  useEffect(() => {
    (async () => {
      try {
        await analytics().logEvent('home_tab');
        let lan = await lang();
        setlanguage(lan);
        setselectedmenu('home');
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      setlangstr(language);
    })();
  }, [language]);

  return (
    <ScrollView style={styles.mainContainer} decelerationRate={'fast'} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        {/* <Text style={styles.heading}>{langstr?.main.homeTitle}</Text> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center'
          }}>
          <Text style={styles.heading}>{props.temperature} F</Text>
          <Image
            style={styles.cloudImg}
            source={require('../../../assets/icons/cloud.png')}
          />
        </View>

        <View>
          <Image
            style={{width: 34, height: 34}}
            source={require('../../../assets/icons/reward.png')}
          />
        </View>
      </View>
      <DashboardContent navigate={props.navigateScreen} />
      <Recomandations setselectedmenu={props.setselectedmenu} putScreen={''} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  header: {
    width: width,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center'
  },
  heading: {
    color: '#141417',
    fontSize: 25,
    fontWeight: '700',
    top: '21%',
    left: '6%',
  },
  cloudImg: {
    width: 30.51,
    height: 23,
  },
  mainContainer: {
    maxHeight: height * 0.83
  }
});
export default Dashboard;
