// import React, { Component } from "react";
// import { Button, StyleSheet, Text, TextInput, View } from "react-native";
// //window.navigator.userAgent = "react-native";
// import io from "socket.io-client";



// export default class App extends Component {


//   constructor(props) {
//     super(props);
    
//     this.state = {
//       chatMessage: "",
//       chatMessages: [],

//     };

//   }



//   componentDidMount() {

//     this.socket = io('https://testejs.cmarino.p.azurewebsites.net/');
//     //this.socket = io('http://192.168.1.121:3000');
//     // this.socket = io('https://srvnodejs.cmarino.p.azurewebsites.net:3000');
//     // this.socket = io('https://srvnodejs.cmarino.p.azurewebsites.net:3000');
//     this.socket.on('chat message', msg => {
//       console.log(msg)
//       this.setState({chatMessages: [...this.state.chatMessages, msg]})
//     })
//     //console.log(this.socket)
//   }

//   submitChatMessage() {
//     //console.log(this.state.chatMessage.toString(), 'AAAAAAAAAAAAAAAAAAAAAAAAA')
//     //this.socket.emit('chat message', 'aaaaaaaaaaaaaaaaaaaaaaa');
//     this.socket.emit('chat message', 'msg do app');
//     this.setState({ chatMessage: "" })

//   }

//   render() {

//     const chatMessages = this.state.chatMessages.map(chatMessage => <Text key={chatMessage}>{chatMessage}</Text>)

//     return (
//       <View style={styles.container}>
//         <TextInput
//           style={{
//             height: 40,
//             backgroundColor: '#EF9000',
//             width: '90%'
//           }}
//           autoCorrect={false}
//           //value={this.state.text}
//           onChange={chatMessage => {
//             this.setState({ chatMessage })
//           }}
//           onSubmitEditing={() => {this.submitChatMessage()}}
//           value={this.state.chatMessage}
//         />
//         <Button
//           title="Me aperte"
//           onPress={() => {
//             this.submitChatMessage()
//           }}
//         />
//         {
//           chatMessages
//         }
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF"
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: 10
//   },
//   instructions: {
//     textAlign: "center",
//     color: "#333333",
//     marginBottom: 5
//   }
// });

import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';
import {View, Text, Alert, Linking} from 'react-native';

//import PushNotification from "react-native-push-notification";


const App = () => {

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const teste = async () => {
    const resp =  await messaging().getToken()
    console.log(resp)
  }

  useEffect(() => {
    requestUserPermission();

    teste()

    messaging().setBackgroundMessageHandler( async(nemIdeia) => {

      const resp = await nemIdeia
      console.log('resp', resp );
      console.log('resp.notification', resp.notification);
      console.log('resp[data]', resp['data']);


    })

    messaging().onNotificationOpenedApp(async (notification) => {

      //Alert.alert('PORRAAAAAAAAAAAAAAAAAAAAAA',  notification)
      const resp = await notification
      
      Linking.openURL(resp['data']['url'])
      
      //console.log('notification', await notification);

    })

  })
  
  return (

    <View>
      <Text>Hello World</Text>
    </View>
  )

}

export default App;







