import React, {Component} from 'react';
import {View, Text, StyleSheet,FlatList,Dimensions,ScrollView,TouchableOpacity} from 'react-native';
import {Container, Button, Footer, FooterTab, Input, Thumbnail, Content, Fab} from "native-base";
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons'
import CommentItem from "./CommentItem";

const ENTRIES=[
    {name:'Fernando Muslera',comment:'Yorum',time:{
        "hour": 18,
        "minute": 28,
        "second": 15,
        "nano": 484000000
    },like:0,picture:'https://tmssl.akamaized.net//images/portrait/header/58088-1473586641.jpeg?lm=1473586671'},
    {name:'Maicon Pereira Roque',comment:'Yorum 1',time:{
        "hour": 19,
        "minute": 28,
        "second": 15,
        "nano": 484000000
    },like:5,picture:'https://tmssl.akamaized.net//images/portrait/header/84695-1445516053.jpg?lm=1445516069'},
    {name:'Mariano Ferreira Filho',comment:'Yorum 2',time:{
        "hour": 22,
        "minute": 48,
        "second": 15,
        "nano": 484000000
    },like:9,picture:'https://tmssl.akamaized.net//images/portrait/header/54155-1447240277.jpg?lm=1447240309'},
    ]
const POPULARENTRIES=[
    {name:'Fernando Muslera',comment:'Yorum',time:{
        "hour": 19,
        "minute": 48,
        "second": 15,
        "nano": 484000000
    },like:20,picture:'https://tmssl.akamaized.net//images/portrait/header/58088-1473586641.jpeg?lm=1473586671'},
    {name:'Anonymous',comment:'Yorum 3',time:{
        "hour": 20,
        "minute": 28,
        "second": 15,
        "nano": 484000000
    },like:15,picture:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoJA4PWsyzJCi1QzRbnrNOB9IUUraC-3xUXTQzFJoGN_EQFZQS'},
    {name:'Bafétimbi Fredius Gomis',comment:'Yorum 5',time:{
        "hour": 22,
        "minute": 28,
        "second": 15,
        "nano": 484000000
    },like:10,picture:'https://tmssl.akamaized.net//bilder/spielerfotos/s_22388_3377_2012_1.jpg?lm=0'},
]
export class TalkComment extends Component {

    renderRow (info,key) {
        return <CommentItem item={info} key={key}/>


    }
    _renderItem ({item, index}) {
        return (
            <View  style={styles.card}>
                <Thumbnail source={{uri:item.picture}}  small style={{marginBottom:15}}/>
                <Text style={{fontSize:12,color:'#000'}}>{item.name}</Text>
                <Text style={{fontSize:10,color:'#BCBEC0',textAlign:'center',margin:2}}>{item.comment}</Text>
            </View>
        );
    }
    _keyExtractor = (item, index) => index;
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{height:220,alignSelf:'center'}}>
                    <Carousel
                        data={POPULARENTRIES}
                        renderItem={this._renderItem}
                        sliderWidth={(width/2)+40}
                        itemWidth={(width / 2) - 20}
                        inactiveSlideScale={1}
                        inactiveSlideOpacity={1}
                        enableMomentum={true}
                        activeSlideAlignment={'start'}
                        autoplay={false}
                        autoplayDelay={500}
                        autoplayInterval={2500}
                        containerCustomStyle={styles.slider}
                        contentContainerCustomStyle={styles.sliderContentContainer}
                        removeClippedSubviews={false}/>

                </View>
                <View style={{height:height-355}}>
                    <ScrollView>
                        {ENTRIES.map((item,key)=> this.renderRow(item,item.key))}</ScrollView>
                </View>

                <Fab
                    active={true}
                    direction="left"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#29B673' }}
                    position="bottomRight"
                    onPress={this.props.question}>
                    <Icon  name="ios-text" />
                </Fab>



            </View>

        )
    }
}

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1,
        paddingTop: 50
    },
    scrollviewContentContainer: {
        paddingBottom: 50
    },
    exampleContainer: {
        marginBottom: 30
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 25,
    },
    sliderContentContainer: {
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },
    card: {
        width: (width / 2) - 20,
        height: 190,
        marginLeft: 10,
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:15,
        borderColor:'#F1F2F2',
        justifyContent:'center',
        alignItems:'center'
    }
});

export default TalkComment;