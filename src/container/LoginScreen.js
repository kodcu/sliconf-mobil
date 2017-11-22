/**
 * Created by anil on 04/07/2017.
 */
import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View,Alert} from 'react-native';

import {Container, Content, Input, Item} from 'native-base';
import Color from "../theme/Color";
import Font from "../theme/Font";
import * as Scale from "../theme/Scale";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Header from "../component/Header";
import If from "../component/If";
import {actionCreators} from '../reducks/module/auth'
import {connect} from 'react-redux'
import {HOME} from "../router";
import Loading from "../component/Loading";

const logo = require("../../images/logo.png");

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
    events: state.auth.user,
    errorMessage: state.auth.errorMessage
});

class LoginScreen extends Component {

    state = {
        page: 'login',
        username:'',
        password:'',
        fullname:'',
        email:'',
        loadingModal:false
    };

    _login = async (username,password) => {
        this.setState({loadingModal:true});
        const {dispatch, loading} = this.props;
        await dispatch(actionCreators.login(username,password));
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
            this.props.navigation.navigate(HOME)
        }
    };

    _register = async (fullname,username,email,password) => {
        this.setState({loadingModal:true});
        const {dispatch, loading} = this.props;
        await dispatch(actionCreators.register(fullname,username,email,password));
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
            this.props.navigation.navigate(HOME)
        }
    };



    render() {

        const page = this.state.page;
        const loading = this.state.loadingModal;

        return (

            <View style={styles.container}>
                <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">

                    <Header
                        leftImage='chevron-left'
                        onPressLeft={() => this.props.navigation.goBack(null)}
                    />

                    <Loading visible={loading}/>

                    <View style={{justifyContent: 'center', marginTop: 20}}>

                        <View style={styles.logoContainer}>
                            <Image style={styles.image} source={logo}/>
                            <Text style={styles.title}>Welcome to SliConf</Text>
                            <Text style={styles.subtitle}>Conferences at your fingertips</Text>
                        </View>

                        <If con={this.state.page === 'login'}>

                            <If.Then con={page==='login'}>

                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    margin: 30,
                                    marginBottom: 15
                                }}>

                                    <Item rounded
                                          style={{borderRadius: 10, marginBottom: 10, borderColor: Color.green}}>
                                        <Input placeholder="Username"
                                               placeholderTextColor={Color.darkGray3}
                                               returnKeyType="next"
                                               onSubmitEditing={() => this._loginPasswordInput._root.focus()}
                                               onChangeText={(val) => this.setState({username:val})}
                                               keyboardType="email-address"
                                               autoCapitalize="none"
                                               style={styles.input}
                                               autoCorrect={false}/>
                                    </Item>


                                    <Item rounded style={{borderRadius: 10, borderColor: Color.green}}>
                                        <Input placeholder="Password"
                                               placeholderTextColor={Color.darkGray3}
                                               returnKeyType="done"
                                               onChangeText={(val) => this.setState({password:val})}
                                               secureTextEntry
                                               style={styles.input}
                                               ref={c => this._loginPasswordInput = c}/>
                                    </Item>


                                </View>


                                <TouchableOpacity style={styles.buttonContainer} onPress={() => this._login(this.state.username,this.state.password)}>
                                    <Text style={styles.buttonText}>LOGIN</Text>
                                </TouchableOpacity>

                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                                    <TouchableOpacity onPress={() => {this.setState({page:'forgot'})}}
                                        style={{paddingVertical: 10, paddingBottom: 10, alignItems: 'center'}}>
                                        <Text style={{...Font.medium, fontSize: 15, color: '#818285'}}>Password</Text>
                                    </TouchableOpacity>

                                    <Text style={{...Font.black, fontSize: 18, color: '#818285'}}> | </Text>

                                    <TouchableOpacity onPress={() => {this.setState({page:'register'})}}
                                        style={{paddingVertical: 10, paddingBottom: 10, alignItems: 'center'}}>
                                        <Text style={{...Font.medium, fontSize: 15, color: '#818285'}}>Register</Text>
                                    </TouchableOpacity>

                                </View>

                            </If.Then>

                            <If.ElseIf con={page==='register'}>

                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    margin: 30,
                                    marginBottom: 15
                                }}>

                                    <Item rounded
                                          style={{borderRadius: 10, marginBottom: 10, borderColor: Color.green}}>
                                        <Input placeholder="Full Name"
                                               placeholderTextColor={Color.darkGray3}
                                               returnKeyType="next"
                                               autoCapitalize="none"
                                               onSubmitEditing={() => this._registerUsernameInput._root.focus()}
                                               onChangeText={(val) => this.setState({fullname:val})}
                                               style={styles.input}
                                               autoCorrect={false}/>
                                    </Item>


                                    <Item rounded style={{borderRadius: 10,marginBottom: 10, borderColor: Color.green}}>
                                        <Input placeholder="Username"
                                               placeholderTextColor={Color.darkGray3}
                                               returnKeyType="next"
                                               onChangeText={(val) => this.setState({username:val})}
                                               autoCapitalize="none"
                                               onSubmitEditing={() => this._registerEmailInput._root.focus()}
                                               ref={c => this._registerUsernameInput = c}
                                               style={styles.input}
                                               autoCorrect={false}/>
                                    </Item>

                                    <Item rounded style={{borderRadius: 10, marginBottom: 10,borderColor: Color.green}}>
                                        <Input placeholder="Email"
                                               placeholderTextColor={Color.darkGray3}
                                               returnKeyType="next"
                                               onChangeText={(val) => this.setState({email:val})}
                                               keyboardType="email-address"
                                               autoCapitalize="none"
                                               onSubmitEditing={() => this._registerPasswordInput._root.focus()}
                                               ref={c => this._registerEmailInput = c}
                                               style={styles.input}
                                               autoCorrect={false}/>
                                    </Item>

                                    <Item rounded style={{borderRadius: 10, borderColor: Color.green}}>
                                        <Input placeholder="Password"
                                               placeholderTextColor={Color.darkGray3}
                                               returnKeyType="done"
                                               onChangeText={(val) => this.setState({password:val})}
                                               ref={c => this._registerPasswordInput = c}
                                               secureTextEntry
                                               style={styles.input}/>
                                    </Item>


                                </View>


                                <TouchableOpacity style={styles.buttonContainer} onPress={() => this._register(this.state.fullname,this.state.username,this.state.email,this.state.password)}>
                                    <Text style={styles.buttonText}>REGISTER</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {this.setState({page:'login'})}}
                                    style={{paddingVertical: 10, paddingBottom: 10, alignItems: 'center'}}>
                                    <Text style={{...Font.medium, fontSize: 15, color: '#818285'}}>{'<'} Login</Text>
                                </TouchableOpacity>


                            </If.ElseIf>

                            <If.ElseIf con={page==='forgot'}>

                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    margin: 30,
                                    marginBottom: 15
                                }}>

                                    <Item rounded style={{borderRadius: 10, marginBottom: 10,borderColor: Color.green}}>
                                        <Input placeholder="Email"
                                               placeholderTextColor={Color.darkGray3}
                                               returnKeyType="next"
                                               keyboardType="email-address"
                                               autoCapitalize="none"
                                               style={styles.input}
                                               autoCorrect={false}/>
                                    </Item>

                                </View>


                                <TouchableOpacity style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>SEND EMAIL</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {this.setState({page:'login'})}}
                                                  style={{paddingVertical: 10, paddingBottom: 10, alignItems: 'center'}}>
                                    <Text style={{...Font.medium, fontSize: 15, color: '#818285'}}>{'<'} Login</Text>
                                </TouchableOpacity>

                            </If.ElseIf>

                        </If>

                    </View>
                </KeyboardAwareScrollView>
            </View>

        );
    }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    title: {
        ...Font.semiBold,
        color: Color.green,
        marginTop: 10,
        textAlign: 'center',
        fontSize: Scale.verticalScale(22),
    },
    subtitle: {
        ...Font.light,
        fontSize: Scale.verticalScale(15),
        marginBottom: 5,
        color: Color.darkGray5
    },
    image: {
        height: 150,
        width: 150,
        marginBottom: 10,
    },
    input: {
        ...Font.light,
        backgroundColor: Color.transparent,
        color: Color.green,
        fontSize: Scale.verticalScale(18),
        padding: 5
    },
    buttonContainer: {
        backgroundColor: Color.green,
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    buttonText: {
        ...Font.semiBold,
        textAlign: 'center',
        color: Color.white,
        fontSize: Scale.verticalScale(20),
    }
});

export default connect(mapStateToProps)(LoginScreen);

