/**
 * Created by Muslum on 25.07.2017.
 */
import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Content,Card ,CardItem,Separator,ScrollableTab,Thumbnail,ListItem,List,Text ,Item,Tabs,Tab,Footer, FooterTab} from 'native-base';


class AgendaScreen extends React.Component {

    constructor(props) {
        super(props);
        state = {
           data:[]
        }
    }

    static navigationOptions = {
        header:null
    };

    async componentDidMount() {
        await this.getEventList("123");
    }


    getEventList(id) {
        return fetch('https://jsonblob.com/api/jsonBlob/2bf9abed-70df-11e7-9e0d-7fe9bffc9f1c')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson.event,
                }, function () {
                    console.log(responseJson)
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        this.state = this.props.navigation.state.param;
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
                <Content >
                    <Tabs renderTabBar={() => <ScrollableTab />}>
                        {this.state.data.map((item, i) => (
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
            </Content>
        </Container>
    }
}

export default AgendaScreen;