export function SendComment(
	userId,
	userDeviceId,
	eventId,
	sessionId,
	anonName,
	comment,
	isloginWithAccount,
	isAnon,
) {

}

async sendComment() {
	this.setState({ buttonState: "sending" });
	let userId;
	let fullname;
	if (!this.props.userLoginWithAccount) {
		userId = this.props.userDevice.id;
		const anonymousFullName = this.state.anonymousFullName;
		fullname = anonymousFullName.trim() && Boolean(anonymousFullName) ? anonymousFullName : null;
	} else {
		userId = this.props.user.id;
		fullname = null;
	}

	const eventId = this.props.event.id;
	const sessionId = this.props.sessionId;
	let commentValue = this.state.commentValue.trim();
	commentValue = commentValue.replace(/(\r\n\t|\n|\r\t)/gm, '');
	commentValue = commentValue.replace(/ +(?= )/g, '');
	const time = moment().valueOf();
	const anonymous = this.state.anonymous;

	const { dispatch } = this.props;

	if (this.props.userLoginWithAccount)
		await dispatch(actionCreators.postComment(eventId, sessionId, userId, commentValue, time, anonymous));
	else
		await dispatch(actionCreators.postCommentAnonymous(eventId, sessionId, userId, commentValue, time, fullname));

	if (this.props.error)
		this.buttonTypeChange("sendError")
	else
		this.buttonTypeChange("sendSuccessful")

	this.setState({ commentValue: "", anonymousFullName: '' });
}