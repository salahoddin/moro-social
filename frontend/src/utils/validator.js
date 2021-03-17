const valid = ({ fullname, username, email, password, confirmPassword }) => {
	const err = {}

	if (!fullname) {
		err.fullname = 'Please provide your full name'
	} else if (fullname.length > 25) {
		err.fullname = 'Only 25 chars allowed for fullname'
	}

	if (!username) {
		err.username = 'Please provide your username'
	} else if (username.replace('/ /g', '').length > 25) {
		err.username = 'Only 25 chars allowed for username'
	}

	if (!email) {
		err.email = 'Please provide an email'
	} else if (!validateEmail(email)) {
		err.email = 'Please provide a valid email'
	}

	if (!password) {
		err.password = 'Please provide a password'
	} else if (password.length < 6) {
		err.password = 'Password must be atleast 6 characters'
	}
	if (password && password !== confirmPassword) {
		err.confirmPassword = 'Passwords did not match'
	}
	return {
		errorMessage: err,
		errLength: Object.keys(err).length,
	}
}
function validateEmail(email) {
	//eslint-disable-next-line
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

export default valid
