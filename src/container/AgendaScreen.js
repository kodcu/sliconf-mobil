import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {
    Container,
    Left,
    Right,
    Button,
    Icon,
    Title,
    Content,
    CardItem,
    Thumbnail,
    Card,
    List,
    Item,
    Footer,
    FooterTab,
    Picker,
    Form,
} from 'native-base';
import AgendaCard from '../component/AgendaCard'
import ChosenCard from '../component/ChosenCard'
import Header from '../component/Header'
import Filter from '../component/Filter'
import BreakTimeCard from '../component/BreakTimeCard'
import If from '../component/If'
import {connect} from 'react-redux'
import {SEARCHRESULT} from '../router';
let MOCKDATA = {
    "04-05-2018":[
        {key: "A100",time: "13:00",topic: "Fuse Integrasyonu",topicDetail: "Ayrıntı", level: 1,room: "Oda 2", speaker: "Lemi Orhan", star: 4.5,date: "04-05-2018",tags:[] },
        {key: "A101",time: "14:00",topic: "Docker nedir ?",topicDetail: "Ayrıntı", level: 2,room: "Oda 1", speaker: "Hakan Özler", star: 4.5,date: "04-05-2018",tags:["Server Side","Java Language"] },
        {key: "A108",time: "14:45",topic: "Coffe break",topicDetail: "", level: 0,room: "Oda 0", speaker: "", star: 4.5,date: "04-05-2018",tags:[] },
        {key: "A102",time: "15:00",topic: "Spring data kullanımı",topicDetail: "Ayrıntı", level: 3,room: "Oda 3", speaker: "Hüseyin Akdoğan", star: 4.5,date: "04-05-2018",tags:["Big Data","Java Language"] },
        {key: "A103",time: "16:00",topic: "Database Yönetimi",topicDetail: "Ayrıntı", level: 3,room: "Oda 0", speaker: "Anıl Coşar", star: 4.5,date: "04-05-2018",tags:["Big Data"]},

    ],
    "05-05-2018":[
        {key: "A104",time: "13:00",topic: "React vs Angular",topicDetail: "Ayrıntı", level: 3,room: "Oda 1", speaker: "Göksel Pirnal", star: 4.5,date: "05-05-2018",tags:["Modern Web"] },
        {key: "A105",time: "14:00",topic: "Jenkins ile planlı çalışmak",topicDetail: "Ayrıntı", level: 2,room: "Oda 1", speaker: "Talip Teyfur", star: 4.5,date: "05-05-2018",tags:["Server Side"] },
        {key: "A106",time: "15:00",topic: "react-native ile cross-platform yazmak",topicDetail: "Ayrıntı", level: 1,room: "Oda 3", speaker: "Müslüm Sezgin", star: 4.5,date: "05-05-2018",tags:["Mobile"]  },

    ],
    "06-05-2018":[
        {key: "A107",time: "12:00",topic: "Java 9 Modularity",topicDetail: "Ayrıntı", level: 1,room: "Oda 1", speaker: "Altuğ Bilgin Altıntaş", star: 4.5,date: "06-05-2018",tags:["Java Language"] },
    ]
}

let choosen = [];
let eventsDates =[];

const mapStateToProps = (state) => ({

})

class AgendaScreen extends Component {

    state = {
        switchedDay: 'Day 1',
        isClicked: true,
        data:[],
        rooms:[],
        filter:false,

    }

    filterHide=(searchResults)=>{
        console.log('Agenda Screendeyim sonuclar')
        console.log(searchResults)
        this.setState({filter:false})
        this.props.navigation.navigate(SEARCHRESULT,searchResults)
    }

    closeFilter=()=>{
        console.log("kapandi")
        this.setState({filter:false})
    }


    eventsList(events) {
        let changedEventsList = [];
        let myMap = new Map();

        events.forEach(function (element)  {
            let time = element.time
            myMap.get(time) ? array = myMap.get(time) : array = []
            array.push(element)
            myMap.set(time, array)
        });

        myMap.forEach(function (value, key) {
            changedEventsList={...changedEventsList,[key]: value}
        })

        return changedEventsList
    }

    roomsList(events){
        let roomsList = [];
        let tempRoom=events.filter((thing, index, self) => self.findIndex((t) => {return t.room === thing.room }) === index)
        tempRoom.forEach((element)=> roomsList.push(element.room))
        roomsList.sort();
        return roomsList
    }

    componentWillMount(){
        Object.keys(MOCKDATA).forEach((date)=> eventsDates.includes(date) ? null:eventsDates.push(date))
        this.setState({
            rooms:this.roomsList(MOCKDATA["04-05-2018"]),
            data:this.eventsList(MOCKDATA["04-05-2018"])
        })
    }

    changeDate(date){

        this.setState({
            switchedDay:date,
            rooms:this.roomsList(MOCKDATA[date]),
            data:this.eventsList(MOCKDATA[date])
        })
    }

    handleScroll = (event) => {
        this.roomScroll.scrollTo({ x: event.nativeEvent.contentOffset.x, animated: true });
    }

    deleteItemFromChosenEvents(arg) {
        let array = choosen;
        let index = array.indexOf(arg)
        array.splice(index, 1);
    }

    addItemToChosenEvents(arg) {
        choosen.push(arg);
        console.log(choosen);
    }

