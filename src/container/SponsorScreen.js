import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux'
import {actionCreators} from '../reducks/module/drawer'
import getImage from "../helpers/getImageHelper";
import Color from "../theme/Color";
import * as Scale from "../theme/Scale";
import {moderateScale} from "../theme/Scale";
import Font from "../theme/Font";
import Header from "../component/Header";

const mapStateToProps = (state) => ({
    sponsors: state.event.event.sponsors,
    sponsorTags: state.event.event.sponsorTags,
});

export class SponsorScreen extends Component {

    componentWillMount() {
        const {dispatch, navigation} = this.props;
        dispatch(actionCreators.changedDrawer(navigation.state.routeName));

    }

    sortSponsorsByTag(sponsors) {
        const sorted = {};
        Object.keys(sponsors).sort().forEach(function (key) {
            sorted[key] = sponsors[key];
        });
        return sorted;
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    margin:20,
                    borderTopWidth: 1,
                    borderTopColor: 'black'
                }}
            />
        )
    }

    render() {

        const sponsorEv = this.sortSponsorsByTag(this.props.sponsors);
        const sponsorTags = this.props.sponsorTags;
        let sponsors = [];


        if (sponsorEv !== undefined && sponsorEv !== null && !sponsorEv.isEmpty)
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

                <ScrollView style={styles.panel}>
                    <View style={styles.sponsorTagPanel}>
                        <View style={styles.sponsor}>
                            {Object.keys(sponsors).map((item, index) =>
                                <View key={index} style={styles.sponsorTagPanel}>
                                    <Text style={styles.sponsorTag}>{sponsorTags[item]}</Text>
                                    {sponsors[item].map((item2, index2) => <View key={index2} >
                                            {this.renderItem(item2)}
                                        {(index2 !== sponsors[item].length - 1) && this.renderSeparator()}
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

    renderItem(info) {
        if (info.logo.trim())
            return( <Image source={{uri: getImage(info.logo)}}
                          resizeMode="contain"
                          style={styles.sponsorLogo}/>)
        else
            return <Text style={styles.sponsorName}>{info.name}</Text>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    panel: {
        flex: 1,
        backgroundColor: Color.white,
    },
    sponsorLogo: {
        padding: 5,
        width: (Scale.width - 30) * 0.4,
        height: (Scale.width - 30) * 0.4,
    },
    sponsorName: {
        ...Font.regular,
        color: Color.darkGray2,
        fontSize: moderateScale(20),
        padding: 20,
        textAlign: 'center'
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
        flex: 1,
    },
    sponsor: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    }
});

export default connect(mapStateToProps)(SponsorScreen)