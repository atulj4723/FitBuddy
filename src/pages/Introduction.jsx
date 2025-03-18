import Footer from "../components/Footer";

const Introduction = () => {
	return (
		<div className="Introduction">
			<div>
				<img src="/public/images/intro.png"></img>
			</div>
			<div className="name">
				<h1 className="Intro_h1">FIT BUDDY</h1>
				<pre className="Intro_h2"><b>"Y O U R  F I T N E S S  J O U R N E Y  S T A R T S  H E R E !"</b></pre>
			</div>
			<div className="account">
				<p>Ready to sign up ?</p>
				<a href="/signup" className="Intro_a_s">
					CREATE ACCOUNT
				</a>

				<p className="account_l">
					Already a member?<pra> </pra>
					<a href="/login" className="Intro_a_l">
						Log In
					</a>
				</p>
			</div>
		</div>
	);
};
export default Introduction;
