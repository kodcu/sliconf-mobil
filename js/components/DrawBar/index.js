import React from "react";
import {AppRegistry, Image, TouchableOpacity} from "react-native";
import {
    Button,
    Text,
    Container,
    List,
    ListItem,
    Content,
    Icon,
    Thumbnail,
    Footer, FooterTab
} from "native-base";

const logo = require("../../../images/javaday2.png");
const logo2 = require("../../../images/contacts/megha.png");

const routes = [{title: "Ana Ekran", route: "Home"},
    {title: "Ajanda", route: "Agenda"},
    {title: "Kat Planı", route: "FloorPlan"},
    {title: "Konuşmacılar", route: "Speakers"},
    {title: "Boş", route: "BlankPage2"},
    {title: "Sponsorlar", route: "Sponsor"}];

export default class DrawBar extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <Container>
                <Content>
                    <Image
                        source={logo}
                        style={{
                            height: 120,
                            alignSelf: "stretch",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                height: 120,
                                alignSelf: "stretch",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            onPress={() => this.props.navigation.navigate("DrawerClose")}
                        >
                            <Thumbnail
                                style={{height: 80, width: 80}}
                                source={logo2}
                            />
                        </TouchableOpacity>
                    </Image>
                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => this.props.navigation.navigate(data.route)}
                                >
                                    <Text>{data.title}</Text>
                                </ListItem>
                            );
                        }}
                    />



                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => alert("Şuanda işleminiz gerçekleştirilemedi lütfen daha sonra tekrar deneyiniz..")}>
                            <Icon name="person" />
                            <Text>Giriş Yap</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
