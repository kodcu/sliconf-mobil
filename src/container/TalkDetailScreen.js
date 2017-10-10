import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Body, Button, Card, CardItem, Container, Content, Footer, FooterTab, Input, Left,} from "native-base";
import Header from "../component/Header";
import Icon from 'react-native-vector-icons/Ionicons'
import If from "../component/If";
import TalkInfo from "../component/TalkInfo";
import TalkComment from "../component/TalkComment";
import TalkRate from "../component/TalkRate";

export class TalkDetail extends Component {

    state = {
        tab:'info',
        rate:false
    }


    render() {

        const {tab,rate} = this.state
        const {state} = this.props.navigation;
        let talk= state.params
        return (
            <Container style={styles.container}>

                <Header leftImage='chevron-left' rightText='Rate'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {this.setState({rate:true})}}>
                    <Header.Title title="Talk Detail"/>
                </Header>

                <Content>
                    <TalkRate visible={rate} onPressDismiss={() => {this.setState({rate:false})}} />
                   <If con={tab==='info'}>
                       <If.Then>
                          <TalkInfo Talk={talk}/>
                       </If.Then>

                       <If.Else>
                          <TalkComment/>
                       </If.Else>

                   </If>
                </Content>


                <Footer>
                    <FooterTab style={{backgroundColor: '#fff'}}>
                        <Button vertical onPress={() =>this.setState({tab:'info'})}>
                            <Icon size={25} name={tab==='info' ? 'ios-paper' : 'ios-paper-outline'} color={tab ==='info' ? '#29B673' : '#333'}/>
                        </Button>

                        <Button vertical onPress={() =>this.setState({tab:'comment'})}>
                            <Icon size={25} name={tab==='comment' ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'} color={tab==='comment' ? '#29B673' : '#333'}/>
                        </Button>

                    </FooterTab>

                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
});

export default TalkDetail;