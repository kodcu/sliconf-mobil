import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,Image,TouchableOpacity ,FlatList} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Content,CardItem,Thumbnail,Card,List,Item,Footer,FooterTab,Picker, Form, Item as FormItem} from 'native-base';
import AgendaCard from '../component/AgendaCard'
import ChosenCard from '../component/ChosenCard'
import BreakTimeCard from '../component/BreakTimeCard'
import renderIf from '../config/renderIf'
import If from '../component/If'

let DATAS = {
    "13:00":[
        {name: 'Kasia Mrowca', place: 'Oda 1', level:1,topic:'React Nedir ?',time:'13:00',posters: require('../../images/logo.png'), date:'12-05-2018'},
        {name: 'Speaker 1', place: 'Oda 0',level:2, time:'13:00',topic:'Native Nedir ?',posters: require('../../images/logo.png'), date:'12-05-2018'},
        {name: 'Speaker 2', place: 'Oda 2',level:2, time:'13:00',topic:'Native Nedir ?',posters: require('../../images/logo.png'), date:'12-05-2018'}
    ],
    "13:45":[
        {name: '', place: '', level:1,topic:'Coffee Break',time:'13:45',posters: '', date:'12-05-2018'},
    ],
    "14:00":[
        {name: 'Speaker 3', place: 'Oda 0', level:1,topic:'React Nedir ?',time:'14:00',posters: require('../../images/logo.png'), date:'13-05-2018'},
        {name: 'Speaker 4', place: 'Oda 3',level:2, time:'14:00',topic:'Native Nedir ?',posters: require('../../images/logo.png'), date:'13-05-2018'},
        {name: 'Speaker 5', place: 'Oda 2',level:3, time:'14:00',topic:'Native Nedir ?',posters: require('../../images/logo.png'), date:'13-05-2018'}
    ],
    "15:00":[
        {name: 'Speaker 6', place: 'Oda 1', level:3,topic:'React Nedir ?',time:'15:00',posters: require('../../images/logo.png'), date:'14-05-2018'},
        {name: 'Speaker 7', place: 'Oda 0',level:3, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png'), date:'14-05-2018'},
        {name: 'Speaker 8', place: 'Oda 2',level:1, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png'), date:'14-05-2018'},
        {name: 'Speaker 9', place: 'Oda 3',level:1, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png'), date:'12-05-2018'}
    ],
    "16:00":[
        {name: 'Speaker 10', place: 'Oda 1', level:3,topic:'React Nedir ?',time:'15:00',posters: require('../../images/logo.png'), date:'12-05-2018'},
        {name: 'Speaker 11', place: 'Oda 0',level:3, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png'), date:'12-05-2018'},
        {name: 'Speaker 12', place: 'Oda 2',level:1, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png'), date:'12-05-2018'},
        {name: 'Speaker 13', place: 'Oda 3',level:1, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png'), date:'12-05-2018'}
    ],
    "17:00":[
        {name: 'Speaker 14', place: 'Oda 1', level:3,topic:'React Nedir ?',time:'15:00',posters: require('../../images/logo.png'), date:'12-05-2018'},
        {name: 'Speaker 15', place: 'Oda 0',level:3, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png'), date:'12-05-2018'},
        {name: 'Speaker 16', place: 'Oda 2',level:1, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png'), date:'12-05-2018'},
        {name: 'Speaker 17', place: 'Oda 3',level:1, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png'), date:'12-05-2018'}
    ]
}

let choosen =[];
let rooms =["Oda 0","Oda 1","Oda 2","Oda 3"];

export default class AgendaScreen extends Component {
    //TODO: Herbir card farklı telefon boyutlarına göre dinamikleştirilecek.
    //TODO: Odalar alttaki cardlarla beraber hareket edecek.
    //TODO: Filtreleme için pop-up oluşturulacak.
    //TODO: Başlıktan seçilen günlere göre ajanda verisi değişecek.

    static navigationOptions = {
        header: null
    };

    state={
        switchedDay:'Day 1',
        isClicked:true
    }

    deleteItemFromChosenEvents(arg){
        let array = choosen;
        let index = array.indexOf(arg)
        array.splice(index, 1);

    }

    addItemToChosenEvents(arg){

        choosen.push(arg);
        console.log(choosen);

    }

    getLevelColor(level){
        switch(level){
            case 1:
                return '#29B673';
                break;
            case 2:
                return '#FBB041';
                break;
            case 3:
                return '#EE5E5F';
                break;
            default :
                return '#ffffff';
        }
    }
    isThereEventInRoom(myroom,arg){
        let isExist=false;
        let i,j;
        for(i=0;i<arg.length;i++){
            if(myroom==arg[i].place){
                isExist=true;
                for(j=0;j<choosen.length;j++){
                    if(arg[i]===choosen[j]){
                        return(
                            <AgendaCard item={arg[i]}
                                        isEmpty={false}
                                        onPressAddButton={this.addItemToChosenEvents}
                                        isClicked={true}
                                        choosedEvents={choosen}
                                        onPressDeleteButton={this.deleteItemFromChosenEvents}/>)
                    }
                }
                return(<AgendaCard item={arg[i]}
                                   isEmpty={false}
                                   onPressAddButton={this.addItemToChosenEvents}
                                   isClicked={false}
                                   choosedEvents={choosen}
                                   onPressDeleteButton={this.deleteItemFromChosenEvents}/>)
            }else{
                isExist=false;
            }
        }
        if(!isExist)
            return(<AgendaCard isEmpty={true} />)
    }

    _hide() {
        this.setState({isClicked: true})
    }

    render() {
        const {isClicked} = this.state
        return (
            <Container style={{backgroundColor:'#fff'}}>
                <Content >
                    {renderIf(isClicked)(
                        <View>
                            <Header style={{backgroundColor:'#fff'}} >
                                <Left>
                                    <Button transparent>
                                        <Icon name='ios-arrow-back' style={{color:'#000'}} onPress={() => this._hide()} />
                                    </Button>
                                </Left>
                                <Body >
                                <Picker style={{width:100}}
                                        selectedValue={this.state.switchedDay}
                                        onValueChange={(itemValue, itemIndex) => this.setState({switchedDay:itemValue})}>
                                    <Picker.Item label="Day 1" value="11052018" />
                                    <Picker.Item label="Day 2" value="12052018" />
                                    <Picker.Item label="Day 3" value="13052018" />
                                    <Picker.Item label="Day 4" value="14052018" />
                                </Picker>
                                </Body>
                            </Header>
                            <View style={styles.roomsField}>
                                <Icon name='ios-funnel-outline' style={{marginLeft:30,margin:8}}/>
                                {rooms.map((oda,i) =>
                                    <Text key={i} style={styles.roomText}>{oda}</Text>
                                )}
                            </View>
                            <ScrollView horizontal >
                                <ScrollView >
                                    {Object.keys(DATAS).map( (time,i) => (
                                        <View key={i}>
                                            <If con={DATAS[time][0].name!=''}>
                                                <If.Then>
                                                    <View style={styles.cardsField}>
                                                        <Text style={styles.cardsTime}>{time}</Text>
                                                        {rooms.map((myroom,i) => (
                                                            <View key={i}>{this.isThereEventInRoom(myroom,DATAS[time])}</View>
                                                        ))}
                                                    </View>
                                                </If.Then>
                                                <If.Else>
                                                    <BreakTimeCard item ={DATAS[time][0]} />
                                                </If.Else>
                                            </If>
                                        </View>

                                    ))}

                                </ScrollView>
                            </ScrollView>
                        </View>
                    )}
                    {renderIf(!isClicked)(
                        <View>
                            <Header style={{backgroundColor:'#fff'}} >
                                <Left>
                                    <Button transparent>
                                        <Icon name='ios-arrow-back' style={{color:'#000'}} onPress={() => this._hide()}  />
                                    </Button>
                                </Left>
                                <Body >
                                <Title style={{color:'#000'}}>Seçtiklerim</Title>
                                </Body>
                            </Header>
                            {choosen.map((choosed,i) =>
                                <ChosenCard key={i} item={choosed} day={this.state.switchedDay}/>
                            )}
                        </View>
                    )}

                </Content>
                <Footer >
                    <FooterTab style={{backgroundColor:'#fff'}}>
                        <Button vertical onPress={() => {this.setState({isClicked:true})}}>
                            <Text>Hepsi</Text>
                        </Button>
                        <Button vertical onPress={() => {this.setState({isClicked:false})}}>
                            <Text>Seçimlerim</Text>
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
    roomsField:{
        padding:5,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    roomText:{
        width:200,
        margin:5,
        marginLeft:20
    },
    cardsField:{
        flexDirection:'row',
        marginLeft:30
    },
    cardsTime:{
        margin:8,
        textAlignVertical:'center',
        textAlign:'center',
        height:100
    }

})