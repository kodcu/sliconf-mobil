import React, { Component } from 'react';
import { Modal, Text, View ,TouchableOpacity,TextInput} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Toast,Content,Card ,CardItem,ListItem,Form,Item,Input,Radio,Picker,CheckBox,Thumbnail,List} from 'native-base';
import PropTypes from 'prop-types';

export default class Filter extends Component {

    state = {
        eventName:'',
        radioBeginner:false,
        radioIntermediate:false,
        radioAdvanced:false,
    }

    changeState(radio){
        switch (radio){
            case 1:
                this.setState({
                    radioBeginner:!this.state.radioBeginner,
                });
                break;
            case 2:
                this.setState({
                    radioIntermediate:!this.state.radioIntermediate,
                });
                break;
            case 3:
                this.setState({
                    radioAdvanced:!this.state.radioAdvanced,
                });
                break;
        }

    }
    searchData(){
        let sourceData=this.props.events;
        let myArray =[];

        if(this.state.radioBeginner){
            if(this.state.eventName === ''){
                Object.values(sourceData).map((data) => {
                    data.map((data2) =>{
                        if(data2.level === 1){
                            myArray.push(data2);

                        }
                    }
                    )


                })
            }else {
                Object.values(sourceData).map((data) => {
                    data.map((data2) =>{
                        if(data2.level === 1 && data2.topic.toLowerCase().includes(this.state.eventName.toLowerCase())){
                            myArray.push(data2);
                        }
                    }
                    )

                })
            }

        }
        if(this.state.radioIntermediate){
            if(this.state.eventName === ''){
                Object.values(sourceData).map((data) => {
                    data.map((data2) =>{
                            if(data2.level === 2){
                                myArray.push(data2);

                            }
                        }
                    )


                })
            }else {
                Object.values(sourceData).map((data) => {
                    data.map((data2) =>{
                            if(data2.level === 2 && data2.topic.toLowerCase().includes(this.state.eventName.toLowerCase())){
                                myArray.push(data2);
                            }
                        }
                    )

                })
            }

        }
        if(this.state.radioAdvanced){
            if(this.state.eventName === ''){
                Object.values(sourceData).map((data) => {
                    data.map((data2) =>{
                            if(data2.level === 3){
                                myArray.push(data2);

                            }
                        }
                    )


                })
            }else {
                Object.values(sourceData).map((data) => {
                    data.map((data2) =>{
                            if(data2.level === 3 && data2.topic.toLowerCase().includes(this.state.eventName.toLowerCase())){
                                myArray.push(data2);
                            }
                        }
                    )

                })
            }

        }


        if(myArray.length !==0){
            this.props.onPress(myArray)
        }else
            alert('Sonuç Bulunamadı');


    }


    render() {
        const {visible,onPress} = this.props;
        return (
            <View>
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => {}}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                height: 400,
                                width: 300,
                                borderWidth: 2,
                                justifyContent: 'center',
                                padding:30,
                                borderColor: '#789',
                                backgroundColor: '#f5f5f5',
                                borderRadius: 25,
                            }}>
                                <TextInput
                                    placeholder="Search Events"
                                    returnKeyType="search"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={(text) => this.setState({eventName:text})}/>
                                <ListItem button onPress={() => this.changeState(1)}>
                                    <Left>
                                        <Text>Başlangıç</Text>
                                    </Left>
                                    <Right>
                                        <Radio selected={this.state.radioBeginner} />
                                    </Right>
                                </ListItem>
                                <ListItem button onPress={() => this.changeState(2)} >
                                    <Left>
                                        <Text>Orta Seviye</Text>
                                    </Left>
                                    <Right>
                                        <Radio selected={this.state.radioIntermediate}/>
                                    </Right>
                                </ListItem>
                                <ListItem button onPress={() => this.changeState(3)}>
                                    <Left>
                                        <Text>İleri Seviye</Text>
                                    </Left>
                                    <Right>
                                        <Radio selected={this.state.radioAdvanced} />
                                    </Right>
                                </ListItem>
                                <TouchableOpacity onPress={() => this.searchData()} style={{alignSelf:'center'}}>
                                    <Text style={{marginTop: 5,fontWeight :'bold'}}>ARA</Text>
                                </TouchableOpacity>

                        </View>
                    </View>
                </Modal>


            </View>
        );
    }
}