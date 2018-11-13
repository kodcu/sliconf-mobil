import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Color from '../theme/Color';
import Font from '../theme/Font';
import { moderateScale } from '../theme/Scale';

export default class BreakTimeCard extends Component {
    render() {
        const item = this.props.item;
        return (
            <View style={styles.container}>
                <View style={styles.cardLine}>
                    <View style={styles.line} />
                    <View style={styles.detailField}>
                        <Text style={styles.topic}>{item.topic} </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 30,
    },
    detailField: {
        flex: 0.7,
        paddingLeft: 5,
        justifyContent: 'center'
    },
    cardLine: {
        backgroundColor: Color.white,
        borderRadius: 10,
        flexDirection: 'row',
        margin: 5,
        borderColor: Color.gray2,
        borderWidth: 0.5,
        height: 40
    },
    topic: {
        ...Font.regular,
        fontSize: moderateScale(9),
        textAlign: 'left',
        textAlignVertical: 'center',
        color: Color.darkGray,
        margin: 5
    },
    line: {
        borderColor: Color.brown,
        borderWidth: 1,
        margin: 0,
        marginLeft: 10
    }
});
