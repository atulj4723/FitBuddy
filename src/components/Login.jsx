const Login = () => {
	return (
		<div className="home_account">
			<h1>Welcome Back</h1>
			<br></br>
			<input type="email" placeholder="Enter Email" className="info" />
			<input type="password" placeholder="Enter password" className="info" />
			<button className="login_button">LogIn</button>
			or
			<div className="login_google">Continue with Google</div>
		</div>
	);
};
export default Login;
