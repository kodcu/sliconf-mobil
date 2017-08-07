/**
 * Created by anil on 04/07/2017.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity,StatusBar} from 'react-native';
import {connect} from 'react-redux'
import {actionCreators} from '../reducks/module/auth'


const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
    user: state.auth.user,
    login: state.auth.login,
    errorMessage: state.auth.errorMessage
});

class LoginForm extends Component{

    state = {
        username:'',
        password:''
    };

    login = async (username,pass) => {
        const {dispatch, error} = this.props;
        await dispatch(actionCreators.login(username,pass));

        if (!this.props.error)
            alert('Login Basarili.Hoşgeldin '+this.props.user.name);
        else
            alert(this.props.errorMessage)






    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <TextInput placeholder="username or email"
                           placeholderTextColor='rgba(0,0,0,0.7)'
                           returnKeyType="next"
                           onSubmitEditing={() => this.passwordInput.focus()}
                           keyboardType="email-address"
                           autoCapitalize="none"
                           autoCorrect={false}
                           onChangeText={(text) => this.setState({username:text})}
                           style={styles.input}/>
                <TextInput placeholder="password"
                           placeholderTextColor='rgba(0,0,0,0.7)'
                           returnKeyType="go"
                           secureTextEntry
                           style={styles.input}
                           ref={(input) => this.passwordInput = input}
                           onChangeText={(text) => this.setState({password:text})}/>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.login(this.state.username,this.state.password)}>
                <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding:20
    },
    input : {
        height: 40,
        backgroundColor:'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#000000',
        paddingHorizontal: 10,
    },
    buttonContainer:{
        backgroundColor:'#2AB673',
        paddingVertical:15
    },
    buttonText:{
        textAlign:'center',
        color:'#FFFFFF',
        fontWeight:'700'
    }
});
export default connect(mapStateToProps)(LoginForm)