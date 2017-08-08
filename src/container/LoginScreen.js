/**
 * Created by anil on 04/07/2017.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Image,Text,KeyboardAvoidingView} from 'react-native';
import LoginForm from '../component/LoginForm'

export default class LoginScreen extends Component{

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../images/logo.png')}/>
                    <Text style={styles.title}>Welcome to SliConf</Text>
                    <Text style={{fontSize:20,marginBottom:40,color:'#818285'}}>Conferences at your fingertips</Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm/>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
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
    }
});

