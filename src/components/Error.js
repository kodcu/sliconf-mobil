import React, { Component } from 'react';
import { Modal, Text, View , ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Error extends Component {

    render() {
        const {visible,message} = this.props;
        return (
            <View style={{ marginTop: 22 }}>
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
                        }}>
                        <View
                            style={{
                                height: 150,
                                width: 150,
                                borderWidth: 2,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: '#d22',
                                backgroundColor: '#fff',
                                borderRadius: 25,
                            }}>
                            <View style={{
                                alignSelf:'center',
                                alignItems:'center',
                                justifyContent :'center',
                            }}>
                                <Ionicons name="md-close-circle" size={50} color="#d22" />
                                <Text style={{marginTop: 15,fontWeight :'bold', color :'#d22',textAlign :'center'}}>{message}</Text>
                            </View>
                        </View>
                    </View>
                </Modal>


            </View>
        );
    }
}
