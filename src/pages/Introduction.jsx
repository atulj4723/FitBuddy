import Footer from "../components/Footer";

const Introduction = () => {
	return (
		<div className="Introduction">
			<div className="name">
				<h2 className="Intro_h2"> WELCOME TO </h2>
				<h1 className="Intro_h1">FIT BUDDY</h1>
			</div>
			<div className="account">
				<p>Ready to sign up ?</p>
				<a href="/signup" className="Intro_a_s">
					CREATE ACCOUNT
				</a>

				<p className="account_l">
					Already a member ?
					<a href="/login" className="Intro_a_l">
						LOGIN
					</a>
				</p>
			</div>
		</div>
	);
};
export default Introduction;
