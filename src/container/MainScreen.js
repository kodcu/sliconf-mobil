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
    KeyboardAvoidingView,
    FlatList,
    Button,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import {actionCreators} from '../reducks/module/event'
import Loading from '../components/Loading'
import Error from '../components/Error'
import renderIf from '../config/renderIf'
import {HOME} from '../router';

const {height, width} = Dimensions.get('window');
const logo = require("../../images/logo.png");

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
        const {dispatch, error} = this.props
        await dispatch(actionCreators.fetchEventList(name))

        if (!error)
            this.setState({search: false})


    }

    getEvent = async (code) => {
        const {dispatch, error, loading} = this.props
        await dispatch(actionCreators.fetchEvent(code))

        if (!error && !loading) {
            this.props.navigation.dispatch({type: HOME});
        }
    }

    _hide() {
        this.setState({search: true})
    }

    renderEventRow = (item) => {
        return (
            <TouchableOpacity
                style={{width: width - 20, height: 50, margin: 10, backgroundColor: '#3f9'}}
                onPress={this.getEvent.bind(this, item.id)}
            >
                <Text>
                    {item.name} -- {item.date} -- {item.id}
                </Text>
            </TouchableOpacity>

        )
    }

    _keyExtractor = (item, index) => item.id;

    _errorDialog() {
       return(
           <View
               style={{
                   flex: 1,
                   justifyContent: 'center',
                   alignItems: 'center',
               }}>
               <View
                   style={{
                       width: width,
                       marginTop:50,
                       justifyContent: 'center',
                       alignItems: 'center',
                       backgroundColor: '#fff',
                   }}>
                   <View style={{
                       alignSelf:'center',
                       alignItems:'center',
                       justifyContent :'center',
                   }}>
                       <Ionicons name="md-close-circle" size={50} color="#d66" />
                       <Text style={{marginTop: 15,fontWeight :'bold', color :'#d66',textAlign :'center'}}>Etkinlik Bulunamadı</Text>
                   </View>
               </View>
           </View>
       )
    }


    render() {
        const {events, loading,} = this.props
        const {search, value,} = this.state

        return (
            <View style={styles.container}>
                <Loading visible={loading}/>

                {renderIf(search)(
                    <KeyboardAvoidingView style={styles.container2} behavior="height">
                        <View style={styles.containerTop}>
                            <Image
                                source={logo}
                                style={styles.image}
                            />
                            <Text style={styles.textTitle}>Welcome to SliConf</Text>
                            <Text style={styles.textSubtitle}>Conferences at your fingertips</Text>
                        </View>
                        <View style={styles.containerBottom}>
                            <View style={styles.search}>
                                <Text> Event Name</Text>
                                <TextInput
                                    returnKeyType="search"
                                    keyboardType="default"
                                    autoCorrect={false}
                                    style={styles.box}
                                    onSubmitEditing={() => this._handlePressSearch(value)}
                                    onChangeText={text => this.setState({value: text})}
                                    value={value}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                )}

                {renderIf(!search)(
                    <View style={styles.container}>
                        <View
                            style={{
                                width: window.width,
                                height: 39,
                                marginTop: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                backgroundColor: '#fff',
                                borderBottomWidth: 1,
                                borderBottomColor: '#000',
                            }}>

                            <Text
                                style={{
                                    flex: 1,
                                    paddingTop: 10,
                                    paddingLeft: 20,
                                    fontWeight: 'bold',
                                    color: '#000',
                                    textAlign: 'center',
                                }}>
                                {value}
                            </Text>
                            <Button onPress={() => this._hide()} title="X" color="#000"/>
                        </View>
                        <FlatList
                            data={events}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                            renderItem={({item}) => this.renderEventRow(item)}
                            ListEmptyComponent={this._errorDialog}/>
                        <View/>

                    </View>
                )}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'

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
        width: width - 80,
        justifyContent: 'flex-start',
    },
    image: {
        height: 100,
        width: 100,
        marginBottom: 20
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
        borderBottomColor: '#818284'
    },
})

export default connect(mapStateToProps)(MainScreen)