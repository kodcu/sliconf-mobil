import React, {Component} from 'react'
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {Button} from 'native-base'
import {moderateScale, scale} from "../theme/Scale";
import Font from "../theme/Font";
import Color from "../theme/Color";

export default SignInComponent = ({login}) =>
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
                   style={{width: 60, height: 60, borderRadius: Platform.OS === 'ios' ? scale(30) : 90}}/>
            <View style={{justifyContent: 'center', margin: 15}}>
                <Text style={{...Font.semiBold, fontSize: moderateScale(20), color: Color.darkGray}}>Sign in</Text>
            </View>
            <Icon name='ios-log-in-outline' size={20}/>

        </TouchableOpacity>

    </View>

