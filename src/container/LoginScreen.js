/**
 * Created by anil on 04/07/2017.
 */
import React, {Component} from 'react';
import {Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View,AsyncStorage} from 'react-native';

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
import TextInputComponent from '../component/TextInputComponent'

const logo = require("../../images/logo.png");

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
    user: state.auth.user,
    errorMessage: state.auth.errorMessage
});

class LoginScreen extends Component {

    state = {
        page: 'login',
        username: '',
        password: '',
        fullname: '',
        email: '',
        loadingModal: false
    };

    _login = async (username, password) => {
        if (!username.trim() && !password.trim()) {
            this._loginUsernameInput.isThereError(true, "This field must be filled");
            this._loginPasswordInput.isThereError(true, "This field must be filled");
        } else {
            this._loginUsernameInput.isThereError(false);
            this._loginPasswordInput.isThereError(false);
            this.setState({loadingModal: true});
            const {dispatch, loading} = this.props;
            await dispatch(actionCreators.login(username, password));
            const {error, errorMessage} = this.props;
            if (error)
                Alert.alert(
                    'Warning!',
                    errorMessage,
                    [
                        {text: 'OK', onPress: () => this.setState({loadingModal: loading})},
                    ],
                    {cancelable: false}
                );

            if (!error && !loading) {
                //this.props.navigation.dispatch({type: 'drawerStack'});
                this.setState({loadingModal: loading});
                this.props.navigation.navigate(HOME)
                AsyncStorage.setItem('username', username);
                AsyncStorage.setItem('password', password);
            }
        }


    };

    _register = async (fullname, username, email, password) => {
        if (this.checkAll(fullname, username, email, password)) {
            this.clearErrors();
            this.setState({loadingModal: true});
            const {dispatch, loading} = this.props;
            await dispatch(actionCreators.register(fullname, username, email, password));
            const {error, errorMessage} = this.props;
            if (error)
                Alert.alert(
                    'Warning!',
                    errorMessage,
                    [
                        {text: 'OK', onPress: () => this.setState({loadingModal: loading})},
                    ],
                    {cancelable: false}
                );

            if (!error && !loading) {
                //this.props.navigation.dispatch({type: 'drawerStack'});
                this.setState({loadingModal: loading});
                this.props.navigation.navigate(HOME)
            }
        }


    };
    _forgotPassword = async (email) => {
        if (this.validateEmail( email)) {
            this._forgotPassEmail.isThereError(false);
            this.setState({loadingModal: true});
            const {dispatch, loading} = this.props;
            await dispatch(actionCreators.forgotPassword(email));
            const {error, errorMessage} = this.props;
            if (error)
                Alert.alert(
                    'Warning!',
                    errorMessage,
                    [
                        {text: 'OK', onPress: () => this.setState({loadingModal: loading})},
                    ],
                    {cancelable: false}
                );
            this.setState({page:'login'});

            if (!error && !loading) {
                //this.props.navigation.dispatch({type: 'drawerStack'});
                this.setState({loadingModal: loading});
                Alert.alert(
                    'Successful!',
                    "Check your email to reset your password",
                    [
                        {text: 'OK', onPress: () => this.setState({loadingModal: loading})},
                    ],
                    {cancelable: false}
                );
            }
        }else
            this._forgotPassEmail.isThereError(true,"Please enter a valid email.")


    };

    checkAll(fullname, username, email, password) {
        let isEverthingPassed = false;
        if (this.checkFullname(fullname))
            isEverthingPassed = true;
        if (this.checkUsername(username))
            isEverthingPassed = true;
        if (this.checkEmail(email))
            isEverthingPassed = true;
        if (this.checkPassword(password))
            isEverthingPassed = true;

        return isEverthingPassed
    }


    checkFullname(fullname) {
        if (!fullname.trim()) {
            this._registerFullnameInput.isThereError(true, "Fullname must be filled")
            return false
        } else
            this._registerFullnameInput.isThereError(false)
        if (fullname.length < 4) {
            this._registerFullnameInput.isThereError(true, "Fullname too short - minimum length is 4 characters")
            return false
        } else
            this._registerFullnameInput.isThereError(false)

        return true
    }

