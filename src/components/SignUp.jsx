const SignUp = () => {
	return (
		<div className="home_account">
			<h1>CREATE ACCOUNT</h1>
			<input type="text" placeholder="Enter name" className="info" />
			<input type="email" placeholder="Enter Email" className="info" />
			<input type="password" placeholder="Enter password" className="info" />
			<input type="password" placeholder="Confirm password" className="info" />
			<button className="login_button">SignUp</button>
			or
			<div className="login_google">Continue with Google</div>
		</div>
	);
};
export default SignUp;
