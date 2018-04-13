import React, { Component } from 'react';
import { Modal, Text, View , ActivityIndicator,Dimensions} from 'react-native';
import PropTypes from 'prop-types';

export default class Loading extends Component {

    render() {
        const {visible} = this.props;
        return (
            <View>
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => {}}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width:Dimensions.get('window').width,
                            height:Dimensions.get('window').height,
                            backgroundColor:'rgba(0,0,0,0.1)'
                        }}>
                        <View
                            style={{
                                height: 150,
                                width: 150,
                                borderWidth: 2,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: '#789',
                                backgroundColor: '#f5f5f5',
                                borderRadius: 25,
                            }}>
                            <View style={{
                                alignSelf:'center',
                                alignItems:'center',
                                justifyContent :'center',
                            }}>
                                <ActivityIndicator animating={true} color= '#789' size='large'/>
                                <Text style={{marginTop: 25,fontWeight :'bold', color :'#789'}}>Loading...</Text>

                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}