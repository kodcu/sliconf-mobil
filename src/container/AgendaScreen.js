import React, {Component} from 'react';
import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Content, Footer, FooterTab, Icon, Picker, Thumbnail} from 'native-base';
import AgendaCard from '../component/AgendaCard'
import ChosenCard from '../component/ChosenCard'
import Header from '../component/Header'
import BreakTimeCard from '../component/BreakTimeCard'
import If from '../component/If'
import {connect} from 'react-redux'
import {actionCreators} from '../reducks/module/drawer'
import {LOGIN, SEARCHRESULT, TALK} from '../router';
import FilterEvent from "../component/FilterEvent";
import Color from "../theme/Color";
import Font from "../theme/Font";
import {height, moderateScale} from "../theme/Scale";
import moment from "moment";
import { actionCreators as scheduleActionCreator } from '../reducks/module/schedule';

const mapStateToProps = (state) => ({
    agenda: state.event.event.agenda,
    rooms: state.event.event.rooms,
    speakers: state.event.event.speakers,
    // user: state.auth.user,
    user: state.auth.login ? state.auth.user : state.authDevice.user,
    // login: state.auth.login,
    login: state.auth.login ? state.auth.login : state.authDevice.login,
    event: state.event.event,
    schedule: state.schedule.schedule
});

let eventsData = [];

class AgendaScreen extends Component {

    state = {
        switchedDay: 'Day 1',
        isChosenClicked: true,
        data: [],
        rooms: [],
        filter: false,
        chosen: [],
        agendaData: []
    };
    /**
     * Filtreleme sayfasini kapatir ve sonuclarini gosterecegi sayfaya yonlendirir.
     * @param searchResults Filtreleme sonuclarının bulundugu array.
     */
    filterHide = (searchResults) => {
        this.setState({filter: false});
        this.props.navigation.navigate(SEARCHRESULT, {items: searchResults, login: this.props.login})
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
        this.props.dispatch(
            scheduleActionCreator.deleteSchedule(
                arg.choosenId,
                this.props.user.id, 
                this.props.event.id, 
                arg.agendaElement.id
            )
        );
        let array = this.state.chosen;
        let index = array.indexOf(arg);
        array.splice(index, 1);
        this.setState({chosen: array});
    };

