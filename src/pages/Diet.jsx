import { useContext, useState } from "react";
import DietCard from "../components/DietCard";
import DietData from "../data/DietData";
import { DataContext } from "../DataContext";
const Diet = () => {
    const { data } = useContext(DataContext);
    const { diet, preferedDiet } = data;
    const actualData = DietData.filter((item) =>
        JSON.parse(preferedDiet).includes(item.name)
    );
    const finalData = actualData.filter((food) => {
        if (diet == "vegeatarian") {
            return food.type == "vegeatarian";
        } else if (diet == "eggeatarian") {
            return food.type == "vegeatarian" || food.type == "eggeatarian";
        } else {
            return true;
        }
    });
    const time = finalData.map((food) => food.time);
    const uniqueTimes = [...new Set(time)];
    const [showTime, setShowTime] = useState("early morning");
    const [showData, setShowData] = useState(
        finalData.filter((food) => food.time == showTime)
    );
    const [dataNo, setDataNo]=useState(0);
    const handleClick = (time) => {
        setShowTime(time);
        const filteredData = finalData.filter((food) => food.time == time);
        setShowData(filteredData);
    };
    return (
        <div className="diet_card">     
            <div className="diet_time">
                {uniqueTimes.map((time, index) => {
                    return (
                        <div className={`diet_time1 ${dataNo==index?"active":""}`} key={index}
                            onClick={() => {
                                handleClick(time);
                                setDataNo(index);
                            }}>
                            {time}
                        </div>
                    );
                })}
            </div>
            <div className="diettime_data">
            {showData.map((food, index) => (
                <DietCard key={index} food={food} />
            ))}</div>
        </div>
    );
};

export default Diet;
