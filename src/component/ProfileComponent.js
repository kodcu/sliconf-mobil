import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Thumbnail } from 'native-base';

import { moderateScale } from "../theme/Scale";
import Color from "../theme/Color";
import Font from "../theme/Font";

const ProfileComponent = ({ profileUrl, username, email, logout }) =>
	(
		<View style={{ flexDirection: 'row' }}>
			<View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', }}>
				<TouchableOpacity
					style={{ flexDirection: 'row', padding: 5, flex: 0.85 }} 
					onPress={() => {}}
				>
					<Thumbnail
						source={require('../../images/hi.png')}
						style={{ margin: 5, }}
					/>
					<View style={{ justifyContent: 'center', flex: 1 }}>
						<Text
							style={{
								...Font.semiBold,
								fontSize: moderateScale(15),
								color: Color.darkGray
							}}
						>{username}</Text>
						<Text
							style={{
								...Font.regular,
								color: Color.darkGray4,
								fontSize: moderateScale(8)
							}}
						>{email}</Text>
					</View>
				</TouchableOpacity>
				<View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
					<Button
						transparent
						onPress={logout}
					>
						<Icon name='ios-log-out-outline' size={20} />
					</Button>
				</View>
			</View>
		</View>
	);

export default ProfileComponent;
