import React, {Component} from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    ListView,
    Image,
    StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {SPEAKERS} from "../router";

const DrawerItem = ({navigation, icon, name, screenName, color, onPress}) =>

    <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
            navigation.navigate(screenName);
            onPress();
        }}
    >
        <Icon name={icon} size={25} color={color} style={{margin: 15}}/>
        <Text style={{
            fontSize: 15,
            fontWeight: '300',
            margin: 15,
            color: color
        }}>{name}  </Text>

    </TouchableOpacity>


const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row'
    },
})

export default DrawerItem
