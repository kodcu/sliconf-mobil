/**
 * Created by Muslum on 25.07.2017.
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Content, Header, Left, Button, Icon, Body, Right, Text, Title, Card, CardItem,List} from 'native-base';
import {connect} from "react-redux";
import DrawBar from "./DrawBar";
import Agenda from "./AgendaScreen";
import Comments from "./Comments";
import SpeakersScreen from "./Speakers";
import SearcScreen from './Search';
import LoginError from './LoginError'
import { Col, Row, Grid } from "react-native-easy-grid";
import {DrawerNavigator, NavigationActions} from "react-navigation";

const styles = StyleSheet.flatten({
    container: {
        padding: 10
    },
    title: {
        color: "#000000",
        fontSize: 30,
        textAlign: 'center',
        textAlignVertical:'center',
    },
    homeitems: {
        fontSize: 30,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    separator: {
        height: 4,
        backgroundColor: '#000000',
        marginLeft: 30,
        marginBottom:30,
        marginRight:30,
        marginTop:5
    },
});

const routes = [
    {title: "Ajanda", route: "Agenda"},
    {title: "Kat Planı", route: "FloorPlan"},
    {title: "Konuşmacılar", route: "Speakers"},
    {title: "Sponsorlar", route: "Sponsor"}];

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        state = {
            id: '',
            name: ''
        }
    }

    static navigationOptions = {
        header: null
    };

    render() {
        const params = this.props.navigation.state.params;
        return <Container >
            <Header>
                <Left>
                    <Button
                        transparent
                        onPress={() => {
                            DrawerNav.goBack();
                        }}>
                        <Icon active name="power"/>
                    </Button>
                </Left>
                <Body>
                <Title>Ana Sayfa</Title>
                </Body>
                <Right>
                    <Button
                        transparent
                        onPress={() => DrawerNav.navigate("DrawerOpen")}>
                        <Icon active name="menu"/>
                    </Button>
                </Right>
            </Header>
            <Content>

                <Text style={styles.title}>Welcome to {params.name}</Text>
                <View style={styles.separator}/>
                <List dataArray={routes}
                      renderRow={(data) =>

                        <CardItem>
                            <Icon active name="person"/>
                            <Text>{data.title}</Text>
                            <Right>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </CardItem>
                      }>
                </List>
                <Grid style={{padding: 20}}>
                    <Row>
                        <Row style={{
                            borderWidth: 2,
                            margin: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: '#fff'
                        }}>
                            <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}
                                  onPress={() => this.props.navigation.navigate('Agenda')}>Agenda</Text>
                        </Row>
                        <Row style={{
                            borderWidth: 2,
                            margin: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: '#fff'
                        }}>
                            <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}
                                  onPress={() => this.props.navigation.navigate('Speakers')}>Speakers</Text>
                        </Row>
                    </Row>
                    <Row >
                        <Row style={{
                            borderWidth: 2,
                            margin: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: '#fff'
                        }}>
                            <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>Sponsors</Text>
                        </Row>
                        <Row style={{
                            borderWidth: 2,
                            margin: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: '#fff'
                        }}>
                            <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}
                                  onPress={() => this.props.navigation.navigate('Search')}>Search</Text>
                        </Row>
                    </Row>
                </Grid>


            </Content>
        </Container>
    }
}

const HomeSwagger = connect()(HomeScreen);
const DrawNav = DrawerNavigator(
    {
        Home: {screen: HomeSwagger},
        Agenda: {screen: Agenda},
        Comments:{screen:Comments},
        Search:{screen:SearcScreen},
        Speakers:{screen:SpeakersScreen},
        LoginError:{screen:LoginError}
    },
    {
        contentComponent: props => <DrawBar {...props} />
    }
);
const DrawerNav = null;

DrawNav.navigationOptions = ({navigation}) => {
    //noinspection JSAnnotator
    DrawerNav = navigation;
    return {
        header: null
    };
};
export default DrawNav;
