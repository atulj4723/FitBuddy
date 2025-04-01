const DietCard = ({ food }) => {
	return (
		<div className="dietcard">
			<img className="diet_img" src={food.image} alt="" />
			<h1 className="diet_name" >{food.name}</h1>
			<h2 classNmae="diet_calories" >Calories:{food.calories}</h2>
		</div>
	);
};
export default DietCard;
