import {View, Text} from 'react-native';
import TimeZone from 'react-native-timezone';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
export const APPID = 3; // TEST APPID=3, LIVE APPID=4
export const AWS_S3_URL = 'https://cvmakeruserimages.s3.amazonaws.com/blogs/';
export const BASE_URL = 'https://mrlapps.care20.com/api/sugar_app/'; // live server
// export const BASE_URL = 'http://192.168.10.43/MRL-Apps/MRL-Apps/public/api/sugar_app/'; // local server

export const IMG_BASE_URL = 'https://mrlapps.care20.com/uploads/'; // live server
export const MEAL_IMG_URL = 'https://mrlapps.care20.com/uploads/'; // local server
export const ADD_USER = BASE_URL + 'add-user';
export const DASHBOARD = BASE_URL + 'dashboard';
export const GET_REPORT = BASE_URL + 'get-reports';
export const CHART_DATA = BASE_URL + 'chart-data';
export const ADD_REPORT = BASE_URL + 'add-new-report';
export const DELETE_REPORT = BASE_URL + 'delete-report';
export const GET_MEAL_PLAN = BASE_URL + 'get-meal-plan';
export const GET_BLOGS = BASE_URL + 'get-blogs';
export const GET_MEAL_LIST = BASE_URL + 'get-meal-list';
export const GET_MEAL = BASE_URL + 'get-meal';
export const BOOKMARK = BASE_URL + 'bookmark';
export const FILTER_REPORT = BASE_URL + 'get-filter-report';
export const NOTIFY = BASE_URL + 'notify';
const BARCODE_API_URL = 'https://world.openfoodfacts.net/api/v2/product/';

export const barcode_api_call = async (code: any) => {
  let obj = {code: code};
  const request = await fetch(BARCODE_API_URL + code, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(obj),
  });

  const response = await request.json();

  return response;
};

export const duration = [
  'Before meal',
  'After meal',
  'Fasting',
  'After sleep',
  'Other',
];

export const REPORT_TYPES = {
  temperature: 'temperature',
  weight: 'weight',
  medicine: 'medicine',
  aic: 'aic',
  sugar: 'sugar',
  bp: 'bp',
  bmi: 'bmi',
  heartRate: 'heart_rate',
};

export const notifications = async (token: any) => {
  const request = await fetch(NOTIFY, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({fcm_token: token}),
  });
  const response = await request.json();
};

export const set_async_data = async (name: any, value: any) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const get_async_data = async (name: any) => {
  try {
    const data = await AsyncStorage.getItem(name);
    return data != null ? JSON.parse(data) : null;
  } catch (error) {
    return false;
  }
};
export const generateFCM = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  await set_async_data('fcm_token', token);
};
// add Data into DB
export const addUser = async () => {
  const timeZone = await TimeZone.getTimeZone().then((zone: any) => zone);
  let fcm_token = await get_async_data('fcm_token');
  if (fcm_token == null) {
    generateFCM();
    fcm_token = await get_async_data('fcm_token');
  }
  let obj = {
    app_id: 5,
    age: '',
    gender: '',
    weight: '',
    fcm_token: fcm_token,
    timezone: timeZone,
  };
  const response = await fetch(ADD_USER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(obj),
  });
  let res = await response.json();
  return res.userID;
};
export const dashboard = async () => {
  let userID = await get_async_data('user_id');
  const resposne = await fetch(DASHBOARD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({user_id: userID}),
  });
  let res = await resposne.json();
  return res;
};
export const get_report = async (reportType: string) => {
  let userID = await get_async_data('user_id');
  console.log(userID);
  const resposne = await fetch(GET_REPORT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({user_id: userID, report_type: reportType}),
  });
  let res = await resposne.json();
  return res.data;
};
export const filter_report = async () => {
  let userID = await get_async_data('user_id');
  const resposne = await fetch(FILTER_REPORT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({user_id: userID, report_type: 'bp'}),
  });
  let res = await resposne.json();
  return res.data;
};
export const get_pdf_report = async (data: any) => {
  const resposne = await fetch(GET_REPORT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(data),
  });
  let res = await resposne.json();
  return res.data;
};
export const add_report = async (postData: any) => {
  const resposne = await fetch(ADD_REPORT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(postData),
  });
  let res = await resposne.json();
  return res;
};
export const add_bmi_report = async (postData: any) => {
  const resposne = await fetch(ADD_REPORT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(postData),
  });
  let res = await resposne.json();
  return res;
};
export const delete_report = async (id: any) => {
  const resposne = await fetch(DELETE_REPORT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({report_id: id}),
  });
  let res = await resposne.json();
  return res;
};
export const get_chart_data = async (reportType: string) => {
  let userID = await get_async_data('user_id');
  const resposne = await fetch(CHART_DATA, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({user_id: userID, report_type: reportType}),
  });
  let res = await resposne.json();
  return res;
};

