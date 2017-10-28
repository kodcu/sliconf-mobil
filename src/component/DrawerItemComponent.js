import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Font from "../theme/Font";

const DrawerItem = ({navigation, icon, name, screenName, color,current}) =>
    <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {if(current !== screenName) navigation.navigate(screenName);}}>
        {<Icon name={icon} size={25} color={color} style={{margin: 15,width:25}}/>}
        <Text style={{
            ...Font.regular,
            fontSize: 15,
            margin: 15,
            color: color
        }}>{name}  </Text>

    </TouchableOpacity>


const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row'
    },
});

export default DrawerItem
