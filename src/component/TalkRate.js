import React, {Component} from 'react';
import {View, Text, StyleSheet, Modal, ActivityIndicator, Dimensions, Slider, Image} from 'react-native';
import {Button, Segment} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons'

export default class TalkRate extends Component {

    state = {
        value:3,
        smile:require('../../images/rate/dull.png')
    }

    getSmile = (index) => {
        switch(index) {
            case 1:
               this.setState({smile:require('../../images/rate/dead.png'),value:index})
                break;
            case 2:
                this.setState({smile:require('../../images/rate/confused.png'),value:index})
                break;
            case 3:
                this.setState({smile:require('../../images/rate/dull.png'),value:index})
                break;
            case 4:
                this.setState({smile:require('../../images/rate/happy.png'),value:index})
                break;
            case 5:
                this.setState({smile:require('../../images/rate/in-love.png'),value:index})
                break;
        }

    }

    render() {

        const {value,smile} = this.state
        const {onPressDismiss,onPressSubmit,visible} = this.props
        return (
            <View style={styles.container}>
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => {}}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width:Dimensions.get('window').width,
                            height:Dimensions.get('window').height,
                            backgroundColor:'rgba(0,0,0,0.1)'
                        }}>
                        <View
                            style={{
                                height: 330,
                                width,
                                justifyContent: 'center',
                                alignItems: 'center',
                                elevation:3,
                                backgroundColor: '#fff',
                                borderRadius: 25,
                            }}>
                            <View style={{
                                alignSelf:'center',
                                alignItems:'center',
                                justifyContent :'center',
                            }}>
                                <View style={{
                                    alignSelf:'center',
                                    alignItems:'center',
                                    justifyContent :'center',
                                    width,
                                    height:270,
                                    padding:20
                                }}>

                                    <Image source={smile}
                                           style={{borderRadius:30, width: 80, height: 80, margin: 10}}/>
                                    <Text style={{fontFamily: 'Montserrat-Bold',fontSize:18,color:'#333',marginTop:10}}>Did you like talk?</Text>
                                    <Text style={{textAlign:'center',fontSize:15,fontFamily: 'Montserrat-Regular',color:'#888',marginTop:0}}>Use the slide to tell it in the language of Emojis.</Text>
                                    <Slider maximumValue={5} minimumValue={1} step={1}
                                            maximumTrackTintColor='#29B673' minimumTrackTintColor='#999'
                                            value={value} onValueChange={(val) => {this.getSmile(val)}}
                                            style={{width:width*0.75,paddingTop:10,}}/>

                                    <View style={{
                                        justifyContent :'space-between',
                                        width:width*0.75,
                                        flexDirection:'row'
                                    }}>

                                        <Text style={{fontFamily: 'Montserrat-Regular',fontSize:10,color: value > 2 ? '#999' : '#333',marginTop:0}}>Not really</Text>
                                        <Text style={{fontFamily: 'Montserrat-Regular',fontSize:10,color:value > 3 ? '#333' : '#999',marginTop:0}}>Love it</Text>

                                    </View>
                                </View>

                                <View style={{
                                    alignSelf:'center',
                                    alignItems:'center',
                                    justifyContent :'center',
                                    height:60,
                                    width,
                                    backgroundColor:'#29B673',
                                    borderBottomLeftRadius:25,
                                    borderBottomRightRadius:25,
                                    flexDirection:'row',

                                }}>

                                    <Button vertical transparent
                                            onPress={onPressSubmit !== undefined && onPressSubmit !== null ? onPressSubmit(value) : null}
                                            style={{width:width/2,height:60,alignItems:'center',justifyContent:'center',}}>
                                        <Text style={{color:'#fff',fontSize:20}}>Submit</Text>
                                    </Button>

                                    <Button vertical transparent
                                            onPress={onPressDismiss}
                                            style={{width:width/2,height:60,alignItems:'center',justifyContent:'center',}}>
                                       <Text style={{color:'#fff',fontSize:20}}>Cancel</Text>
                                    </Button>


                                </View>

                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
const width = Dimensions.get('window').width-80;
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    containerModel: {
        justifyContent:'center',
        alignItems:'center',
    },
    modal:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#29B673',
        height:100,
        width:Dimensions.get('window').width,
    }
});

