/**
 * Created by Muslum on 2.08.2017.
 */

import React, {Component} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
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
    errorMessage: state.event.errorMessage
});


class MainScreen extends Component {

    state = {
        search: true,
    };

    /**
     * Girilen etkinkik koduna gore servisten etkinligi getirir
     * @param code aranan etkinlik kodu
     * @returns {Promise.<void>}
     */
    getEvent = async (code) => {
        const {dispatch, loading} = this.props;
        await dispatch(actionCreators.fetchEvent(code));
        const {error, errorMessage} = this.props;
        if (error)
            alert(errorMessage);

        if (!error && !loading) {
            //this.props.navigation.dispatch({type: 'drawerStack'});
            this.props.navigation.navigate(EVENT_STACK)
        }
    };

    /**
     * Etkinlik arama islemini tetikler
     * @param value aranan etkinlik kodu
     * @private
     */
    _handlePressSearch(value) {
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
        let {loading} = this.props;
        const {search} = this.state;

        return (
            <View style={styles.container}>

                <Loading visible={loading}/>

                <If con={search}>
                    <If.Then>
                        <KeyboardAwareScrollView>
                            <View style={styles.container}>
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
                                            onSubmitEditing={(value) => this._handlePressSearch('pggo')}
                                        />

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
        marginBottom: 20,
        marginTop: 60
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
