import React, {Component} from 'react';
import {Alert, Dimensions, Modal, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button, Segment} from "native-base";
import CheckBox from "react-native-check-box";
import Color from "../theme/Color";
import Font from "../theme/Font";
import {moderateScale} from "../theme/Scale";

export default class FilterEvent extends Component {

    state = {
        eventName: '',
        beginnerLevel: true,
        mediumLevel: true,
        expertLevel: true,
        data: [],
        searchFilter: []
    };

    onClick(data) {
        data.checked = !data.checked;
        this.setState({data: this.state.data})
        if (data.checked === true)
            this.state.searchFilter.push(data.name)
        else {
            let array = this.state.searchFilter;
            let index = array.indexOf(data.name)
            array.splice(index, 1);
        }
    }


    renderCheckBox(data, i) {
        const leftText = data.name;
        return (
            <CheckBox
                key={i}
                style={{flex: 1, padding: 10}}
                onClick={() => this.onClick(data)}
                isChecked={data.checked}
                leftText={leftText}
                leftTextStyle={styles.fontCheckItem}
            />)
    }

    checkLevel(level) {
        if (level === 1)
            return this.state.beginnerLevel;
        if (level === 2)
            return this.state.mediumLevel;
        if (level === 3)
            return this.state.expertLevel;

        return false;
    }

    checkTag(tags) {
        if (tags !== undefined && tags !== null)
            for (let i = 0; i < tags.length; i++)
                if (this.state.searchFilter.includes(tags[i]))
                    return true;

        return false;
    }

    searchEvent() {
        const state = this.state;
        const firstEvents = this.props.events;
        const searchName = this.state.eventName.trim().toUpperCase();
        let searchArray = [];

        if (firstEvents !== undefined && firstEvents !== null) {
            Object.values(firstEvents).forEach((data) => {
                data.filter(event =>
                    this.checkLevel(event.level)
                    && (this.checkTag(event.tags))
                    && (searchName === ''.trim() ? true : (event.topic.toUpperCase().indexOf(searchName) !== -1))
                ).map(data => searchArray.push(data))
            });
        }

        if (searchArray.length !== 0)
            this.props.onPress(searchArray)
        else
            Alert.alert(
                'Warning!',
                'No results were found in the criteria you searched for.',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                {cancelable: false}
            );

    }


