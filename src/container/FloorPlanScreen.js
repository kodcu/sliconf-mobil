import React, {Component} from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import Image from 'react-native-transformable-image';
import Header from "../component/Header";
import {connect} from 'react-redux'


const mapStateToProps = (state) => ({
    floorplan: state.event.event.floorplan,
})

class FloorPlan extends Component {


    render() {
        const floorplan = this.props.floorplan
        return (
            <View style={styles.container}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {
                            this.props.navigation.navigate('DrawerOpen')
                        }}>
                    <Header.Title title="Floor Plan"/>
                </Header>

                {floorplan ? <Image style={{flex: 1}} source={{uri: floorplan}}
                                    onLoad={() => ToastAndroid.show("Use your fingers to zoom", ToastAndroid.LONG)}/> :
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>NotFound</Text></View>}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#fff',},
});

export default connect(mapStateToProps)(FloorPlan)