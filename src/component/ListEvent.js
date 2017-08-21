import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native'
import {Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles,{Style} from "./styles/ListEventStyle"


export default class LoginScreen extends Component {
    state = {
        show: false
    }

    _toggle = () => {
        this.setState({show: !this.state.show})
    }

    _onPress = () =>{
        const {onPress} = this.props
        onPress(this.props.event.id)
    }
    render() {
        const {id, name, date, logo,} = this.props.event;

        const height = this.state.show ? {card : Style.CARD_HEIGHT * 2, extra: Style.CARD_HEIGHT , button: 0} :
            {card : Style.CARD_HEIGHT , extra: 0 , button: Style.CARD_HEIGHT * 0.65}

        return (
            <View style={[styles.container, {height:height.card}]}>
                <View style={styles.containerTop}>

                    <Thumbnail large style={styles.image}
                               source={logo === undefined ?  require("../../images/logo.png") : {uri: logo}}/>
                    <View style={styles.viewTop}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.subtitle}>Java Day Istanbul including 1 keynote, 43 sessions with 3 parallel
                            tracks is dedicated to help the software developers and IT professionals to improve their professional skills.</Text>
                    </View>

                    <TouchableOpacity style={{paddingTop:Style.CARD_HEIGHT*0.4,height:height.button}} onPress={this._toggle}>
                        <Icon name='chevron-down' />
                    </TouchableOpacity>

                </View>

                <View style={[styles.viewExtra, {height: height.extra}]}>

                    <View style={{width:Style.CARD_WIDTH * 0.92}}>
                    </View>

                    <TouchableOpacity style={{paddingTop:Style.CARD_HEIGHT - Style.MARGIN * 3}} onPress={this._toggle}>
                        <Icon name='chevron-up' />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerBottom}>
                    <View style={styles.viewBottomCon}>
                        <View style={styles.viewBottom}>
                            <Text style={styles.subtitle2}>Event Date</Text>
                            <Text style={styles.subtitle}>{date}</Text>
                        </View>
                        <View style={styles.viewBottom}>
                            <Text style={styles.subtitle2}>Event Code</Text>
                            <Text style={styles.subtitle}>{id}</Text>
                        </View>
                        <View style={styles.viewBottom}>
                            <Text style={styles.subtitle2}>Event Duration</Text>
                            <Text style={styles.subtitle}>3 Days</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={this._onPress}>
                            <Text style={styles.subtitle3}>Go To Event</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}

