import React, {Component} from 'react';
import {StyleSheet,TextInput,View,TouchableOpacity,Dimensions} from 'react-native';
import {Button, Card, CardItem, Container, Content, Footer, FooterTab, Input, Left,Thumbnail} from "native-base";
import Header from "../component/Header";
import Icon from 'react-native-vector-icons/Ionicons'
import If from "../component/If";
import TalkInfo from "../component/TalkInfo";
import TalkComment from "../component/TalkComment";
import TalkRate from "../component/TalkRate";

const {height, width} = Dimensions.get('window');
export class TalkDetail extends Component {

    state = {
        tab: 'info',
        rate: false,
        ask:false
    }

    askQuestion=()=>{
        console.log("burdayik")
        this.setState({ask:!this.state.ask})
    }

    render() {

        const {tab, rate} = this.state
        const {state} = this.props.navigation;
        let talk = state.params
        return (
            <Container style={styles.container}>

                <Header leftImage='chevron-left' rightText='Rate'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {
                            this.setState({rate: true})
                        }}>
                    <Header.Title title="Talk Detail"/>
                </Header>

                <Content>
                    <TalkRate visible={rate} onPressDismiss={() => {
                        this.setState({rate: false})
                    }}/>
                    <If con={tab === 'info'}>
                        <If.Then>
                            <TalkInfo Talk={talk}/>
                        </If.Then>

                        <If.Else>
                            <TalkComment question={this.askQuestion}/>
                        </If.Else>

                    </If>
                </Content>

                <If con={this.state.ask}>
                    <If.Then>
                <Footer>
                    <FooterTab style={{backgroundColor: '#fff'}}>
                        <View style={{flexDirection:'row'}}>
                            <Thumbnail source={require("../../images/person.png")}  small style={{margin:10}}/>
                            <TextInput placeholder="Your comments"
                                       placeholderTextColor='rgba(0,0,0,0.7)'
                                       returnKeyType="send"
                                       onSubmitEditing={() => {}}
                                       keyboardType="default"
                                       autoCapitalize="none"
                                       autoCorrect={false}
                                       style={{width:width-100,justifyContent:'center'}}
                            />
                            <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{alert("Yolladım");this.setState({ask:false})}}>
                                <Icon name={"ios-send"} size={30}/>
                            </TouchableOpacity>
                        </View>
                    </FooterTab>
                </Footer>
                    </If.Then>
                    <If.Else>
                <Footer>
                    <FooterTab style={{backgroundColor: '#fff'}}>
                        <Button vertical onPress={() => this.setState({tab: 'info'})}>
                            <Icon size={25} name={tab === 'info' ? 'ios-paper' : 'ios-paper-outline'}
                                  color={tab === 'info' ? '#29B673' : '#333'}/>
                        </Button>

                        <Button vertical onPress={() => this.setState({tab: 'comment'})}>
                            <Icon size={25} name={tab === 'comment' ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'}
                                  color={tab === 'comment' ? '#29B673' : '#333'}/>
                        </Button>
                                </FooterTab>



                </Footer>
                    </If.Else>
                </If>
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