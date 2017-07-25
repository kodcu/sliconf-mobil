/**
 * Created by anil on 23/07/2017.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,ListView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Toast,Content,Card ,CardItem,ListItem,Form,Item,Input,Radio,Picker,CheckBox} from 'native-base';
export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource:null,
            radio1:false,
            radio2:false,
            radio3:false
        }
    }

    getDataFromJson() {
        return fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json')
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson.members),
                }, function() {
                    console.log(responseJson.members)
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    changeState(radio){
        switch (radio){
            case 1:
                this.setState({
                    radio1:!this.state.radio1,
                    radio2:false,
                    radio3:false
                });
                break;
            case 2:
                this.setState({
                    radio2:!this.state.radio2,
                    radio1:false,
                    radio3:false
                });
                break;
            case 3:
                this.setState({
                    radio3:!this.state.radio3,
                    radio1:false,
                    radio2:false
                });
                break;
        }

    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Main')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Aramalar</Title>
                    </Body>
                    <Right>
                        <Button transparent >
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container}>
                <View style={{flex: .8,padding:20}}>
                <TextInput
                    placeholder="Search Events"
                    returnKeyType="search"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    onChangeText={(text) => this.setState({eventName:text})}/>
                        <ListItem button onPress={() => this.changeState(1)}>
                            <Left>
                                <Text>safas</Text>
                            </Left>
                            <Right>
                                <CheckBox selected={this.state.radio1} style={{borderColor:'#000'}} />
                            </Right>
                        </ListItem>
                        <ListItem button onPress={() => this.changeState(2)}>
                            <Text>Orta Seviye</Text>
                            <Right>
                                <CheckBox selected={this.state.radio2} />
                            </Right>
                        </ListItem>
                        <ListItem button onPress={() => this.changeState(3)}>
                            <Text>İleri Seviye</Text>
                            <Right>
                                <CheckBox selected={this.state.radio3} />
                            </Right>
                        </ListItem>
                    <Text style={styles.buttonText} >ARA</Text>

                </View>
                </View>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    buttonText:{
        width:150,
        margin:10,
        padding:10,
        textAlign:'center',
        alignSelf:'center',
        color:'#000000',
        fontWeight:'700',
        borderWidth:1,
        borderRadius: 30
    },
    input : {
        marginBottom: 10,
        color: '#000000',
        padding:20,
        marginTop:50,

    },
});