    searchData() {
        if (this.props.events !== undefined && this.props.events !== null && !this.props.events.isEmpty) {
            let sourceData = this.props.events;
            let myArray = [];

            if (this.state.eventName === '') {
                Object.values(sourceData).map((data) => {
                    data.map((data2) => {
                        this.state.searchFilter.map((myFilter) => {
                            if (data2.tags.find((data2) => myFilter === data2) !== undefined && myArray.find((myArrayData) => data2 === myArrayData) === undefined)
                                myArray.push(data2)
                        })
                    })


                })
            } else {
                Object.values(sourceData).map((data) => {
                    data.map((data2) => {
                        if (data2.topic.toLowerCase().includes(this.state.eventName.toLowerCase()) && this.state.searchFilter.length === 0)
                            myArray.push(data2)
                        this.state.searchFilter.map((myFilter) => {
                            if (data2.tags.find((data2) => myFilter === data2) !== undefined &&
                                data2.topic.toLowerCase().includes(this.state.eventName.toLowerCase()) &&
                                myArray.find((myArrayData) => data2 === myArrayData) === undefined)

                                myArray.push(data2)

                        })
                    })

                })
            }
            if (myArray.length !== 0) {
                this.props.onPress(myArray)
            } else
                Alert.alert(
                    'Warning!',
                    'No results found',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false}
                );
        } else
            Alert.alert(
                'Warning!',
                'No results found',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            );
    }


    componentWillMount() {

        const events = this.props.events;
        if (events !== undefined && events !== null && !events.isEmpty) {
            let stateData = this.state.data;
            let stateSelected = this.state.searchFilter;

            Object.values(events).map((data) =>
                data.map(ev => {
                        if (ev.tags !== undefined && ev.tags !== null)
                            ev.tags.forEach(tag => {
                                if (!stateData.find(t => t.name === tag)) {
                                    stateData.push({name: tag, checked: true});
                                    stateSelected.push(tag)
                                }
                            })
                    }
                )
            );

            this.setState({data: stateData})
            this.setState({searchFilter: stateSelected})
        }

    }

    render() {
        const {visible, onPress, onClose} = this.props;
        let DATAS = this.state.data;
        return (
            <View style={styles.container}>
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => {
                    }}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height,
                            backgroundColor: 'rgba(0,0,0,0.1)'
                        }}>
                        <View
                            style={{
                                height: 350,
                                width,
                                justifyContent: 'center',
                                alignItems: 'center',
                                elevation: 3,
                                backgroundColor: '#fff',
                                borderRadius: 25,
                            }}>
                            <View style={{
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <View style={{
                                    height: 250,
                                    width,
                                    justifyContent: 'center',
                                    padding: 30,
                                    paddingTop: 20,
                                    paddingBottom: 20
                                }}>

                                    <TextInput
                                        placeholder="Search Events"
                                        style={styles.fontCheckItem}
                                        returnKeyType="done"
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(text) => this.setState({eventName: text})}/>

                                    <ScrollView>
                                        {DATAS.map((item, i) =>
                                            this.renderCheckBox(item, i)
                                        )}</ScrollView>


                                </View>

                                <View style={{height: 40, flexDirection: 'row', paddingBottom: 30}}>
                                    <CheckBox
                                        key={this.state.beginnerLevel.toString() + 1}
                                        rightTextStyle={{
                                            ...Font.regular,
                                            fontSize: moderateScale(12),
                                            color: Color.darkGray
                                        }}
                                        style={{padding: 10, width: width * 0.3}}
                                        onClick={() => this.setState({beginnerLevel: !this.state.beginnerLevel})}
                                        isChecked={this.state.beginnerLevel}
                                        rightText='Beg'
                                        checkBoxColor={Color.green}
                                    />
                                    <CheckBox
                                        key={this.state.mediumLevel.toString() + 2}
                                        rightTextStyle={{
                                            ...Font.regular,
                                            fontSize: moderateScale(12),
                                            color: Color.darkGray
                                        }}
                                        style={{padding: 10, width: width * 0.3}}
                                        onClick={() => this.setState({mediumLevel: !this.state.mediumLevel})}
                                        isChecked={this.state.mediumLevel}
                                        rightText='Med'
                                        checkBoxColor={Color.yellow}
                                    />
                                    <CheckBox
                                        key={this.state.expertLevel.toString() + 3}
                                        rightTextStyle={{
                                            ...Font.regular,
                                            fontSize: moderateScale(12),
                                            color: Color.darkGray
                                        }}
                                        style={{padding: 10, width: width * 0.3}}
                                        onClick={() => this.setState({expertLevel: !this.state.expertLevel})}
                                        isChecked={this.state.expertLevel}
                                        rightText='Exp'
                                        checkBoxColor={Color.red}
                                    />
                                </View>

                                <View style={{
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 60,
                                    width,
                                    backgroundColor: '#29B673',
                                    borderBottomLeftRadius: 25,
                                    borderBottomRightRadius: 25,
                                    flexDirection: 'row',

                                }}>

                                    <Button vertical transparent onPress={() => this.searchEvent()}
                                            style={{
                                                width: width / 2,
                                                height: 60,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                        <Text style={{...Font.medium, color: '#fff', fontSize: moderateScale(20)}}>Search</Text>
                                    </Button>

                                    <Button vertical transparent onPress={this.props.onClose()}
                                            style={{
                                                width: width / 2,
                                                height: 60,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                        <Text style={{...Font.medium, color: '#fff', fontSize: moderateScale(20)}}>Cancel</Text>
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
width = Dimensions.get('window').width - 80;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerModel: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#29B673',
        height: 100,
        width: Dimensions.get('window').width,
    },
    fontCheckItem: {
        ...Font.regular,
        fontSize: moderateScale(12),
        color: Color.darkGray
    }
});

