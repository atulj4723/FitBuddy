import React, { useState } from "react";

const Gender = ({ gender, setGender }) => {
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    return (
        <>
            <h2>Select Your Gender</h2>
            <div className="gender">
                <label className="male">
                    <input
                        type="radio"
                        value="male"
                        name="gender"
                        checked={gender === "male"}
                        onChange={handleGenderChange}
                    />
                    Male
                </label>
                <label className="female">
                    <input
                        type="radio"
                        value="female"
                        name="gender"
                        checked={gender === "female"}
                        onChange={handleGenderChange}
                    />
                    Female
                </label>
            </div>
        </>
    );
};

export default Gender;
