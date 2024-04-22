/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import notifee, {EventType, AndroidImportance} from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';

// background notification handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   onMessageReceived(remoteMessage);
// });


// // foreground notification handler
// messaging().onMessage(async remoteMessage => {
// onMessageReceived(remoteMessage);
// });

// const onMessageReceived = async (message) => {
//     const channelId = await notifee.createChannel({
//       id: 'firebase.push.notification',
//       name: 'Important Notifications',
//       importance: AndroidImportance.HIGH,
//     });
    
//     notifee.onForegroundEvent(({type, detail}) => {
//       console.log('Foreground detail', detail);
//       switch (type) {
//         case EventType.DISMISSED:
//           console.log('User dismissed notification', detail.notification);
//           break;
//         case EventType.PRESS:
//           console.log('User pressed notification', detail.notification);
//           break;
//       }
//     });

//     notifee.onBackgroundEvent(async ({type, detail}) => {
//       const {notification, pressAction} = detail;

//       console.log('background notification', notification);
//       notifee.displayNotification({
//         title: 'Your order has been shipped',
//         body: `Your order was shipped`,
//         android: {
//           channelId: 'firebase.push.notification',
//         },
//       });
//     });
//   }

AppRegistry.registerComponent(appName, () => App);