    checkUsername(username) {
        if (!username.trim()) {
            this._registerUsernameInput.isThereError(true, "Username must be filled")
            return false
        } else
            this._registerUsernameInput.isThereError(false)
        if (username.length < 4) {
            this._registerUsernameInput.isThereError(true, "Username too short - minimum length is 4 characters.")
            return false
        } else
            this._registerUsernameInput.isThereError(false)

        return true
    }

    checkEmail(email) {
        if (!email.trim()) {
            this._registerEmailInput.isThereError(true, "Email must be filled")
            return false
        } else
            this._registerEmailInput.isThereError(false)
        if (!this.validateEmail(email)) {
            this._registerEmailInput.isThereError(true, "Please enter a valid email.")
            return false
        } else
            this._registerEmailInput.isThereError(false)
        return true
    }

    checkPassword(password) {
        if (!password.trim()) {
            this._registerPasswordInput.isThereError(true, "Password must be filled")
            return false
        } else
            this._registerPasswordInput.isThereError(false)
        if (password.length < 8) {
            this._registerPasswordInput.isThereError(true, "Password too short - minimum length is 8 characters.")
            return false
        } else
            this._registerPasswordInput.isThereError(false)

        return true
    }


    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    clearErrors() {
        this._registerFullnameInput.isThereError(false)
        this._registerUsernameInput.isThereError(false)
        this._registerPasswordInput.isThereError(false)
        this._registerEmailInput.isThereError(false)
    }

    render() {

        const page = this.state.page;
        const loading = this.state.loadingModal;

        return (

            <View style={styles.container}>


                <Header
                    leftImage='chevron-left'
                    onPressLeft={() => this.props.navigation.goBack(null)}
                />

                <Loading visible={loading}/>
                <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                    <View style={{justifyContent: 'center', marginTop: 20}}>

                        <View style={styles.logoContainer}>
                            <Image style={styles.image} source={logo}/>
                            <Text style={styles.title}>Welcome to SliConf</Text>
                            <Text style={styles.subtitle}>Conferences at your fingertips</Text>
                        </View>


                        <If con={this.state.page === 'login'}>

                            <If.Then con={page === 'login'}>

                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    margin: 30,
                                    marginBottom: 15
                                }}>


                                    <TextInputComponent
                                        placeholder="Username"
                                        returnKeyType="next"
                                        onSubmitEditing={() => this._loginPasswordInput._root.focus()}
                                        onChangeText={(val) => this.setState({username: val})}
                                        keyboardType="email-address"
                                        style={styles.input}
                                        ref={(tl) => {
                                            this._loginUsernameInput = tl;
                                        }}
                                    />


                                    <TextInputComponent placeholder="Password"
                                                        placeholderTextColor={Color.darkGray3}
                                                        returnKeyType="done"
                                                        onChangeText={(val) => this.setState({password: val})}
                                                        secureTextEntry
                                                        style={styles.input}
                                                        secure={true}
                                                        ref={c => this._loginPasswordInput = c}/>


                                </View>


                                <TouchableOpacity style={styles.buttonContainer}
                                                  onPress={() => this._login(this.state.username, this.state.password)}>
                                    <Text style={styles.buttonText}>LOGIN</Text>
                                </TouchableOpacity>

                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                                    <TouchableOpacity onPress={() => {
                                        this.setState({page: 'forgot'})
                                    }}
                                                      style={{
                                                          paddingVertical: 10,
                                                          paddingBottom: 10,
                                                          alignItems: 'center'
                                                      }}>
                                        <Text style={{...Font.medium, fontSize: 15, color: '#818285'}}>Password</Text>
                                    </TouchableOpacity>

                                    <Text style={{...Font.black, fontSize: 18, color: '#818285'}}> | </Text>