    /**
     * Sectiklerim listesine konusmayi ekler.
     * @param arg konusma detaylari
     */
    addItemToChosenEvents = (arg) => {
        this.props.dispatch(
            scheduleActionCreator.postSchedule(
                this.props.user.id,
                this.props.event.id,
                arg.id
            )
        );
        // this.setState({
        //     chosen:[...this.state.chosen, arg]
        // });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.schedule !== this.props.schedule) {
            //var sessions = [];
            if (Boolean(nextProps.schedule)  && nextProps.schedule.length > 0) {
                // nextProps.schedule.map((session, i) => {
                //     sessions[i] = {...session.agendaElement, requestId: session.id}
                // });

                let schedule = nextProps.schedule;

                if (schedule) {
                    schedule = schedule.sort((a,b)=>{
                        if(a.agendaElement.date < b.agendaElement.date ) {
                            return -1;
                        } else if(a.agendaElement.date > b.agendaElement.date ) {
                            return 1;
                        }
                        return 0;
                    });
                } else {
                    schedule = [];
                }

                this.setState({
                    //chosen: sessions
                    chosen: schedule
                });
            }
        }
    }
    
    convertToDateArray(agenda) {
        let newAgendaData = [];
        let dateMap = new Map();

        agenda.forEach(function (element) {
            let date = moment(element.date).format("MM-DD-YYYY")
            let array;
            dateMap.get(date) ? array = dateMap.get(date) : array = [];
            array.push(element)
            dateMap.set(date, array)
        });

        dateMap.forEach(function (value, key) {
            newAgendaData = {...newAgendaData, [key]: value}
        });

        return newAgendaData
    }

    /**
     * Ajandaki konusmalarin saatlerine gore saat dizisine cevirir.
     * @param events gelen konusmalar
     * @returns {Array} saatlere gore konusmaların oldugu dizi
     */
    eventsList(events) {
        let changedEventsList = [];
        let myMap = new Map();

        events.forEach(function (element) {
            let time = moment(element.date).format("HH:mm");
            let array;
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
            return t.room === thing.room && thing.room.trim()
        }) === index);
        tempRoom.forEach((element) => roomsList.push(element.room));

        const rooms = this.props.event.rooms;
        let sortedRoomList = [];

        // Odalari label a gore siraliyor
        rooms.forEach((room) => {
            roomsList.forEach((roomId) => {
                if (roomId === room.id) {
                    sortedRoomList.push(roomId);
                }
            });
        });

        return sortedRoomList;
    }

    /**
     * Uygulama acilmadan once gelen veriden tarihlerin ayristilmasi ve ilk gunun etkinliklerinin
     * gosterilmesi
     */
    componentWillMount() {
        const {dispatch, navigation} = this.props;
        dispatch(actionCreators.changedDrawer(navigation.state.routeName));
        dispatch(scheduleActionCreator.getSchedule(this.props.user.id, this.props.event.id));

        let agenda = this.convertToDateArray(this.props.agenda);

        const data = agenda;

        if (data !== undefined && data !== null && !data.isEmpty) {
            Object.keys(data).forEach((date) => eventsData.includes(date) ? null : eventsData.push(date));
            this.setState({
                agendaData: agenda,
                rooms: this.roomsList(data[Object.keys(data)[0]]),
                data: this.eventsList(data[Object.keys(data)[0]]),
                switchedDay: moment(Object.keys(data)[0], "MM-DD-YYYY").format("dddd")
            })
        }
    }

    /**
     * Tarih degiştirildiginde verilerin degistirilmesini saglar.
     * @param date
     */
    changeDate(date) {
        const data = this.state.agendaData;
        this.setState({
            switchedDay: date,
            rooms: this.roomsList(data[date]),
            data: this.eventsList(data[date])
        })
    }



    /**
     *Konusmacilari bulundugu odaya gore ekranda gosterir
     * @param myroom oda verisi
     * @param talkListByTime konusma listesi
     * @returns {XML} ajanda karti
     */
    isThereEventInRoom(myroom, talkListByTime) {
        const chosen = this.state.chosen
        for (let i = 0; i < talkListByTime.length; i++) {
            if (myroom === talkListByTime[i].room)

                return this.getAgendaCard(talkListByTime, i, this.isChoosen(chosen, talkListByTime[i]))
        }
        return (<AgendaCard isEmpty={true}/>)
    }

    /**
     *
     * @param chosen kullanicinin schedule listesi
     * @param talkListByTime karsilastirilacak konusma
     * @returns {boolean} eger id ler eslesiyorsa true doner
     */
    isChoosen(chosen, talkListByTime) {
        let chosed = false;
        chosen.forEach((element) =>{
            if (element.agendaElement.id == talkListByTime.id) {
                chosed = true;
            }
        });
        return chosed;
    }

    /**
     * Ajanda karti olusturur ve cevirir
     * @param talkListByTime -> konusma verisi
     * @param index -> index
     * @param isClicked -> secili olma durumu
     * @returns {*}
     */
    getAgendaCard(talkListByTime, index, isClicked) {
        return <AgendaCard item={talkListByTime[index]}
                           speaker={this.getSpeaker(talkListByTime[index].speaker)}
                           isEmpty={false}
                           onPressAddButton={this.addItemToChosenEvents}
                           isClicked={isClicked}
                           key={talkListByTime[index].key}
                           onPress={() => this.props.navigation.navigate(TALK, talkListByTime[index])}
                           onPressDeleteButton={this.deleteItemFromChosenEvents}/>;
    }

    /**
     * Sectiklerim butonuna basildiginda sayfanin degişmesini saglar.
     * @private
     */
    _hide() {
        this.setState({isChosenClicked: true})
    }

    /**
     * gelen room id ile room bilgilerini cevirir
     * @param roomId
     */
    getRoomName(roomId) {
        const roomsTags = this.props.rooms;
        const room = roomsTags.find(room => room.id === roomId)
        return room.label;
    }

    /**
     * gelen speaker id ile speaker verilerini cevirir
     * @param speakerId
     * @returns {ShallowWrapper|ReactWrapper|*|ConfigT|number|T}
     */
    getSpeaker(speakerId) {
        const speakerData = this.props.speakers;
        return speakerData.find(speaker => speaker.id === speakerId)
    }

    render() {
        const { isChosenClicked, filter } = this.state;
        const { schedule } = this.props;
        const agendaData = this.state.agendaData;

        talksList = this.state.data;
        rooms = this.state.rooms;
        chosen = this.state.chosen;

        return (
            <View style={styles.container}>
                <If con={isChosenClicked}>
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
                                    placeholder={this.state.switchedDay}
                                    selectedValue={this.state.switchedDay}
                                    onValueChange={(itemValue, itemIndex) => this.changeDate(itemValue)}>
                                {eventsData.map((item, i) =>
                                    <Picker.Item key={i + 1} label={moment(item, "MM-DD-YYYY").format("dddd")}
                                                 value={item}/>
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
                                    {rooms.map((room, i) =>
                                        <Text key={i} style={styles.roomText}>{this.getRoomName(room)}</Text>)}
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
                    <If con={isChosenClicked}>
                        <If.Then>
                            <View>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{margin: 0, marginTop: 5, padding: 5}}>
                                        {Object.keys(talksList).map((date, i) => (
                                            <View style={{borderRightWidth: 0,}} key={i}>
                                                {talksList[date][0].level === -1 ?
                                                    <Text style={styles.cardTimeLaunch}>{date}</Text> :
                                                    <Text style={styles.cardsTime}>{date}</Text>}
                                            </View>
                                        ))}
                                    </View>

                                    <ScrollView
                                                onScroll={this.handleScroll}
                                                showsHorizontalScrollIndicator={false}
                                                directionalLockEnabled={false}
                                                horizontal={true}>
                                        <View style={{flexDirection:'column'}}>
                                            {Object.keys(talksList).map((time, i) => (
                                                <View key={i}>
                                                    <If con={talksList[time][0].level !== -1}>
                                                        <If.Then>
                                                            <View style={styles.cardsField}>

                                                                {rooms.map((myroom, i) => (
                                                                    <View
                                                                        key={i}>{this.isThereEventInRoom(myroom, talksList[time])}</View>
                                                                ))}
                                                            </View>
                                                        </If.Then>
                                                        <If.Else>
                                                            <BreakTimeCard item={talksList[time][0]}/>
                                                        </If.Else>
                                                    </If>
                                                </View>

                                            ))}
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </If.Then>
                        <If.Else>
                            <View>
                                {   
                                    chosen.map((choosed, i) =>
                                    <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate(TALK, choosed)}>
                                        <ChosenCard key={i} item={choosed}
                                                    onPressDeleteButton={this.deleteItemFromChosenEvents}
                                                    visibleButton={true}/>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </If.Else>
                    </If>
                </Content>
                <Footer>
                    <FooterTab style={{backgroundColor: Color.white}}>
                        <Button vertical onPress={() => {
                            this.setState({isChosenClicked: true})
                        }}>
                            <Text style={{
                                ...Font.semiBold,
                                fontSize: moderateScale(12),
                                color: this.state.isChosenClicked ? Color.green : Color.darkGray
                            }}>All</Text>
                        </Button>
                        <Button vertical onPress={() => {
                            this.setState({isChosenClicked: false})
                        }}>
                            <Text style={{
                                ...Font.semiBold,
                                fontSize: moderateScale(12),
                                color: this.state.isChosenClicked ? Color.darkGray : Color.green
                            }}>Chosen</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    roomsField: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    roomText: {
        ...Font.semiBold,
        fontSize: moderateScale(11),
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
        fontSize: moderateScale(11),
        margin: 8,
        textAlignVertical: 'center',
        textAlign: 'center',
        height: 112
    },
    cardTimeLaunch: {
        ...Font.semiBold,
        fontSize: moderateScale(11),
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