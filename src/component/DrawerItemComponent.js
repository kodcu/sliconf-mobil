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
import Icon2 from 'react-native-vector-icons/FontAwesome'

const DrawerItem = ({navigation, icon, name, screenName, color, onPress}) =>

    <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
            navigation.navigate(screenName);
            onPress();
        }}
    >
        {icon === 'building-o' ? <Icon2 name={icon} size={25} color={color} style={{margin: 15}}/> : <Icon name={icon} size={25} color={color} style={{margin: 15}}/>}
        <Text style={{
            fontFamily: "Montserrat-Regular",
            fontSize: 15,
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
