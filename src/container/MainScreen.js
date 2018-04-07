/**
 * Created by Muslum on 2.08.2017.
 */

import React, {Component} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View, Alert, AsyncStorage, ScrollView} from 'react-native'
import Color from "../theme/Color";
import Font from "../theme/Font";
import * as Scale from "../theme/Scale";
import {EVENT_STACK} from "../router";
import {actionCreators} from '../reducks/module/event'
import {connect} from 'react-redux'

import Loading from '../component/Loading'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import If from '../component/If'
import Header from "../component/Header";
import AnimatedInput from "../component/AnimatedInput";
import QRCodeScanner from 'react-native-qrcode-scanner';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const logo = require("../../images/logo.png");

const mapStateToProps = (state) => ({
    loading: state.event.loading,
    error: state.event.error,
    events: state.event.events,
    event: state.event.event,
    errorMessage: state.event.errorMessage,
    login: state.auth.login,
    userDevice: state.authDevice.user,
    user: state.auth.user,
});


class MainScreen extends Component {

    state = {
        search: true,
        loadingModal:false,
        code: '',
        eventName: ''
    };

    componentWillMount() {
        AsyncStorage.getItem('Code').then((value) => {
                console.log('event key', value);
                this.setState({
                    code: value,
                });
            }
        );
        AsyncStorage.getItem('eventName').then((value) => {
                console.log('event name', value);
                this.setState({
                    eventName: value,
                });
            }
        );
    }

    /**
     * Girilen etkinkik koduna gore servisten etkinligi getirir
     * @param code aranan etkinlik kodu
     * @returns {Promise.<void>}
     */

    getEvent = async (code) => {
        this.setState({loadingModal:true});
        const userId=!this.props.login? this.props.userDevice.id: this.props.user.id;
        const {dispatch, loading} = this.props;
        await dispatch(actionCreators.fetchEvent(code,userId));
        const {error, errorMessage} = this.props;

        if (error)
            Alert.alert(
                'Warning!',
                errorMessage,
                [
                    {text: 'OK', onPress: () => this.setState({loadingModal:loading})},
                ],
                { cancelable: false }
            );

        if (!error && !loading) {
            //this.props.navigation.dispatch({type: 'drawerStack'});
            this.setState({loadingModal:loading});
            if (Boolean(code)) {
                AsyncStorage.setItem('Code', code).then((code1) => {
                    console.log('Success' , code1);
                });
            }
            this.props.navigation.navigate(EVENT_STACK);
        }
    };
            
    /**
     * Etkinlik arama islemini tetikler
     * @param value aranan etkinlik kodu
     * @private
     */
    _handlePressSearch(value) {
        if(!!value)
            this.getEvent(value);
    }

    /**
     * QR code sayfasini kapatir
     * @private
     */
    _hide() {
        this.setState({search: true})
    }

    render() {
        
        const loading = this.state.loadingModal;
        const { search, code, eventName } = this.state;
        //const { event } = this.props;

        let storeCode = '';
        AsyncStorage.getItem('Code').then((value) => {
            storeCode = value;
        });

        let storeEventName = '';
        AsyncStorage.getItem('eventName').then((value) => {
            storeEventName = value;
        });

        return (
            <View style={styles.container}>

                <Loading visible={loading}/>

                <If con={search}>
                    <If.Then>
                        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                            <View style={styles.container}>
                                <Header/>
                                <View style={styles.logoContainer}>
                                    <Image style={styles.image} source={logo}/>
                                    <Text style={styles.title}>Welcome to SliConf</Text>
                                    <Text style={styles.subtitle}>Conferences at your fingertips</Text>
                                </View>

                                <View style={styles.containerBottom}>
                                    <View style={styles.search}>
                                        <AnimatedInput
                                            label={'Event Code'}
                                            iconClass={FontAwesomeIcon}
                                            iconName={'search'}
                                            iconColor={Color.white}
                                            inputStyle={{color: Color.green}}
                                            onSubmitEditing={(value) => this._handlePressSearch(value)}
                                        />
                                        {<TouchableOpacity
                                            style={styles.search} 
                                            onPress={() => this._handlePressSearch(Boolean(storeCode) && storeCode !== '' ? storeCode : code)}>
                                            <View style={{flex: 1, flexDirection: 'row'}}>
                                                <Text style={styles.title1}>{Boolean(storeCode) && storeCode !== '' ? storeCode : code}</Text>
                                                <Text style={styles.title2}> {Boolean(storeEventName) && storeEventName !== '' ? storeEventName : eventName}</Text>
                                            </View>
                                        </TouchableOpacity>}
                                                                                
                                        <TouchableOpacity
                                            style={styles.qrcode}
                                            onPress={() => this.setState({search: false})}>
                                            <Icon name='qrcode-scan' size={50} color={Color.darkGray}/>
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
                                <Header.Title title="QR Code"/>
                            </Header>

                            <QRCodeScanner
                                onRead={(e) => {
                                    this._hide();
                                    this.getEvent(e.data)
                                }}
                            />
                            
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
        backgroundColor: Color.white,

    },
    containerBottom: {
        flex: 1,
        padding: 10
    },
    search: {
        flex: 1,
        width: Scale.width - 80,
        justifyContent: 'flex-start',
        padding: 10
    },
    image: {
        height: 100,
        width: 100,
        marginBottom: 10,
        marginTop: 40
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        ...Font.semiBold,
        color: Color.green,
        marginTop: 10,
        textAlign: 'center',
        fontSize: Scale.verticalScale(18),
    },
    title1: {
        ...Font.semiBold,
        color: Color.green,
        marginTop: 10,
        textAlign: 'center',
        fontSize: Scale.verticalScale(18),
        marginRight: 5,

    },
    title2: {
        ...Font.semiBold,
        color: Color.green,
        marginTop: 10,
        fontSize: Scale.verticalScale(18),
        marginRight: 0,
        flexWrap: 'wrap',
    },
    subtitle: {
        ...Font.light,
        fontSize: Scale.verticalScale(12),
        marginBottom: 5,
        color: Color.darkGray5
    },
    qrcode: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default connect(mapStateToProps)(MainScreen)
