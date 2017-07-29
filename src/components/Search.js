/**
 * Created by anil on 23/07/2017.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,ListView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Toast,Content,Card ,CardItem,ListItem,Form,Item,Input,Radio,Picker,CheckBox,Thumbnail,List} from 'native-base';
import { NavigationActions} from "react-navigation";
export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventName:'',
            showResults: false,
            dataSource:null,
            radio1:true,
            radio2:false,
            radio3:false,
            resultData:null
        }
    }

    changeState(radio){
        switch (radio){
            case 1:
                this.setState({
                    radio1:!this.state.radio1,
                });
                break;
            case 2:
                this.setState({
                    radio2:!this.state.radio2,
                });
                break;
            case 3:
                this.setState({
                    radio3:!this.state.radio3,
                });
                break;
        }

    }

    getEventList() {
        return fetch('https://jsonblob.com/api/jsonBlob/2b05daea-7230-11e7-9e0d-6f19b7e92a3a')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.events.agenda,
                }, function () {
                    console.log(responseJson);
                    this.searchData();
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    searchData(){
        var myArray =[];

        if(this.state.radio1){
            if(this.state.eventName == ''){
                this.state.dataSource.map((data) => {
                    data.list.map((data2) => {
                        if(data2.level == 'baslangic'){
                            myArray.push(data2);
                            console.log(data2);
                        }
                    })
                })
            }else {
                this.state.dataSource.map((data) => {
                    data.list.map((data2) => {
                        if(data2.level == 'baslangic' && data2.topic.toLowerCase().contains(this.state.eventName.toLowerCase())){
                            myArray.push(data2);
                        }
                    })
                })
            }

        }
        if(this.state.radio2){
            if(this.state.eventName == ''){
                this.state.dataSource.map((data) => {
                    data.list.map((data2) => {
                        if(data2.level == 'orta'){
                            myArray.push(data2);
                        }
                    })
                })
            }else {
                this.state.dataSource.map((data) => {
                    data.list.map((data2) => {
                        if(data2.level == 'orta' && data2.topic.toLowerCase().contains(this.state.eventName.toLowerCase())){
                            myArray.push(data2);
                        }
                    })
                })
            }
        }

        if(this.state.radio3){
            if(this.state.eventName == ''){
                this.state.dataSource.map((data) => {
                    data.list.map((data2) => {
                        if(data2.level == 'ileri'){
                            myArray.push(data2);
                        }
                    })
                })
            }else {
                this.state.dataSource.map((data) => {
                    data.list.map((data2) => {
                        if(data2.level == 'ileri' && data2.topic.toLowerCase().contains(this.state.eventName.toLowerCase())){
                            myArray.push(data2);
                        }
                    })
                })
            }
        }

        if(myArray.length !=0){
            this.setState({
                resultData:myArray,
                showResults:true
            })
        }else
            alert('Sonuç Bulunamadı');
    }

    render() {
        if(this.state.showResults) return this.renderResults();
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.dispatch(NavigationActions.back())} >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Aramalar</Title>
                    </Body>
                    <Right>
                        <Button transparent >
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container}>
                    <View style={{flex: .8,padding:20}}>
                        <TextInput
                            placeholder="Search Events"
                            returnKeyType="search"
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                            onChangeText={(text) => this.setState({eventName:text})}/>
                        <ListItem button onPress={() => this.changeState(1)}>
                            <Left>
                                <Text>Başlangıç</Text>
                            </Left>
                            <Right>
                                <Radio selected={this.state.radio1} />
                            </Right>
                        </ListItem>
                        <ListItem button onPress={() => this.changeState(2)}>
                            <Text>Orta Seviye</Text>
                            <Right>
                                <Radio selected={this.state.radio2}/>
                            </Right>
                        </ListItem>
                        <ListItem button onPress={() => this.changeState(3)}>
                            <Text>İleri Seviye</Text>
                            <Right>
                                <Radio selected={this.state.radio3} />
                            </Right>
                        </ListItem>
                        <Text style={styles.buttonText} onPress={() =>this.getEventList()}>ARA</Text>

                    </View>
                </View>

            </Container>
        );
    }

    renderResults(){
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.setState({showResults:false})}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Arama Sonuçları</Title>
                    </Body>
                </Header>
                <Card>
                    <List dataArray={this.state.resultData}
                          renderRow={(speakers) =>
                              <Content >
                                  <View style={{borderWidth:.2}}/>
                                  <CardItem>
                                      <Left>
                                          <Thumbnail source={require('../../images/microphone.png')} />
                                          <Body>
                                          <Text>{speakers.speaker}</Text>
                                          <Text note>{speakers.room}</Text>
                                          </Body>
                                      </Left>
                                  </CardItem>
                                  <CardItem cardBody style={{padding:10}}>
                                      <View style={{height: 200, width: null, flex: 1,backgroundColor:'#3F51B5',justifyContent: "center",alignItems: "center"}}>
                                          <Text style={{fontWeight:'bold',fontSize:20,textAlign:'center',color:'#ffffff'}}>{speakers.topic}</Text>
                                      </View>
                                  </CardItem>
                                  <CardItem>
                                      <Left>
                                          <Button transparent >
                                              <Icon name="time" style={{color:'#000000'}}/>
                                              <Text style={{padding:10,color:'#000000'}}>{speakers.time}</Text>
                                          </Button>
                                      </Left>
                                      <Body>
                                      <Button transparent>
                                          <Icon active name="md-trending-up" />
                                          <Text style={{padding:10}}>{speakers.level}</Text>
                                      </Button>
                                      </Body>
                                      <Right >
                                          <Button transparent onPress={() => this.props.navigation.navigate('Comments')}>
                                              <Icon active name="ios-add-outline" />
                                              <Text style={{padding:10}}>KATIL</Text>
                                          </Button>
                                      </Right>
                                  </CardItem>

                              </Content>
                          }>
                    </List>
                </Card>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    buttonText:{
        width:150,
        margin:10,
        padding:10,
        textAlign:'center',
        alignSelf:'center',
        color:'#000000',
        fontWeight:'700',
        borderWidth:1,
        borderRadius: 30
    },
    input : {
        marginBottom: 10,
        color: '#000000',
        padding:20,
        marginTop:50,

    },
});
