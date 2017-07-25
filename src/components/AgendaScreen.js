/**
 * Created by Muslum on 25.07.2017.
 */
import React from 'react';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Content,
    Card,
    CardItem,
    Separator,
    ScrollableTab,
    Thumbnail,
    ListItem,
    List,
    Text,
    Item,
    Tabs,
    Tab,
    Footer,
    FooterTab,
    Spinner,
    TabHeading
} from 'native-base';
import { View, StyleSheet } from 'react-native';

class AgendaScreen extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
        data:null,

    }

    static navigationOptions = {
        header: null
    };

    componentDidMount(){
        this.getEventList("ss");
    }



    getEventList(id) {
        return fetch('https://jsonblob.com/api/jsonBlob/5094d5b9-7121-11e7-9e0d-89f4fb1c5f60')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson.events,
                }, function () {
                    console.log(responseJson);
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    fonksiyon(data){
        return(
            <Content >
                <Tabs renderTabBar={() => <ScrollableTab />}>
                    {this.state.data.agenda.map((item, i) => (
                        <Tab heading={ <TabHeading><Text>{item.date}</Text></TabHeading>}>
                            {item.list.map((list,i) => (
                                <Content  >
                                    <Item onPress={() => this.props.navigation.navigate('Comments')}>
                                        <View style={{borderWidth:.2}}/>
                                        <CardItem>
                                            <Left>
                                                <Body>
                                                <Text>{list.speaker}</Text>
                                                <Text note>{list.room}</Text>
                                                </Body>
                                            </Left>
                                        </CardItem>
                                        <CardItem cardBody style={{padding:10}}>
                                            <Text>{list.topic}</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Left>
                                                <Button transparent >
                                                    <Icon name="time" style={{color:'#000000'}}/>
                                                    <Text style={{padding:10,color:'#000000'}}>{list.time}</Text>
                                                </Button>
                                            </Left>
                                            <Body>
                                            <Button transparent>
                                                <Icon active name="md-trending-up" />
                                                <Text style={{padding:10}}>{list.level}</Text>
                                            </Button>
                                            </Body>
                                            <Right >
                                                <Button transparent >
                                                    <Icon active name="ios-add-outline" />
                                                    <Text style={{padding:10}}>KATIL</Text>
                                                </Button>
                                            </Right>
                                        </CardItem>
                                    </Item>
                                </Content>
                            ))}

                        </Tab>
                    ))}
                </Tabs>

            </Content>
        )
    }

    render() {

        return <Container >
            <Header>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="ios-arrow-back"/>
                    </Button>
                </Left>

                <Body>
                <Title>Ajanda</Title>
                </Body>

                <Right>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.navigate("DrawerOpen")}
                    >
                        <Icon name="ios-menu"/>
                    </Button>
                </Right>
            </Header>
            <Content>
                {this.state.data === null ? <Text>Loading</Text>: this.fonksiyon(this.state.data)}

            </Content>
            <Footer>
                <FooterTab>
                    <Button vertical active>
                        <Text>Hepsi</Text>
                    </Button>
                    <Button vertical>
                        <Text>Seçimlerim</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    }
}

export default AgendaScreen;