                                    <TouchableOpacity onPress={() => {
                                        this.setState({page: 'register'})
                                    }}
                                                      style={{
                                                          paddingVertical: 10,
                                                          paddingBottom: 10,
                                                          alignItems: 'center'
                                                      }}>
                                        <Text style={{...Font.medium, fontSize: 15, color: '#818285'}}>Register</Text>
                                    </TouchableOpacity>

                                </View>

                            </If.Then>

                            <If.ElseIf con={page === 'register'}>

                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    margin: 30,
                                    marginBottom: 15
                                }}>


                                    <TextInputComponent
                                        placeholder="Full Name"
                                        placeholderTextColor={Color.darkGray3}
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        onSubmitEditing={() => this._registerUsernameInput._root.focus()}
                                        onChangeText={(val) => {
                                            this.setState({fullname: val});
                                            this.checkFullname(val)
                                        }}
                                        style={styles.input}
                                        autoCorrect={false}
                                        ref={(t2) => {
                                            this._registerFullnameInput = t2;
                                        }}
                                    />


                                    <TextInputComponent placeholder="Username"
                                                        placeholderTextColor={Color.darkGray3}
                                                        returnKeyType="next"
                                                        onChangeText={(val) => {
                                                            this.setState({username: val});
                                                            this.checkUsername(val)
                                                        }}
                                                        autoCapitalize="none"
                                                        onSubmitEditing={() => this._registerEmailInput._root.focus()}
                                                        ref={c => this._registerUsernameInput = c}
                                                        style={styles.input}
                                                        autoCorrect={false}/>


                                    <TextInputComponent placeholder="Email"
                                                        placeholderTextColor={Color.darkGray3}
                                                        returnKeyType="next"
                                                        onChangeText={(val) => {
                                                            this.setState({email: val});
                                                            this.checkEmail(val)
                                                        }}
                                                        keyboardType="email-address"
                                                        autoCapitalize="none"
                                                        onSubmitEditing={() => this._registerPasswordInput._root.focus()}
                                                        ref={c => this._registerEmailInput = c}
                                                        style={styles.input}
                                                        autoCorrect={false}/>


                                    <TextInputComponent placeholder="Password"
                                                        placeholderTextColor={Color.darkGray3}
                                                        returnKeyType="done"
                                                        onChangeText={(val) => {
                                                            this.setState({password: val});
                                                            this.checkPassword(val)
                                                        }}
                                                        ref={c => this._registerPasswordInput = c}
                                                        secure={true}
                                                        style={styles.input}/>


                                </View>


                                <TouchableOpacity style={styles.buttonContainer}
                                                  onPress={() => this._register(this.state.fullname, this.state.username, this.state.email, this.state.password)}>
                                    <Text style={styles.buttonText}>REGISTER</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    this.setState({page: 'login'})
                                }}
                                                  style={{
                                                      paddingVertical: 10,
                                                      paddingBottom: 10,
                                                      alignItems: 'center'
                                                  }}>
                                    <Text style={{...Font.medium, fontSize: 15, color: '#818285'}}>{'<'} Login</Text>
                                </TouchableOpacity>


                            </If.ElseIf>

                            <If.ElseIf con={page === 'forgot'}>

                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    margin: 30,
                                    marginBottom: 15
                                }}>


                                    <TextInputComponent placeholder="Email"
                                                        placeholderTextColor={Color.darkGray3}
                                                        returnKeyType="done"
                                                        onChangeText={(val) => {
                                                            this.setState({email: val});
                                                            this.validateEmail(val)
                                                        }}
                                                        keyboardType="email-address"
                                                        ref={c => this._forgotPassEmail = c}
                                                        autoCapitalize="none"
                                                        autoCorrect={false}
                                                        style={styles.input}/>

                                </View>


                                <TouchableOpacity style={styles.buttonContainer} onPress={()=>this._forgotPassword(this.state.email)}>
                                    <Text style={styles.buttonText}>SEND EMAIL</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    this.setState({page: 'login'})
                                }}
                                                  style={{
                                                      paddingVertical: 10,
                                                      paddingBottom: 10,
                                                      alignItems: 'center'
                                                  }}>
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
        height: 75,
        width: 75,
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

