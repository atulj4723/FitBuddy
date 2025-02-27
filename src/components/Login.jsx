const Login = () => {
	return (
		<div className="login">
			<h1>LogIn</h1><br></br>
			<input type="email" placeholder="Enter Email" className="email" /><br></br>
			<input type="password" placeholder="Enter password" className="email" /><br></br>
			<button className="login_button">LogIn</button>
			or
			<div className="login_google">Continue with Google</div>
		</div>
	);
};
export default Login;