    isThereEventInRoom(myroom, arg) {
        let isExist = false;
        let i, j;
        for (i = 0; i < arg.length; i++) {
            if (myroom == arg[i].room) {
                isExist = true;
                for (j = 0; j < choosen.length; j++) {
                    if (arg[i] === choosen[j]) {
                        return (
                            <AgendaCard item={arg[i]}
                                        isEmpty={false}
                                        onPressAddButton={this.addItemToChosenEvents}
                                        isClicked={true}
                                        key={arg[i].key}
                                        choosedEvents={choosen}
                                        onPressDeleteButton={this.deleteItemFromChosenEvents}/>)
                    }
                }
                return (<AgendaCard item={arg[i]}
                                    isEmpty={false}
                                    onPressAddButton={this.addItemToChosenEvents}
                                    isClicked={false}
                                    key={arg[i].key}
                                    choosedEvents={choosen}
                                    onPressDeleteButton={this.deleteItemFromChosenEvents}/>)
            } else {
                isExist = false;
            }
        }
        if (!isExist)
            return (<AgendaCard isEmpty={true}/>)
    }

    _hide() {
        this.setState({isClicked: true})
    }


    render() {
        const { isClicked , filter} = this.state
        DATAS=this.state.data
        rooms=this.state.rooms
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <If con={isClicked}>
                    <If.Then>
                        <Filter visible={filter} onPress ={(e) => this.filterHide(e)} onClose={()=>this.closeFilter} events={MOCKDATA} />
                        <Header leftImage='chevron-left' rightImage='bars'
                                onPressLeft={() => this.props.navigation.goBack(null)}
                                onPressRight={() => {this.props.navigation.navigate('DrawerOpen')}}>
                            <Picker style={{width:140}}
                                    selectedValue={this.state.switchedDay}
                                    onValueChange={(itemValue, itemIndex) => this.changeDate(itemValue)}>
                                    {eventsDates.map((item,i)=>
                                        <Picker.Item key={i+1} label={"Day "+(i+1)} value={item} />
                                    )}
                            </Picker>
                        </Header>
                        <View style={styles.roomsField}>
                            <TouchableOpacity onPress={() => this.setState({filter:true})}>
                            <Icon name='ios-funnel-outline' style={styles.filterIcon} />
                            </TouchableOpacity>
                            <View style={{marginLeft:30,margin:8}}>
                            <ScrollView horizontal ref={(el) => { this.roomScroll = el; }} showsHorizontalScrollIndicator={false}>
                                {rooms.map((oda, i) =>
                                    <Text key={i} style={styles.roomText}>{oda}</Text>
                                )}
                            </ScrollView>
                            </View>
                        </View>
                    </If.Then>
                    <If.Else>
                        <Header leftImage='chevron-left'
                                onPressLeft={() => this._hide()}>
                            <Header.Title title="Seçtiklerim" />
                        </Header>
                    </If.Else>
                </If>
                <Content >
                    <If con={isClicked}>

                        <If.Then>

                            <Content >
                                <View style={{ flexDirection: 'row' }}>

                                    <View style={{ margin: 5, padding: 5 }}>
                                        {Object.keys(DATAS).map((list, i) => (

                                            <View key={i}>{DATAS[list][0].level === 0 ? <Text style={{ margin: 8 }}>{list}</Text> : <Text style={styles.cardsTime}>{list}</Text>}</View>
                                        ))}
                                    </View>
                                    <ScrollView horizontal onScroll={this.handleScroll} showsHorizontalScrollIndicator={false} >
                                        <ScrollView >
                                            {Object.keys(DATAS).map((time, i) => (
                                                <View key={i}>
                                                    <If con={DATAS[time][0].level !== 0}>
                                                        <If.Then>
                                                            <View style={styles.cardsField}>

                                                                {rooms.map((myroom, i) => (
                                                                    <View key={i}>{this.isThereEventInRoom(myroom, DATAS[time])}</View>
                                                                ))}
                                                            </View>
                                                        </If.Then>
                                                        <If.Else>
                                                            <BreakTimeCard item={DATAS[time][0]} />
                                                        </If.Else>
                                                    </If>
                                                </View>

                                            ))}

                                        </ScrollView>
                                    </ScrollView>
                                </View>
                            </Content>
                        </If.Then>
                        <If.Else>
                            <View>

                                {choosen.map((choosed, i) =>
                                    <ChosenCard key={i} item={choosed} onPressDeleteButton={this.deleteItemFromChosenEvents}/>
                                )}
                            </View></If.Else>
                    </If>
                </Content>


                <Footer >
                    <FooterTab style={{ backgroundColor: '#fff' }}>
                        <Button vertical onPress={() => { this.setState({ isClicked: true }) }}>
                            <Text style={{color:this.state.isClicked ?'#29B673':'#414042'}}>All</Text>
                        </Button>
                        <Button vertical onPress={() => { this.setState({ isClicked: false }) }}>
                            <Text style={{color:this.state.isClicked?'#414042':'#29B673'}}>Chosen</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    roomsField: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    roomText: {
        width: 200,
        margin: 5,
        marginLeft: 20
    },
    cardsField: {
        flexDirection: 'row',
        marginLeft: 30
    },
    cardsTime: {
        margin: 8,
        textAlignVertical: 'center',
        textAlign: 'center',
        height: 92
    },
    filterIcon:{
        marginLeft: 15,
        marginRight: 15,
        margin: 8
    }

})

export default connect(mapStateToProps)(AgendaScreen)