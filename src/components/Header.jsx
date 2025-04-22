import { useContext } from "react";
import { DataContext } from "../DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

const Header = () => {

    const navigate = useNavigate();
    return (
        <header>
            <div
                className="header_left"
                onClick={() => {
                    navigate("/");
                }}>
                    <FontAwesomeIcon icon={faDumbbell} className="dumb_h" />
                FITNESS BUDDY
            </div>
            <FontAwesomeIcon className="header_right" icon={faUser} onClick={()=>{
                navigate("/profile");
            }} />
        </header>
    );
};
export default Header;
