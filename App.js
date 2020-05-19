import React, { useState, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Text, View, Alert } from 'react-native';

export default function App() {

  useEffect(() => {
    //Register Token
    messaging()
      .getToken()
      .then(token => {
        console.log("Register Token : ", token);
      });

    //Handle FCM in foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Message handled in the Foreground! : ', JSON.stringify(remoteMessage.notification.title));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:', 
            remoteMessage.notification
          );
          Alert.alert('Message handled in the background! : ', JSON.stringify(remoteMessage.notification.title));
        }
      });

      return unsubscribe;
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        React native firebase
      </Text>
    </View>
  );
}