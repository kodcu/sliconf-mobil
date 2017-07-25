/**
 * Created by anil on 21/07/2017.
 */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Content,Card ,CardItem,Separator,ScrollableTab,Thumbnail,ListItem,List,Text } from 'native-base';
import StarRating from 'react-native-star-rating';
import CommentsFooter from './CommentsFooter'
import { NavigationActions} from "react-navigation";
export default class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customStarCount: 2.5,
            status:false
        };
    }

    onCustomStarRatingPress(rating) {
        this.setState({
            customStarCount: rating,
        });
    }


    render() {
        return (
            <Container>
                <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.dispatch(NavigationActions.back())} >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Fuse Integrasyonu ve performans analizi</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container2}>
                    <Text>Oda : Boğaziçi 2 Salonu</Text>
                </View>
                <View style={styles.container}>
                    <StarRating
                        disabled={false}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        maxStars={5}
                        rating={this.state.customStarCount}
                        selectedStar={(rating) => this.onCustomStarRatingPress(rating)}
                        starColor={'red'}
                        emptyStarColor={'blue'}
                    />
                </View>
                <View style={styles.separator}/>
                <CommentsFooter/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    container2: {
        alignSelf:'center',
        flexDirection:'row'
    },
    separator: {
        height: 1,
        backgroundColor: '#000000',
        margin:10
    },
    ask: {
        flexDirection:'row',
        borderWidth:3,
        margin:20,
    },

});