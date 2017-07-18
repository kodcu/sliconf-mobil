import React from 'react';

import {
  View,
  StyleSheet,
  Image
} from 'react-native';

import { Grid, Row, Col } from "react-native-easy-grid";
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, CheckBox } from 'native-base';
import {
  ThinGrayLine,
  ThickGrayLine,
  ThickDarkGrayLine,
  ThinRedLine,
} from './Lines';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  leftPane: {
    backgroundColor: '#33373B',
    padding: 16,
    justifyContent: 'center',
  },
  rightPane: {
      padding: 16,
    backgroundColor: '#fff',
  },
});
const background = require("../../../images/contacts/sanket.png");
export default ({ onPress }) => (

    <View style={styles.container}>
        
        <Grid>
            <Col size={1} style={styles.leftPane}>
                 <Thumbnail source={background} />
                 <Text note>Göksel</Text>
                 <Text note>Pirnal</Text>
            </Col>

            <Col size={4} style={styles.rightPane}>
                <Row>
                   <Text> React Native nedir?? </Text>
                   <Right><CheckBox/></Right>
                </Row>
                  
                <Row>
                    <Button transparent>
                        <Icon name='home' />
                        <Text>Büyük İskender Salonu</Text>
                    </Button>
                </Row>

                
                <Row>
                    <Right>
                        <Button transparent onPress={onPress}>
                            <Icon name='menu' />
                        </Button>
                     </Right> 
                </Row>
                

            </Col>
        </Grid>

        

  </View>

  
);
