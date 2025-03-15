const DietCard = ({ food }) => {
	return (
		<div>
			<img src={food.image} alt="" />
			<h1>{food.name}</h1>
			<h2>{food.calories}</h2>
		</div>
	);
};
export default DietCard;
