import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, Dimensions, Platform} from 'react-native';
import {Header as NBHeader, Button,} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import If from './If'

export class Header extends Component {


    render() {
        const {leftImage, rightImage, onPressRight, onPressLeft, children} = this.props;
        return (
            <NBHeader backgroundColor="#fff" iosBarStyle="dark-content" androidStatusBarColor="#fff"
                      noShadow={true} style={{backgroundColor: '#fff'}}>
                <View style={[styles.header, this.props.headerStyle]}>
                    <Button style={{backgroundColor: '#fff', shadowColor: '#fff', elevation: 0}} onPress={onPressLeft}>
                        <Icon name={leftImage} size={15}/>
                    </Button>

                    <View>
                        {children}
                    </View>

                    <Button style={{backgroundColor: '#fff', shadowColor: '#fff', elevation: 0}} onPress={onPressRight}>
                        <Icon name={rightImage} size={15}/>
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