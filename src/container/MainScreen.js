/**
 * Created by Muslum on 2.08.2017.
 */

import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    StatusBar,
    FlatList,
    Button,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native'
import {Form, Item, Label, Input} from 'native-base';
import {connect} from 'react-redux'
import {actionCreators} from '../reducks/module/event'
import Loading from '../component/Loading'
import {HOME} from '../router';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import If from '../component/If'
import Header from "../component/Header";
import Makiko from "../component/Makiko";
import Style from '../theme/Style'
import QRCodeScanner from 'react-native-qrcode-scanner';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
const {height, width} = Dimensions.get('window');
const logo = require("../../images/logo.png");
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const mapStateToProps = (state) => ({
    loading: state.event.loading,
    error: state.event.error,
    events: state.event.events,
    errorMessage: state.event.errorMessage
})

class MainScreen extends Component {

    state = {
        value: '',
        search: true,
    };

    static navigationOptions = {
        header: null
    };

    _handlePressSearch(value) {
        // TODO direk arama kosulunu duzenle
        if (value === 'K404')
            this.getEvent(value);
        else
            this.loadEventList(value);

    }

    loadEventList = async (name) => {
        const {dispatch, error, loading} = this.props
        await dispatch(actionCreators.fetchEventList(name))

        if (!error && !loading)
            this.getEvent("K123")


    }

    getEvent = async (code) => {
        const {dispatch,loading} = this.props
        await dispatch(actionCreators.fetchEvent(code))
        const {error,errorMessage} =this.props
        if(error)
            alert(errorMessage);

        if (!error && !loading) {
            //this.props.navigation.dispatch({type: 'drawerStack'});
            this.props.navigation.navigate('drawerStack')
        }
    }

    _hide() {
        this.setState({search: true})
    }

    _keyExtractor = (item, index) => item.id;

    _errorDialog() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        width: width,
                        marginTop: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                    }}>
                    <View style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        <Text style={{marginTop: 15, fontWeight: 'bold', color: '#d66', textAlign: 'center'}}>Etkinlik Bulunamadı</Text>
                    </View>
                </View>
            </View>
        )
    }


    render() {
        let {events, loading,} = this.props
        const {search, value,} = this.state

        return (
            <View style={styles.container}>
                <Loading visible={loading}/>

                <If con={search}>
                    <If.Then>
                        <KeyboardAwareScrollView>
                            <View style={styles.container}>
                                <View style={styles.logoContainer}>
                                    <Image style={styles.image} source={require('../../images/logo.png')}/>
                                    <Text style={styles.title}>Welcome to SliConf</Text>
                                    <Text style={styles.subtitle}>Conferences at your fingertips</Text>
                                </View>

                                <View style={styles.containerBottom}>
                                    <View style={styles.search}>
                                        <Makiko
                                            label={'Event Code'}
                                            iconClass={FontAwesomeIcon}
                                            iconName={'search'}
                                            iconColor={'#fff'}
                                            inputStyle={{ color: '#111' }}
                                            onSubmitEditing={(value) => this._handlePressSearch(value)}
                                        />


                                        <TouchableOpacity style={{marginTop:20,alignItems:'center'}} onPress={()=>{this.setState({search:false})}}>
                                            <Icon name ='qrcode-scan' size={50} color={'#414042'}/>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </If.Then>

                    <If.Else>
                        <View style={styles.container}>
                            <Header rightImage='close'
                                    onPressRight={() => this._hide()}>
                                <Header.Title title="QR Code" />
                            </Header>

                            <QRCodeScanner onRead={(e) => {(console.log('QR code scanned!'+' '+e, e));this._hide();this.getEvent(e)}}/>

                            <View/>

                        </View>
                    </If.Else>
                </If>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',

    },
    containerSearch: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    containerTop: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
    },
    containerBottom: {
        flex: 1,
        padding: 10
    },
    search: {
        flex: 1,
        width: Style.DEVICE_WIDTH - 80,
        justifyContent: 'flex-start',
    padding:10},
    image: {
        height: 100,
        width: 100,
        marginBottom: 20,
        marginTop: 60
    },
    textTitle: {
        color: '#2AB673',
        fontSize: 25,
        fontWeight: 'bold',
        margin: 5
    },
    textSubtitle: {
        color: '#888',
        fontSize: 12
    },
    box: {
        borderBottomWidth: (Platform.OS === 'ios') ? 1 : 0,
        borderBottomColor: '#818284',
        padding: 5
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        height: 200,
    },
    title: {
        color: '#2AB673',
        marginTop: 10,
        width: 200,
        textAlign: 'center',
        opacity: 0.9,
        fontFamily: "Montserrat-Regular",
        fontSize: Style.FONT_SIZE_TITLE_LARGE* 0.8,
        lineHeight: Style.FONT_SIZE_TITLE_LARGE * 1.3,
        fontWeight: 'bold'
    },
    subtitle: {
        fontFamily: "Montserrat-Regular",
        lineHeight: Style.FONT_SIZE_SMALL * 1.5,
        fontSize: Style.FONT_SIZE_SMALL,
        marginBottom: 10,
        color: '#818285'
    },
    container2: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#000000',
        paddingHorizontal: 10,
    },
    buttonContainer: {
        backgroundColor: '#2AB673',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
})

export default connect(mapStateToProps)(MainScreen)
