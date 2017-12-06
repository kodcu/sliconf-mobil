import React, {Component} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container, Thumbnail} from 'native-base';
import Header from "../component/Header";
import {connect} from 'react-redux'
import {SPEAKERINFO} from '../router';
import {actionCreators} from "../reducks/module/drawer";
import Font from "../theme/Font";
import Color from "../theme/Color";
import getImage from "../helpers/getImageHelper"
import {moderateScale} from "../theme/Scale";


const mapStateToProps = (state) => ({
    event: state.event.event,
});

class SpeakersScreen extends Component {


    state = {
        speakersList: [],
        selected: 0
    };

    /**
     * Flatlistteki itemlerin karismamasi icin key verir.
     * @param item
     * @param index
     * @private
     */
    _keyExtractor = (item, index) => index;

    /**
     * Scroll view hareket ettirildiginde en ustteki konusmacinin bas harfi secilen harf olur.
     * @param event
     */
    handleScroll = (event) => {
        const {speakersList} = this.state;
        const DATAS = this.props.event.speakers;

        let scrollIndex = Math.floor(event.nativeEvent.contentOffset.y / 205);
        let leftSpeaker = DATAS[(scrollIndex === -1 ? 0 : scrollIndex) * 2];
        let nameChar = leftSpeaker.name.charAt(0).toUpperCase();
        let index = Object.keys(speakersList).indexOf(nameChar);
        this.setState({selected: index})
    };
    /**
     * Harf listesinden secilen harfe gore state guncellenir.
     * @param index secilen harfin indexi
     * @param item
     */
    setSelected = (index, item) => {
        this.setState({selected: index});
        this.redirectByFirstLetter(item)
    };
    /**
     * Gelen bas harfe sahip olan ilk konusmacinin yerine scroll yapar.
     * @param letter gelen harf
     */
    redirectByFirstLetter = (letter) => {
        let DATAS = this.props.event.speakers;
        if (this.state.speakersList[letter] !== undefined) {
            let item = this.state.speakersList[letter][0];
            this.myFlatList.scrollToIndex({animated: true, index: Math.floor(0.5 * DATAS.indexOf(item))});
        }
    };
    /**
     * Listedeki herbir elemanin boyutu tanimlanir
     * @param data
     * @param index
     */
    getItemLayout = (data, index) => ({length: 200, offset: 200 * index, index});

    /**
     * Konusmacilarin bas harflerine gore dizi olusturur.
     * @param speakers
     * @returns {Array}
     */
    createSpeakersList(speakers) {
        let changedSpeakersList = [];
        let speakersMap = new Map();
        speakers.forEach(function (element) {
            let char = element.name.charAt(0).toUpperCase();
            speakersMap.get(char) ? array = speakersMap.get(char) : array = [];
            array.push(element);
            speakersMap.set(char, array)
        });

        speakersMap.forEach(function (value, key) {
            changedSpeakersList = {...changedSpeakersList, [key]: value}
        });

        return changedSpeakersList
    }

    /**
     * Konusmacilarin ekranda gosterir.
     * @param info konusmaci bilgileri
     * @returns {XML}
     */
    renderRow(info) {
        return <TouchableOpacity onPress={() => this.props.navigation.navigate(SPEAKERINFO, info)}><View
            style={styles.card}>
            <Thumbnail source={!info.item.profilePicture.trim()?require('../../images/hi.png'):{uri: getImage(info.item.profilePicture)}} large style={{marginBottom: 15}}/>
            <Text style={styles.speakerName}>{info.item.name}</Text>
            <Text style={styles.speakerWorking}>{info.item.workingAt}</Text>
        </View></TouchableOpacity>
    }

    componentWillMount() {
        const {dispatch, navigation} = this.props;
        dispatch(actionCreators.changedDrawer(navigation.state.routeName));

        const speakersData = this.props.event.speakers;

        if (speakersData !== undefined && speakersData !== null && !speakersData.isEmpty) {
            this.setState({
                speakersList: this.createSpeakersList(speakersData)
            })
        }
    }


    render() {
        const selectedIndex = this.state.selected;
        return (
            <Container style={{backgroundColor: '#fff'}}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack(null)}
                        onPressRight={() => {
                            this.props.navigation.navigate('DrawerOpen')
                        }}>
                    <Header.Title title="Speakers"/>
                </Header>
                {(this.props.event.speakers === undefined || this.props.event.spakers === null) ?

                    <View style={styles.notFoundPanel}>
                        <Text style={styles.notFoundText}>
                            Speakers Not Found
                        </Text>
                    </View>

                    :

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
                        <View style={styles.alphabeticPart}>
                            {Object.keys(this.state.speakersList).map((speakersFirstLetter, index) =>
                                <TouchableOpacity onPress={() => this.setSelected(index, speakersFirstLetter)}
                                                  key={index}>
                                    <Text style={{
                                        fontFamily: "Montserrat-Regular",
                                        fontSize: selectedIndex === index ? moderateScale(22) :
                                            ( (selectedIndex - 1) === index || (selectedIndex + 1) === index ) ? moderateScale(16) :
                                            ( (selectedIndex - 2) === index || (selectedIndex + 2) === index ) ? moderateScale(12) :
                                                moderateScale(9)
                                    }}>{speakersFirstLetter}</Text>
                                </TouchableOpacity>
                            )}

                        </View>
                    </View>
                }

            </Container>
        );
    }
}

const width = Dimensions.get('window').width;
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
    },
    alphabeticPart: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        paddingBottom: 10,
        flexGrow: 0.2
    },
    notFoundText: {
        ...Font.thin,
        color: Color.darkGray
    },
    notFoundPanel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    speakerName: {
        ...Font.regular,
        fontSize: moderateScale(15),
        color: Color.darkGray
    },
    speakerWorking:{
        ...Font.light,
        fontSize: moderateScale(12),
        color: Color.darkGray3
    }
});

export default connect(mapStateToProps)(SpeakersScreen)