export const generateUUID = (digits: number = 8) => {
  let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
  let uuid = [];
  for (let i = 0; i < digits; i++) {
    uuid.push(str[Math.floor(Math.random() * str.length)]);
  }
  return uuid.join('');
};

export const getMonthName = (dateString: any) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const parts = dateString.split('-');
  const monthNumber = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (monthNumber >= 1 && monthNumber <= 12 && day >= 1 && day <= 31) {
    const monthName = months[monthNumber - 1];
    let name = monthName + ', ' + day;
    return name.toString();
  } else {
    return 'Invalid Date';
  }
};
export const errorMessage = () => {
  return (
    <View style={{width: '80%', alignSelf: 'center', zIndex: 1}}>
      <Text style={{color: '#f00', textAlign: 'center'}}>
        Fill out the form correctly
      </Text>
    </View>
  );
};

export const remarks = (systolicpressure: any, diastolicpressure: any) => {
  if (systolicpressure != '' && diastolicpressure != '') {
    return;
  }

  if (systolicpressure < 120 && diastolicpressure < 80) {
    return 'Normal';
  }
  if (
    systolicpressure >= 120 ||
    (systolicpressure <= 129 && diastolicpressure < 80)
  ) {
    return 'Elevated';
  }

  if (
    systolicpressure >= 130 ||
    (systolicpressure <= 139 && diastolicpressure >= 80) ||
    diastolicpressure <= 89
  ) {
    return 'Hypertension';
  }

  if (systolicpressure >= 140 && diastolicpressure >= 90) {
    return 'Hypertensive';
  }
};

export const systolicValues = () => {
  let arr = [];
  for (let i = 60; i <= 300; i++) {
    arr.push(i.toString());
  }
  return arr;
};
export const diastolicValues = () => {
  let arr = [];
  for (let i = 20; i <= 200; i++) {
    arr.push(i.toString());
  }
  return arr;
};
export const pulseValues = () => {
  let arr = [];
  for (let i = 60; i <= 200; i++) {
    arr.push(i.toString());
  }
  return arr;
};

export const ageList = () => {
  let arr = [];
  for (let i = 7; i <= 110; i++) {
    arr.push(i.toString());
  }
  return arr;
};

export const pulse_rate_measurement = async (start: any, end: any) => {
  let pulse_rate = await get_async_data('pulse_rate');
  // if (pulse_rate != null) {
  //     let pulse_rate_start = pulse_rate - 5;
  //     let pulse_rate_end = pulse_rate + 5;
  //     let new_pulse_rate = randomIntFromInterval(pulse_rate_start, pulse_rate_end);
  //     return new_pulse_rate;
  // }
  // else {
  let pulse = randomIntFromInterval(start, end);
  await set_async_data('pulse_rate', pulse);
  return pulse_rate;
  // }
};

const randomIntFromInterval = (min: any, max: any) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const rCode = [
  'F0',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'FA',
  'FB',
  'FC',
  'FD',
  'FE',
  'FF',
  'E0',
  'E1',
  'E2',
  'E3',
  'E4',
  'E5',
  'E6',
  'E7',
  'E8',
  'E9',
  'EA',
  'EB',
  'EC',
  'ED',
  'EE',
  'EF',
];
export const gCode = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
];
export const bCode = ['00'];

export const roundNearestAfterDecimal = (num: any) => {
  // Convert the number to a string
  const numStr = num.toString();

  // Split the string by the decimal point
  const parts = numStr.split('.');

  // If there is no decimal point or no digits after the decimal point, return the original number
  if (parts.length < 2 || parts[1].length === 0) {
    return num;
  }

  // Get the digit immediately after the decimal point
  const nextDigit = parseInt(parts[1][0], 10);

  // Check if the next digit is greater than or equal to 5
  if (nextDigit >= 5) {
    // If it is, round the number up
    return Math.ceil(num);
  } else {
    // If it's not, round the number down
    return Math.floor(num);
  }
};

// CUCTOM DATE PICKER HELPER FUNCTIONS
export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const globalDate = new Date();

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const addMonth = (month: any) => {
  if (month == 11) {
  }
};
export const subMonth = (month: any) => {
  if (month == 1) {
  }
};
