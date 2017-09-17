import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity ,Dimensions,Image} from 'react-native';
import { Container, Title ,Content,Button} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import ChosenCard from '../component/ChosenCard'
import Header from "../component/Header";
import {connect} from 'react-redux'

let DATAS = [
    {speaker: 'Kasia Mrowca', room: 'Oda 1', level:1,topic:'React Nedir ?',time:'13:00',posters: require('../../images/logo.png'), date:'12-05-2018'},
    {speaker: 'Kasia Mrowca', room: 'Oda 0',level:2, time:'14:00',topic:'Native Nedir ?',posters: require('../../images/logo.png'), date:'13-05-2018'},
    {speaker: 'Kasia Mrowca', room: 'Oda 2',level:3, time:'17:00',topic:'Unicorns Nedir ?',posters: require('../../images/logo.png'), date:'14-05-2018'}
]

const mapStateToProps = (state) => ({

})

class SpeakerInfoScreen extends Component {


    render() {
        const {state} = this.props.navigation;
        let speaker= state.params.item
        return (
            <Container style={{backgroundColor:'#fff'}}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}>
                    <Header.Title title="Speaker Info" />
                </Header>
                <View  style={{alignItems:'center'}}>
                    <Image source={{uri: 'https://javaday.istanbul/wp-content/uploads/2015/08/kasia-mrowca2-150x150.jpg'}} style={{borderRadius:90,width:120,height:120,margin:10}}/>
                    <Text style={{fontSize:18,color:'#414042'}}>{speaker.name}</Text>
                    <Text style={{fontSize:12}}>{speaker.workingat}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='twitter-with-circle' size={25} color="#379BD9" style={{margin:10}}/>
                        <Icon name='linkedin-with-circle' size={25} color="#1574AE" style={{margin:10}} />
                        <TouchableOpacity style={{margin:10}}>
                            <View style={{borderRadius:20,backgroundColor:'#29B673',width:80,height:25,justifyContent:'center'}}>
                                <Text style={{color:'#fff',textAlign:'center',textAlignVertical:'center'}}>ABOUT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{margin:15}}>
                    {DATAS.map((item, i) =>
                        <ChosenCard key={i} item={item}/>
                    )}
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default connect(mapStateToProps)(SpeakerInfoScreen)