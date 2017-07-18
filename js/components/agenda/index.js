import React, {Component} from "react";
import {connect} from "react-redux";
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
    Tab,
    Tabs,
    ScrollableTab,
    TabHeading,
    Footer, FooterTab
} from "native-base";
import {Grid, Row} from "react-native-easy-grid";
import Temp from "../temp/CardInfo2"

import styles from "./styles";

const TabList = [
    "7 Mayıs",
    "8 Mayıs",
    "9 Mayıs",
];

const data = [];

class Agenda extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const {props: {name, index, list}} = this;
        return (
            <Container>
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

                <Content >
                    <Tabs renderTabBar={() => <ScrollableTab />}>
                        {TabList.map((item, i) => (
                            <Tab heading={ <TabHeading><Text style={styles.textTab}>{item}</Text></TabHeading>}>

                                <Temp/>
                                <Temp/>
                            </Tab>
                        ))}
                    </Tabs>


                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Text>Hepsi</Text>
                        </Button>
                        <Button vertical>
                            <Text>Seçimlerim</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );


    }
}

export default Agenda;
