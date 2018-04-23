import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import Header from "../component/Header";
import {connect} from 'react-redux'
import Color from "../theme/Color";
import Icon from 'react-native-vector-icons/Ionicons'
import {height, moderateScale, width} from "../theme/Scale";
import Font from "../theme/Font";
import {actionCreators} from "../reducks/module/drawer";
import imageHelper from "../helpers/getImageHelper"
import FloorImage from 'react-native-transformable-image';

const mapStateToProps = (state) => ({
    floorplan: state.event.event.floorPlan,
});

class FloorPlan extends Component {
    state = {
        selected:0
    };

    componentWillMount(){
        const {dispatch,navigation} = this.props;
        dispatch(actionCreators.changedDrawer(navigation.state.routeName));
    }

    render() {
        let floorplan = this.props.floorplan;
        const selected = this.state.selected;
        return (
            <View style={styles.container}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {
                            this.props.navigation.navigate('DrawerOpen')
                        }}>
                    <Header.Title title="Floor Plan"/>
                </Header>

                {(floorplan === undefined || floorplan === null) ?

                    <View style={styles.notFoundPanel}>
                        <Text style={styles.notFoundText}>
                            Floor Plan Not Found
                        </Text>
                    </View>

                    :

                    <View style={styles.container}>
                        {floorplan[selected].image.trim() ? 
                            <FloorImage style={[styles.container, { margin: 8, right: 4 }]} source={{uri:imageHelper(floorplan[selected].image)}} /> 
                            : 
                            <View style={styles.placeHolder}>
                                <View style={styles.placeHolderSub}>
                                    <ImageBackground 
                                        source={require('../../images/emptyCard.png')} 
                                        style={{ flex: 1, margin: 2, justifyContent: 'center', alignItems: 'center' }}
                                    > 
                                        <Text style={styles.placeHolderText}>There is no image for this floor</Text>
                                    </ImageBackground>
                                </View>
                            </View>
                        }

                        <TouchableOpacity
                            style={[styles.change, { right: 1, marginLeft: 1 }]}
                            onPress={() => floorplan.length - 1 === selected ? null : this.setState({selected: selected + 1})}
                        >
                            <Icon name='ios-arrow-dropright' size={50} color={Color.darkGray}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.change, { left: 5 }]}
                            onPress={() => 0 === selected ? null : this.setState({selected: selected - 1})}
                        >
                            <Icon name='ios-arrow-dropleft' size={50} color={Color.darkGray}/>
                        </TouchableOpacity>
                    </View>

                }

                <Image style={styles.zoom}
                       source={require('../../images/zoom-out.png')}/>

                <Text style={styles.floorName}>{floorplan[selected].name}</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    change:{
        width: 50,
        height: 50,
        backgroundColor: Color.transparent,
        position: 'absolute',
        top: (height / 2) - 75,
        justifyContent: 'center'
    },
    notFoundText:{
        ...Font.thin,
        color:Color.darkGray
    },
    notFoundPanel:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    zoom:{
        position: 'absolute',
        right: 3,
        bottom: 3,
        width: 40,
        height: 40
    } ,
    floorName:{
        ...Font.semiBold,
        color:Color.darkGray,
        fontSize: moderateScale(20),
        position: 'absolute',
        left: 3,
        bottom: 3,

    },
    placeHolder: {
        flex: 1,
        justifyContent: 'center',
        margin: 50,
        backgroundColor: Color.white,
        borderColor: Color.darkGray4,
        borderWidth: 0.5,
        borderRadius: 15,
    },
    placeHolderSub: {
        flex: 1,
        justifyContent: 'center',
        margin: 10,
        backgroundColor: Color.white,
        borderColor: Color.darkGray5,
        borderWidth: 0.5,
        borderRadius: 15,
    },
    placeHolderText: {
        ...Font.semiBold, 
        color:Color.black,
        textAlign: 'center',
        position: 'absolute',
        transform: [{ rotate: '45deg'}]
    }
});

export default connect(mapStateToProps)(FloorPlan)