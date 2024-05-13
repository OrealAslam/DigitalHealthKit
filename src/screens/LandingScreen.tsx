import {View, SafeAreaViewBase } from 'react-native';
import React, { useState, useEffect } from 'react';
import BottomMenu from '../components/BottomMenu';
import { useIsFocused } from '@react-navigation/native';
import TimeZone from 'react-native-timezone';
import { useRoute } from '@react-navigation/native';
// import Screens here ...
import Dashboard from './ScreenComonents/Dashboard/Dashboard';
import TrackerScreen from './ScreenComonents/Tracker/TrackerScreen';
import HealthScreen from './ScreenComonents/Health/HealthScreen';
import Settings from './ScreenComonents/Settings/Settings';
import DisplayAd from '../components/DisplayAd';
import { weather_api_request } from '../Helper/AppHelper';


const LandingScreen = ({ navigation }: { navigation: any }) => {
  const isFocused = useIsFocused();
  const route = useRoute();
  const [selectedmenu, setselectedmenu] = useState('home');
  const [loader, setloader] = useState(false);
  const [temperature, settemperature] = useState('');

  const navigateScreen = (screenName: any, menu: any) => {
    try {
      navigation.navigate(screenName);
    } catch (error) {
      console.log('error', error);
      return ;
    }
  };

  useEffect(()=>{
    (async ()=>{
      const timeZone = await TimeZone.getTimeZone().then((zone: any) => zone);
      if(timeZone != null || timeZone != undefined) {
        let area = timeZone.split('/');
        let res = await weather_api_request(area[1]);
        settemperature(res.current.temp_f)
      }
    })()
  }, [])

  useEffect(() => {
    if (route.params != undefined) {
      let selectedTab = route.params?.tab;
      if (selectedTab != '') {
        setselectedmenu(selectedTab);
      } else {
        setselectedmenu('insight');
      }
    } else {
      console.log('bottom menu placed');
    }
  }, [isFocused]);

  useEffect(() => {
    component();
  }, [selectedmenu]);

  const component = () => {
    switch (selectedmenu) {
      case 'home':
        return (
          <Dashboard
            navigateScreen={navigateScreen}
            setselectedmenu={setselectedmenu}
            temperature={temperature}
          />
        );
        break;
      case 'tracker':
        return <TrackerScreen navigation={navigation} setloader={setloader} loader={loader} />;
        break;
      case 'insight':
        return <HealthScreen navigation={navigation} />;
        break;
      case 'profile':
        return <Settings navigateScreen={navigateScreen} />;
        break;
      default:
        return (
          <Dashboard
            navigateScreen={navigateScreen}
            setselectedmenu={setselectedmenu}
            temperature={temperature}
          />
        );
    }
  };
  const _continue = async () => {
    setloader(false);
    navigation.navigate('HomeScreen', { tab: 'tracker' });
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#F4F4FE' }}>
        {component()}
        <BottomMenu
          setselectedmenu={setselectedmenu}
          selectedmenu={selectedmenu}
        />
      </View>
      {loader && (<DisplayAd setloader={setloader} _continue={_continue} />)}
    </>
  );
};
export default LandingScreen;
