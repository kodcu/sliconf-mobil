import React, { Component } from 'react';
import { 
    Alert, 
    Modal, 
    Platform, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    ScrollView 
} from 'react-native';
import { connect } from "react-redux";
import { Input, Picker, Item } from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';
import Header from "../component/Header";
import Color from "../theme/Color";
import TalkComment from "../component/TalkComment";
import * as Scale from "../theme/Scale";
import Font from "../theme/Font";
import SendQuestionView from '../component/SendQuestionView';

const mapStateToProps = (state) => ({
    event: state.event.event,
    loading: state.comment.loading,
    user: state.auth.user,
    userDevice: state.authDevice.user,
    login: state.auth.login,
    error: state.comment.error,
    errorMessage: state.comment.errorMessage
});

class AskScreen extends Component {
    state = {
        sessionId: "",
        sessionModal: false,
        isSessionSelected: false
    };

    closeSessionModal = () => {
        this.setState({ sessionModal: false })
    }

    getTopicButtons(agenda){
        var buttons = []; 
        agenda.map((talk) => {
            buttons.push(
                <TouchableOpacity 
                    key={talk.id}
                    onPress={() => this.setState({ sessionId: talk.id, isSessionSelected: true, sessionModal: false })}
                >
                    <View style={styles.selectSessionButton}>   
                        <Text style={styles.selectASessionText}>{talk.topic}</Text>
                    </View>
                </TouchableOpacity>
            );    
        });

        return buttons;
    }

    getSessionModal(agenda) {
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.state.sessionModal}
                onRequestClose={() => this.closeSessionModal()}>
                <View style={{flex: 1, backgroundColor: Color.white, marginTop: Platform.OS === 'ios' ? 16 : 0}}>
                    <TouchableOpacity style={{padding: 4, margin: 8}} onPress={() => this.closeSessionModal()}>
                        <Icon name={'ios-close-circle'} size={16} color={Color.gray}/>
                    </TouchableOpacity>
                    <ScrollView>
                        {this.getTopicButtons(agenda)}
                    </ScrollView>
                </View>
            </Modal>
        );
    }

    getTalkButton(agenda){
        var button  = (
            <TouchableOpacity style={styles.selectSessionButton} onPress={() => this.setState({ sessionModal: true })}>
                <View style={styles.selectSessionButton}>   
                    <Text style={styles.selectASessionText}>Select a session</Text>
                </View>
            </TouchableOpacity>
        );
        if (this.state.isSessionSelected === true) {
            button = agenda.filter(talk => talk.id === this.state.sessionId).map((value) => 
                    <TouchableOpacity 
                        key={value.id} 
                        style={styles.selectSessionButton}
                        onPress={() => this.setState({ sessionModal: true })}
                    >
                        <View style={styles.selectSessionButton} >   
                            <Text style={styles.selectSessionButtonText} >{value.topic}</Text>
                        </View>
                    </TouchableOpacity>
            ); 
        }

        return button;
    }

    render() {
        const agenda = this.props.event.agenda;
        return (
            <View style={styles.container}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {
                            this.props.navigation.navigate('DrawerOpen');
                        }}>
                    <Header.Title title="Ask Question"/>
                </Header>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        {this.getTalkButton(agenda)}
                    </View>
                    {
                        this.state.isSessionSelected === true ? 
                        <SendQuestionView sessionId={this.state.sessionId} /> 
                        : null
                    }
                    <View style={{ flex: 1, marginTop: 10 }}>
                        {this.state.sessionId ? 
                            <TalkComment session={this.state.sessionId} lite={true}/> 
                            : null
                        }
                    </View>
                </View>
                {this.getSessionModal(agenda)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    buttonContainer: {
        backgroundColor: Color.green,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        height: 50
    },
    buttonText: {
        ...Font.medium,
        textAlign: 'center',
        color: Color.white,
        fontSize:Scale.moderateScale(15)
    },
    selectSessionButton: {
        justifyContent: 'center', 
        borderWidth: 0.2, 
        borderColor: Color.green,
        height: Scale.verticalScale(72)
    },
    selectSessionButtonText: {
        ...Font.regular,
        textAlign: 'center',
        color: Color.green,
        fontSize: Scale.verticalScale(16),
        padding: 2
    },
    selectASessionText: {
        ...Font.regular,
        textAlign: 'center',
        color: Color.black,
        fontSize: Scale.verticalScale(16),
        padding: 2
    }
});

export default connect(mapStateToProps)(AskScreen)
