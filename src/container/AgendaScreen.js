import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Footer,
    FooterTab,
    Form,
    Icon,
    Item,
    Left,
    List,
    Picker,
    Right,
    Thumbnail,
    Title,
} from 'native-base';
import AgendaCard from '../component/AgendaCard'
import ChosenCard from '../component/ChosenCard'
import Header from '../component/Header'
import BreakTimeCard from '../component/BreakTimeCard'
import If from '../component/If'
import {connect} from 'react-redux'
import {actionCreators} from '../reducks/module/drawer'
import {SEARCHRESULT, TALK} from '../router';
import FilterEvent from "../component/FilterEvent";
import Color from "../theme/Color";
import Font from "../theme/Font";
import {moderateScale} from "../theme/Scale";

let eventsDates = [];

const mapStateToProps = (state) => ({
    agenda: state.event.event.agenda,
});

const mock = {
    "05-05-2018": [
        {
            "key": "a102",
            "time": '9:30',
            "topic": "CI/CD of blockchain smart contracts using Java and eDuke",
            "topicDetail": "Blockchain is a hot topic especially the smart contract feature. Smart contracts allow to customize the rules applicable to digital assets deployed on a blockchain. On the Ethereum blockchain, Solidity is the usual programming language used to develop smart contract. With the use of eDuke, a Java framework allowing easy interactions with the Ethereum blockchain, we will show how to continuously deploy and test smart contracts and 'oracle' code using JUnit, Jenkins and Maven.",
            "level": 3,
            "tags": [
                "Java",
                "JVM",
                "Security",
            ],
            "room": "Big Saloon",
            "speaker": "Frédéric Hubin",
            "star": 4.5,
            "date": '11-11-2018',
        },
        {
            "key": "a102",
            "time": '9:40',
            "topic": "CI/CD of blockchain smart contracts using Java and eDuke",
            "topicDetail": "Blockchain is a hot topic especially the smart contract feature. Smart contracts allow to customize the rules applicable to digital assets deployed on a blockchain. On the Ethereum blockchain, Solidity is the usual programming language used to develop smart contract. With the use of eDuke, a Java framework allowing easy interactions with the Ethereum blockchain, we will show how to continuously deploy and test smart contracts and 'oracle' code using JUnit, Jenkins and Maven.",
            "level": 0,
            "room": "Big Saloon",
            "speaker": "Frédéric Hubin",
            "star": 4.5,
            "date": '11-11-2018',
        },
        {
            "key": "a102",
            "time": '9:50',
            "topic": "CI/CD of blockchain smart contracts using Java and eDuke",
            "topicDetail": "Blockchain is a hot topic especially the smart contract feature. Smart contracts allow to customize the rules applicable to digital assets deployed on a blockchain. On the Ethereum blockchain, Solidity is the usual programming language used to develop smart contract. With the use of eDuke, a Java framework allowing easy interactions with the Ethereum blockchain, we will show how to continuously deploy and test smart contracts and 'oracle' code using JUnit, Jenkins and Maven.",
            "level": 3,
            "room": "Bigboy Saloon",
            "speaker": "Frédéric Hubin",
            "star": 4.5,
            "date": '11-11-2018',
        },
        {
            "key": "a102",
            "time": '10:50',
            "topic": "CI/CD of blockchain smart contracts using Java and eDuke",
            "topicDetail": "Blockchain is a hot topic especially the smart contract feature. Smart contracts allow to customize the rules applicable to digital assets deployed on a blockchain. On the Ethereum blockchain, Solidity is the usual programming language used to develop smart contract. With the use of eDuke, a Java framework allowing easy interactions with the Ethereum blockchain, we will show how to continuously deploy and test smart contracts and 'oracle' code using JUnit, Jenkins and Maven.",
            "level": 1,
            "tags": [
                "Java",
                "JVM"
            ],
            "room": "Bigboy Saloon",
            "speaker": "Frédéric Hubin",
            "star": 4.5,
            "date": '11-11-2018',
        },
        {
            "key": "a102",
            "time": '9:50',
            "topic": "CI/CD of blockchain smart contracts using Java and eDuke",
            "topicDetail": "Blockchain is a hot topic especially the smart contract feature. Smart contracts allow to customize the rules applicable to digital assets deployed on a blockchain. On the Ethereum blockchain, Solidity is the usual programming language used to develop smart contract. With the use of eDuke, a Java framework allowing easy interactions with the Ethereum blockchain, we will show how to continuously deploy and test smart contracts and 'oracle' code using JUnit, Jenkins and Maven.",
            "level": 2,
            "tags": [
                "Java",
                "JVM"
            ],
            "room": "Bigboy Saloon",
            "speaker": "Frédéric Hubin22",
            "star": 4.5,
            "date": '12-11-2018',
        }
    ]
};

class AgendaScreen extends Component {

    state = {
        switchedDay: 'Day 1',
        isChoosenClicked: true,
        data: [],
        rooms: [],
        filter: false,
        choosen: []
    };

