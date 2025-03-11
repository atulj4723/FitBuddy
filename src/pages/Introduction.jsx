import Footer from "../components/Footer";

const Introduction = () => {
	return (
		<div className="Home">
			<div className="name">
				<h2 className="Home_h2"> WELCOME TO </h2>
				<h1 className="Home_h1">FITNESS BUDDY</h1>
			</div>
			<div className="account">
				<p>Ready to sign up ?</p>
				<a href="/signup" className="Home_a_s">
					CREATE ACCOUNT
				</a>
				<p className="account_l">
					Already a member ?
					<a href="/login" className="Home_a_l">
						LOGIN
					</a>
				</p>
			</div>
		</div>
	);
};
export default Introduction;
