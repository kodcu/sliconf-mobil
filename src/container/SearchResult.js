import React, { Component } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import Header from '../component/Header';
import ChosenCard from '../component/ChosenCard';
import { TALK } from '../router';
import Color from '../theme/Color';

export default class SearchResult extends Component {
    render() {
        const { state } = this.props.navigation;
        const results = state.params;
        return (
            <View style={styles.container}>
                <Header
                    leftImage='chevron-left'
                    onPressLeft={() => this.props.navigation.goBack()}
                >
                    <Header.Title title="Search Result" />
                </Header>
                <ScrollView>
                    {results.items.map((item, i) =>
                        <TouchableOpacity
                            key={i}
                            onPress={() => this.props.navigation.navigate(TALK, item)}
                        >
                            <ChosenCard key={i} item={item} />
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    }
});
