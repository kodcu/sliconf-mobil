import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,Image,TouchableOpacity ,FlatList,Dimensions,ListView} from 'react-native';
import { Container, Button, Icon, Title ,Content,CardItem,Thumbnail,Card,List,Item,Footer,FooterTab,Picker, Form, Item as FormItem} from 'native-base';
import AlphabeticView from '../component/AlphabeticView'
import Header from "../component/Header";
import {connect} from 'react-redux'
import {SPEAKERINFO} from '../router';

DATAS2=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U","V","Y","Z","W"]

const mapStateToProps = (state) => ({

})

class SpeakersScreen extends Component {


    state={
        DATAS :[
            {name: "AMahdy Abdelaziz",workingat: "Vaadin",about: "dfdfdf",topic: ["A105"],profilePicture:'https://javaday.istanbul/wp-content/uploads/2017/01/amadhy-abdelaziz-150x150.jpg',twitter:"https://twitter.com/amahdy7",linkedin:"https://www.linkedin.com/in/amahdyabdelaziz/?ppe=1"},
            {name: "Arun Gupta",workingat: "Amazon Web Services",about: "dfdfdf",topic: ["A100"],profilePicture:'https://javaday.istanbul/wp-content/uploads/2017/07/arun-gupta-150x150.png',twitter:"https://twitter.com/arungupta",linkedin:""},
            {name: "Frédéric Hubin",workingat: "ING Bank",about: "dfdfdf",topic: ["A101"],profilePicture:'https://javaday.istanbul/wp-content/uploads/2017/07/photo_400x400-150x150.jpg',twitter:"https://twitter.com/fhubin",linkedin:"https://www.linkedin.com/in/fr%C3%A9d%C3%A9ric-hubin-0b24bb127/"},
            {name: "Mahmoud Abdelghany",workingat: "Blue4IT",about: "dfdfdf",topic: ["A106","A107"],profilePicture:'https://javaday.istanbul/wp-content/uploads/2017/08/Mahmoud-Abdelghany-150x150.jpg',twitter:"https://twitter.com/@blackbeard0x14e",linkedin:""},
            {name: "Marcin Szymaniuk",workingat: "TantusData",about: "dfdfdf",topic: ["A102"],profilePicture:'https://javaday.istanbul/wp-content/uploads/2017/08/Marcin-lowres-400x400_1-150x150.jpg',twitter:"",linkedin:""},
            {name: "Nick Tune",workingat: "Salesforce",about: "dfdfdf",topic: ["A103"],profilePicture:'https://javaday.istanbul/wp-content/uploads/2017/07/NickTune_pcn443-150x150.png',twitter:"https://twitter.com/ntcoding",linkedin:"https://www.linkedin.com/in/nick-tune-3671441a/"},
            {name: "Venkat Subramaniam",workingat: "Agile Developer, Inc.",about: "dfdfdf",topic: ["A106","A107"],profilePicture:'https://javaday.istanbul/wp-content/uploads/2017/07/VenkatSubramaniam-150x150.jpg',twitter:"https://twitter.com/venkat_s",linkedin:"https://www.linkedin.com/in/vsubramaniam"},
                   ],
        weye:[],
        selected:0
    }
    speakersList(sp) {
        let changedSpeakersList = [];
        let myMap = new Map();
        sp.forEach(function (element)  {
            let char = element.name.charAt(0).toUpperCase()
            myMap.get(char) ? array = myMap.get(char) : array = []
            array.push(element)
            myMap.set(char, array)
        });

        myMap.forEach(function (value, key) {
            changedSpeakersList={...changedSpeakersList,[key]: value}
        })

        return changedSpeakersList
    }

    _keyExtractor = (item, index) => index;

    renderRow (info) {
        return <TouchableOpacity onPress={() => this.props.navigation.navigate(SPEAKERINFO,info)} ><View  style={styles.card} >
            <Thumbnail source={{uri:info.item.profilePicture}} large style={{marginBottom:15}}/>
            <Text style={{fontSize:15,color:'#000'}}>{info.item.name}</Text>
            <Text style={{fontSize:12,color:'#BCBEC0'}}>{info.item.workingat}</Text>
        </View></TouchableOpacity>


    }
    componentWillMount(){
        this.setState({
            weye:this.speakersList(this.state.DATAS)
        })
    }
    componentWillUpdate(nextProps, nextState){
        console.log(nextState)
    }
    handleScroll = (event) => {
        const {weye,DATAS} = this.state

        let scrollIndex = Math.floor( event.nativeEvent.contentOffset.y / 205)
        let leftSpeaker = DATAS[(scrollIndex === -1 ? 0 : scrollIndex)*2]
        let nameChar = leftSpeaker.name.charAt(0).toUpperCase()
        let index = Object.keys(weye).indexOf(nameChar);
        this.setState({selected:index})
    }

    setSelected = (index,item) => {
        this.setState({selected:index})
        this.myfunction(item)
    }

    myfunction = (letter) =>{
        let DATAS=this.state.DATAS
        if(this.state.weye[letter]!==undefined){
            let item =this.state.weye[letter][0]
            this.myFlatList.scrollToIndex({ animated: true, index:Math.floor(0.5 * DATAS.indexOf(item)) });
        }

    }
    getItemLayout = (data, index) => ({ length: 200, offset: 200 * index, index });

    // Hangi harfe basarsa git arrayda o harfin ilk elemanını bul sonra onun indexine flatlistin scrollto özelliği ile git
    render() {

        const sel = this.state.selected;
        return (
            <Container style={{backgroundColor:'#fff'}}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack(null)}
                        onPressRight={() => {this.props.navigation.navigate('DrawerOpen')}}>
                            <Header.Title title="Speakers" />
                </Header>
                <View style={{flexDirection:'row',flex:1}}>
                    <View style={{flexGrow:0.8}}>
                        <FlatList
                            data={this.state.DATAS}
                            renderItem={(info) => this.renderRow(info)}
                            keyExtractor={this._keyExtractor}
                            numColumns={2}
                            ref={(list) => this.myFlatList = list}
                            getItemLayout={this.getItemLayout}
                            onScroll={this.handleScroll}
                        /></View>
                    <View style={{justifyContent:'center',alignItems:'center',margin:5,paddingBottom:10,flexGrow:0.2}}>
                        {Object.keys(this.state.weye).map((myi, i) =>
                            <TouchableOpacity onPress={() => this.setSelected(i,myi)} key={i}>
                                <Text style={{fontFamily: "Montserrat-Regular",fontSize : sel === i ? 35 : ( (sel-1) === i || (sel+1) === i )  ? 27 : ( (sel-2)  === i || (sel+2)  === i ) ? 20 : 15
                                }} >{myi}</Text>
                            </TouchableOpacity>
                        )}

                    </View>
                </View>


            </Container>
        );
    }
}
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listView: {
        flexDirection: 'row',
        flexWrap:'wrap'
    },
    card: {
        width: (width / 2) - 25,
        height: 200,
        marginLeft: 10,
        marginTop: 10,
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:15,
        borderColor:'#F1F2F2',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default connect(mapStateToProps)(SpeakersScreen)