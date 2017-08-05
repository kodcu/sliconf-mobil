import React, { Component } from 'react';
import { Modal, Text, View , ActivityIndicator} from 'react-native';

export default class Loading extends Component {

    render() {
        const {visible} = this.props;
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
