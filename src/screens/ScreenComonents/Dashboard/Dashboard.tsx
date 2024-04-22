import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
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
    <>


      <View style={styles.header}>
        <Text style={styles.heading}>{langstr?.main.homeTitle}</Text>
      </View>
      
      <View style={styles.mainContainer}>
        <ScrollView style={{borderTopLeftRadius: 60}} decelerationRate={'fast'}  showsVerticalScrollIndicator={false}>
          <DashboardContent navigate={props.navigateScreen} />
          <Recomandations
            setselectedmenu={props.setselectedmenu}
            putScreen={''}
          />
        </ScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    width: width,
    height: '16%',
    backgroundColor: '#6300C7',
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    top: '21%',
    left: '6%'
  },
  mainContainer: {
    width: width,
    maxHeight: '74%',
    borderTopLeftRadius: 60,
    top: '-7%',
    paddingTop: 20,
    zIndex: 0,
    backgroundColor: '#f4f4f4'
  },
});
export default Dashboard;
