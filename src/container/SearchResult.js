import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import Header from "../component/Header";
import ChosenCard from '../component/ChosenCard'
import {AGENDA} from '../router';
export default class SearchResult extends Component {

    render() {
        const {state} = this.props.navigation;
        let results= state.params
        console.log(results)
        return (
            <View style={styles.container}>
                <Header leftImage='chevron-left'
                        onPressLeft={() => this.props.navigation.goBack()}>
                    <Header.Title title="Search Result" />
                </Header>
                <ScrollView>
                    {results.map((item, i) =>
                        <ChosenCard key={i} item={item}/>
                    )}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
});
