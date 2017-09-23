import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity ,Dimensions,Image,Animated,Linking} from 'react-native';
import { Container, Title ,Content,Button} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import ChosenCard from '../component/ChosenCard'
import Header from "../component/Header";
import {connect} from 'react-redux'
import If from '../component/If'
const phoneW = Dimensions.get('window').width-50

const AnimatedView = Animated.createAnimatedComponent(View)

let DATAS = [
    {speaker: '', room: 'Oda 1', level:1,topic:'React Nedir ?',time:'13:00',posters: require('../../images/logo.png'), date:'12-05-2018'},
    {speaker: '', room: 'Oda 0',level:2, time:'14:00',topic:'Native Nedir ?',posters: require('../../images/logo.png'), date:'13-05-2018'},
    {speaker: '', room: 'Oda 2',level:3, time:'17:00',topic:'Unicorns Nedir ?',posters: require('../../images/logo.png'), date:'14-05-2018'}
]

const mapStateToProps = (state) => ({

})

class SpeakerInfoScreen extends Component {

    state = {height: new Animated.Value(0),
            width:new Animated.Value(0),
            isAboutOpen:false}

    startAnimation = () => {
        const {height,width,isAboutOpen} = this.state

        // Reset the value if needed

        this.setState({
            isAboutOpen:!this.state.isAboutOpen
        })

        if(!this.state.isAboutOpen){
            height.setValue(0)
            width.setValue(0)
            Animated.spring(height, {toValue: 400, friction: 7}).start()
            Animated.spring(width, {toValue: phoneW, friction: 7}).start()
        }else{
            height.setValue(0)
            width.setValue(0)
        }

        // Start a spring animation


    }
    redirect(url) {
        if(url!==""){
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    console.log('Don\'t know how to go');
                }
            }).catch(err => console.error('An error occurred', err));
        }

    }


    render() {
        const {state} = this.props.navigation;
        let speaker= state.params.item
        const {height,width} = this.state

        return (
            <Container style={{backgroundColor:'#fff'}}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {this.props.navigation.navigate('DrawerOpen')}}>
                    <Header.Title title="Speaker Info" />
                </Header>
                <View  style={{alignItems:'center'}}>
                    <Image source={{uri: speaker.profilePicture}} style={{borderRadius:90,width:120,height:120,margin:10}}/>
                    <Text style={{fontSize:18,color:'#414042'}}>{speaker.name}</Text>
                    <Text style={{fontSize:12}}>{speaker.workingat}</Text>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => this.redirect(speaker.twitter)}><Icon name='twitter-with-circle' size={30} color="#379BD9" style={{margin:10}}/></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.redirect(speaker.linkedin)}><Icon name='linkedin-with-circle' size={30} color="#1574AE" style={{margin:10}} /></TouchableOpacity>
                        <TouchableOpacity style={{margin:10}} onPress={this.startAnimation}>
                            <View style={{borderRadius:20,backgroundColor:'#29B673',width:90,height:30,justifyContent:'center'}}>
                                <Text style={{color:'#fff',textAlign:'center',textAlignVertical:'center'}}>ABOUT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={{margin:15}}>
                    <If con={this.state.isAboutOpen}>
                        <If.Then>
                    <AnimatedView
                        style={{width,height,borderWidth:1,borderColor:'#29B673',margin:15}}>
                        <Text   style={{margin:10,fontFamily: 'Montserrat-Regular',}}>
                            Dr. Venkat Subramaniam is an award-winning author, founder of Agile Developer, Inc., creator of agilelearner.com, and an instructional professor at the University of Houston. {"\n"}{"\n"}

                            He has trained and mentored thousands of software developers in the US, Canada, Europe, and Asia, and is a regularly-invited speaker at several international conferences. Venkat helps his clients effectively apply and succeed with sustainable agile practices on their software projects.{"\n"}{"\n"}

                            Venkat is a (co)author of multiple technical books, including the 2007 Jolt Productivity award winning book Practices of an Agile Developer. You can find a list of his books at agiledeveloper.com.
                        </Text>
                    </AnimatedView>
                        </If.Then>
                        <If.Else>
                    {DATAS.map((item, i) =>
                        <ChosenCard key={i} item={item} visibleButton={false}/>
                    )}
                        </If.Else>
                    </If>
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