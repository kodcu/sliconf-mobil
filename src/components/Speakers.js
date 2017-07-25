/**
 * Created by anil on 22/07/2017.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Toast,Content,Card ,CardItem,List,ListItem,Thumbnail} from 'native-base';


var SpeakersList = [
    {name: 'Kasia Mrowca',workingAt:'Mrowca LTD'},
    {name: 'Lemi Orhan Ergin',workingAt:'iyzico'},
    {name: 'Mert Çalışkan',workingAt:'Payara Services Ltd.'},
    {name: 'Sebastian Daschner',workingAt:'Beratung'}
];

export default class Speakers extends Component {

    constructor(){
        super();
        this.state = {
            data: {
                    K: [],
                    L: [],
                    M: [],
                    S: [],
            },
            status:false,
            speaker:null,
            isFirst:true,
        };
    }
    lapsList() {
        for(let i=0;i<SpeakersList.length;i++){
            this.state.data[SpeakersList[i].name.charAt(0)].push(SpeakersList[i])
        }
    }
    toggleStatus(speaker){
        this.setState({
            speaker:speaker,
            status:!this.state.status,
            isFirst:false

        });
    }

    render() {
        if(this.state.isFirst) this.lapsList();
        if(this.state.status) return this.renderAbout();
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Main')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Speakers</Title>
                    </Body>
                    <Right>
                        <Button transparent >
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                        <List dataArray={Object.keys(this.state.data)}
                              renderRow={(alphabeticList) =>
                              <Content>
                                  <ListItem itemDivider>
                                      <Text>{alphabeticList}</Text>
                                  </ListItem>
                                  <List dataArray={this.state.data[alphabeticList]}
                                        renderRow={(speakers) =>
                                            <Content>
                                                    <ListItem button onPress={() => this.toggleStatus(speakers)}>
                                                        <Left>
                                                            <Thumbnail source={{uri: 'https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/user-man-circle-invert-512.png'}} />
                                                            <Body>
                                                            <Text style={{fontWeight:'bold'}}>{speakers.name}</Text>
                                                            <Text note>{speakers.workingAt}</Text>
                                                            </Body>
                                                        </Left>
                                                    </ListItem>

                                            </Content>
                                        }>
                                  </List>
                              </Content>
                              }>
                        </List>
                </Content>
            </Container>
        );

    }

    renderAbout(){
        const speaker=this.state.speaker;
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.toggleStatus()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Speaker Details</Title>
                    </Body>
                    <Right>
                        <Button transparent >
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
                <CardItem>
                    <Left>
                        <Thumbnail  large source={{uri: 'https://cdn1.iconfinder.com/data/icons/social-messaging-productivity-1/128/profile2-512.png'}} />
                        <Body>
                        <Text style={{fontWeight:'bold',fontSize:30}}>{speaker.name}</Text>
                        <Text note>{speaker.workingAt}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <View style={{padding:20}}>
                    <View style={{flexDirection:'row',padding:10}}>
                        <Text style={{fontWeight:'bold',fontSize:20}}>Konu : </Text>
                        <Text style={{fontSize:15,textAlignVertical:'center'}}>Delivering unicorns</Text>
                    </View>
                    <View style={{flexDirection:'row',padding:10}}>
                        <Text style={{fontWeight:'bold',fontSize:20}}>Seviye : </Text>
                        <Text style={{fontSize:15,textAlignVertical:'center'}}>Başlangıç</Text>
                    </View>
                    <View style={{flexDirection:'row',padding:10}}>
                        <Text style={{fontWeight:'bold',fontSize:20}}>Oda : </Text>
                        <Text style={{fontSize:15,textAlignVertical:'center'}}>Boğaziçi 2</Text>
                    </View>
                    <Text style={{fontWeight:'bold',fontSize:20,padding:10}}>Hakkında : </Text>
                    <Text style={{fontSize:15,padding:15,borderWidth:2}}>Kasia is a product magician, IT passionate, agile & lean enthusiast, PhD candidate & big conference junkie. Kasia has over 3 years experience in product development, (including requirements elicitation and expectations management etc) and over 4 years experience of project management in non-profit organizations.</Text>
                    <View style={{padding:20,alignSelf:'center'}}>
                    <Button primary onPress={() => this.props.navigation.navigate('LoginError')}>
                        <Icon name='ios-add'/>
                        <Text style={{fontSize:15,color:'#fff'}}>Katıl</Text>
                    </Button></View>
                </View>

            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {

    },
});
