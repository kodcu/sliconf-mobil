import React, {Component} from 'react';
import {Alert, Modal, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from "native-base";
import CheckBox from "react-native-check-box";
import Color from "../theme/Color";
import Font from "../theme/Font";
import {height, moderateScale, width} from "../theme/Scale";

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
        if (data.checked)
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
                leftTextStyle={{
                    ...Font.regular,
                    fontSize: moderateScale(12),
                    color: Color.darkGray
                }}
            />)
    }

    /**
     * icine aldigi levelin secili olup olmadigini cevirir
     * @param level
     * @returns {boolean}
     */
    checkLevel(level) {
        let result = false;
        switch (level) {
            case 0:
                result = this.state.beginnerLevel;
                break;
            case 1:
                result = this.state.mediumLevel;
                break;
            case 2:
                result = this.state.expertLevel;
                break;
        }
        return result;
    }

    /**
     * icine aldigi tag dizisinde secili olanlar tagın olup olmadigini cevirir
     * @param tags
     * @returns {boolean}
     */
    checkTag(tags) {

        if (this.state.data.length === 0)
            return true;

        if (tags !== undefined && tags !== null)
            for (let i = 0; i < tags.length; i++)
                if (this.state.searchFilter.includes(tags[i]))
                    return true;

        return false;
    }

    /**
     * eventler icinden filtreleme yapar
     */
    searchEvent() {
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

    /**
     * ekran gelmeden once butun taglari toplar
     */
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
        const {visible} = this.props;
        let tagList = this.state.data;
        return (
            <View style={styles.container}>
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => {
                    }}>
                    <View style={styles.containerModal}>
                        <View style={styles.containerView}>
                            <View style={styles.viewCenter}>
                                <View style={styles.criteriaView}>
                                    <TextInput
                                        placeholder="Search Events"
                                        style={styles.fontCheckItem}
                                        returnKeyType="done"
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(text) => this.setState({eventName: text})}/>

                                    <ScrollView>{tagList.map((item, i) => this.renderCheckBox(item, i))}</ScrollView>

                                </View>

                                <View style={styles.levelView}>
                                    <CheckBox
                                        key={this.state.beginnerLevel.toString() + 1}
                                        rightTextStyle={{
                                            ...Font.regular,
                                            fontSize: moderateScale(12),
                                            color: Color.darkGray
                                        }}
                                        style={{padding: 10, width: widthModal * 0.3}}
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
                                        style={{padding: 10, width: widthModal * 0.3}}
                                        onClick={() => this.setState({mediumLevel: !this.state.mediumLevel})}
                                        isChecked={this.state.mediumLevel}
                                        rightText='Int'
                                        checkBoxColor={Color.yellow}
                                    />
                                    <CheckBox
                                        key={this.state.expertLevel.toString() + 3}
                                        rightTextStyle={{
                                            ...Font.regular,
                                            fontSize: moderateScale(12),
                                            color: Color.darkGray
                                        }}
                                        style={{padding: 10, width: widthModal * 0.3}}
                                        onClick={() => this.setState({expertLevel: !this.state.expertLevel})}
                                        isChecked={this.state.expertLevel}
                                        rightText='Adv'
                                        checkBoxColor={Color.red}
                                    />
                                </View>

                                <View style={styles.buttonView}>
                                    <Button vertical transparent
                                            onPress={() => this.searchEvent()}
                                            style={styles.modalButton}>
                                        <Text style={styles.textButton}>Search</Text>
                                    </Button>

                                    <Button vertical transparent
                                            onPress={this.props.onClose()}
                                            style={styles.modalButton}>
                                        <Text style={styles.textButton}>Cancel</Text>
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
const widthModal = width - 80;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
        backgroundColor: Color.transparentGray
    },
    containerView: {
        height: 350,
        width: widthModal,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        backgroundColor: Color.white,
        borderRadius: 25,
    },
    viewCenter: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.green,
        height: 100,
        width: width,
    },
    fontCheckItem: {
        ...Font.regular,
        fontSize: moderateScale(12),
        color: Color.darkGray
    },
    criteriaView: {
        height: 250,
        width: widthModal,
        justifyContent: 'center',
        padding: 30,
        paddingTop: 20,
        paddingBottom: 20
    },
    levelView: {
        height: 40,
        flexDirection: 'row',
        paddingBottom: 30
    },
    modalButton: {
        width: widthModal / 2,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        ...Font.medium,
        color: Color.white,
        fontSize: moderateScale(20)
    },
    buttonView: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: widthModal,
        backgroundColor: Color.green,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        flexDirection: 'row',

    },
});

