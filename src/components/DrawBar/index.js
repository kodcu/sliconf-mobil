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

const logo2 = require("../../../images/contacts/atul.png");

const routes = [{title: "Ana Ekran", route: "Home"},
    {title: "Ajanda", route: "Agenda"},
    {title: "Kat Planı", route: "FloorPlan"},
    {title: "Konuşmacılar", route: "Speakers"},
    {title: "Boş", route: "deneme"},
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
                        source={{uri: 'https://www.ovh.com/fr/blog/wp-content/uploads/2015/01/top-banner-image.png'}}
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
