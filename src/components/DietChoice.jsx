import {
    faDrumstickBite,
    faEgg,
    faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Diet = ({ setDiet, diet }) => {
    return (
        <>
            <h2>Diet Preferance</h2>
            <div className="diet">
                <div
                    className={`${
                        diet == "vegeatarian" ? "select" : "no"
                    } vegeaterian `}
                    onClick={() => {
                        setDiet("vegeatarian");
                    }}>
                    <FontAwesomeIcon icon={faLeaf} className="diet_vicon" />
                    Vegeaterian
                </div>
                <div
                    className={`${
                        diet == "nonvegeatarian" ? "select" : "no"
                    } nonvegeaterian `}
                    onClick={() => {
                        setDiet("nonvegeatarian");
                    }}>
                    <FontAwesomeIcon
                        icon={faDrumstickBite}
                        className="diet_nicon"
                    />
                    Non Vegeaterian
                </div>
                <div
                    className={`${
                        diet == "eggeatarian" ? "select" : "no"
                    } eggeaterian `}
                    onClick={() => {
                        setDiet("eggeatarian");
                    }}>
                    <FontAwesomeIcon icon={faEgg} className="diet_eicon" />
                    Eggeaterian
                </div>
            </div>
        </>
    );
};
export default Diet;
