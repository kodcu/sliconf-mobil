import React, {Component} from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {Button, Container, Content} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import ChosenCard from '../component/ChosenCard'
import Header from "../component/Header";
import {connect} from 'react-redux'
import If from '../component/If'
import Color from "../theme/Color";
import Font from "../theme/Font";
import getImage from "../helpers/getImageHelper"
import {moderateScale} from "../theme/Scale";


const phoneW = Dimensions.get('window').width - 50;
const phoneH = Dimensions.get('window').height - 50;
const AnimatedView = Animated.createAnimatedComponent(View);

const mapStateToProps = (state) => ({
    agenda: state.event.event.agenda,
});

class SpeakerInfoScreen extends Component {

    state = {
        height: new Animated.Value(0),
        width: new Animated.Value(0),
        isAboutOpen: false,
        talkList: []
    };
    /**
     * About tusunun animasyonunu yonetir
     */
    startAnimation = () => {
        const {height, width} = this.state;
        this.setState({
            isAboutOpen: !this.state.isAboutOpen
        });

        if (!this.state.isAboutOpen) {
            height.setValue(0);
            width.setValue(0);
            Animated.spring(height, {toValue: phoneH - 290, friction: 7}).start();
            Animated.spring(width, {toValue: phoneW, friction: 7}).start()
        } else {
            height.setValue(0);
            width.setValue(0)
        }

    };

    componentWillMount() {

        let speaker = this.props.navigation.state.params.item;
        let agenda = this.props.agenda;


        let talk = [];
        /*if (agenda !== undefined && agenda !== null && !agenda.isEmpty) {
            Object.keys(agenda).map((item, index) => {
                speaker.topics.map((topic) => {
                    const talkFind = (talk) => talk.key === topic;
                    //talk.push(agenda[item].find(talkFind))
                })

                //speaker.topic.map((topic) => talk.push(topic.find(this.findTalk)))
            })
        }*/

        if (agenda !== undefined && agenda !== null && !agenda.isEmpty){
            talk = agenda.filter(talk => talk.speaker === speaker.name)
        }

        this.setState({talkList: talk})
    }

    /**
     * Internet sitesine yonlendirir.
     * @param url
     */
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
        let speaker = state.params.item;
        const {height, width, talkList} = this.state;
        return (
            <Container style={{backgroundColor: '#fff'}}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {
                            this.props.navigation.navigate('DrawerOpen')
                        }}>
                    <Header.Title title="Speaker Info"/>
                </Header>
                <View style={{alignItems: 'center', height: 230}}>
                    <Image source={!speaker.profilePicture.trim()?require('../../images/hi.png'):{uri: getImage(speaker.profilePicture)}} style={styles.profilePicture}/>
                    <Text style={styles.speakerName}>{speaker.name}</Text>
                    <Text style={styles.speakerWorking}>{speaker.workingAt}</Text>
                    <View style={{flexDirection: 'row'}}>
                        {speaker.twitter === '' ? null : <TouchableOpacity onPress={() => this.redirect(speaker.twitter)}>
                            <Icon name='twitter-with-circle' size={30} color="#379BD9"
                                  style={{margin: 10}}/></TouchableOpacity>}
                        {speaker.linkedin === '' ? null :<TouchableOpacity onPress={() => this.redirect(speaker.linkedin)}>
                            <Icon name='linkedin-with-circle' size={30} color="#1574AE"
                                  style={{margin: 10}}/></TouchableOpacity>}
                        <TouchableOpacity style={{margin: 10}} onPress={this.startAnimation}>
                            <View style={styles.aboutButtonField}>
                                <Text style={styles.aboutButtonText}>ABOUT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


                <If con={this.state.isAboutOpen}>
                    <If.Then>
                        <View style={styles.infoField}>
                            <AnimatedView
                                style={{width, height, borderWidth: 1, borderColor: Color.green, borderRadius: 10}}>
                                <ScrollView style={{margin: 15}} showsVerticalScrollIndicator={false}>
                                    <Text style={styles.aboutText}>{speaker.about}</Text>
                                </ScrollView>
                            </AnimatedView>
                        </View>
                    </If.Then>
                    <If.Else>
                        <ScrollView>
                            <View style={[styles.talksField,{height: (talkList.length * moderateScale(145))}]}>
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
    profilePicture: {
        borderRadius: Platform.OS === 'ios' ? 50 : 90,
        width: 120,
        height: 120,
        margin: 10
    },
    aboutButtonField: {
        borderRadius: 10,
        backgroundColor: Color.green,
        width: 90,
        height: 30,
        justifyContent: 'center'
    },
    aboutButtonText: {
        ...Font.regular,
        color: Color.white,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    infoField: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10
    },
    aboutText: {
        ...Font.regular,
        margin: 10,
    },
    talksField: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10
    },
    speakerName: {
        ...Font.regular,
        fontSize: moderateScale(15),
        color: Color.darkGray
    },
    speakerWorking:{
        ...Font.light,
        fontSize: moderateScale(12),
        color: Color.darkGray3
    }

});

export default connect(mapStateToProps)(SpeakerInfoScreen)