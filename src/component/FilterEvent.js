import React, {Component} from 'react';
import {
    View, Text, StyleSheet, Modal, ActivityIndicator, Dimensions, Slider, Image, TextInput,
    ScrollView, TouchableOpacity,Alert
} from 'react-native';
import {Button, Segment} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons'
import CheckBox from "react-native-check-box";

export default class FilterEvent extends Component {

    state = {
        eventName:'',
        data:[{name:"Java",checked:false},
            {name:"Security",checked:false},
            {name:"Big Data",checked:false},
            {name:"Mobile",checked:false},
            {name:"Modern Web",checked:false},
            {name:"Cloud,Containers & Infrastructure",checked:false}],
            searchFilter:[]
    };

    onClick(data) {
        data.checked = !data.checked;
        this.setState({data:this.state.data})
        if(data.checked===true)
            this.state.searchFilter.push(data.name)
        else{
            let array = this.state.searchFilter;
            let index = array.indexOf(data.name)
            array.splice(index, 1);
        }
    }

    renderCheckBox(data,i) {
        var leftText = data.name;
        return (
            <CheckBox
                key={i}
                style={{flex: 1, padding: 10}}
                onClick={()=>this.onClick(data)}
                isChecked={data.checked}
                leftText={leftText}
            />)
    }


    searchData(){
        let sourceData=this.props.events;
        let myArray =[];
        if(this.state.eventName === '') {
            Object.values(sourceData).map((data) => {
                data.map((data2) => {
                    this.state.searchFilter.map((myFilter) => {
                        if(data2.tags.find((data2)=>myFilter===data2)!==undefined && myArray.find((myArrayData)=>data2===myArrayData)===undefined)
                            myArray.push(data2)

                    })
                })




            })
        }else {
            Object.values(sourceData).map((data) => {
                data.map((data2) => {
                    if(data2.topic.toLowerCase().includes(this.state.eventName.toLowerCase())&& this.state.searchFilter.length===0)
                        myArray.push(data2)
                    this.state.searchFilter.map((myFilter) => {
                        if(data2.tags.find((data2)=>myFilter===data2)!==undefined &&
                            data2.topic.toLowerCase().includes(this.state.eventName.toLowerCase()) &&
                            myArray.find((myArrayData)=>data2===myArrayData)===undefined )

                            myArray.push(data2)

                    })
                })

            })
        }
        if(myArray.length !==0){
            this.props.onPress(myArray)
        }else
            Alert.alert(
                'Warning!',
                'No results found',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
    }

    render() {
        const {visible,onPress,onClose} = this.props;
        let DATAS =this.state.data;
        return (
            <View style={styles.container}>
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
                            width:Dimensions.get('window').width,
                            height:Dimensions.get('window').height,
                            backgroundColor:'rgba(0,0,0,0.1)'
                        }}>
                        <View
                            style={{
                                height: 330,
                                width,
                                justifyContent: 'center',
                                alignItems: 'center',
                                elevation:3,
                                backgroundColor: '#fff',
                                borderRadius: 25,
                            }}>
                            <View style={{
                                alignSelf:'center',
                                alignItems:'center',
                                justifyContent :'center',
                            }}>
                                <View style={{
                                    height: 270,
                                    width,
                                    justifyContent: 'center',
                                    padding:30,
                                }}>

                                    <TextInput
                                        placeholder="Search Events"
                                        returnKeyType="done"
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(text) => this.setState({eventName:text})}/>

                                    <ScrollView>
                                        {DATAS.map((item,i) =>
                                            this.renderCheckBox(item,i)
                                        )}</ScrollView>

                                </View>

                                <View style={{
                                    alignSelf:'center',
                                    alignItems:'center',
                                    justifyContent :'center',
                                    height:60,
                                    width,
                                    backgroundColor:'#29B673',
                                    borderBottomLeftRadius:25,
                                    borderBottomRightRadius:25,
                                    flexDirection:'row',

                                }}>

                                    <Button vertical transparent  onPress={() => this.searchData()}
                                            style={{width:width/2,height:60,alignItems:'center',justifyContent:'center',}}>
                                        <Text style={{color:'#fff',fontSize:20}}>Search</Text>
                                    </Button>

                                    <Button vertical transparent onPress={this.props.onClose()}
                                            style={{width:width/2,height:60,alignItems:'center',justifyContent:'center',}}>
                                        <Text style={{color:'#fff',fontSize:20}}>Cancel</Text>
                                    </Button>


                                </View>

                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
width = Dimensions.get('window').width-80;
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    containerModel: {
        justifyContent:'center',
        alignItems:'center',
    },
    modal:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#29B673',
        height:100,
        width:Dimensions.get('window').width,
    }
});