    /**
     * Filtreleme sayfasini kapatir ve sonuclarini gosterecegi sayfaya yonlendirir.
     * @param searchResults Filtreleme sonuclarının bulundugu array.
     */
    filterHide = (searchResults) => {
        this.setState({filter: false});
        this.props.navigation.navigate(SEARCHRESULT, searchResults)
    };

    /**
     * Filtre popupini kapatir.
     */
    closeFilter = () => {
        this.setState({filter: false})
    };

    /**
     * Aynı anda hareket etmesi gereken scrollviewlerin pozisyonunu esitler.
     * @param event surukleme haraketi
     */
    handleScroll = (event) => {
        this.roomScroll.scrollTo({x: event.nativeEvent.contentOffset.x, animated: true});
    };

    /**
     * Katilmak istedigin eventleri sectiklerim listesinden siler.
     * @param arg Konusmanın modeli
     */
    deleteItemFromChosenEvents = (arg) => {
        let array = choosen;
        let index = array.indexOf(arg);
        array.splice(index, 1);
        this.setState({choosen: choosen})
    };

    /**
     * Ajandaki konusmalarin saatlerine gore saat dizisine cevirir.
     * @param events gelen konusmalar
     * @returns {Array} saatlere gore konusmaların oldugu dizi
     */
    eventsList(events) {
        let changedEventsList = [];
        let myMap = new Map();

        events.forEach(function (element) {
            let time = element.time;
            myMap.get(time) ? array = myMap.get(time) : array = [];
            array.push(element);
            myMap.set(time, array)
        });

        myMap.forEach(function (value, key) {
            changedEventsList = {...changedEventsList, [key]: value}
        });

        return changedEventsList
    }

    /**
     * Konuşmaların verilerinden oda listesi olusturur.
     * @param events konusmalar
     * @returns {Array} oda listesi
     */
    roomsList(events) {
        let roomsList = [];
        let tempRoom = events.filter((thing, index, self) => self.findIndex((t) => {
            return t.room === thing.room
        }) === index);
        tempRoom.forEach((element) => roomsList.push(element.room));
        roomsList.sort();
        return roomsList
    }

    /**
     * Uygulama acilmadan once gelen veriden tarihlerin ayristilmasi ve ilk gunun etkinliklerinin
     * gosterilmesi
     */
    componentWillMount() {
        const {dispatch, navigation} = this.props;
        dispatch(actionCreators.changedDrawer(navigation.state.routeName));

        const data = this.props.agenda;//mock;

        if (data !== undefined && data !== null && !data.isEmpty) {
            Object.keys(data).forEach((date) => eventsDates.includes(date) ? null : eventsDates.push(date));
            this.setState({
                rooms: this.roomsList(data[Object.keys(data)[0]]),
                data: this.eventsList(data[Object.keys(data)[0]])
            })
        }

    }

    /**
     * Tarih degiştirildiginde verilerin degistirilmesini saglar.
     * @param date
     */
    changeDate(date) {
        const data =  this.props.agenda; //mock;
        this.setState({
            switchedDay: date,
            rooms: this.roomsList(data[date]),
            data: this.eventsList(data[date])
        })
    }

    /**
     * Sectiklerim listesine konusmayi ekler.
     * @param arg konusma detaylari
     */
    addItemToChosenEvents(arg) {
        choosen.push(arg);
    }

    /**
     *Konusmacilari bulundugu odaya gore ekranda gosterir
     * @param myroom oda verisi
     * @param arg konusma listesi
     * @returns {XML} ajanda karti
     */
    isThereEventInRoom(myroom, arg) {
        let isExist = false;
        let i, j;
        for (i = 0; i < arg.length; i++) {
            if (myroom === arg[i].room) {
                for (j = 0; j < choosen.length; j++) {
                    if (arg[i] === choosen[j]) {
                        return (
                            <AgendaCard item={arg[i]}
                                        isEmpty={false}
                                        onPressAddButton={this.addItemToChosenEvents}
                                        isClicked={true}
                                        key={arg[i].key}
                                        choosedEvents={choosen}
                                        onPress={() => this.props.navigate(TALK, arg)}
                                        onPressDeleteButton={this.deleteItemFromChosenEvents}/>)
                    }
                }
                return (<AgendaCard item={arg[i]}
                                    isEmpty={false}
                                    onPressAddButton={this.addItemToChosenEvents}
                                    isClicked={false}
                                    key={arg[i].key}
                                    choosedEvents={choosen}
                                    onPress={() => this.props.navigation.navigate(TALK, arg)}
                                    onPressDeleteButton={this.deleteItemFromChosenEvents}/>)
            }
        }
        if (!isExist)
            return (<AgendaCard isEmpty={true}/>)
    }

    /**
     * Sectiklerim butonuna basildiginda sayfanin degişmesini saglar.
     * @private
     */
    _hide() {
        this.setState({isChoosenClicked: true})
    }


