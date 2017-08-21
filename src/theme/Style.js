import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default Style = {
    DEVICE_WIDTH: responsiveWidth(100),
    DEVICE_HEIGHT: responsiveWidth(100),

    PADDING: responsiveWidth(2),
    MARGIN: responsiveWidth(2),

    FONT_SIZE: responsiveFontSize(2) * 0.85,
    FONT_SIZE_SMALLER: responsiveFontSize(1.5) * 0.85,
    FONT_SIZE_SMALL: responsiveFontSize(1.75)* 0.85,
    FONT_SIZE_TITLE_SMALL: responsiveFontSize(2)* 0.85,
    FONT_SIZE_TITLE: responsiveFontSize(2.5)* 0.85,
    FONT_SIZE_TITLE_LARGE: responsiveFontSize(3.3)* 0.85,
    FONT_SIZE_VERY_SMALL: responsiveFontSize(1)* 0.85,
};