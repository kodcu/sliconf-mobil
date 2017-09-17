import React, { Component } from 'react';
import { Modal, Text, View ,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import { Container} from 'native-base';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-check-box'


export default class Filter extends Component {

    state = {
        eventName:'',
        data:[{name:"Java Language",checked:false},
            {name:"Server Side",checked:false},
            {name:"Big Data",checked:false},
            {name:"Mobile",checked:false},
            {name:"Modern Web",checked:false},
            {name:"Cloud,Containers &Infrastructure",checked:false}],
        searchFilter:[]
    }


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
            alert('Sonuç Bulunamadı');
    }


    render() {
        const {visible,onPress,onClose} = this.props;
        let DATAS =this.state.data;
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

                            <ScrollView>
                            {DATAS.map((item,i) =>
                                this.renderCheckBox(item,i)
                            )}</ScrollView>


                                <TouchableOpacity onPress={() => this.searchData()} style={{alignSelf:'center'}}>
                                    <Text style={{marginTop: 5,fontWeight :'bold'}}>ARA</Text>
                                </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.onClose()} style={{alignSelf:'center'}}>
                                <Text style={{marginTop: 5,fontWeight :'bold'}}>KAPAT</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>


            </View>
        );
    }
}