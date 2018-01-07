import React, {Component} from 'react';
import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import {Button, Header as NBHeader,} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from "../theme/Color";
import {connect} from 'react-redux'
import {moderateScale} from "../theme/Scale";

const mapStateToProps = (state) => ({
    connection: state.connection.connectionStatus
});

export class Header extends Component {

    render() {
        const {leftImage, rightImage, rightText, onPressRight, onPressLeft, children, active,connection} = this.props;

        let backgroundColor = Color.white;
        let textColor = Color.darkGray;
        let statusBar = 'dark-content';
        if (connection){
            if (active){
                backgroundColor = Color.green;
                textColor = Color.white;
                statusBar = 'light-content'
            }

        } else{
            backgroundColor = Color.red2;
            textColor = Color.white;
            statusBar = 'light-content'
        }

        return (
            <NBHeader backgroundColor={Color.white}
                      iosBarStyle={statusBar}
                      androidStatusBarColor={backgroundColor}
                      noShadow={true} style={{backgroundColor: Color.white, paddingTop: 0, borderBottomWidth: 0,}}>
                <View style={[styles.header, this.props.headerStyle, {paddingTop: Platform.OS === 'ios' ? 20 : 0,
                     backgroundColor : backgroundColor }]}>
                    <Button style={{backgroundColor: Color.transparent, shadowColor: Color.white, elevation: 0}}
                            onPress={onPressLeft}>
                        <Icon color={textColor} name={leftImage} size={18}/>
                    </Button>

                    <View>
                        {connection ? children : <Text style={[styles.HeaderText,{color:Color.white}]}>Connection Fail</Text>}
                    </View>

                    <Button style={{backgroundColor: Color.transparent, shadowColor: Color.white, elevation: 0}} onPress={onPressRight}>
                        {rightText ? <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 14, color: textColor}}>{rightText}</Text> : null}
                        {rightImage ? <Icon color={textColor} name={rightImage} size={18}/> : null}
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
    },
    HeaderText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: moderateScale(18),
        color: Color.darkGray
    }
});

Header.Title = Title;

export default connect(mapStateToProps)(Header);