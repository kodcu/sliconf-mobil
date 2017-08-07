import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar,TouchableOpacity,Image,Dimensions,Platform } from 'react-native';
import PropTypes from 'prop-types';

export default class Header extends Component {

    headerTitle = () =>{
        const {title} = this.props;
        if(title.length > 20) return title.substr(0,20).concat("...");
        return title
    };

    render() {
        const {leftImage,rightImage,onPressRight,onPressLeft} =this.props;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#2AB673"
                    barStyle="light-content"
                />
                <View style={[styles.header, this.props.headerStyle]}>
                    <TouchableOpacity onPress={onPressLeft}>
                        <Image source={leftImage} style={{width:45,height:45,margin:20}} />
                    </TouchableOpacity>
                    <Text style={[styles.HeaderText, this.props.titleStyle]}>{this.headerTitle()}</Text>
                <TouchableOpacity onPress={onPressRight}>
                    <Image source={rightImage} style={{width:30,height:30,margin:20}}/></TouchableOpacity>
                </View>
            </View>
        );
    }
}
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {

    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:width,
        height:Platform.OS === 'ios' ? 44 : 56,
        backgroundColor:"#2AB673",
        borderBottomWidth:1
    },
    HeaderText:{
        fontSize:25,
        fontWeight:'bold'
    }
});
Header.defaultProps = {
    title: '',
    leftImage:{},
    rightImage:{}
};
Header.propTypes = {
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number,
        PropTypes.shape({}),
    ]),
    headerStyle: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number,
        PropTypes.shape({}),
    ]),
    leftImage:PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({}),
    ]),
    rightImage:PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({}),
    ]),

};