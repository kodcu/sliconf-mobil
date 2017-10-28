import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, Dimensions, Platform} from 'react-native';
import {Header as NBHeader, Button,} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import If from './If'

export class Header extends Component {


    render() {
        const {leftImage, rightImage, rightText, onPressRight, onPressLeft, children,active} = this.props;
        return (
            <NBHeader backgroundColor="#fff" iosBarStyle={active === undefined || active === null ? "dark-content" : 'light-content'} androidStatusBarColor={active === undefined || active === null ? '#fff' : '#29B673'}
                      noShadow={true} style={{backgroundColor: '#fff',paddingTop:Platform.os === 'ios' ? 20 : 0,borderBottomWidth:0}}>
                <View style={[styles.header, this.props.headerStyle,{paddingTop:20}]}>
                    <Button style={{backgroundColor: 'rgba(0,0,0,0)', shadowColor: '#fff', elevation: 0}} onPress={onPressLeft}>
                        <Icon color={active === undefined || active === null ? '#333' : '#fff'}  name={leftImage} size={18}/>
                    </Button>

                    <View>
                        {children}
                    </View>

                    <Button style={{backgroundColor: 'rgba(0,0,0,0)', shadowColor: '#fff', elevation: 0}} onPress={onPressRight}>
                        {rightText ? <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 14,
                            color:active === undefined || active === null ? '#333' : '#fff'}}>{rightText} </Text> : null}
                        {rightImage ? <Icon color={active === undefined || active === null ? '#333' : '#fff'} name={rightImage} size={18}/> : null}

                    </Button>
                </View>
            </NBHeader>
        );
    }
}

export class Title extends Component {
    render() {
        return <View><Text style={styles.HeaderText}>{this.props.title}</Text></View>
    }
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {},
    header: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    HeaderText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        color: '#666'
    }
});

Header.Title = Title;

export default Header;