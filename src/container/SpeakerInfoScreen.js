import React, {Component} from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, Animated, Linking,
    FlatList
} from 'react-native';
import {Container, Title, Content, Button} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import ChosenCard from '../component/ChosenCard'
import Header from "../component/Header";
import {connect} from 'react-redux'
import If from '../component/If'

const phoneW = Dimensions.get('window').width - 50
const phoneH = Dimensions.get('window').height - 50
const AnimatedView = Animated.createAnimatedComponent(View)

const mapStateToProps = (state) => ({
    agenda: state.event.event.agenda,
})

class SpeakerInfoScreen extends Component {

    state = {
        height: new Animated.Value(0),
        width: new Animated.Value(0),
        isAboutOpen: false,
        talkList:[]
    }


    componentWillMount(){

        let speaker = this.props.navigation.state.params.item;
        let agenda = this.props.agenda;

        let talk = [];
        Object.keys(agenda).map((item,index) => {
            speaker.topic.map((topic) => {
                const talkFind = (talk) => talk.key === topic
                talk.push(agenda[item].find(talkFind))
            })

            //speaker.topic.map((topic) => talk.push(topic.find(this.findTalk)))
        })

        this.setState({talkList:talk})
    }

    startAnimation = () => {
        const {height, width, isAboutOpen} = this.state

        // Reset the value if needed

        this.setState({
            isAboutOpen: !this.state.isAboutOpen
        })

        if (!this.state.isAboutOpen) {
            height.setValue(0)
            width.setValue(0)
            Animated.spring(height, {toValue: phoneH/1.9, friction: 7}).start()
            Animated.spring(width, {toValue: phoneW, friction: 7}).start()
        } else {
            height.setValue(0)
            width.setValue(0)
        }

        // Start a spring animation


    }

    redirect(url) {
        if (url !== "") {
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
        let speaker = state.params.item
        const {height, width, talkList} = this.state

        return (
            <Container style={{backgroundColor: '#fff'}}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {
                            this.props.navigation.navigate('DrawerOpen')
                        }}>
                    <Header.Title title="Speaker Info"/>
                </Header>
                <View style={{alignItems: 'center'}}>
                    <Image source={{uri: speaker.profilePicture}}
                           style={{borderRadius: 50, width: 120, height: 120, margin: 10}}/>
                    <Text style={{fontSize: 18, color: '#414042'}}>{speaker.name}</Text>
                    <Text style={{fontSize: 12}}>{speaker.workingat}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => this.redirect(speaker.twitter)}><Icon
                            name='twitter-with-circle' size={30} color="#379BD9"
                            style={{margin: 10}}/></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.redirect(speaker.linkedin)}><Icon
                            name='linkedin-with-circle' size={30} color="#1574AE"
                            style={{margin: 10}}/></TouchableOpacity>
                        <TouchableOpacity style={{margin: 10}} onPress={this.startAnimation}>
                            <View style={{
                                borderRadius: 20,
                                backgroundColor: '#29B673',
                                width: 90,
                                height: 30,
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: '#fff',
                                    textAlign: 'center',
                                    textAlignVertical: 'center'
                                }}>ABOUT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


                <If con={this.state.isAboutOpen}>
                    <If.Then>
                        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 10}}>
                            <AnimatedView
                                style={{width, height, borderWidth: 1, borderColor: '#29B673',}}>
                                <ScrollView style={{margin: 15}} showsVerticalScrollIndicator={false}>
                                    <Text style={{
                                        margin: 10,
                                        fontFamily: 'Montserrat-Regular',
                                    }}>{speaker.about}</Text>
                                </ScrollView>
                            </AnimatedView>
                        </View>
                    </If.Then>
                    <If.Else>
                        <ScrollView>
                            <View style={{
                                flex: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                margin: 10,
                                height:(talkList.length*160)
                            }}>
                                {talkList.map((item, i) => <ChosenCard key={i} item={item} visibleButton={false}/>)}
                            </View>
                        </ScrollView>

                    </If.Else>
                </If>

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