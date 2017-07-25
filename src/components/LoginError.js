import React, { Component } from 'react';
import { View, StyleSheet,Image,ScrollView} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Text ,ListItem} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { NavigationActions} from "react-navigation";
export default class HeaderExample extends Component {


    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                </Header>
                <Grid>

                    <Row size={1}><Text style={{padding:10,fontSize:20,fontWeight :'bold'}}>Oturuma katılım için sisteme giriş yapmanız gerekmektedir</Text></Row>
                    <Row size={2}>
                        <Col>
                            <View style={{alignSelf:"center"}}>
                                <Image source={require('../../images/facebook.png')} style={{height: 200, width: 200}} />

                            </View>
                        </Col>
                        <Col>
                            <View style={{alignSelf:"center"}}>
                                <Image source={require('../../images/twitter.png')} style={{height: 200, width: 200}} />
                            </View>
                        </Col>
                    </Row>
                    <Row size={2}>
                        <Col>
                            <View style={{alignSelf:"center"}}>
                                <Image source={require('../../images/linkedin.png')} style={{height: 200, width: 200}} />

                            </View>
                        </Col>
                        <Col>
                            <View style={{alignSelf:"center"}}>
                                <Image source={require('../../images/github.png')} style={{height: 200, width: 200}} />
                            </View>
                        </Col>
                    </Row>

                </Grid>
            </Container>
        );
    }
}