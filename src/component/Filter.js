import React, { Component } from 'react';
import { Modal, Text, View , ActivityIndicator,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class Filter extends Component {

    render() {
        const {visible,onPress} = this.props;
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
                        }}>
                        <View
                            style={{
                                height: 400,
                                width: 300,
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
                                <Text style={{marginTop: 5,fontWeight :'bold', color :'#789'}}>...</Text>
                                <Text style={{marginTop: 5,fontWeight :'bold', color :'#123'}}>...</Text>
                                <Text style={{marginTop: 5,fontWeight :'bold', color :'#911'}}>...</Text>
                                <TouchableOpacity onPress={onPress}>
                                    <Text style={{marginTop: 5,fontWeight :'bold', color :'#ab2'}}>TAMAM</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </Modal>


            </View>
        );
    }
}