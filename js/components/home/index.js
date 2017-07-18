import React, {Component} from "react";
import {TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import BlankPage2 from "../blankPage2";
import FloorPlan from "../floorplan";
import Speakers from "../speakers";
import Sponsor from "../sponsor";
import Agenda from "../agenda";
import DrawBar from "../DrawBar";
import {DrawerNavigator, NavigationActions} from "react-navigation";
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
    TabHeading
} from "native-base";
import {Grid, Row} from "react-native-easy-grid";

import {setIndex} from "../../actions/list";
import {openDrawer} from "../../actions/drawer";
import styles from "./styles";
import Main from "../main/index";


const TabList = [
    "7 Mayıs",
    "8 Mayıs",
    "9 Mayıs",
];

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static navigationOptions = {
        header: null
    };
    static propTypes = {
        name: React.PropTypes.string,
        setIndex: React.PropTypes.func,
        list: React.PropTypes.arrayOf(React.PropTypes.string),
        openDrawer: React.PropTypes.func
    };



    render() {
        return (
            <Container >
                <Header>
                    <Left>

                        <Button
                            transparent
                            onPress={() => {
                                DrawerNav.dispatch(
                                    NavigationActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({routeName: "Home"})]
                                    })
                                );
                                DrawerNav.goBack();
                            }}
                        >
                            <Icon active name="power"/>
                        </Button>
                    </Left>

                    <Body>
                    <Title>{this.props.navigation.state.params.name}</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => DrawerNav.navigate("DrawerOpen")}
                        >
                            <Icon active name="menu"/>
                        </Button>
                    </Right>
                </Header>
                <Content>

                    <Text>{this.props.navigation.state.params.name} etkinliğine hoşgeldiniz</Text>

                </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        setIndex: index => dispatch(setIndex(index)),
        openDrawer: () => dispatch(openDrawer())
    };
}
const mapStateToProps = state => ({
    name: state.user.name,
    list: state.list.list
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
const DrawNav = DrawerNavigator(
    {
        Home: {screen: HomeSwagger},
        FloorPlan: {screen: FloorPlan},
        Speakers: {screen: Speakers},
        Sponsor: {screen: Sponsor},
        Agenda: {screen: Agenda},
        BlankPage2: {screen: BlankPage2}
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
