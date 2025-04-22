import { useContext, useState } from "react";
import { DataContext } from "../DataContext";

const Disease = ({ disease, setDisease }) => {
    const { data } = useContext(DataContext);
    const uDisease = JSON.parse(data.disease);

    const [diseaseList, setDiseaseList] = useState([
        ...new Set([...["Asthama", "Diabates", "Blood Pressure"], ...uDisease]),
    ]);

    const [addDisease, setAddDisease] = useState("");
    const handle = (item) => {
        if (disease.includes(item)) {
            setDisease(
                disease.filter((cur) => {
                    return cur != item;
                })
            );
        } else {
            setDisease([...disease, item]);
        }
    };
    const handleAdd = () => {
        const temp = addDisease.trim().toLowerCase();
        if (!diseaseList.includes(temp)) {
            setDiseaseList([...diseaseList, addDisease]);
        }
        setAddDisease("");
    };
    return (
        <div className="disease">
            <h2>Medical Condition</h2>
            <div className="diseaselist">
                {diseaseList.map((cur, idx) => {
                    const selected = disease.includes(cur);
                    return (
                        <ul
                            key={idx}
                            className={`${selected ? "select" : "no"} diseaseItem`}
                            onClick={() => {
                                handle(cur);
                            }}>
                            {cur}
                        </ul>
                    );
                })}{" "}
                <input
                    type="text"
                    value={addDisease}
                    placeholder="Other."
                    className="diseaseInput"
                    onChange={(e) => {
                        setAddDisease(e.target.value);
                    }}
                />
                  <button onClick={handleAdd} className="profile_button">
                Add
            </button>
            </div>
          
        </div>
    );
};
export default Disease;
