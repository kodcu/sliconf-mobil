import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {StyleSheet} from 'react-native'

export const Style = {
    PADDING: responsiveWidth(2),
    MARGIN: responsiveWidth(2),

    CARD_WIDTH: responsiveWidth(95),
    CARD_HEIGHT: responsiveWidth(95) * 0.33,

    FONT_SIZE: responsiveFontSize(2) * 0.85,
    FONT_SIZE_SMALLER: responsiveFontSize(1.5) * 0.85,
    FONT_SIZE_SMALL: responsiveFontSize(1.75)* 0.85,
    FONT_SIZE_TITLE: responsiveFontSize(2.5)* 0.85,
    FONT_SIZE_VERY_SMALL: responsiveFontSize(1)* 0.85,
};

export default StyleSheet.create({
    container: {
        margin: 15,
        width: Style.CARD_WIDTH,
        height: Style.CARD_HEIGHT,
        borderRadius: 10,
        flexDirection: 'column',
        elevation: 1
    },
    containerTop: {
        padding: Style.MARGIN,
        flexDirection: 'row',
        backgroundColor: '#fafafa',
        width: Style.CARD_WIDTH,
        height: Style.CARD_HEIGHT * 0.65,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    containerBottom: {
        padding: Style.MARGIN,
        flexDirection: 'row',
        backgroundColor: '#eeeeee',
        width: Style.CARD_WIDTH,
        height: Style.CARD_HEIGHT * 0.35,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        fontFamily: "Montserrat-Regular",
        fontSize: Style.FONT_SIZE_TITLE,
        lineHeight: Style.FONT_SIZE_TITLE * 1.5,
    },
    subtitle: {
        fontFamily: "Montserrat-Regular",
        fontSize: Style.FONT_SIZE_SMALLER,
        lineHeight: Style.FONT_SIZE_SMALLER * 1.5,
    },
    subtitle2: {
        fontFamily: "Montserrat-Regular",
        fontSize: Style.FONT_SIZE_VERY_SMALL,
        lineHeight: Style.FONT_SIZE_SMALLER * 1.5,

    },
    subtitle3: {
        fontFamily: "Montserrat-Regular",
        fontSize: Style.FONT_SIZE_SMALLER,
        lineHeight: Style.FONT_SIZE_SMALLER * 1.5,
        color: "#fff"
    },
    image: {
        marginRight: Style.MARGIN,
        width: Style.CARD_WIDTH * (0.18),
        height: Style.CARD_WIDTH * (0.18)
    },
    viewTop: {
        width: Style.CARD_WIDTH * 0.7,
        paddingRight: Style.MARGIN
    },
    viewBottom: {
        paddingRight: Style.MARGIN
    },
    viewBottomCon: {
        flexDirection: "row"
    },
    button: {
        height: Style.CARD_HEIGHT * 0.35 * 0.5,
        width: Style.CARD_WIDTH * 0.27,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "#2aa763"
    },
    viewExtra: {
        width: Style.CARD_WIDTH,
        height: Style.CARD_HEIGHT,
        flexDirection: 'row',
        backgroundColor: '#fafafa',
    }

});