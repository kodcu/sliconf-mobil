import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux'
import {actionCreators} from '../reducks/module/drawer'
import getImage from "../helpers/getImageHelper";
import Color from "../theme/Color";
import * as Scale from "../theme/Scale";
import Font from "../theme/Font";
import Header from "../component/Header";

const mapStateToProps = (state) => ({
    sponsors: state.event.event.sponsors,
    sponsorTags: state.event.event.sponsorTags,
});

export class SponsorScreen extends Component {

    componentWillMount(){
        const {dispatch,navigation} = this.props;
        dispatch(actionCreators.changedDrawer(navigation.state.routeName));
    }

    render() {

        const sponsorEv = this.props.sponsors;
        const sponsorTags = this.props.sponsorTags;
        let sponsors = [];

        if (sponsorEv !== undefined && sponsorEv !==null && !sponsorEv.isEmpty)
            sponsors = sponsorEv;

        return (
            <View style={styles.container}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {
                            this.props.navigation.navigate('DrawerOpen')
                        }}>
                    <Header.Title title="Sponsors"/>
                </Header>

                <ScrollView style={styles.tab}>
                    <View style={styles.sponsorTagPanel}>
                        <View style={styles.sponsor}>
                            {Object.keys(sponsors).map((item, index) =>
                                <View key={index} style={styles.sponsorTagPanel}>
                                    <Text style={styles.sponsorTag}>{sponsorTags[item]}</Text>

                                        <FlatList
                                            data={sponsors[item]}
                                            numColumns={2}
                                            keyExtractor={(item, i) => i}
                                            renderItem={(info) =>{
                                                return <Image source={{uri: getImage(info.item.logo)}}
                                                              resizeMode="contain"
                                                              style={styles.sponsorLogo}
                                                />}
                                            }
                                        />
                                    </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    tab: {
        flex: 1,
        backgroundColor: Color.white,
    },
    sponsorLogo: {
        margin: 5,
        width: (Scale.width - 30) * 0.4,
        height: (Scale.width - 30) * 0.4
    },
    sponsorPanel: {
        alignItems: 'center',
        flex: 1
    },
    sponsorTag: {
        ...Font.bold,
        fontSize: 20,
        color: Color.green,
        margin: 10,
        marginTop: 20
    },
    sponsorTagPanel: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    sponsor: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    }
});

export default connect(mapStateToProps)(SponsorScreen)