import React,{Component} from 'react';
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
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Content} from 'native-base';
import {connect} from 'react-redux'


const mapStateToProps = (state) => ({
    event: state.event.event,

})

class HomeScreen extends Component {

    static navigationOptions = {
        header: null
    };

    render() {
        const {event}=this.props;
        return (
            <Container style={{backgroundColor:'#ffffff'}}>
                <Header style={{backgroundColor:'#2AB673'}} androidStatusBarColor='#2AB673'>
                    <Left>
                        <Button transparent>
                            <Icon name='close' />
                        </Button>
                    </Left>
                    <Body >
                    <Title style={{alignSelf:'center'}} >Home</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{margin:30,fontSize:20,fontWeight:'bold',textAlign:'center'}}>Welcome to {event.name}</Text>

                    <View style={{flexDirection:'row',marginTop:20,}}>
                        <TouchableOpacity style={[styles.boxSmall,{backgroundColor:'#E06668'}]} >
                            <Image source={require('../../images/Agenda.png')} style={{width:50,height:50}}/>
                            <Text style={styles.buttonText}>Agenda</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.boxSmall,{backgroundColor:'#F69274'}]} >
                            <Image source={require('../../images/Speakers.png')} style={{width:50,height:50}}/>
                            <Text style={styles.buttonText}>Speakers</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={[styles.boxSmall,{backgroundColor:'#9E9DC7'}]} >
                            <Image source={require('../../images/Sponsors.png')} style={{width:50,height:50}}/>
                            <Text style={styles.buttonText}>Sponsors</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.boxSmall,{backgroundColor:'#75C7CA'}]} >
                            <Image source={require('../../images/Search.png')} style={{width:50,height:50}}/>
                            <Text style={styles.buttonText}>Search</Text>
                        </TouchableOpacity>
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
    boxSmall: {
        width: (width-50)/2,
        height: 175,
        marginBottom: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'skyblue',
    },
    buttonText:{
        fontSize:20,
        color:'white',
        fontWeight:'bold'
    }

})

export default connect(mapStateToProps)(HomeScreen)