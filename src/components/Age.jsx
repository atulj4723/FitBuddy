import React from "react";

const Age = ({ age, setAge }) => {
    return (
        <div className="height">
            Age :
            <input
                className="hinput"
                type="number"
                value={age}
                onChange={(e) => {
                    setAge(e.target.value);
                }}
            />
            years
        </div>
    );
};

export default Age;
