import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    KeyboardAvoidingView,
    FlatList,
    Button,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
    event: state.event.event,
})

class HomeScreen extends React.Component {


    render() {
        const {event} = this.props
        console.log("home screen",event)
        return (
            <View>
                <Text>{event.name}</Text>
                <Text>{event.date}</Text>
                <Text>{event.id}</Text>

            </View>
        )
    }
}

export default connect(mapStateToProps)(HomeScreen)