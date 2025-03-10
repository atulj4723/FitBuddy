import Footer from "../components/Footer";

const Home = () => {
	return (
		<div className="Home">
			<div className="name">
				<h2 className="Home_h2"> WELCOME TO </h2>
				<h1 className="Home_h1">FITNESS BUDDY</h1>
			</div>
			<div className="account">
				<p>Ready to sign up ?</p>
				<a href="/Signup.jsx" className="Home_a_s">
					CREATE ACCOUNT
				</a>

				<p className="account_l">
					Already a member ?
					<a href="/" className="Home_a_l">
						LOGIN
					</a>
				</p>
			</div>
		</div>
	);
};
export default Home;
