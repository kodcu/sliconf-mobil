import React, {Component} from 'react'
import {View, TouchableOpacity, Text, ListView, Image} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {Button} from 'native-base'

const ProfileComponent = ({profileUrl, username, email,logout}) =>
    <View style={{flexDirection: 'row'}}>
        <View style={{flex:1,justifyContent:'space-between',flexDirection: 'row'}}>
            <TouchableOpacity style={{flexDirection: 'row', padding: 5,flex:0.8}} onPress={() => {}}>
                <Image source={{uri: profileUrl}} resizeMode="contain"
                       style={{margin: 5, width: 60, height: 60, borderRadius: 30}}/>
                <View style={{justifyContent: 'center',flex:1}}>
                    <Text style={{fontWeight: '500', fontSize: 20, color: '#444'}}>{username}</Text>
                    <Text style={{fontWeight: '200', color: '#999'}}>{email}</Text>
                </View>
            </TouchableOpacity>
            <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>

                <Button transparent
                        onPress={logout}>
                    <Icon name='ios-log-out-outline' size={20}/>
                </Button>
            </View>
        </View>
    </View>

const LoginComponent = ({login}) =>
    <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            height: 80
        }} onPress={login}>
            <Image source={require('../../images/hi.png')} resizeMode="contain"
                   style={{width: 60, height: 60, borderRadius: 30}}/>
            <View style={{justifyContent: 'center', margin: 15}}>
                <Text style={{fontWeight: '700', fontSize: 25, color: '#444'}}>Sign in</Text>
            </View>
            <Icon name='ios-log-in-outline' size={20}/>

        </TouchableOpacity>

    </View>

ProfileComponent.Login = LoginComponent;
export default ProfileComponent
