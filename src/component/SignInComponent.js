import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Thumbnail } from 'native-base';

import { moderateScale } from "../theme/Scale";
import Font from "../theme/Font";
import Color from "../theme/Color";

const SignInComponent = ({ login }) =>
	(
		<View style={{ flexDirection: 'row' }}>
			<TouchableOpacity
				style={{
					flexDirection: 'row',
					padding: 5,
					justifyContent: 'space-between',
					alignItems: 'center',
					flex: 1,
					height: 80
				}} onPress={login}
			>
				<Thumbnail
					source={require('../../images/hi.png')}
					style={{ margin: 5, }}
				/>
				<View style={{ justifyContent: 'center', margin: 15 }}>
					<Text
						style={{
							...Font.semiBold,
							fontSize: moderateScale(20),
							color: Color.darkGray
						}}
					>Sign in</Text>
				</View>
				<Icon name='ios-log-in-outline' size={20} style={{ marginRight: 15 }} />
			</TouchableOpacity>
		</View>
	);

export default SignInComponent;
