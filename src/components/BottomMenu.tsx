import {
  View,
  BackHandler,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import QuitAppModal from './QuitAppModal';
import { Banner } from '../Helper/AdManager';
const {width} = Dimensions.get('window');
const MENU_WIDTH = width;
const MENU_RATIO = MENU_WIDTH / 1500;

const BottomMenu = (props: any) => {
  const [tab, settab] = useState(require('../assets/menu/home.png'));
  const [quit, setquit] = useState(false);
  const backAction = () => {
    setquit(true);
    return true;
  };
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  useEffect(()=> {
    switch (props.selectedmenu) {
      case 'home':
        settab(require('../assets/menu/home.png'));
        break;
      case 'tracker':
        settab(require('../assets/menu/tracker.png'));
        break;
      case 'health':
        settab(require('../assets/menu/blog.png'));
        break;
      case 'setting':
        settab(require('../assets/menu/profile.png'));
        break;
      default:
        settab(require('../assets/menu/home.png'));
    }
  },[props.selectedmenu]);

  const menu = () => {
    let js = (
      <ImageBackground style={styles.menu} source={tab}>
        <TouchableOpacity
          onPress={() => changeTab('home')}
          style={styles.column}></TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeTab('tracker')}
          style={styles.column}></TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeTab('health')}
          style={styles.column}></TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeTab('setting')}
          style={styles.column}></TouchableOpacity>
      </ImageBackground>
    );
    return js;
  };

  const changeTab = (tabmenu: any) => {
    if (tabmenu == 'home') {
      settab(require('../assets/menu/home.png'));
    }
    if (tabmenu == 'tracker') {
      settab(require('../assets/menu/tracker.png'));
    }
    if (tabmenu == 'health') {
      settab(require('../assets/menu/blog.png'));
    }
    if (tabmenu == 'setting') {
      settab(require('../assets/menu/profile.png'));
    }
    props.setselectedmenu(tabmenu);
  };

  return (
    <>
      <View  style={{height: 'auto', width: width, position: 'absolute', bottom: 0,elevation: 5}}>
        {menu()} 
        <Banner />
      </View>
      {quit == true ? <QuitAppModal setquit={setquit} /> : <></>}
    </>
  );
};

const styles = StyleSheet.create({
  menu: {
    width: MENU_WIDTH,
    height: 325 * MENU_RATIO,
    display: 'flex',
    flexDirection: 'row',

  },
  column: {
    width: width * 0.25,
    height: '53%',
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
  },
});
export default BottomMenu;