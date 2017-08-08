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
    FlatList,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {actionCreators} from '../reducks/module/event'
import Loading from '../component/Loading'
import renderIf from '../config/renderIf'
import {LOGIN} from '../router';
import Header from "../component/Header";
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
            this.props.navigation.dispatch({type: LOGIN});
        }
    }

    _hide() {
        this.setState({search: true})
    }

    renderEventRow = (item) => {
        return (
            <TouchableOpacity onPress={this.getEvent.bind(this, item.id)}>
                <View style={{flexDirection:'row',padding:5,borderTopWidth:0.5,borderBottomWidth:0.5}}>
                    <Image source={{uri:item.logo}}style={{width:75,height:75,margin:5,borderRadius:100}}/>
                    <View >
                        <View style={{flexDirection:'row',justifyContent: 'space-between',width:width-95}}>
                            <Text style={{fontWeight:'bold',fontSize:15}} >{item.name}</Text>
                            <Text>{item.id}</Text>
                            <Text style={{}}>{item.date}</Text>
                        </View>
                        <Text style={{width:width-95}}>Javaday istanbul is most effective international communuty driven software conference of turkey organised by java user group</Text>
                    </View>

                </View>
            </TouchableOpacity>

        )
    }

    _keyExtractor = (item, index) => item.id;

    _errorDialog = () => {
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
                    <View behavior="height">
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
                    </View>
                )}

                {renderIf(!search)(
                    <View style={styles.container}>
                        <Header title={value} rightImage={{uri:'http://www.safehirings.com/close.png'}} onPressRight={() => this._hide()} titleStyle={{color:'#fff'}}/>

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
        borderBottomColor: '#818284',
        padding:5
    },
})

export default connect(mapStateToProps)(MainScreen)