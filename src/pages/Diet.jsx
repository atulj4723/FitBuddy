import DietCard from "../components/DietCard";
import DietData from "../data/DietData";
const Diet = () => {
    return (
        <div className="diet_card">
            {DietData.map((food, index) => (
                <DietCard key={index} food={food} />
            ))}
        </div>
    );
};
export default Diet;