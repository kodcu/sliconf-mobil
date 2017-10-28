/**
 * Created by anil on 04/07/2017.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Image,Text,TouchableOpacity,TextInput,Dimensions,StatusBar} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class LoginScreen extends Component{

    static navigationOptions = {
        header: null,
        drawerLabel: 'Login',
    };

    render() {
        return (
            <KeyboardAwareScrollView >
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../images/logo.png')}/>
                    <Text style={styles.title}>Welcome to SliConf</Text>
                    <Text style={{fontSize:20,marginBottom:40,color:'#818285'}}>Conferences at your fingertips</Text>
                </View>
                <View >

                        <TextInput placeholder="username or email"
                                   placeholderTextColor='rgba(0,0,0,0.7)'
                                   returnKeyType="next"
                                   onSubmitEditing={() => this.passwordInput.focus()}
                                   keyboardType="email-address"
                                   autoCapitalize="none"
                                   autoCorrect={false}

                                   style={styles.input}/>
                        <TextInput placeholder="password"
                                   placeholderTextColor='rgba(0,0,0,0.7)'
                                   returnKeyType="go"
                                   secureTextEntry
                                   style={styles.input}
                                   ref={(input) => this.passwordInput = input}
                                   />

                        <TouchableOpacity style={styles.buttonContainer} >
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                </View>

            </View>
            </KeyboardAwareScrollView>
        );
    }
}

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        height:height-StatusBar.currentHeight
    },
    logoContainer: {
        alignItems:'center',
        flexGrow:1,
        justifyContent:'center'
    },
    logo: {
        width: 200,
        height: 200,
    },
    title: {
        color:'#2AB673',
        marginTop:10,
        width:200,
        textAlign: 'center',
        opacity: 0.9,
        fontSize:20,
        fontWeight: 'bold'
    },
    input : {
        height: 40,
        backgroundColor:'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#000000',
        paddingHorizontal: 10,
    },
    buttonContainer:{
        backgroundColor:'#2AB673',
        paddingVertical:15
    },
    buttonText:{
        textAlign:'center',
        color:'#FFFFFF',
        fontWeight:'700'
    }
});

