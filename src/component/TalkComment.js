import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Container, Content, Footer, FooterTab, Input, Thumbnail} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons'

export class TalkComment extends Component {
    render() {
        return (
            <Container>

                <Footer style={{justifyContent:'flex-end'}}>
                    <FooterTab style={{backgroundColor: '#fff',padding:2,flex:1}}>
                        <Input style={{flex:0.9,borderWidth:0.5,borderRadius:5}}/>
                        <Button rounded bordered style={{marginLeft:10,flex:0.1,width:50,height:50}} >
                            <Icon size={35} name='ios-send-outline' color='#333'/>
                        </Button>

                    </FooterTab>

                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        width: 250,
        height: 50,
        borderBottomLeftRadius: 90,
        borderTopLeftRadius: 90,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0)',
        borderBottomWidth: 0

    },
    nana:{
        height:50,
        width:50,
        borderWidth:1,
        borderRadius:90,
        marginRight:10
    }
});

export default TalkComment;