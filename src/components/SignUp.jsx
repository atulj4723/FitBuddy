const SignUp = () => {
	return (
		<div className="signup">
				<h1>SignUp</h1>
				<input type="text" placeholder="Enter name" className=""/>
				<input type="email" placeholder="Enter Email" />
				<input type="password" placeholder="Enter password" />
				<input type="password" placeholder="Confirm password" />
				<button>SignUp</button>
				or
				<div>
					Continue with Google
				</div>
		</div>
	);
};
export default SignUp;
