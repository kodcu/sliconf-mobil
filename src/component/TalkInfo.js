import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import {Button, Input} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons'
import {moderateScale} from "../theme/Scale";

let vee = 'Autonomy is one of the three psychological needs humans require to feel happy, motivated, ' +
    'and perform our best work. That’s why software teams with high autonomy are happier and more innovative.' +
    ' But achieving high autonomy requires a fundamental rethink to every aspect of organizations - especially ' +
    'the alignment between business strategy, development team boundaries, and software architecture, to enable teams ' +
    'to own problems end-to-end. In this talk, you will see how organizations with high autonomy are at the leading edge ' +
    'of digital product development using continuous discovery and delivery. You’ll see the cultural, organizational, and ' +
    'technical principles that enable high autonomy. You’ll see how to engage your software developers and business stakeholders' +
    ' to collaboratively design organizations and software architecture so teams have high autonomy, enabling them to continuously ' +
    'discover and deliver business value.'

export class TalkInfo extends Component {
    render() {

        const Talk = this.props.Talk[0];

        return (
            <View style={styles.container}>

                <View style={{
                    height: Dimensions.get('window').height - 200,
                    alignItems: 'center',
                    padding: 10,
                    paddingTop: 0
                }}>
                    <Text style={{
                        fontSize: moderateScale(15),
                        fontFamily: 'Montserrat-Medium',
                        color: '#333',
                        textAlign: 'center',
                        paddingLeft: 10,
                        paddingRight: 10
                    }}>{Talk.topic}</Text>

                    <View style={{
                        alignItems:'center',
                        justifyContent:'flex-start',
                        flexDirection:'row',
                        paddingLeft: 10,
                        paddingRight: 10,
                        width
                    }}>
                        <Text style={{
                            fontSize: moderateScale(10),
                            fontFamily: 'Montserrat-Bold',
                            color: '#333',
                            textAlign: 'center',
                        }}>Level: </Text><Text style={{
                            fontSize: moderateScale(9),
                            fontFamily: 'Montserrat-Regular',
                            color: '#333',
                            textAlign: 'center',
                        }}>{Talk.level === 1 ? 'Beginner' : Talk.level === 2 ? 'Intermediate' : 'Expert'}</Text>
                    </View>

                    <View style={{
                        alignItems:'center',
                        justifyContent:'flex-start',
                        flexDirection:'row',
                        paddingLeft: 10,
                        paddingRight: 10,
                        width
                    }}>
                        <Text style={{
                            fontSize: moderateScale(10),
                            fontFamily: 'Montserrat-Bold',
                            color: '#333',
                            textAlign: 'center',
                        }}>Tags: </Text>

                        <Text style={{
                            fontSize: moderateScale(9),
                            fontFamily: 'Montserrat-Regular',
                            color: '#333',
                            textAlign: 'center',
                        }}>{Talk.tags}</Text>
                    </View>

                    <View style={{
                        alignItems:'center',
                        justifyContent:'flex-start',
                        flexDirection:'row',
                        paddingLeft: 10,
                        paddingRight: 10,
                        width
                    }}>
                        <Text style={{
                            fontSize: moderateScale(10),
                            fontFamily: 'Montserrat-Bold',
                            color: '#333',
                            textAlign: 'center',
                        }}>Room: </Text>

                        <Text style={{
                            fontSize: moderateScale(9),
                            fontFamily: 'Montserrat-Regular',
                            color: '#333',
                            textAlign: 'center',
                        }}>{Talk.room}</Text>
                    </View>

                    <ScrollView style={{padding:10}}>
                        <Text style={{
                            color: '#666',
                            fontFamily: 'Montserrat-Regular',
                            fontSize: moderateScale(11),
                            textAlign: 'center',
                            paddingBottom:10
                        }}>{Talk.topicDetail}</Text>
                    </ScrollView>
                </View>

                <View style={{
                    alignItems: 'center',
                    height: 60,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    width
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', width: width * 0.8}}>
                        <Image
                            source={{uri: 'https://javaday.istanbul/wp-content/uploads/2017/01/amadhy-abdelaziz-150x150.jpg'}}
                            style={{borderRadius: 30, width: 60, height: 60, marginRight: 10}}/>
                        <Text style={{
                            width: (width * 0.8) - 80,
                            fontSize: moderateScale(16),
                            fontFamily: 'Montserrat-Medium',
                            color: '#333',
                        }}>{Talk.speaker}</Text>
                    </View>

                    <View style={{alignItems: 'flex-end', width: width * 0.2}}>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 2,}}>
                            <Text
                                style={{color: '#333', fontFamily: 'Montserrat-Regular', fontSize: moderateScale(11)}}>{Talk.time}</Text>
                            <Icon style={{paddingLeft: 10}} color='#333' name='ios-clock-outline' size={18}/>
                        </View>

                        <View style={{}}>
                            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                <Text style={{
                                    color: '#333',
                                    fontFamily: 'Montserrat-Regular',
                                    fontSize: moderateScale(11)
                                }}>5 May</Text>
                                <Icon style={{paddingLeft: 10}} color='#333' name='ios-calendar-outline' size={18}/>
                            </View>
                        </View>
                    </View>


                </View>
            </View>
        )
    }
}

const width = Dimensions.get('window').width - 20;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default TalkInfo;