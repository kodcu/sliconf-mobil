/**
 * Created by anil on 21/07/2017.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet ,TouchableOpacity} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Content,Card ,CardItem,Tabs,Tab,Thumbnail,List,Input,Form,Item} from 'native-base';
import TouchableItem from "react-navigation/src/views/TouchableItem";

var Popular = [
    {name: 'Anıl Coşar', comment: 'Performans Analizi yaparken nelere dikkat etmeliyiz ? ', likenumber:4},
    {name: 'Müslüm Sezgin', comment: 'Fuse Nedir ? ', likenumber:3},
    {name: 'Anonim', comment: 'Soru  ', likenumber:2},
];
var Fresh = [
    {name: 'Göksel Pirnal', comment: 'Ennn Taze Soru ', likenumber:4},
    {name: 'Talip Tayfur', comment: 'Taze Soru ', likenumber:4},
    {name: 'Hüseyin Akdoğan', comment: 'Hafif Taze Soru', likenumber:4},
];

export default class CommentsFooter extends Component {

    constructor(){
        super();
        this.state ={
            status:false,
            name:'',
            comment:''
        }
    }

    toggleStatus(){
        this.setState({
            status:!this.state.status
        });

    }

    render() {
        if(this.state.status) return <HomeScreen toggleStatus={ () => this.toggleStatus() }/>
        return (
            <Container>
                <TouchableOpacity onPress={() => this.toggleStatus()}>
                <View style={styles.ask}>
                    <Icon name='md-help' style={{margin:10,borderWidth:2,padding:20}} />
                    <Text style={{alignSelf:'center'}}>Sorunuzu buraya yazabilirsiniz</Text>
                </View>
                </TouchableOpacity>
                <Tabs style={{borderWidth:1,margin:20}}>
                    <Tab heading="Popüler" tabStyle={{backgroundColor: 'transparent'}} textStyle={{color: '#000000'}}  activeTextStyle={{color: '#fff', fontWeight: 'bold'}}>
                        <Content style={{padding:10}}>
                            <Card>
                                <List dataArray={Popular}
                                      renderRow={(popular) =>
                                      <Content>
                                          <View style={{borderWidth:.2}}/>
                                      <CardItem>
                                          <Left>
                                              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{popular.name}</Text>
                                          </Left>
                                      </CardItem>
                                      < CardItem cardBody >
                                          <Text style={{padding:10}}>{popular.comment}</Text>
                                          </CardItem>
                                          <CardItem>
                                          <Left>
                                          <Button transparent>
                                          <Icon name="thumbs-up" />
                                          <Text style={{padding:10}}>{popular.likenumber} Likes</Text>
                                          </Button>
                                          </Left>
                                          <Body>
                                          <Button transparent>
                                          <Icon name="thumbs-down" />
                                          <Text style={{padding:10}}>4 Dislikes</Text>
                                          </Button>
                                          </Body>
                                          <Right>
                                          <Text style={{padding:10}}>11h ago</Text>
                                          </Right>
                                          </CardItem>
                                      </Content>
                                      }>
                                </List>
                            </Card>

                        </Content>
                        <View>
                                <CardItem>
                                    <Right>
                                        <Button transparent style={{borderWidth:2,padding:10,backgroundColor:'blue'}} onPress={() => this.toggleStatus()}>
                                            <Icon name="ios-flower" />
                                            <Text style={{padding:10}}>Soru Sor</Text>
                                        </Button>
                                    </Right>
                                </CardItem>
                        </View>
                    </Tab>
                    <Tab heading="Tazeler" tabStyle={{backgroundColor: 'transparent'}} textStyle={{color: '#000000'}}  activeTextStyle={{color: '#fff', fontWeight: 'bold'}}>
                        <Content style={{padding:10}}>
                            <Card>
                                <List dataArray={Fresh}
                                      renderRow={(fresh) =>
                                          <Content>
                                              <View style={{borderWidth:.2}}/>
                                              <CardItem>
                                                  <Left>
                                                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{fresh.name}</Text>
                                                  </Left>
                                              </CardItem>
                                              < CardItem cardBody >
                                                  <Text>{fresh.comment}</Text>
                                              </CardItem>
                                              <CardItem>
                                                  <Left>
                                                      <Button transparent>
                                                          <Icon name="thumbs-up" />
                                                          <Text style={{padding:10}}>{fresh.likenumber} Likes</Text>
                                                      </Button>
                                                  </Left>
                                                  <Body>
                                                  <Button transparent>
                                                      <Icon name="thumbs-down" />
                                                      <Text style={{padding:10}}>4 Dislikes</Text>
                                                  </Button>
                                                  </Body>
                                                  <Right>
                                                      <Text style={{padding:10}}>11h ago</Text>
                                                  </Right>
                                              </CardItem>
                                          </Content>
                                      }>
                                </List>
                            </Card>
                        </Content>
                        <View>
                            <CardItem>
                                <Right>
                                    <Button transparent style={{borderWidth:2,padding:10}} onPress={() => this.toggleStatus()}>
                                        <Icon name="ios-flower" />
                                        <Text style={{padding:10}}>Soru Sor</Text>
                                    </Button>
                                </Right>
                            </CardItem>
                        </View>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
class HomeScreen extends React.Component {


    render() {
        return (
            <View style={styles.container}>
                <Form style={{borderWidth:2}}>
                    <Item >
                        <Input placeholder="Sorunuzu buraya yazabilirsiniz" style={{height:150,textAlignVertical:'top'}} multiline={true}
                               onChangeText={(text) => this.setState({comment:text})}/>
                    </Item>
                </Form>
                <Item style={{marginTop:10}} >
                    <Icon name='md-person' />
                    <Input placeholder="İsminizi ekleyin" style={{borderWidth:2}} onChangeText={(text) => this.setState({name:text})} />
                </Item>
                <CardItem>
                    <Right>
                        <Button style={{marginTop:20}} onPress={() => {this.props.toggleStatus(); Fresh.push({name: this.state.name, comment: this.state.comment, likenumber:0})}} >
                            <Text>Sor</Text>
                        </Button>
                    </Right>
                </CardItem>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding:20,

    },
    separator: {
        height: 1,
        backgroundColor: '#000000',
        margin:10
    },
    ask: {
        flexDirection:'row',
        borderWidth:3,
        margin:20,
    },
});
