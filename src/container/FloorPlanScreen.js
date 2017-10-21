import React, {Component} from 'react';
import {View, Text, StyleSheet,} from 'react-native';
import Image from 'react-native-transformable-image';
import Header from "../component/Header";
import {connect} from 'react-redux'


const mapStateToProps = (state) => ({
    floorplan: state.event.event.floorplan,
});

class FloorPlan extends Component {


    render() {
        const floorplan = this.props.floorplan;
        return (
            <View style={styles.container}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {
                            this.props.navigation.navigate('DrawerOpen')
                        }}>
                    <Header.Title title="Floor Plan"/>
                </Header>

                {floorplan ? <Image style={{flex: 1}} source={{uri: floorplan}}/> :
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>NotFound</Text></View>}

                <Image style={{position:'absolute',right:0,bottom:0,width:40,height:40}} source={require('../../images/zoom-out.png')}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#fff',},
});

export default connect(mapStateToProps)(FloorPlan)