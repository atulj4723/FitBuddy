import { useNavigate } from "react-router-dom";

const DietCard = ({ food }) => {
    const navigate = useNavigate();
    return (
        <div
            className="dietcard"
            onClick={() => {
                navigate("/diet/" + food.id);
            }}>
            <img className="diet_img" src={food.image} alt="" />
            <h1 className="diet_name" >{food.name.replace(/_/g, " ")}</h1>
            <h2 className="diet_calories">Calories:{food.calories} cal.</h2>
        </div>
    );
};
export default DietCard;
