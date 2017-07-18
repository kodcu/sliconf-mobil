import React, {Component} from "react";
import Main from "../components/main/";
import Login from "../components/login/";
import Home from "../components/home/";
import BlankPage from "../components/blankPage";
import BlankPage2 from "../components/blankPage2";
import FloorPlan from "../components/floorplan";
import Speakers from "../components/speakers";
import Sponsor from "../components/sponsor";
import Diary from "../components/agenda";
import HomeDrawerRouter from "./HomeDrawerRouter";
import {StackNavigator} from "react-navigation";
import {Header, Left, Button, Icon, Body, Title, Right} from "native-base";
HomeDrawerRouter.navigationOptions = ({navigation}) => ({
    header: null
});
export default (StackNav = StackNavigator({
    Main: {screen: Main},
    Login: {screen: Login},
    Home: {screen: Home},
    BlankPage: {screen: BlankPage},
    BlankPage2: {screen: BlankPage2},
}));