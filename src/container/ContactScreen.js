import React, { Component } from 'react';
import { StyleSheet, Linking, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications';
import { connect } from 'react-redux';

import Header from '../component/Header';
import { actionCreators } from '../reducks/module/drawer';
import Font from '../theme/Font';
import Color from '../theme/Color';
import { moderateScale } from '../theme/Scale';

const mapStateToProps = (state) => ({
	event: state.event.event
});

export class ContactScreen extends Component {
	componentWillMount() {
		const { dispatch, navigation } = this.props;
		dispatch(actionCreators.changedDrawer(navigation.state.routeName));
	}

    /**
     * Etkinligin iletisim bilgilerini ekrana basar
     * @param name iletisim bilgisi
     * @param icon kullanilacak ikon ismi
     * @param type mail - telefon (email-phone)
     * @param index
     */
	rowItem = (name, icon, type, index, size = 38) => (
		<TouchableOpacity
			key={index}
			style={[styles.rowCenterer, { width: '84%' }]}
			onPress={() => type === 'phone' ?
				Communications.phonecall(name, true) :
				type === 'web' ?
					this.redirect(this.props.event.about.web) :
					Communications.email(
						[name.toString()],
						null,
						null,
						this.props.event.name + ' About',
						''
					)
			}
		>
			<View style={styles.rowCenterer}>
				<Icon
					style={{ flex: 0.11, height: size, width: size, textAlign: 'center' }}
					name={icon}
					size={size}
					color={Color.darkGray}
				/>
				<Text
					style={[
						styles.aboutText,
						{ flex: 0.89, textAlignVertical: 'center', textAlign: 'left' }
					]}
				>{name}
				</Text>
			</View>
		</TouchableOpacity >
	);

	/**
	 * Sosyal medya linklerini yonlendirir
	 * @param url yonlendirelecek link
	 */
	redirect(url) {
		const regex = /^https?:\/\//i;
		if (url && (url.length > 1) && !regex.test(url)) {
			url = 'http://' + url;
			Linking.canOpenURL(url).then(supported => {
				if (supported) {
					Linking.openURL(url);
				}
			}).catch(err => console.error('An error occurred', err));
		}
	}

	render() {
		const event = this.props.event;
		const about = event.about;
		return (
			<View style={styles.container}>
				<Header
					leftImage='chevron-left'
					rightImage='bars'
					onPressLeft={() => this.props.navigation.goBack()}
					onPressRight={() =>
						this.props.navigation.navigate('DrawerOpen')
					}
				>
					<Header.Title title="Contact Us" />
				</Header>
				<View style={[styles.rowCenterer, styles.container]}>
					<View style={[styles.columnCenterer, styles.contact]}>
						{about.web ? this.rowItem(about.web, 'ios-globe-outline', 'web') : null}
						{about.email ? this.rowItem(about.email, 'ios-at-outline', 'email') : null}
						{about.phone ?
							about.phone.map((item, index) => {
								const icon = index && index > 0 ?
									'ios-call-outline' :
									'ios-phone-portrait';
								return item.trim() && (item.trim().length > 6) ?
									this.rowItem(
										item,
										icon,
										'phone',
										index
									) :
									null;
							}
							) : null
						}
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	columnCenterer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center'
	},
	rowCenterer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center'
	},
	container: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		backgroundColor: Color.white
	},
	contact: {
		width: '96%',
		height: '64%',
		backgroundColor: Color.white
	},
	aboutText: {
		...Font.regular,
		flex: 1,
		margin: 10,
		fontSize: moderateScale(16),
		color: Color.darkGray
	}
});

export default connect(mapStateToProps)(ContactScreen);
