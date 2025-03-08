const Login = () => {
	return (
		<div className="home_account">
			<div className="page">
			<h1>Welcome Back</h1>
			<br></br>
			<input type="email" placeholder="Enter Email" className="info" />
			<input type="password" placeholder="Enter password" className="info" />
			<a className="login_button" href="/home">LogIn</a>
			or
			<div className="login_google">Continue with Google</div>
		</div></div>
	);
};
export default Login;
