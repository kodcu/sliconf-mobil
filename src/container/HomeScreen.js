import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    FlatList,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native'
import {Container} from 'native-base';
import Header from "../component/Header";
import {connect} from 'react-redux'
import Style from '../theme/Style'
import {AGENDA,SPEAKERS,INFO} from '../router';





const mapStateToProps = (state) => ({
    event: state.event.event,

})

class HomeScreen extends Component {

    render() {
        const {event} = this.props;
        return (
            <Container style={{backgroundColor: '#ffffff'}}>

                <Header leftImage='close' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack(null)}
                        onPressRight={() => {this.props.navigation.navigate('DrawerOpen')}}>
                    <Header.Title title="Home" />
            </Header>

                <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around',}}>
                    <View>
                        <Text style={styles.title}>Welcome to</Text>
                        <Text style={styles.title}>{this.props.event.name}</Text>
                    </View>

                    <View>

                        <View style={{flexDirection: 'row',}}>
                            <TouchableOpacity onPress={() => this.props.navigation.dispatch({type: AGENDA})} style={[styles.leftboxSmall, {backgroundColor: '#E06668'}]}>
                                <Image source={require('../../images/Agenda.png')} style={{width: 50, height: 50}}/>
                                <Text style={styles.buttonText}>Agenda</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.dispatch({type: SPEAKERS})} style={[styles.rightboxSmall, {backgroundColor: '#F69274'}]}>
                                <Image source={require('../../images/Speakers.png')} style={{width: 50, height: 50}}/>
                                <Text style={styles.buttonText}>Speakers</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={[styles.leftboxSmall, {backgroundColor: '#9E9DC7'}]}>
                                <Image source={require('../../images/Sponsors.png')} style={{width: 50, height: 50}}/>
                                <Text style={styles.buttonText}>Sponsors</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.dispatch({type: INFO})} style={[styles.rightboxSmall, {backgroundColor: '#75C7CA'}]}>
                                <Image source={require('../../images/Search.png')} style={{width: 50, height: 50}}/>
                                <Text style={styles.buttonText}>Info</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}

const {width} = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    leftboxSmall: {
        width: Style.DEVICE_WIDTH * 0.44,
        height: Style.DEVICE_WIDTH * 0.44,
        marginBottom: Style.DEVICE_WIDTH * 0.04,
        marginRight: Style.DEVICE_WIDTH * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightboxSmall: {
        width: Style.DEVICE_WIDTH * 0.44,
        height: Style.DEVICE_WIDTH * 0.44,
        marginBottom: Style.DEVICE_WIDTH * 0.04,
        marginLeft: Style.DEVICE_WIDTH * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: "Montserrat-Regular",
        lineHeight: Style.FONT_SIZE_TITLE * 1.5,
        fontSize: Style.FONT_SIZE_TITLE,
        color: 'white',
        fontWeight: 'bold',
        margin: Style.MARGIN,
        textAlign: 'center'
    },
    title: {
        fontFamily: "Montserrat-Regular",
        lineHeight: Style.FONT_SIZE_TITLE_LARGE * 1.5,
        fontSize: Style.FONT_SIZE_TITLE_LARGE,
        fontWeight: 'bold',
        padding:Style.MARGIN,
        paddingTop: 0,
        paddingBottom: 0,
        textAlign: 'center'
    },


})



export default connect(mapStateToProps)(HomeScreen)