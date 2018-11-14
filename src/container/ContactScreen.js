import React, { Component } from 'react';
import { StyleSheet, Linking, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications';
import { connect } from 'react-redux';

import Header from "../component/Header";
import { actionCreators } from '../reducks/module/drawer';
import Font from "../theme/Font";
import Color from "../theme/Color";
import { moderateScale } from "../theme/Scale";

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
	rowItem = (name, icon, type, index) => (
		<TouchableOpacity
			key={index}
			style={{
				flexDirection: 'row',
				width: '100%'
			}}
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
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					width: '100%',						
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<View 
					style={{ 
						flexDirection: 'row', 
						justifyContent: 'flex-start', 
						width: '60%', 
						height: '100%' 
					}}
				>
					<View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
						<Icon
							name={icon}
							size={40}
							color={Color.darkGray}
						/>
					</View>
					<View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'flex-start' }}>							
						<Text style={styles.aboutText}>{name}</Text>
					</View>
				</View>
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
				<View style={styles.panel}>
					<View style={styles.contact}>
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
	container: {
		flex: 1,
		backgroundColor: Color.white
	},
	panel: {
		width: '100%',
		height: '60%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Color.white,
	},
	contact: {
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 5,
		backgroundColor: Color.white
	},
	aboutText: {
		...Font.regular,
		fontSize: moderateScale(15),
		margin: 15,
		color: Color.darkGray
	}
});

export default connect(mapStateToProps)(ContactScreen);
