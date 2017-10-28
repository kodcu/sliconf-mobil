import React, {Component} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Footer,
    FooterTab,
    Form,
    Icon,
    Item,
    List,
    Picker,
    Thumbnail,
    Title
} from 'native-base';
import Header from "../component/Header";
import {connect} from 'react-redux'
import {SPEAKERINFO} from '../router';
import {actionCreators} from "../reducks/module/drawer";

const mapStateToProps = (state) => ({
    event: state.event.event,
})

class SpeakersScreen extends Component {


    state = {
        weye: [],
        selected: 0
    }
    _keyExtractor = (item, index) => index;
    handleScroll = (event) => {
        const {weye,} = this.state
        const DATAS = this.props.event.speakers

        let scrollIndex = Math.floor(event.nativeEvent.contentOffset.y / 205)
        let leftSpeaker = DATAS[(scrollIndex === -1 ? 0 : scrollIndex) * 2]
        let nameChar = leftSpeaker.name.charAt(0).toUpperCase()
        let index = Object.keys(weye).indexOf(nameChar);
        this.setState({selected: index})
    }
    setSelected = (index, item) => {
        this.setState({selected: index})
        this.myfunction(item)
    }
    myfunction = (letter) => {
        let DATAS = this.props.event.speakers
        if (this.state.weye[letter] !== undefined) {
            let item = this.state.weye[letter][0]
            this.myFlatList.scrollToIndex({animated: true, index: Math.floor(0.5 * DATAS.indexOf(item))});
        }
    }
    getItemLayout = (data, index) => ({length: 200, offset: 200 * index, index});

    speakersList(sp) {
        let changedSpeakersList = [];
        let myMap = new Map();
        sp.forEach(function (element) {
            let char = element.name.charAt(0).toUpperCase()
            myMap.get(char) ? array = myMap.get(char) : array = []
            array.push(element)
            myMap.set(char, array)
        });

        myMap.forEach(function (value, key) {
            changedSpeakersList = {...changedSpeakersList, [key]: value}
        })

        return changedSpeakersList
    }

    renderRow(info) {
        return <TouchableOpacity onPress={() => this.props.navigation.navigate(SPEAKERINFO, info)}><View
            style={styles.card}>
            <Thumbnail source={{uri: info.item.profilePicture}} large style={{marginBottom: 15}}/>
            <Text style={{fontSize: 15, color: '#000'}}>{info.item.name}</Text>
            <Text style={{fontSize: 12, color: '#BCBEC0'}}>{info.item.workingat}</Text>
        </View></TouchableOpacity>


    }

    componentWillMount() {
        const {dispatch, navigation} = this.props;
        dispatch(actionCreators.changedDrawer(navigation.state.routeName));

        this.setState({
            weye: this.speakersList(this.props.event.speakers)
        })
    }

    componentWillUpdate(nextProps, nextState) {
        console.log(nextState)
    }

    // Hangi harfe basarsa git arrayda o harfin ilk elemanını bul sonra onun indexine flatlistin scrollto özelliği ile git
    render() {

        const sel = this.state.selected;
        return (
            <Container style={{backgroundColor: '#fff'}}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack(null)}
                        onPressRight={() => {
                            this.props.navigation.navigate('DrawerOpen')
                        }}>
                    <Header.Title title="Speakers"/>
                </Header>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <View style={{flexGrow: 0.8}}>
                        <FlatList
                            data={this.props.event.speakers}
                            renderItem={(info) => this.renderRow(info)}
                            keyExtractor={this._keyExtractor}
                            numColumns={2}
                            ref={(list) => this.myFlatList = list}
                            getItemLayout={this.getItemLayout}
                            onScroll={this.handleScroll}
                        />
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 5,
                        paddingBottom: 10,
                        flexGrow: 0.2
                    }}>
                        {Object.keys(this.state.weye).map((myi, i) =>
                            <TouchableOpacity onPress={() => this.setSelected(i, myi)} key={i}>
                                <Text style={{
                                    fontFamily: "Montserrat-Regular",
                                    fontSize: sel === i ? 35 : ( (sel - 1) === i || (sel + 1) === i ) ? 27 : ( (sel - 2) === i || (sel + 2) === i ) ? 20 : 15
                                }}>{myi}</Text>
                            </TouchableOpacity>
                        )}

                    </View>
                </View>


            </Container>
        );
    }
}

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    card: {
        width: (width / 2) - 25,
        height: 200,
        marginLeft: 10,
        marginTop: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#F1F2F2',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default connect(mapStateToProps)(SpeakersScreen)