    render() {
        const {isChoosenClicked, filter} = this.state;
        talksList = this.state.data;
        rooms = this.state.rooms;
        choosen = this.state.choosen;
        const agendaData = this.props.agenda;//mock
        return (
            <Container style={{backgroundColor: '#fff'}}>
                <If con={isChoosenClicked}>
                    <If.Then>
                        <FilterEvent visible={filter} onPress={(e) => this.filterHide(e)}
                                     onClose={() => this.closeFilter}
                                     events={agendaData}/>
                        <Header leftImage='chevron-left' rightImage='bars'
                                onPressLeft={() => this.props.navigation.goBack(null)}
                                onPressRight={() => {
                                    this.props.navigation.navigate('DrawerOpen')
                                }}>
                            <Picker style={{width: 140}}
                                    placeholder="Day 1"
                                    selectedValue={this.state.switchedDay}
                                    onValueChange={(itemValue, itemIndex) => this.changeDate(itemValue)}>
                                {eventsDates.map((item, i) =>
                                    <Picker.Item  key={i + 1} label={"Day " + (i + 1)} value={item}/>
                                )}
                            </Picker>
                        </Header>
                        <View style={styles.roomsField}>
                            <TouchableOpacity onPress={() => this.setState({filter: true})}>
                                <Icon name='ios-funnel-outline' style={styles.filterIcon}/>
                            </TouchableOpacity>
                            <View style={{marginLeft: 30, margin: 8}}>
                                <ScrollView horizontal ref={(el) => {
                                    this.roomScroll = el;
                                }} showsHorizontalScrollIndicator={false}>
                                    {rooms.map((oda, i) =>
                                        <Text key={i} style={styles.roomText}>{oda}</Text>
                                    )}
                                </ScrollView>
                            </View>
                        </View>
                    </If.Then>
                    <If.Else>
                        <Header leftImage='chevron-left' onPressLeft={() => this._hide()}>
                            <Header.Title title="Schedule"/>
                        </Header>
                    </If.Else>
                </If>
                <Content>
                    <If con={isChoosenClicked}>

                        <If.Then>

                            <Content>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{margin: 0,marginTop:5, padding: 5}}>
                                        {Object.keys(talksList).map((list, i) => (
                                            <View style={{borderRightWidth:0,}}  key={i}>
                                                {talksList[list][0].level === 0 ?
                                                    <Text style={styles.cardTimeLanch}>{list}</Text> :
                                                    <Text style={styles.cardsTime}>{list}</Text>}
                                            </View>
                                        ))}
                                    </View>

                                    <ScrollView horizontal onScroll={this.handleScroll} showsHorizontalScrollIndicator={false}>
                                        <ScrollView>
                                            {Object.keys(talksList).map((time, i) => (
                                                <View key={i}>
                                                    <If con={talksList[time][0].level !== 0}>
                                                        <If.Then>
                                                            <View style={styles.cardsField}>

                                                                {rooms.map((myroom, i) => (
                                                                    <View key={i}>{this.isThereEventInRoom(myroom, talksList[time])}</View>
                                                                ))}
                                                            </View>
                                                        </If.Then>
                                                        <If.Else>
                                                            <BreakTimeCard item={talksList[time][0]}/>
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
                                    <ChosenCard key={i} item={choosed}
                                                onPressDeleteButton={this.deleteItemFromChosenEvents}
                                                visibleButton={true}/>
                                )}
                            </View></If.Else>
                    </If>
                </Content>


                <Footer>
                    <FooterTab style={{backgroundColor: '#fff'}}>
                        <Button vertical onPress={() => {
                            this.setState({isChoosenClicked: true})
                        }}>
                            <Text style={{...Font.semiBold, fontSize:moderateScale(12),color: this.state.isChoosenClicked ? Color.green : Color.darkGray}}>All</Text>
                        </Button>
                        <Button vertical onPress={() => {
                            this.setState({isChoosenClicked: false})
                        }}>
                            <Text style={{...Font.semiBold, fontSize:moderateScale(12),color: this.state.isChoosenClicked ? Color.darkGray : Color.green}}>Chosen</Text>
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
        ...Font.semiBold,
        fontSize:moderateScale(11),
        width: 220,
        margin: 5,
        marginLeft: 20
    },
    cardsField: {
        flexDirection: 'row',
        marginLeft: 30
    },
    cardsTime: {
        ...Font.semiBold,
        fontSize:moderateScale(11),
        margin: 8,
        textAlignVertical: 'center',
        textAlign: 'center',
        height: 112
    },
    cardTimeLanch: {
        ...Font.semiBold,
        fontSize:moderateScale(11),
        margin: 8,
        textAlign: 'center',
        height: 32
    },
    filterIcon: {
        marginLeft: 15,
        marginRight: 15,
        margin: 8
    }

});

export default connect(mapStateToProps)(AgendaScreen)