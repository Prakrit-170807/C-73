import * as React from 'react';
import {
    Button,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ToastAndroid

} from 'react-native';
import firebase from "firebase"

export default class Login extends React.Component{

    constructor() {
        super();
        this.state = {
            mail: "", 
            passPhrase : ""
        };
    }


    go= async (mail, passPhrase) => {
        if (mail, passPhrase) {
            try {
                const message = await firebase.auth ().signInWithEmailAndPassword(mail, passPhrase)
                if (message){
                    this.props.navigation.navigate("Transaction")
                }
            }
            catch(error){
                switch (error.code){
                    case "YOU ARE A GHOST TO ME": 
                    Alert.alert ("Ghost !!! !!!! ")
                    break ; 
                    case "BUDDY TYPE RIGHT": 
                    Alert.alert ("UR TYPING SUCKS!!!")
                    break ; 
                }
            }
        }
        else{
            {Alert.alert("EMAILI AND PASSWORD PLEASE!!!!!!!!!!!")}
        }

    }

    render() {
        return (
            <KeyboardAvoidingView style={{ alignContent: "center" }} behavior="padding" >
                <View>
                    <Image
                        style={{ height: 300, width: 300 }}
                        source={require('../logo.png')}></Image>
                </View>
                <View>
                    <TextInput
                        style={{ width: 200, height: 40, borderWidth: 1.5, fontSize: 20 }}
                        placeholder="Email ID " onChangeText={mailid => this.setState({ mail : mailid })}>
                    </TextInput>

                </View><View>
                    <TextInput
                        style={{ width: 200, height: 40, borderWidth: 1.5, fontSize: 20 }}
                        placeholder="Password" onChangeText={password => this.setState({ passPhrase : password })}>
                    </TextInput>

                </View>
                <TouchableOpacity onPress={() => { this.go(this.state.mail, this.state.passPhrase)}}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}